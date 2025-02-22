package health.mental.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfDocument;
import com.itextpdf.text.pdf.PdfWriter;
import health.mental.domain.Calendar.Calendar;
import health.mental.domain.User.*;
import health.mental.repositories.CalendarRepo;
import health.mental.repositories.ChatRepository;
import org.jose4j.json.internal.json_simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import health.mental.Utils;
import health.mental.Exception.TokenInvalidException;
import health.mental.infra.security.TokenService;
import health.mental.repositories.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static java.nio.file.Paths.get;

@RestController
@RequestMapping("/auth")
@Tag(name = "Authentication", description = "Endpoints for user authentication and management")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TokenService tokenService;

    @Autowired
    private CalendarRepo calendarRepo;

    @Autowired
    private ChatRepository chatRepository;

    @Autowired
    private ChatgptController chatgptController;

    @Value("${jose.is.enable.jose}")
    private boolean IS_ENABLE_JOSE;

    private String txt_prompt = "src/main/java/health/mental/domain/Calendar/prompt-dayevaluation2.txt";

    @Operation(summary = "Authenticate user", description = "Receives login and password and returns a JWT token.")
    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid AuthDTO authDTO) {

        if (IS_ENABLE_JOSE && (userRepository.findByLogin(authDTO.login()) == null)) {
            System.out.println("Registering user");
            register(new AuthRegisterDTO(authDTO.login(), authDTO.password(), UserRole.USER,authDTO.completeName(),authDTO.birthDate(),authDTO.occupation(),authDTO.nacionality()));
        }

        try {
            var usernamePassword = new UsernamePasswordAuthenticationToken(authDTO.login(),
                    Utils.decodeJwt(authDTO.password()));
            authenticationManager.authenticate(usernamePassword);
            var authentication = authenticationManager.authenticate(usernamePassword);
            var token = tokenService.generateToken((User) authentication.getPrincipal());
            return ResponseEntity.ok(new LoginResponseDTO(token));
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpServletResponse.SC_UNAUTHORIZED)
                    .body("{\"error\": \"Invalid login or password\"}");
        } catch (TokenInvalidException e) {
            return ResponseEntity.status(HttpServletResponse.SC_UNAUTHORIZED).body("{\"error\": \"Invalid token\"}");
        }

    }

    @Operation(summary = "Get authenticated user", description = "Returns the details of the authenticated user.")
    @GetMapping("/me")
    public ResponseEntity<?> getLoggedInUser(@RequestHeader("Authorization") String bearerToken) {
        String token = bearerToken.substring(7);
        String userLogin = tokenService.validateToken(token);
        return ResponseEntity.ok(UserMapper.toUserMeDTO((User) userRepository.findByLogin(userLogin)));
    }

    @Operation(summary = "Register a new user", description = "Creates a new user account on the platform.")
    @PostMapping("/register")
    public ResponseEntity register(@RequestBody @Valid AuthRegisterDTO authDTO) {
        if (this.userRepository.findByLogin(authDTO.login()) != null) {
            return ResponseEntity.status(HttpServletResponse.SC_BAD_REQUEST)
                    .body("{\"error\": \"Login/Username already in use\"}");
        }

        String encodedPassword = new BCryptPasswordEncoder().encode(Utils.decodeJwt(authDTO.password()));
        try {

            User user = new User(authDTO.login(), encodedPassword, authDTO.role(), authDTO.completeName(), authDTO.birthDate(), authDTO.occupation(), authDTO.nacionality());
            user.setDateOfCreation(new Date().toString());
            userRepository.save(user);

            calendarRepo.save(new Calendar(user));

        } catch (Exception e) {
            return ResponseEntity.status(HttpServletResponse.SC_BAD_REQUEST).body(e.getMessage());
        }

        return ResponseEntity.ok().build();
    }

    @GetMapping("/profile")
    @Operation(summary = "Get user profile", description = "Get user profile (Extra Information)")
    public ResponseEntity<?> getProfile(@RequestHeader("Authorization") String bearerToken) {
        String token = bearerToken.substring(7);
        String userLogin = tokenService.validateToken(token);
        var user = (User) userRepository.findByLogin(userLogin);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Utilizador não encontrado.");
        }

        Profile profile = user.getProfile();

        // Verifica se o perfil é nulo ou se "lastChange" não foi definido
        if (profile == null || profile.getLastChange() == null) {
            return atualizarPerfil(user);
        }

        long lastChangeMillis;
        try {
            lastChangeMillis = Long.parseLong(profile.getLastChange());
        } catch (NumberFormatException e) {
            // Se "lastChange" não for um número válido, assume que precisa de ser atualizado
            return atualizarPerfil(user);
        }

        // Verifica se passaram mais de 15 minutos desde a última atualização do perfil
        if (new Date(lastChangeMillis + (15 * 60 )).before(new Date())) {
            return atualizarPerfil(user);
        }

        return ResponseEntity.ok(profile);
    }

    private ResponseEntity<?> atualizarPerfil(User user) {
        var chats = chatRepository.findByUser(user);
        var calendar = calendarRepo.findAllByUserId(user.getId());

        // Cria JSON com os dados necessários
        var json = new JSONObject();
        json.put("chats", chats);
        json.put("calendar", calendar);

        String txtContent;
        try {
            Path path = Paths.get(txt_prompt);
            txtContent = Files.readString(path);
            txtContent = txtContent.replace("{{JSON}}", json.toJSONString());

            var res = chatgptController.ask(txtContent).getBody();
            if (res == null) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao obter resposta da IA.");
            }

            res = res.replace("ola", "");

            ObjectMapper objectMapper = new ObjectMapper();
            Map<String, Object> map = objectMapper.readValue(res, new TypeReference<Map<String, Object>>() {});

            Profile profile = new Profile(map);
            user.setProfile(profile);
            userRepository.save(user);

            return ResponseEntity.ok(user.getProfile());

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao ler o ficheiro " + txt_prompt);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro inesperado ao atualizar o perfil.");
        }
    }


    private static final String PDF_DIRECTORY = "src/main/resources/static/pdf/";

    @GetMapping("/pdf")
    public ResponseEntity<?> getPdf(@RequestHeader("Authorization") String bearerToken) {
        try {
            // Retrieve user from token
            User user = getUserFromToken(bearerToken);

            // PDF file name and path
            String pdfFileName = "UserProfile_" + user.getId() + ".pdf";
            String pdfFilePath = PDF_DIRECTORY + pdfFileName;

            // Create directory if it doesn't exist
            File directory = new File(PDF_DIRECTORY);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            // Create PDF document
            Document document = new Document();
            PdfWriter.getInstance(document, new FileOutputStream(pdfFilePath));
            document.open();

            // Add the logo image at the top
            String imagePath = "src/main/resources/static/TherapIA.png";
            Image logo = Image.getInstance(imagePath);
            logo.scaleToFit(150, 150); // Resize image if needed
            logo.setAlignment(Element.ALIGN_CENTER);
            document.add(logo);

            // Application/Clinic name
            Font headerFont = new Font(Font.FontFamily.TIMES_ROMAN, 24, Font.BOLD);
            Paragraph header = new Paragraph("TherapIA", headerFont);
            header.setAlignment(Element.ALIGN_CENTER);
            document.add(header);
            document.add(new Paragraph("\n"));

            // User Information
            Font infoFont = new Font(Font.FontFamily.HELVETICA, 12);
            document.add(new Paragraph("Full Name: " + user.getCompleteName(), infoFont));
            document.add(new Paragraph("Date of Birth: " + user.getBirthDate(), infoFont));
            document.add(new Paragraph("Occupation: " + user.getOccupation(), infoFont));
            document.add(new Paragraph("Nationality: " + user.getNacionality(), infoFont));
            document.add(new Paragraph("\n"));

            // Psychological Profile
            if (user.getProfile() != null) {
                document.add(new Paragraph("General Evaluation: " + user.getProfile().getEvaluation(), infoFont));
                document.add(new Paragraph("Last Update: " + user.getProfile().getLastChange(), infoFont));
                document.add(new Paragraph("\n"));

                // Big Five Personality Traits
                if (user.getProfile().getOcean() != null) {
                    document.add(new Paragraph("🔹 Big Five Personality Traits", infoFont));
                    document.add(new Paragraph("Neuroticism: " + user.getProfile().getOcean().getNeurocitismLevel() +
                            " - " + user.getProfile().getOcean().getNeurocistismDescription(), infoFont));
                    document.add(new Paragraph("Extraversion: " + user.getProfile().getOcean().getExtroversionLevel() +
                            " - " + user.getProfile().getOcean().getExtroversionDescription(), infoFont));
                    document.add(new Paragraph("Openness: " + user.getProfile().getOcean().getOpenessLevel() +
                            " - " + user.getProfile().getOcean().getOpenessDescription(), infoFont));
                    document.add(new Paragraph("Agreeableness: " + user.getProfile().getOcean().getAgreeablenessLevel() +
                            " - " + user.getProfile().getOcean().getAgreeablenessDescription(), infoFont));
                    document.add(new Paragraph("Conscientiousness: " + user.getProfile().getOcean().getConscientiousnessLevel() +
                            " - " + user.getProfile().getOcean().getConscientiousnessDescription(), infoFont));
                    document.add(new Paragraph("\n"));
                }

                // Enneagram Type
                if (user.getProfile().getEneagrama() != null) {
                    document.add(new Paragraph("🔹 Enneagram Type", infoFont));
                    document.add(new Paragraph("Type: " + user.getProfile().getEneagrama().getType(), infoFont));
                    document.add(new Paragraph("Description: " + user.getProfile().getEneagrama().getDescription(), infoFont));
                }
            }

            document.close();

            // Return PDF download link
            return ResponseEntity.ok("/pdf/" + pdfFileName);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error generating PDF: " + e.getMessage());
        }
    }

    private User getUserFromToken(String bearerToken) {
        String token = bearerToken.substring(7);
        String userLogin = tokenService.validateToken(token);
        return (User) userRepository.findByLogin(userLogin);
    }


}