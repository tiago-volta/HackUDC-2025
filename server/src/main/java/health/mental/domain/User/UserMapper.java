package health.mental.domain.User;

public class UserMapper {

    public static  UserMeDTO toUserMeDTO(User user) {
        return new UserMeDTO(user.getLogin(), user.getRole(), user.getCompleteName(), user.getBirthDate(), user.getOccupation(), user.getNacionality(),user.getDateOfCreation());
    }
}
