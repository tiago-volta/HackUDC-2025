package health.mental.domain.User;

public record UserMeDTO(
        String login,
        UserRole role,
        String completeName,
        String birthDate,
        String occupation,
        String nacionality
) {



}
