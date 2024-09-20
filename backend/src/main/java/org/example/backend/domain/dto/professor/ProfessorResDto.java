package org.example.backend.domain.dto.professor;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class ProfessorDto {
    @ApiModelProperty(value = "교수 고유 아이디", example = "54321")
    private Long id;

    @ApiModelProperty(value = "교수 이름", example = "김세종")
    private String name;

    @ApiModelProperty(value = "교수 전공", example = "신경생물학")
    private String major;

    @ApiModelProperty(value = "교수 전화번호", example = "010-1234-5678")
    private String phoneN;

    @ApiModelProperty(value = "교수 이메일", example = "example@sju.ac.kr")
    private String email;

    @ApiModelProperty(value = "교수 직위", example = "정교수")
    private String position;

    @ApiModelProperty(value = "교수 홈페이지", example = "https://www.sju.ac.kr/professor/example")
    private String homepage;

    @ApiModelProperty(value = "교수 연구실 위치", example = "충무관 1128호")
    private String lab;

    @ApiModelProperty(value = "교수 프로필 이미지", example = "https://www.sju.ac.kr/professor/example/profile.jpg")
    private String profileImage;
}
