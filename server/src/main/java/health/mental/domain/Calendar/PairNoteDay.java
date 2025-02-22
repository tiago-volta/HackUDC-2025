package health.mental.domain.Calendar;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Embeddable
@Data
public class PairNoteDay {

    String note;
    String date;

    public PairNoteDay() {
    }

    public PairNoteDay(String note, String date) {
        this.note = note;
        this.date = date;
    }
}
