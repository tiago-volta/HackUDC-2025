package health.mental.domain.User;

public record AuthRegisterDTO(String login, String password, String role, String completeName, String birthDate, String occupation, String nacionality) {

    public AuthRegisterDTO(String login2, String password2, UserRole user, String completeName, String birthDate, String occupation, String nacionality) {
        this(login2, password2, user.name(), completeName, birthDate, occupation, nacionality);
    }
}
