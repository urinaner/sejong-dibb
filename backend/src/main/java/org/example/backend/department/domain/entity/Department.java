package org.example.backend.department.domain.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.example.backend.admin.domain.entity.Admin;
import org.example.backend.professor.domain.entity.Professor;

import java.util.List;

@Entity
@Getter
@Setter
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "department_id", nullable = false)
    private Long departmentId;

    @Column(name = "koreanName", unique = true)
    private String koreanName;

    @Column(name = "englishName", unique = true)
    private String englishName;

    @Column(name = "intro")
    private String intro;

    @Column(name = "phone", unique = true)
    private String phoneN;

    @Column(name = "location")
    private String location;

    @Column(name = "educationalObjective")
    private String educationalObjective;

    @Column(name = "workHour")
    private String workHour;

    @Column(name = "map")
    private String map;

    @OneToMany(mappedBy = "department", cascade = CascadeType.REMOVE)
    private List<Professor> professors;

    @ManyToOne
    @JoinColumn(name = "admin_id")
    private Admin admin;
}
