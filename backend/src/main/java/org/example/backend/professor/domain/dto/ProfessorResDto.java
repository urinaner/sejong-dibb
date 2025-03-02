package org.example.backend.professor.domain.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.backend.professor.domain.entity.AcademicBackground;
import org.example.backend.professor.domain.entity.Professor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProfessorResDto {
    @Schema(description = "교수 고유 아이디", example = "54321")
    private Long id;

    @Schema(description = "교수 이름", example = "김세종")
    private String name;

    @Schema(description = "교수 전공", example = "신경생물학")
    private String major;

    @Schema(description = "교수 전화번호", example = "010-1234-5678")
    private String phoneN;

    @Schema(description = "교수 이메일", example = "example@sju.ac.kr")
    private String email;

    @Schema(description = "교수 직위", example = "정교수")
    private String position;

    private AcademicBackground academicBackground;

    @Schema(description = "교수 홈페이지", example = "https://www.sju.ac.kr/professor/example")
    private String homepage;

    @Schema(description = "교수 연구실 위치", example = "충무관 1128호")
    private String lab;

    @Schema(description = "교수 프로필 이미지", example = "https://www.sju.ac.kr/professor/example/profile.jpg")
    private String profileImage;

    @Builder
    private ProfessorResDto(Long id, String name, String major, String phoneN, String email,
                            String position,AcademicBackground academicBackground, String homepage, String lab, String profileImage) {
        this.id = id;
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

    public static ProfessorResDto of(Professor professor) {
        return ProfessorResDto.builder()
                .id(professor.getId())
                .name(professor.getName())
                .major(professor.getMajor())
                .phoneN(professor.getPhoneN())
                .email(professor.getEmail())
                .position(professor.getPosition())
                .academicBackground(professor.getAcademicBackground())
                .homepage(professor.getHomepage())
                .lab(professor.getLab())
                .profileImage(professor.getProfileImage())
                .build();
    }

}
