package org.example.backend.users.service;

import java.io.IOException;
import java.util.Collection;
import java.util.Iterator;
import java.util.Map;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.backend.blacklist.dto.BlackListTokenDto;
import org.example.backend.blacklist.service.JwtBlacklistService;
import org.example.backend.jwt.JWTUtil;
import org.example.backend.users.domain.dto.LogoutReqDto;
import org.example.backend.users.domain.dto.member.SjLoginReq;
import org.example.backend.users.domain.dto.member.SjUserProfile;
import org.example.backend.users.domain.entity.CustomUserDetails;
import org.example.backend.users.domain.entity.Role;
import org.example.backend.users.domain.entity.Users;
import org.example.backend.users.repository.AdminRepository;
import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Slf4j
@Service
@RequiredArgsConstructor
public class MemberService {
    private final String MOODLER_LOGIN_URL = "https://sjulms.moodler.kr/login/index.php";
    private final String AUTH_FAILED = "인증에 실패하였습니다.";
    private final String USER_INFO_MISSING = "사용자 정보를 찾을 수 없습니다.";

    private final AuthenticationManager authenticationManager;
    private final JWTUtil jwtUtil;
    private final AdminRepository usersRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtBlacklistService jwtBlacklistService;

    public ResponseEntity<?> authenticateAndGenerateToken(SjLoginReq loginRequest) {
        try {
            Users user = usersRepository.findByLoginId(loginRequest.getUserId())
                    .orElseGet(() -> authenticateAndSaveUser(loginRequest));

            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getLoginId(), loginRequest.getPassword())
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);

            CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
            String loginId = customUserDetails.getUsername();

            Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
            Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
            GrantedAuthority auth = iterator.next();
            String role = auth.getAuthority();

            String accessToken = jwtUtil.createJwt(loginId, Role.valueOf(role), 1800 * 1000L);
            String refreshToken = jwtUtil.createJwt(loginId, Role.valueOf(role), 60 * 60 * 24 * 30 * 1000L);

            return ResponseEntity.ok().body(Map.of(
                    "accessToken", accessToken,
                    "refreshToken", refreshToken
            ));
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 실패: " + e.getMessage());
        }
    }

    public Users authenticateAndSaveUser(SjLoginReq loginRequest) throws AuthenticationException {
        SjUserProfile profile = authenticate(loginRequest);

        Optional<Users> existingUser = usersRepository.findByLoginId(loginRequest.getUserId());

        if (existingUser.isPresent()) {
            return existingUser.get();
        }

        Users newUser = Users.builder()
                .loginId(loginRequest.getUserId())
                .password(passwordEncoder.encode(loginRequest.getPassword()))
                .username(profile.getName())
                .email(null)
                .phoneN(null)
                .role(Role.ROLE_MEMBER)
                .build();

        usersRepository.save(newUser);
        return newUser;

    }

    public SjUserProfile authenticate(SjLoginReq loginRequest) throws AuthenticationException {
        try {
            Connection.Response response = executeLoginRequest(loginRequest);

            if (response.statusCode() != 200) {
                throw new RuntimeException("서버 오류가 발생했습니다: HTTP " + response.statusCode());
            }

            return parseUserProfile(response.parse());
        } catch (IOException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }

    private Connection.Response executeLoginRequest(SjLoginReq loginRequest) throws IOException {
        return Jsoup.connect(MOODLER_LOGIN_URL)
                .data("username", loginRequest.getUserId())
                .data("password", loginRequest.getPassword())
                .method(Connection.Method.POST)
                .execute();
    }

    private SjUserProfile parseUserProfile(Document document) throws AuthenticationException {
        Element userInfo = document.selectFirst("div.user-info-picture");
        if (userInfo == null) {
            throw new RuntimeException(AUTH_FAILED);
        }

        Element nameElement = document.selectFirst("h4");
        Element majorElement = document.selectFirst("p.department");

        if (nameElement == null || majorElement == null) {
            throw new RuntimeException(USER_INFO_MISSING);
        }

        return new SjUserProfile(
                nameElement.text().trim(),
                majorElement.text().trim()
        );
    }

    public void logout(LogoutReqDto logoutDto) {
        setBlacklist(logoutDto.getAccessToken());
        setBlacklist(logoutDto.getRefreshToken());
    }

    private void setBlacklist(String token) {
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        if (jwtUtil.isExpired(token)) { // 이미 만료된 경우
            return;
        }

        jwtBlacklistService.addToBlacklist(new BlackListTokenDto(token, jwtUtil.getExpiredTime(token)));
    }

    // TODO: 로그인 요청 시 jwtblacklist에 등록되어있는지 확인
    public boolean isTokenBlacklisted(String token) {
        return jwtBlacklistService.isBlacklisted(token);
    }
}

