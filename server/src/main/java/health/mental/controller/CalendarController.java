package health.mental.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import health.mental.domain.Calendar.CalendarInsertDTO;
import health.mental.domain.Calendar.CalendarReturnDTO;
import health.mental.domain.Calendar.PairNoteDay;
import health.mental.domain.User.User;
import health.mental.infra.security.TokenService;
import health.mental.repositories.CalendarRepo;
import health.mental.repositories.ChatRepository;
import health.mental.repositories.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.jose4j.json.internal.json_simple.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.*;

import static java.nio.file.Paths.get;

@RestController
@RequestMapping("/calendar")
@Tag(name = "Calendar Controller", description = "Endpoints for user calendar")
public class CalendarController {


    @Autowired
    private CalendarRepo calendarRepo;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ChatRepository chatRepository;

    @Autowired
    private ChatgptController chatgptController;

    private final String promptTxtPath = "src/main/java/health/mental/domain/calendar/prompt-dayevaluation.txt";
    @GetMapping("/{date}")
    @Operation(summary = "Get user calendar", description = "Get user calendar by user id and date")
    public ResponseEntity getCalendar(@RequestHeader("Authorization") String bearerToken, @PathVariable String date) {
        String token = bearerToken.substring(7);
        String userLogin = tokenService.validateToken(token);
        User u = (User) userRepository.findByLogin(userLogin);
        String userId = u.getId();



        var calendarUser = calendarRepo.findAllByUserId(userId);
        for (var noteDay : calendarUser.getNoteday()) {
            if (noteDay.getDate().equals(date)) {


                return ResponseEntity.ok(new CalendarReturnDTO(noteDay.getDate(), noteDay.getNote(), getChatsFromDay(date,userId),getEvaluationCalendar(getChatsFromDay(date,userId), noteDay.getNote()).toString()));
            }
        }
        return ResponseEntity.ok(new CalendarReturnDTO(date, "No note", "No chat", "No evaluation"));
    }

    @PutMapping("/{date}")
    @Operation(summary = "Update user calendar", description = "Update user calendar by user id and date")
    public ResponseEntity updateCalendar(@RequestHeader("Authorization") String bearerToken, @RequestBody CalendarInsertDTO calendarInsertDTO, @PathVariable String date) {

        String token = bearerToken.substring(7);
        String userLogin = tokenService.validateToken(token);
        User u = (User) userRepository.findByLogin(userLogin);
        String userId = u.getId();

        var calendarUser = calendarRepo.findAllByUserId(userId);

        for(var noteDay : calendarUser.getNoteday()){
            if(noteDay.getDate().equals(date)){
                noteDay.setNote(calendarInsertDTO.note);
                calendarRepo.save(calendarUser);
                return ResponseEntity.ok(new CalendarReturnDTO(noteDay.getDate(), noteDay.getNote(), getChatsFromDay(date,userId),getEvaluationCalendar(getChatsFromDay(date,userId), noteDay.getNote()).toString())) ;
            }
        }
        PairNoteDay newNoteDay = new PairNoteDay(calendarInsertDTO.note, date);
        calendarUser.getNoteday().add(newNoteDay);



        calendarRepo.save(calendarUser);
        return ResponseEntity.ok(new CalendarReturnDTO(date, calendarInsertDTO.note, "No chat", "No evaluation"));

    }

    private Object getChatsFromDay(String date,String userId) {
        var chats = chatRepository.findAllByUserId(userId);
        List<Object> chatList = new ArrayList<>();
        for (var chat : chats) {
            for(var msg: chat.getChatMsgs()){

                if(msg.getDate().toLocalDate().toString().equals(date)){
                    chatList.add(msg);
                }

            }
        }
        if(chatList.size() > 0){
            return chatList;
        }
        return "No chat";
    }

    private Object getEvaluationCalendar(Object msgs,String note){
        String txtContent = "";

        try {
            Path path = get(promptTxtPath);
            txtContent = Files.readString(path);

            Map<String,String> userInfo = new HashMap<>();
            userInfo.put("diario",note);
            userInfo.put("mensagens",msgs.toString());

            ObjectMapper objectMapper = new ObjectMapper();
            String toReplace = objectMapper.writeValueAsString(userInfo);

            txtContent = txtContent.replace("{JSON}",toReplace);

            var res = chatgptController.ask(txtContent);



            return res.getBody();
        } catch (IOException e) {
            throw new RuntimeException("Erro ao ler o ficheiro " + promptTxtPath, e);
        }
    }

}
