package health.mental.domain.Chat;

import health.mental.domain.User.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.util.*;


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
    private List<PairQuestionAnswer> chatMsgs;

    @ManyToOne
    private User user;

    @Column(name = "title")
    private String title;

    public Chat(User user) {
        this.user = user;
        this.chatMsgs = new ArrayList<>();
    }

    public void addMsg(String question, String answer){
        // we put the uuid to avoid duplicate keys, since the user can ask the same question multiple times, in alternative we could use a list of answers but we would lose the order of the questions
        this.chatMsgs.add(new PairQuestionAnswer(question, answer));
    }

}

