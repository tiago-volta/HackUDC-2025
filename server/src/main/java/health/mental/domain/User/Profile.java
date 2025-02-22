package health.mental.domain.User;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Profile {

    private String evaluation;

    private Ocean ocean;

    private Eneagrama eneagrama;

    private String lastChange;



}
