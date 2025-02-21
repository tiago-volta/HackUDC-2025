package health.mental.domain.Chat;

import health.mental.domain.User.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.util.HashMap;
import java.util.Map;
import java.util.UUID;


@Entity(name = "chat")
@Table(name = "chat")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Chat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ElementCollection
    private Map<String,String> chatMsgs;

    @ManyToOne
    private User user;

    public Chat(User user) {
        this.user = user;
        this.chatMsgs = new HashMap<String,String>();
    }

    public void addMsg(String question, String answer){
        // we put the uuid to avoid duplicate keys, since the user can ask the same question multiple times, in alternative we could use a list of answers but we would lose the order of the questions
        this.chatMsgs.put(question + "$" + UUID.randomUUID(),answer);
    }

}

