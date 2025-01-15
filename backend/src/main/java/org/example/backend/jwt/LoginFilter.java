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

        // 클라이언트가 보낸 username과 password를 추출
        String loginId = obtainUsername(request);
        String password = obtainPassword(request);
        log.info("loginId: " + loginId);

        // 요청 헤더에서 JWT가 존재하는지 확인
        String authorization = request.getHeader("Authorization");

        // JWT 토큰이 존재하면 (즉, 로그인을 이미 한 상태에서 다시 로그인 요청이 들어왔을 때)
        if (authorization != null && authorization.startsWith("Bearer ")) {
            // JWT가 존재하는 경우, JWT에서 username 추출
            String token = authorization.split(" ")[1];
            String tokenLoginId = jwtUtil.getLoginId(token);

            log.info("tokenLoginId: " + tokenLoginId);

            // 클라이언트가 보낸 username과 JWT의 username이 일치하는지 확인
            if (!loginId.equals(tokenLoginId)) {
                log.error("LoginId in the form does not match the loginId in the token");
                throw new AuthenticationException("loginId mismatch") {};
            }
        } else {
            log.info("No Authorization header found. Proceeding with standard login.");
        }

        // AuthenticationManager를 통해 loginId와 password로 인증 시도
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(loginId, password, null);
        return authenticationManager.authenticate(authToken);
    }


    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) {
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

        response.addHeader("Authorization", "Bearer " + accessToken);
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException, ServletException, IOException {
        log.info("LoginFilter.unsuccessfulAuthentication - failed: {}", failed.getMessage());

        // 실패 핸들러 호출
        getFailureHandler().onAuthenticationFailure(request, response, failed);
    }
}
