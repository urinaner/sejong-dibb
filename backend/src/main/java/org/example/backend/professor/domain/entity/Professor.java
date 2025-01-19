package org.example.backend.professor.domain.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.backend.professor.domain.dto.ProfessorReqDto;
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

    @Column(name = "profileImage", length = 1000)
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
        this.name = dto.getName();
        this.major = dto.getMajor();
        this.phoneN = dto.getPhoneN();
        this.email = dto.getEmail();
        this.position = dto.getPosition();
        this.homepage = dto.getHomepage();
        this.lab = dto.getLab();
        this.profileImage = dto.getProfileImage();
    }
}