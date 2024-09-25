package org.example.backend.admin.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.admin.domain.dto.AccessTokenReq;
import org.example.backend.admin.domain.dto.SignInReqDto;
import org.example.backend.admin.domain.dto.TokenDto;
import org.example.backend.admin.domain.entity.Admin;
import org.example.backend.admin.repository.AdminRepository;
import org.example.backend.config.JwtTokenProvider;
import org.hibernate.service.spi.ServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
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

        UsernamePasswordAuthenticationToken authenticationToken = loginRequestDto.toAuthentication();
        Authentication authentication = managerBuilder.getObject().authenticate(authenticationToken);

        return jwtTokenProvider.generateTokenDto(authentication);
    }

    public Admin findByLoginID(String loginId) {
        return userRepository.findByLoginId(loginId)
                .orElseThrow(() -> new ServiceException("StatusCode.USER_NOT_FOUND")); // TODO
    }

    public void signOut(AccessTokenReq accessTokenReq) {
        String accessToken = accessTokenReq.getAccessToken();
        if (accessToken == null || !accessToken.startsWith(BEARER_TYPE)) {
            throw new ServiceException("StatusCode.INVALID_ACCESS_TOKEN"); // 유효하지 않은 토큰
        }
        accessToken = accessToken.replace(BEARER_TYPE, "").trim();

        if (!jwtTokenProvider.validateToken(accessToken)) {
            throw new ServiceException("StatusCode.INVALID_ACCESS_TOKEN"); // 토큰 검증 실패
        }

        Authentication authentication = jwtTokenProvider.getAuthentication(accessToken);
        Admin user = (Admin) authentication.getPrincipal();
        user.logOut();
        userRepository.save(user);
    }
}
