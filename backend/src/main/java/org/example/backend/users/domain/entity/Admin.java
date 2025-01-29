package org.example.backend.users.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.backend.users.domain.dto.SignInReqDto;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "admin")
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "admin_id")
    private Long id;

    @Column(name = "login_id", nullable = false)
    private String loginId;

    @Column(name = "password", nullable = false)
    private String password;

    private String username;

    private String email;

    @Column(name = "role", nullable = false)
    private String role;

    @Builder
    private Admin(String loginId, String password, String username, String email, String role) {
        this.loginId = loginId;
        this.password = password;
        this.username = username;
        this.email = email;
        this.role = role;
    }

    public static Admin of(SignInReqDto dto, String encodedPassword) {
        return Admin.builder()
                .loginId(dto.getLoginId())
                .password(encodedPassword)
                .build();
    }

    public void updatePassword(String newEncodedPassword) {
        this.password = newEncodedPassword;
    }

    public boolean isEqualEmail(String email) {
        return this.email.equals(email);
    }
}