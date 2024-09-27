package org.example.backend.admin.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.admin.domain.dto.AccessTokenReq;
import org.example.backend.admin.domain.dto.SignInReqDto;
import org.example.backend.admin.domain.dto.TokenDto;
import org.example.backend.admin.domain.entity.Admin;
import org.example.backend.admin.repository.AdminRepository;
import org.example.backend.global.config.JwtTokenProvider;
import org.hibernate.service.spi.ServiceException;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AdminService {

    private final AdminRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final TokenBlackListService tokenBlacklistService;
    private final AuthenticationManagerBuilder managerBuilder;
    private final PasswordEncoder passwordEncoder;
    private static final String BEARER_TYPE = "Bearer";


    @Transactional
    public TokenDto signIn(SignInReqDto loginRequestDto) {
        Admin user = userRepository.findByLoginId(loginRequestDto.getLoginId())
                .orElseThrow(() -> new ServiceException("StatusCode.USER_NOT_FOUND")); // TODO

        if (!passwordEncoder.matches(loginRequestDto.getPassword(), user.getPassword())) {
            throw new ServiceException("StatusCode.NOT_VALID_LOGIN_ID_OR_PASSWORD"); // TODO
        }

        // JWT 토큰 생성 전에 인증 정보를 가져옴
        Authentication authentication = jwtTokenProvider.getAuthentication(loginRequestDto.getLoginId());

        // 인증 정보를 바탕으로 JWT 토큰 생성
        return jwtTokenProvider.generateTokenDto(authentication);
    }

    public Admin findByLoginID(String loginId) {
        return userRepository.findByLoginId(loginId)
                .orElseThrow(() -> new ServiceException("StatusCode.USER_NOT_FOUND")); // TODO
    }

    public void signOut(AccessTokenReq accessTokenReq) {
        String accessToken = accessTokenReq.getAccessToken();

        // 토큰이 없거나 잘못된 형식이면 예외 발생
        if (accessToken == null || !accessToken.startsWith(BEARER_TYPE)) {
            throw new ServiceException("StatusCode.INVALID_ACCESS_TOKEN"); // 유효하지 않은 토큰
        }

        // "Bearer " 접두사를 제거하여 실제 토큰 값만 추출
        accessToken = accessToken.replace(BEARER_TYPE, "").trim();

        // 토큰 검증
        if (!jwtTokenProvider.validateToken(accessToken)) {
            throw new ServiceException("StatusCode.INVALID_ACCESS_TOKEN"); // 토큰 검증 실패
        }

        // JWT 토큰의 만료 시간 가져오기
        long expirationTimeInMillis = jwtTokenProvider.getExpiration(accessToken);

        // 현재 시간에서 만료 시간까지 남은 시간 계산
        long remainingExpirationTimeInMillis = expirationTimeInMillis - System.currentTimeMillis();


        // 블랙리스트에 토큰 추가
        tokenBlacklistService.addToBlacklist(accessToken, remainingExpirationTimeInMillis);
    }
}
