package org.example.backend.users.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TokenDto {

    private String grantType;

    private String accessToken;

    private Long accessTokenExpiresTime;

    private String refreshToken;

    private Long refreshTokenExpiresTime;
}