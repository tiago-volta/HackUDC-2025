package health.mental.domain.User;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Lob;
import jakarta.persistence.NamedEntityGraph;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Embeddable
@AllArgsConstructor
@NoArgsConstructor
@Data
    public class Eneagrama {

        private String type;

        @Lob
        @Column(columnDefinition = "TEXT")
        private String description;

    public Eneagrama(Map<String, Object> eneagramaMap) {
        this.type = (String) eneagramaMap.get("type");
        this.description = (String) eneagramaMap.get("justification");
    }
    }
