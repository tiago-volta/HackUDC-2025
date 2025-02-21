package health.mental.domain.Chat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.antlr.v4.runtime.misc.Pair;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@NoArgsConstructor
@Setter
@Getter
public class ChatReturnDTO {

    public String id;
    public List<PairQuestionAnswer> msgs;

    public String userId;

    public ChatReturnDTO(String id, List<PairQuestionAnswer> msgs, String userId) {
        this.id = id;
        this.msgs = msgs;
        this.userId = userId;
    }

}
