package org.example.backend.jwt;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import lombok.extern.slf4j.Slf4j;
import org.example.backend.admin.domain.entity.Admin;
import org.example.backend.admin.domain.entity.CustomUserDetails;
import org.example.backend.jwt.exception.JwtException;
import org.example.backend.jwt.exception.JwtExceptionType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

@Slf4j
public class JWTFilter extends OncePerRequestFilter {

    private final JWTUtil jwtUtil;

    public JWTFilter(JWTUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        log.info("JWTFilter.doFilterInternal");

        String requestURI = request.getRequestURI();

        // 로그인 경로는 필터를 건너뜀
        if ("/api/admin/login".equals(requestURI)) {
            filterChain.doFilter(request, response);
            return;
        }

        // Access Token 검증 (Authorization 헤더)
        String authorization = request.getHeader("Authorization");
        String accessToken = null;

        if (authorization != null && authorization.startsWith("Bearer ")) {
            accessToken = authorization.split(" ")[1];
            if (!jwtUtil.isExpired(accessToken)) {
                log.info("Access token is valid");

                // JWT에서 사용자 정보 추출
                String loginId = jwtUtil.getLoginId(accessToken);
                String role = jwtUtil.getRole(accessToken);

                Admin admin = Admin.builder()
                        .username(loginId)
                        .password("hashedPassword")
                        .role(role)
                        .build();

                CustomUserDetails customUserDetails = new CustomUserDetails(admin);

                Authentication authToken = new UsernamePasswordAuthenticationToken(
                        customUserDetails,
                        null,
                        customUserDetails.getAuthorities()
                );

                SecurityContextHolder.getContext().setAuthentication(authToken);
                filterChain.doFilter(request, response); // 다음 필터로 요청 전달
                return;
            }
        }

        // Access Token이 만료된 경우 또는 없는 경우 Refresh Token 검증
        try {
            String refreshToken = extractRefreshTokenFromBody(request);
            if (refreshToken == null || refreshToken.isEmpty()) {
                log.error("Refresh token is missing in request body");
                throw new JwtException(JwtExceptionType.EMPTY_TOKEN);
            }

            if (jwtUtil.isExpired(refreshToken)) {
                log.error("Refresh token has expired");
                throw new JwtException(JwtExceptionType.TOKEN_EXPIRED);
            }

            log.info("Valid refresh token");

            // Refresh Token이 유효하면 새로운 Access Token 생성 및 반환
            String newAccessToken = jwtUtil.createJwt(jwtUtil.getLoginId(refreshToken), jwtUtil.getRole(refreshToken), 1800 * 1000L);
            String newRefreshToken = jwtUtil.createJwt(jwtUtil.getLoginId(refreshToken), jwtUtil.getRole(refreshToken), 60 * 60 * 24 * 30 * 1000L);

            // 응답 바디에 JSON 데이터 작성
            response.setContentType("application/json"); // JSON 형식으로 설정
            response.setCharacterEncoding("UTF-8");

            // JSON 데이터 생성
            String jsonResponse = String.format(
                    "{\"accessToken\": \"%s\", \"refreshToken\": \"%s\"}",
                    newAccessToken,
                    newRefreshToken
            );

            // 응답에 JSON 데이터 작성
            response.getWriter().write(jsonResponse);


            log.info("New access token generated: " + newAccessToken);
            return ;
        } catch (JwtException ex) {
            log.error("Token validation failed: " + ex.getMessage());
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            response.getWriter().write("{\"error\": \"" + ex.getMessage() + "\"}");
        }
        return ;
    }

    private String extractRefreshTokenFromBody(HttpServletRequest request) {
        StringBuilder body = new StringBuilder();
        try (BufferedReader reader = request.getReader()) {
            String line;
            while ((line = reader.readLine()) != null) {
                body.append(line);
            }
        } catch (IOException e) {
            log.error("Failed to read request body", e);
        }

        // JSON 형식의 본문을 파싱
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(body.toString());
            return jsonNode.has("refreshToken") ? jsonNode.get("refreshToken").asText() : null;
        } catch (JsonProcessingException e) {
            log.error("Failed to parse request body as JSON", e);
        }

        return null;
    }
}
