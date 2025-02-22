package health.mental.domain.User;

import jakarta.persistence.Embeddable;
import jakarta.persistence.NamedEntityGraph;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Eneagrama {

    private String type;

    private String description;
}
