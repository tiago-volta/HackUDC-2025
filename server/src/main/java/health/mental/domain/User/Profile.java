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
public class Profile {

    @Lob
    @Column(columnDefinition = "TEXT")
    private String evaluation;

    private Ocean ocean;

    private Eneagrama eneagrama;

    private String lastChange;

    public Profile(Map<String, Object> map) {
        // Extrai a avaliação geral
        Map<String, Object> generalEvaluation = (Map<String, Object>) map.get("GeneralEvaluation");
        this.evaluation = (String) generalEvaluation.get("evaluation");

        // Extrai os valores do Big Five
        Map<String, Object> bigFive = (Map<String, Object>) map.get("BigFive");
        this.ocean = new Ocean(bigFive);

        // Extrai os valores do Eneagrama
        Map<String, Object> eneagramaMap = (Map<String, Object>) map.get("Eneograma");

        if (eneagramaMap != null) {
            this.eneagrama = new Eneagrama(eneagramaMap);
        } else {
            this.eneagrama = new Eneagrama(); // Ou trata a falta de dados de outra forma
        }

        // Define a data da última modificação
        this.lastChange = String.valueOf(System.currentTimeMillis());
    }



}
