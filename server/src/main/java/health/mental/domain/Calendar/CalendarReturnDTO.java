package health.mental.domain.Calendar;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CalendarReturnDTO {

    String day;
    String note;
    Object chats;

    Object evaluation;

    String justificative;

    Integer grade;

    public CalendarReturnDTO(String day, String note, Object chats, String justificative, Integer grade) {
        this.day = day;
        this.note = note;
        this.chats = chats;
        this.justificative = justificative;
        this.grade = grade;

    }


    public CalendarReturnDTO(String day, String note, Object chats, String evaluation) {
        this.day = day;
        this.note = note;
        this.chats = chats;
        this.evaluation = evaluation;
        try {
            ObjectMapper objectMapper = new ObjectMapper();

            EvaluationDTO eval = objectMapper.readValue(evaluation, EvaluationDTO.class);
            this.grade = eval.getGrade();
            this.justificative = eval.getJustification();
        } catch (Exception e) {
            this.grade = 0;
            this.justificative = "Error parsing evaluation";
        }
    }


}
