package health.mental.domain.User;

import health.mental.infra.security.PermissionService;
import jakarta.annotation.Nonnull;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.management.ConstructorParameters;
import java.util.Collection;
import java.util.List;

@Entity(name = "users")
@Table(name = "users")

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Setter
@EqualsAndHashCode(of = {"id"})

public class User implements UserDetails {


    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;




    @Column(name = "login", unique = true)
    @Nonnull
    private String login;


    @Column(name = "password")
    @Nonnull
    private String password;

    @Column(name = "role")
    @Nonnull
    private UserRole role;

    @Column(name = "complete_name")
    @Nonnull
    private String CompleteName;

    //date in format yyyy-MM-dd
    @Column(name = "birth_date")
    @Nonnull
    private String BirthDate;

    @Column(name = "Occupation")
    @Nonnull
    private String Occupation;

    @Column(name = "Nacionality")
    @Nonnull
    private String Nacionality;

    private Profile profile;

    private String DateOfCreation;

    public User(String login, String password, String role, String completeName, String birthDate, String occupation, String nacionality) {
        this.login = login;
        this.password = password;
        try{
            this.role = UserRole.valueOf(role.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid role, please use one of the following: " + List.of(UserRole.values()));
        }
        CompleteName = completeName;
        BirthDate = birthDate;
        Occupation = occupation;
        Nacionality = nacionality;


    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        PermissionService permissionService = new PermissionService();
        return permissionService.getHierarchyMap().get(role);
    }

    @Override
    public String getUsername() {
        return login;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
