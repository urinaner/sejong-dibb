package org.example.backend.domain.entity;

import jakarta.persistence.*;

@Entity
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "department_id", nullable = false)
    private Long departmentId;

    @Column(name = "koreanName")
    private String koreanName;

    @Column(name = "englishName")
    private String englishName;

    @Column(name = "intro")
    private String intro;

    @Column(name = "phone")
    private String phoneN;

    @Column(name = "location")
    private String location;

    @Column(name = "educationalObjective")
    private String educationalObjective;

    @Column(name = "workHour")
    private String workHour;

    @Column(name = "map")
    private String map;

}
