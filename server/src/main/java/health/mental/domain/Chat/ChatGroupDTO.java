package health.mental.domain.Chat;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Setter
@Getter
public class ChatGroupDTO {

    String id;

    String title;

    String lastMessage;

    public ChatGroupDTO(String id, String title, String lastMessage) {
        this.id = id;
        this.title = title;
        this.lastMessage = lastMessage;
    }
}
