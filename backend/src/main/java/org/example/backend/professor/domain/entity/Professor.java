package org.example.backend.professor.domain.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.backend.department.domain.entity.Department;

@Entity
@Data
@NoArgsConstructor
@Table(name = "professor")
public class Professor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "professor_id")
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "major")
    private String major;

    @Column(name = "phone", unique = true)
    private String phoneN;

    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "position")
    private String position;

    @Column(name = "homepage")
    private String homepage;

    @Column(name = "lab")
    private String lab;

    @Column(name = "profileImage")
    private String profileImage;

    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;
}
