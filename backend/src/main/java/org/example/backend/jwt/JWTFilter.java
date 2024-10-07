package org.example.backend.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.example.backend.admin.domain.entity.Admin;
import org.example.backend.admin.domain.entity.CustomUserDetails;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
public class JWTFilter extends OncePerRequestFilter {

    private final JWTUtil jwtUtil;

    public JWTFilter(JWTUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        log.info("JWTFilter.doFilterInternal");
        //request에서 Authorization 헤더를 찾음
        String authorization = request.getHeader("Authorization");

        log.info("authorization: " + authorization);

        //Authorization 헤더 검증
        if (authorization == null || !authorization.startsWith("Bearer ")) {

            System.out.println("token null");
            filterChain.doFilter(request, response); // 다음 필터로 요청을 넘기는 역할

            //조건이 해당되면 메소드 종료 (필수)
            return;
        }

        String token = authorization.split(" ")[1];

        //토큰 소멸 시간 검증
        if (jwtUtil.isExpired(token)) {

            System.out.println("token expired");
            filterChain.doFilter(request, response); // 다음 필터로 요청을 넘기는 역할

            //조건이 해당되면 메소드 종료 (필수)
            return;
        }

        // ------------ jwt 인증 성공 ------------

        String username = jwtUtil.getUsername(token);
        String role = jwtUtil.getRole(token);

        Admin admin = new Admin();
        admin.setUsername(username);
        admin.setPassword("temppassword");
        admin.setRole(role);

        CustomUserDetails customUserDetails = new CustomUserDetails(admin);

        Authentication authToken = new UsernamePasswordAuthenticationToken(customUserDetails, null, customUserDetails.getAuthorities());

        // ------------ 사용자 정보(권한 등)를 담은 authToken을 저장 ------------
        SecurityContextHolder.getContext().setAuthentication(authToken);

        filterChain.doFilter(request, response);
    }
}
