package health.mental.domain.Chat;

import jakarta.persistence.Embeddable;
import java.time.LocalDateTime;

@Embeddable
public class PairQuestionAnswer {

    private String question;
    private String answer;
    private LocalDateTime date;

    public PairQuestionAnswer() {
        this.date = LocalDateTime.now();
    }

    public PairQuestionAnswer(String question, String answer) {
        this.question = question;
        this.answer = answer;
        this.date = LocalDateTime.now();
    }

    public String getQuestion() {
        return question;
    }

    public String getAnswer() {
        return answer;
    }

    public LocalDateTime getDate() {
        return date;
    }
}
