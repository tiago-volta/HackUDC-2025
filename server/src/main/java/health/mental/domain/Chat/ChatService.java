package health.mental.domain.Chat;

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

    private final String promptTxtPath = "src/main/java/health/mental/domain/Chat/prompt-msg.txt";
    public String buildQuestion(String msg) {
        //TODO: add the prompt to the question, it could include past

        String txtContent = "";

        try {
            Path path = get(promptTxtPath);
            txtContent = Files.readString(path);
        } catch (IOException e) {
            throw new RuntimeException("Erro ao ler o ficheiro " + promptTxtPath, e);
        }

        return txtContent + " " + msg;


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

            }

        }
        return chatsByDay;

    }
}
