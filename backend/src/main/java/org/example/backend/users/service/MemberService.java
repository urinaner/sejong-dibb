package org.example.backend.users.service;

import static org.example.backend.users.exception.member.MemberExceptionType.DEPARTMENT_NOT_BIO;
import static org.example.backend.users.exception.member.MemberExceptionType.INVALID_ID_OR_PASSWORD;
import static org.example.backend.users.exception.member.MemberExceptionType.SERVER_ERROR;

import java.io.IOException;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.backend.blacklist.dto.BlackListTokenDto;
import org.example.backend.blacklist.service.BlacklistService;
import org.example.backend.blacklist.service.JwtBlacklistService;
import org.example.backend.jwt.JWTUtil;
import org.example.backend.users.domain.dto.LoginReqDto;
import org.example.backend.users.domain.dto.member.SjUserProfile;
import org.example.backend.users.domain.entity.Role;
import org.example.backend.users.exception.member.MemberException;
import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;


@Slf4j
@Service
@RequiredArgsConstructor
public class MemberService {
    private final String MOODLER_LOGIN_URL = "https://sjulms.moodler.kr/login/index.php";
    private final String AUTH_FAILED = "인증에 실패하였습니다.";
    private final String USER_INFO_MISSING = "사용자 정보를 찾을 수 없습니다.";

    private final JWTUtil jwtUtil;
    private final BlacklistService blacklistService;

    public ResponseEntity<?> authenticateAndGenerateToken(LoginReqDto dto) {
        try {
            authenticateAndValidateMajor(dto);

            String role = "ROLE_MEMBER";

            String accessToken = jwtUtil.createJwt(dto.getLoginId(), Role.valueOf(role), 1800 * 1000L);
            String refreshToken = jwtUtil.createJwt(dto.getLoginId(), Role.valueOf(role), 60 * 60 * 24 * 30 * 1000L);

            return ResponseEntity.ok().body(Map.of(
                    "accessToken", accessToken,
                    "refreshToken", refreshToken
            ));
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 실패: " + e.getMessage());
        }
    }

    public void authenticateAndValidateMajor(LoginReqDto dto) throws AuthenticationException {
        SjUserProfile profile = authenticate(dto);

        // 바이오융합공학과(, 컴퓨터공학과, 양자원자력공학과) 학생만 가입 가능
        if (!profile.getMajor().contains("바이오융합공학") && !profile.getMajor().equals("컴퓨터공학과")) {
            throw new MemberException(DEPARTMENT_NOT_BIO);
        }
    }

    public SjUserProfile authenticate(LoginReqDto dto) throws AuthenticationException {
        try {
            Connection.Response response = executeLoginRequest(dto);

            if (response.statusCode() != 200) {
                throw new MemberException(SERVER_ERROR);
            }

            return parseUserProfile(response.parse());
        } catch (IOException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }

    private Connection.Response executeLoginRequest(LoginReqDto dto) throws IOException {
        return Jsoup.connect(MOODLER_LOGIN_URL)
                .data("username", dto.getLoginId())
                .data("password", dto.getPassword())
                .method(Connection.Method.POST)
                .execute();
    }

    private SjUserProfile parseUserProfile(Document document) throws AuthenticationException {
        Element userInfo = document.selectFirst("div.user-info-picture");
        if (userInfo == null) {
            throw new MemberException(INVALID_ID_OR_PASSWORD);
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

    public void logout(String accessToken, String refreshToken) {
        setBlacklist(accessToken);
        setBlacklist(refreshToken);
    }

    private void setBlacklist(String token) {
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        if (jwtUtil.isExpired(token)) { // 이미 만료된 경우
            return;
        }

        blacklistService.addToBlacklist(new BlackListTokenDto(token, jwtUtil.getExpiredTime(token)));
    }
}

