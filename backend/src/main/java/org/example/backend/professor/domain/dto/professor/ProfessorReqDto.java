package org.example.backend.professor.domain.dto.professor;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProfessorReqDto {
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

    @Schema(description = "교수 홈페이지", example = "https://www.sju.ac.kr/professor/example")
    private String homepage;

    @Schema(description = "교수 연구실 위치", example = "충무관 1128호")
    private String lab;

    @Schema(description = "교수 프로필 이미지", example = "https://www.sju.ac.kr/professor/example/profile.jpg")
    private String profileImage;

    @Builder
    private ProfessorReqDto(String name, String major, String phoneN, String email,
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

    public static ProfessorReqDto of(String name, String major, String phoneN, String email,
                                     String position, String homepage, String lab, String profileImage) {
        return ProfessorReqDto.builder()
                .name(name)
                .major(major)
                .phoneN(phoneN)
                .email(email)
                .position(position)
                .homepage(homepage)
                .lab(lab)
                .profileImage(profileImage)
                .build();
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }
}