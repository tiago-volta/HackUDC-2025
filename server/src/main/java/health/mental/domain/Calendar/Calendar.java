package health.mental.domain.Calendar;

import health.mental.domain.User.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity(name = "calendar")
@Table(name = "calendar")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Calendar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private User user;

    @ElementCollection
    private List<PairNoteDay> noteday;

    @ElementCollection
    private List<EvaluationDay> evaluationDay;


    public Calendar(User user) {
        this.user = user;
        this.noteday = new ArrayList<>();

    }
    public Calendar(User user, List<EvaluationDay> evaluationDay) {
        this.user = user;
        this.noteday = new ArrayList<>();
        this.evaluationDay = evaluationDay;

    }




}
