package org.example.backend.admin.domain.entity;

import jakarta.persistence.*;
import lombok.*;
import org.example.backend.department.domain.entity.Department;

import java.util.List;

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
    private Long id;

    @Column(name = "login_id", nullable = false)
    private String loginId;

    @Column(name = "password", nullable = false)
    private String password;

    private String username;

    private String email;

    @Column(name = "role", nullable = false)
    private String role;

    @OneToMany()
    @JoinColumn(name = "admin_id")
    private List<Department> departments;
}