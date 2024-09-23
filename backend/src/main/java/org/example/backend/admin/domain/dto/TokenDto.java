package kr.leco.domain.user.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TokenDto {

    @ApiModelProperty(value = "권한 타입", example = "Bearer")
    private String grantType;

    @ApiModelProperty(value = "접근 토큰", example = "eyJhbGciOiJIUzI1NiIsInR...")
    private String accessToken;

    @ApiModelProperty(value = "접근 토큰 만료 시간(밀리초)", example = "1625123456789")
    private Long accessTokenExpiresTime;

    @ApiModelProperty(value = "리프레시 토큰", example = "eyJhbGciOiJIUzI1NiIsInR...")
    private String refreshToken;

    @ApiModelProperty(value = "리프레시 토큰 만료 시간(밀리초)", example = "1625123456789")
    private Long refreshTokenExpiresTime;
}