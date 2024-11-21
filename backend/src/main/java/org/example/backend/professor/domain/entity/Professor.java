package org.example.backend.professor.domain.entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.backend.professor.domain.dto.professor.ProfessorReqDto;
import org.example.backend.thesis.domain.entity.Thesis;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
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

    @OneToMany(mappedBy = "professor", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Thesis> theses = new ArrayList<>();

    @Builder
    private Professor(String name, String major, String phoneN, String email,
                      String position, String homepage, String lab, String profileImage) {
        this.name = name;
        this.major = major;
        this.phoneN = phoneN;
        this.email = email;
        this.position = position;
        this.homepage = homepage;
        this.lab = lab;
        this.profileImage = profileImage;
    }

    public static Professor of(ProfessorReqDto dto) {
        return Professor.builder()
                .name(dto.getName())
                .major(dto.getMajor())
                .phoneN(dto.getPhoneN())
                .email(dto.getEmail())
                .position(dto.getPosition())
                .homepage(dto.getHomepage())
                .lab(dto.getLab())
                .profileImage(dto.getProfileImage())
                .build();
    }

    public void update(ProfessorReqDto dto) {
        this.name = dto.getName() == null ? this.name : dto.getName();
        this.major = dto.getMajor() == null ? this.major : dto.getMajor();
        this.phoneN = dto.getPhoneN() == null ? this.phoneN : dto.getPhoneN();
        this.email = dto.getEmail() == null ? this.email : dto.getEmail();
        this.position = dto.getPosition() == null ? this.position : dto.getPosition();
        this.homepage = dto.getHomepage() == null ? this.homepage : dto.getHomepage();
        this.lab = dto.getLab() == null ? this.lab : dto.getLab();
        this.profileImage = dto.getProfileImage() == null ? this.profileImage : dto.getProfileImage();
    }
}