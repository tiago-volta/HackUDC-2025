package health.mental.domain.User;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Ocean {
    private String neurocitismLevel;
    private String neurocistismDescription;

    private String extroversionLevel;
    private String extroversionDescription;

    private String openessLevel;
    private String openessDescription;

    private String agreeablenessLevel;
    private String agreeablenessDescription;

    private String conscientiousnessLevel;

    private String conscientiousnessDescription;
}
