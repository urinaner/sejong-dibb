package org.example.backend.users.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "users")
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "users_id")
    private Long id;

    @Column(name = "login_id", nullable = false)
    private String loginId;

    @Column(name = "password", nullable = false)
    private String password;

    private String username;

    private String email;

    @Column(name = "phone", unique = true)
    private String phoneN;

    private String department;

    @Column(name = "role", nullable = false)
    @Enumerated(EnumType.STRING)
    private Role role;

    @Builder
    private Users(String loginId, String password, String username, String email, String phoneN, Role role,
                  String department) {
        this.loginId = loginId;
        this.password = password;
        this.username = username;
        this.email = email;
        this.phoneN = phoneN;
        this.role = role;
        this.department = department;
    }

    public void updatePassword(String newEncodedPassword) {
        this.password = newEncodedPassword;
    }

    public boolean has(String email) {
        return this.email.equals(email);
    }

    public boolean matchPassword(String password, PasswordEncoder bCryptPasswordEncoder) {
        if (!bCryptPasswordEncoder.matches(password, this.password)) {
            return false;
        }
        return true;
    }
}