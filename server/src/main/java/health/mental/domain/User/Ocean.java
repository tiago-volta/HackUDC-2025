package health.mental.domain.User;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Embeddable
@AllArgsConstructor
@NoArgsConstructor
@Data
    public class Ocean {
        private String neurocitismLevel;
    @Lob
    @Column(columnDefinition = "TEXT")
        private String neurocistismDescription;

        private String extroversionLevel;
    @Lob
    @Column(columnDefinition = "TEXT")
        private String extroversionDescription;

        private String openessLevel;
        @Lob
        @Column(columnDefinition = "TEXT")
        private String openessDescription;

        private String agreeablenessLevel;
    @Lob
    @Column(columnDefinition = "TEXT")
        private String agreeablenessDescription;

        private String conscientiousnessLevel;
    @Lob
    @Column(columnDefinition = "TEXT")
        private String conscientiousnessDescription;

    public Ocean(Map<String, Object> bigFiveMap) {
        this.neurocitismLevel = String.valueOf(((Map<String, Object>) bigFiveMap.get("Neuroticism")).get("value"));
        this.neurocistismDescription = (String) ((Map<String, Object>) bigFiveMap.get("Neuroticism")).get("justification");

        this.extroversionLevel = String.valueOf(((Map<String, Object>) bigFiveMap.get("Extraversion")).get("value"));
        this.extroversionDescription = (String) ((Map<String, Object>) bigFiveMap.get("Extraversion")).get("justification");

        this.openessLevel = String.valueOf(((Map<String, Object>) bigFiveMap.get("Openness")).get("value"));
        this.openessDescription = (String) ((Map<String, Object>) bigFiveMap.get("Openness")).get("justification");

        this.agreeablenessLevel = String.valueOf(((Map<String, Object>) bigFiveMap.get("Agreeableness")).get("value"));
        this.agreeablenessDescription = (String) ((Map<String, Object>) bigFiveMap.get("Agreeableness")).get("justification");

        this.conscientiousnessLevel = String.valueOf(((Map<String, Object>) bigFiveMap.get("Conscientiousness")).get("value"));
        this.conscientiousnessDescription = (String) ((Map<String, Object>) bigFiveMap.get("Conscientiousness")).get("justification");
    }
    }
