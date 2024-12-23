package org.example.backend.professor.domain.dto.professor;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProfessorReqDto {
    @Schema(description = "교수 이름", example = "김세종")
    @NotBlank(message = "이름은 필수 입력값입니다.")
    @Size(max = 50, message = "이름은 최대 50자까지 입력 가능합니다.")
    private String name;

    @Schema(description = "교수 전공", example = "신경생물학")
    @NotBlank(message = "전공은 필수 입력값입니다.")
    @Size(max = 100, message = "전공은 최대 100자까지 입력 가능합니다.")
    private String major;

    @Schema(description = "교수 전화번호", example = "010-1234-5678")
    @NotBlank(message = "전화번호는 필수 입력값입니다.")
    @Pattern(regexp = "010-\\d{4}-\\d{4}", message = "전화번호는 '010-1234-5678' 형식이어야 합니다.")
    private String phoneN;

    @Schema(description = "교수 이메일", example = "example@sju.ac.kr")
    @NotBlank(message = "이메일은 필수 입력값입니다.")
    @Email(message = "올바른 이메일 형식이어야 합니다.")
    private String email;

    @Schema(description = "교수 직위", example = "정교수")
    @NotBlank(message = "직위는 필수 입력값입니다.")
    @Size(max = 30, message = "직위는 최대 30자까지 입력 가능합니다.")
    private String position;

    @Schema(description = "교수 홈페이지", example = "https://www.sju.ac.kr/professor/example")
    @Size(max = 200, message = "홈페이지 URL은 최대 200자까지 입력 가능합니다.")
    private String homepage;

    @Schema(description = "교수 연구실 위치", example = "충무관 1128호")
    @Size(max = 100, message = "연구실 위치는 최대 100자까지 입력 가능합니다.")
    private String lab;

    @Schema(hidden = true)
    private String profileImage;

    @Builder
    private ProfessorReqDto(String name, String major, String phoneN, String email,
                            String position, String homepage, String lab) {
        this.name = name;
        this.major = major;
        this.phoneN = phoneN;
        this.email = email;
        this.position = position;
        this.homepage = homepage;
        this.lab = lab;
    }

    public static ProfessorReqDto of(String name, String major, String phoneN, String email,
                                     String position, String homepage, String lab) {
        return ProfessorReqDto.builder()
                .name(name)
                .major(major)
                .phoneN(phoneN)
                .email(email)
                .position(position)
                .homepage(homepage)
                .lab(lab)
                .build();
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }
}
