package health.mental.repositories;

import health.mental.domain.Chat.Chat;

import health.mental.domain.User.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Long> {



    public List<Chat> findAll();


    public List<Chat> findByUser(User user);



    public List<Chat> findAllByUserId(String userId);
}
