package health.mental.controller;



import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import health.mental.domain.Chat.*;
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

import java.util.ArrayList;
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
    public ResponseEntity sendMessage(@PathVariable Long id, @RequestHeader("Authorization") String bearerToken, @RequestBody MessageRequestDTO msg) {
        String token = bearerToken.substring(7);
        String userLogin = tokenService.validateToken(token);
        var user =  (User) userRepository.findByLogin(userLogin);
        if(user == null)
            return ResponseEntity.badRequest().body("User not found");

        var chat =  chatRepository.findById(id);
        if(chat == null)
            return ResponseEntity.badRequest().body("Chat not found");
        var answer = chatgptController.ask(chatService.buildQuestion(msg.getMsg()));

        try {
            if (chat.get().getChatMsgs().isEmpty()){
                chat.get().setTitle(chatgptController.ask("Say the title of the chat based on the first message of our chat:"+msg.getMsg()+". Please answer only the title without puting it in any object  (Exemplo: Primeira Mensagem: 'Gosto do Ronaldo', Possivel titulo:'O facto de eu gostar do ronaldo' é apenas um exemplo. Limite de 25-30 caracteres").getBody());
            }

            chat.get().addMsg(msg.getMsg(), answer.getBody());

            chatRepository.save(chat.get());
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

    @GetMapping("/history")
    @Operation(summary = "Get chat history", description = "Get chat history by user")
    public ResponseEntity getChatHistory(@RequestHeader("Authorization") String bearerToken) {
        String token = bearerToken.substring(7);
        String userLogin = tokenService.validateToken(token);
        var user =  (User) userRepository.findByLogin(userLogin);
        if(user == null)
            return ResponseEntity.badRequest().body("User not found");

        var chats = chatRepository.findByUser(user);
        List<ChatHistoryDTO> chatHistory = new ArrayList<>();
        for(Chat chat: chats){
            if(chat.getChatMsgs().isEmpty())
                continue;
            chatHistory.add(new ChatHistoryDTO(chat.getId().toString(), chat.getTitle(), chat.getChatMsgs()));
        }
        return ResponseEntity.ok(chatHistory);
    }



}
