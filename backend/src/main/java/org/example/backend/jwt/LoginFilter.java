package org.example.backend.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.example.backend.admin.domain.entity.CustomUserDetails;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;
import java.util.Collection;
import java.util.Iterator;

@Slf4j
public class LoginFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final JWTUtil jwtUtil;

    public LoginFilter(AuthenticationManager authenticationManager, JWTUtil jwtUtil) {

        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected String obtainUsername(HttpServletRequest request) {
        // 기본적으로 'username'을 사용하던 것을 'loginId'로 변경
        return request.getParameter("loginId");
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        log.info("LoginFilter.attemptAuthentication");

        // 클라이언트가 보낸 loginId와 password를 추출
        String loginId = obtainUsername(request);
        String password = obtainPassword(request);

        log.info("loginId: " + loginId);

        // AuthenticationManager를 통해 loginId와 password로 인증 시도
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(loginId, password, null);
        return authenticationManager.authenticate(authToken);
    }


    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication)
            throws IOException {
        log.info("LoginFilter.successfulAuthentication");
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();

        String loginId = customUserDetails.getUsername();

        // ------------ 권한 찾기 ------------
        // authentication 인증된 사용자 객체
        // getAuthorities() : 해당 사용자에게 부여된 권한(들)을 반환 (<- 여러개 일 수 있음: Collection<? extends GrantedAuthority>)
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        // iterator() : Collection의 요소들을 하나씩 반환하는 반복자를 반환
        Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
        // iterator.next(): 첫 번째 권한 가져오기
        GrantedAuthority auth = iterator.next();

        String role = auth.getAuthority();

        String accessToken = jwtUtil.createJwt(loginId, role, 1800 * 1000L);
        String refreshToken = jwtUtil.createJwt(loginId, role, 60 * 60 * 24 * 30 * 1000L);

        // 응답 바디에 JSON 데이터 작성
        response.setContentType("application/json"); // JSON 형식으로 설정
        response.setCharacterEncoding("UTF-8");

        // JSON 데이터 생성
        String jsonResponse = String.format(
                "{\"accessToken\": \"%s\", \"refreshToken\": \"%s\"}",
                accessToken,
                refreshToken
        );

        // 응답에 JSON 데이터 작성
        response.getWriter().write(jsonResponse);
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException, ServletException, IOException {
        log.info("LoginFilter.unsuccessfulAuthentication - failed: {}", failed.getMessage());

        // 실패 핸들러 호출
        getFailureHandler().onAuthenticationFailure(request, response, failed);
    }
}
