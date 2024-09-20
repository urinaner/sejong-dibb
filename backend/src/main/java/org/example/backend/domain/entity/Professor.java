package org.example.backend.domain.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "professor")
public class Professor {

    @Id @GeneratedValue(strategy = GenerationType.AUTO)
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
}
