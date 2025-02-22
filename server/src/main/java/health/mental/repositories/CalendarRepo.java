package health.mental.repositories;

import health.mental.domain.Calendar.Calendar;
import health.mental.domain.Chat.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CalendarRepo extends JpaRepository<Calendar, Long> {

    Calendar findAllByUserId(String userId);

}
