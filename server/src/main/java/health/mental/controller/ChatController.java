package health.mental.controller;



import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import health.mental.domain.Chat.Chat;
import health.mental.domain.Chat.ChatCreatedDTO;
import health.mental.domain.Chat.ChatReturnDTO;
import health.mental.domain.Chat.ChatService;
import health.mental.domain.Product.Product;
import health.mental.domain.Product.ProductMapper;
import health.mental.domain.Product.ProductRequestDTO;
import health.mental.domain.Product.ProductResponseDTO;
import health.mental.domain.User.User;
import health.mental.domain.User.UserMapper;
import health.mental.infra.security.TokenService;
import health.mental.repositories.ChatRepository;
import health.mental.repositories.ProductRepository;

import health.mental.repositories.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/chat")
@Tag(name = "Chat", description = "Endpoints to interact with chat")
public class ChatController {


    @Autowired
    private ChatRepository chatRepository;

    @Autowired
    private ChatgptController chatgptController;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TokenService tokenService;

    @Autowired
    private ChatService chatService;

    @PostMapping("/new")
    @Operation(summary = "Create a new chat", description = "Create a new chat associated with the user who is creating it")
    public ResponseEntity createChat(@RequestHeader("Authorization") String bearerToken) {


        String token = bearerToken.substring(7);
        String userLogin = tokenService.validateToken(token);
        var user =  (User) userRepository.findByLogin(userLogin);
        if(user == null)
            return ResponseEntity.badRequest().body("User not found");

        var chat = chatRepository.save(new Chat(user));

        return ResponseEntity.ok(new ChatCreatedDTO(chat.getId().toString()));


    }

    @GetMapping("/{id}")
    @Operation(summary = "Get chat by id", description = "Get chat by id")
    public ResponseEntity getChat(@PathVariable Long id) {
        var chat = chatRepository.findById(id);
        if(chat.isEmpty())
            return ResponseEntity.badRequest().body("Chat not found");

        return ResponseEntity.ok(new ChatReturnDTO(chat.get().getId().toString(),chat.get().getChatMsgs(),chat.get().getUser().getId().toString()));
    }

    @PostMapping("/{id}")
    @Operation(summary = "Send message to chat", description = "Send message to chat and get an answer")
    public ResponseEntity sendMessage(@PathVariable Long id, @RequestHeader("Authorization") String bearerToken, @RequestBody String msg) {
        String token = bearerToken.substring(7);
        String userLogin = tokenService.validateToken(token);
        var user =  (User) userRepository.findByLogin(userLogin);
        if(user == null)
            return ResponseEntity.badRequest().body("User not found");

        var chat =  chatRepository.findById(id);
        if(chat == null)
            return ResponseEntity.badRequest().body("Chat not found");
        var answer = chatgptController.ask(chatService.buildQuestion(msg));

        try {

            chat.get().addMsg(msg, answer.getBody());
        }catch(Exception e){
            ResponseEntity.badRequest().body("Error in the answer");
        }



        return ResponseEntity.ok(answer.getBody());
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete chat by id", description = "Delete chat by id")
    public ResponseEntity deleteChat(@PathVariable Long id) {
        chatRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }



}
