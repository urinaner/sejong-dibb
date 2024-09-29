package org.example.backend.admin.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.backend.admin.domain.dto.AccessTokenReq;
import org.example.backend.admin.domain.dto.SignInReqDto;
import org.example.backend.admin.domain.entity.Admin;
import org.example.backend.admin.repository.AdminRepository;
import org.example.backend.global.config.JWTUtil;
import org.example.backend.global.config.LoginFilter;
import org.hibernate.service.spi.ServiceException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AdminService {

    private final AdminRepository userRepository;
    private final PasswordEncoder bCryptPasswordEncoder;
    private static final String BEARER_TYPE = "Bearer";
    private final AuthenticationManager authenticationManager;
    private final JWTUtil jwtUtil;

    @Transactional(readOnly = false)
    public void joinProcess(SignInReqDto joinDTO) {
        String username = joinDTO.getUsername();
        String password = joinDTO.getPassword();

        log.info("username: " + username);
        log.info("password: " + password);

        Boolean isExist = userRepository.existsByUsername(username);

        if (isExist) {
            return;
        }

        Admin admin = Admin.builder()
                .username(username)
                .password(bCryptPasswordEncoder.encode(password))
                .role("ROLE_ADMIN")
                .build();

        userRepository.save(admin);
    }


//    @Transactional
//    public void signIn(SignInReqDto loginRequestDto) {
//        LoginFilter loginFilter = new LoginFilter(authenticationManager, jwtUtil);
//        loginFilter.attemptAuthentication(loginRequestDto);
//    }

    public Admin findByLoginID(String loginId) {
        return userRepository.findByLoginId(loginId)
                .orElseThrow(() -> new ServiceException("StatusCode.USER_NOT_FOUND222")); // TODO
    }

    public void signOut(AccessTokenReq accessTokenReq) {
        String accessToken = accessTokenReq.getAccessToken();

        // 토큰이 없거나 잘못된 형식이면 예외 발생
        if (accessToken == null || !accessToken.startsWith(BEARER_TYPE)) {
            throw new ServiceException("StatusCode.INVALID_ACCESS_TOKEN"); // 유효하지 않은 토큰
        }
    }

//    public Admin findByUserName(String username) {
//        return userRepository.findByUsername(username)
//                .orElseThrow(() -> new ServiceException("StatusCode.USER_NOT_FOUND11")); // TODO
//    }
}
