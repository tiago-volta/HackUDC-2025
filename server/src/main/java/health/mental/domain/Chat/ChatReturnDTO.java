package health.mental.domain.Chat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Map;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class ChatReturnDTO {

    public String id;
    public Map<String,String> msgs;

    public String userId;

}
