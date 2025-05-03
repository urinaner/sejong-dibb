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
import org.example.backend.blacklist.service.BlacklistService;
import org.example.backend.users.domain.entity.CustomUserDetails;
import org.example.backend.users.domain.entity.Role;
import org.example.backend.users.domain.entity.Users;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

@Slf4j
public class JWTFilter extends OncePerRequestFilter {

    private final JWTUtil jwtUtil;
    private final BlacklistService blacklistService;

    private static final String REFRESH_TOKEN_PATH = "/api/refresh";

    public JWTFilter(JWTUtil jwtUtil, BlacklistService blacklistService) {
        this.jwtUtil = jwtUtil;
        this.blacklistService = blacklistService;
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getRequestURI();
        AntPathMatcher matcher = new AntPathMatcher();

        boolean isSwaggerPath = matcher.match("/v3/api-docs/**", path) ||
                matcher.match("/swagger-ui/**", path) ||
                matcher.match("/swagger-resources/**", path) ||
                matcher.match("/webjars/**", path);

        log.info("Path: {}, Is Swagger Path: {}", path, isSwaggerPath);
        return isSwaggerPath || path.equals("/api/admin/login") || path.equals("/api/member/login");
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String requestURI = request.getRequestURI();
        log.info("Request URI: {}", requestURI);

        String authorization = request.getHeader("Authorization");

        if (authorization != null && authorization.startsWith("Bearer ")) {
            handleAccessToken(authorization, request, response, filterChain);
        } else if (isRefreshTokenPath(requestURI)) {
            handleRefreshToken(request, response);
        } else {
            filterChain.doFilter(request, response); // 다음 필터로 전달
        }
    }

    private void handleAccessToken(String authorization, HttpServletRequest request,
                                   HttpServletResponse response, FilterChain filterChain)
            throws IOException, ServletException {
        String accessToken = authorization.split(" ")[1];
        if (!jwtUtil.isExpired(accessToken)) {

            if (blacklistService.isBlacklisted(accessToken)) {
                log.error("Access token is expired");
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("{\"error\": \"Access token in Jwt blacklist\"}");
                return;
            }

            log.info("Access token is valid");
            String loginId = jwtUtil.getLoginId(accessToken);
            Role role = jwtUtil.getRole(accessToken);

            log.info("Decoded loginId: {}", jwtUtil.getLoginId(accessToken));

            Users admin = Users.builder()
                    .loginId(loginId)
                    .password("hashedPassword")
                    .role(role)
                    .build();

            CustomUserDetails customUserDetails = new CustomUserDetails(admin);

            Authentication authToken = new UsernamePasswordAuthenticationToken(
                    customUserDetails, null, customUserDetails.getAuthorities()
            );
            SecurityContextHolder.getContext().setAuthentication(authToken);
            // 잘 SecurityContextHolder에 저장되었는지 확인
            log.info("SecurityContextHolder.getContext().getAuthentication(): {}",
                    SecurityContextHolder.getContext().getAuthentication());
            filterChain.doFilter(request, response); // 다음 필터로 전달
        } else {
            log.error("Access token is expired");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("{\"error\": \"Access token expired\"}");
        }
    }

    private void handleRefreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String refreshToken = extractRefreshTokenFromBody(request);
        if (refreshToken == null || refreshToken.isEmpty()) {
            log.error("Refresh token is missing");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("{\"error\": \"Refresh token missing\"}");
            return;
        }

        if (jwtUtil.isExpired(refreshToken)) {
            log.error("Refresh token has expired");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("{\"error\": \"Refresh token expired\"}");
            return;
        }

        if (blacklistService.isBlacklisted(refreshToken)) {
            log.error("Refresh token is expired");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("{\"error\": \"Refresh token in Jwt blacklist\"}");
            return;
        }

        log.info("Refresh token is valid");
        String newAccessToken = jwtUtil.createJwt(jwtUtil.getLoginId(refreshToken), jwtUtil.getRole(refreshToken),
                1800 * 1000L);
        String newRefreshToken = jwtUtil.createJwt(jwtUtil.getLoginId(refreshToken), jwtUtil.getRole(refreshToken),
                60 * 60 * 24 * 30 * 1000L);

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(String.format(
                "{\"accessToken\": \"%s\", \"refreshToken\": \"%s\"}",
                newAccessToken, newRefreshToken
        ));
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

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(body.toString());
            return jsonNode.has("refreshToken") ? jsonNode.get("refreshToken").asText() : null;
        } catch (JsonProcessingException e) {
            log.error("Failed to parse request body as JSON", e);
        }
        return null;
    }

    private boolean isRefreshTokenPath(String requestURI) {
        return new AntPathMatcher().match(REFRESH_TOKEN_PATH, requestURI);
    }
}