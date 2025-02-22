package health.mental.domain.Chat;

import com.fasterxml.jackson.databind.ObjectMapper;
import health.mental.domain.User.User;
import health.mental.repositories.ChatRepository;
import health.mental.repositories.UserRepository;
import io.swagger.v3.core.util.Json;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static java.nio.file.Paths.*;

@Service
public class ChatService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ChatRepository chatRepository;

    private final String promptTxtPath = "src/main/java/health/mental/domain/Chat/prompt-msg.txt";
    public String buildQuestion(String msg,String userId,String chatId) {


        String txtContent = "";

        try {
            Path path = get(promptTxtPath);
            txtContent = Files.readString(path);

            Map<String,String> userInfo = getUserInfo(userId,chatId);
          userInfo.put("lastMessage",msg);
            ObjectMapper objectMapper = new ObjectMapper();
            String toReplace = objectMapper.writeValueAsString(userInfo);

            txtContent = txtContent.replace("{JSON}",toReplace);
            System.out.println(txtContent);

        } catch (IOException e) {
            throw new RuntimeException("Erro ao ler o ficheiro " + promptTxtPath, e);
        }

        return txtContent ;


    }

    public Map<String, List<ChatGroupDTO>> groupByDay(List<Chat> chats) {

        Map<String, List<ChatGroupDTO>> chatsByDay = new HashMap<>();

        for(Chat chat : chats){
            if(chat.getChatMsgs().isEmpty())
                continue;
            String key = chat.getChatMsgs().get(chat.getChatMsgs().size()-1 < 0 ? 0:chat.getChatMsgs().size()-1).getDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")).toString();

            if(!chatsByDay.containsKey(key)){
                chatsByDay.put(key, new ArrayList<>());
                chatsByDay.get(key).add(new ChatGroupDTO(chat.getId().toString(),chat.getTitle(),chat.getChatMsgs().get(chat.getChatMsgs().size()-1).getAnswer()));

            }else{
                chatsByDay.get(key).add(new ChatGroupDTO(chat.getId().toString(),chat.getTitle(),chat.getChatMsgs().get(chat.getChatMsgs().size()-1).getAnswer()));
            }

        }
        return chatsByDay;

    }


    public Map<String,String> getUserInfo (String id,String chatId){
        Map<String,String> userInfo = new HashMap<>();
        User u = userRepository.findById(id).get();

        userInfo.put("name",u.getCompleteName());
        userInfo.put("age",u.getBirthDate());
        userInfo.put("job",u.getOccupation());
        userInfo.put("nationality",u.getNacionality());

        String previousMessages = "";
        var chats = chatRepository.findAllByUserId(id);
        for(Chat chat : chats){
            if(!chat.getId().toString().equals(chatId))
                continue;
            for(PairQuestionAnswer pqa : chat.getChatMsgs()){
                previousMessages += "Question:" + pqa.getQuestion() + " Answer" + pqa.getAnswer() + "\n";
            }
        }

        userInfo.put("previousMessages",previousMessages);

        return userInfo;
    }
}
