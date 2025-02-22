package health.mental.domain.Calendar;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Lob;
import lombok.*;

@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class EvaluationDay {

    public String day;
    @Column(name = "evaluation")
    private Integer evaluation;

    @Column(name = "evaluation_justification",columnDefinition = "TEXT")
    //make this row big text
    @Lob

    private String evaluationJustification;

    @Column(name = "date_of_evaluation")
    private String dateOfEvaluation;
}
