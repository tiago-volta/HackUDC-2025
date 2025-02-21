package health.mental.domain.Chat;

import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

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
}
