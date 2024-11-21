package org.example.backend.admin.domain.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@Setter
@AllArgsConstructor
@NoArgsConstructor
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

    public boolean isEqualEmail(String email) {
        return this.email.equals(email);
    }

    public void updatePassword(String encodedPassword) {
        this.password = encodedPassword;
    }
}