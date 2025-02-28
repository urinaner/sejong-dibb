package org.example.backend.professor.domain.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
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
public class ProfessorTypes {

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

    @Column(name = "academicBackground")
    private AcademicBackground academicBackground;

    @Column(name = "homepage")
    private String homepage;

    @Column(name = "lab")
    private String lab;


    @Column(name = "profileImage", length = 1000)
    private String profileImage;

    @OneToMany(mappedBy = "professor", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Thesis> theses = new ArrayList<>();

    @Builder
    private ProfessorTypes(String name, String major, String phoneN, String email,
                      String position, AcademicBackground academicBackground, String homepage, String lab, String profileImage) {
        this.name = name;
        this.major = major;
        this.phoneN = phoneN;
        this.email = email;
        this.position = position;
        this.academicBackground = academicBackground;
        this.homepage = homepage;
        this.lab = lab;
        this.profileImage = profileImage;
    }

    public static ProfessorTypes of(ProfessorReqDto dto) {
        return ProfessorTypes.builder()
                .name(dto.getName())
                .major(dto.getMajor())
                .phoneN(dto.getPhoneN())
                .email(dto.getEmail())
                .position(dto.getPosition())
                .academicBackground(dto.getAcademicBackground())
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
        this.academicBackground = dto.getAcademicBackground();
        this.homepage = dto.getHomepage();
        this.lab = dto.getLab();
        this.profileImage = dto.getProfileImage();
    }
}
