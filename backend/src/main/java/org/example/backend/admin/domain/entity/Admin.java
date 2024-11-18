package org.example.backend.admin.domain.entity;

import jakarta.persistence.*;
import lombok.*;
import org.example.backend.admin.domain.dto.SignInReqDto;
import org.example.backend.department.domain.entity.Department;

import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "admin")
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
}