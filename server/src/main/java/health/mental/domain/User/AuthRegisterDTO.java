package health.mental.domain.User;

public record AuthRegisterDTO(String login, String password, String role) {

    public AuthRegisterDTO(String login2, String password2, UserRole user) {
        this(login2, password2, user.name());
    }
}
