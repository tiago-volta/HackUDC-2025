package health.mental.domain.Chat;
import health.mental.domain.Chat.PairQuestionAnswer;

import java.util.List;

public class ChatHistoryDTO {
    public String id;

    public String title;
    public List<PairQuestionAnswer> msgs;

    public ChatHistoryDTO(String id, String title, List<PairQuestionAnswer> msgs) {
        this.id = id;
        this.title = title;
        this.msgs = msgs;
    }
}
