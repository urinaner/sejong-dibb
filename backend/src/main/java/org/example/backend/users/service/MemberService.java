package org.example.backend.users.service;

import java.io.IOException;
import org.example.backend.users.domain.dto.member.SjLoginReq;
import org.example.backend.users.domain.dto.member.SjUserProfile;
import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

@Component
public class MemberService {
    private final String MOODLER_LOGIN_URL = "https://sjulms.moodler.kr/login/index.php";
    private final String AUTH_FAILED = "인증에 실패하였습니다.";
    private final String USER_INFO_MISSING = "사용자 정보를 찾을 수 없습니다.";

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
}

