package org.example.backend.config;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.backend.admin.domain.dto.TokenDto;
import org.example.backend.admin.domain.entity.Admin;
import org.example.backend.admin.repository.AdminRepository;
import org.example.backend.admin.service.TokenBlackListService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import jakarta.servlet.http.HttpServletRequest;
import java.security.Key;
import java.util.Date;

// 토큰을 생성하고 검증하는 클래스입니다.
// 해당 컴포넌트는 필터클래스에서 사전 검증을 거칩니다.
@RequiredArgsConstructor
@Component
@Slf4j
public class JwtTokenProvider {

    private static final String BEARER_TYPE = "Bearer";
    private static final String ROLE_KEY = "role";
    private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS512);
    private final TokenBlackListService tokenBlackListService;

    @Value("${jwt.access-token.expire-length}")
    private long accessTokenValidityInMilliseconds;

    @Value("${jwt.refresh-token.expire-length}")
    private long refreshTokenValidityInMilliseconds;

    private final UserDetailsService userDetailsService;
    private final AdminRepository userRepository; // TODO

    public String getPayload(String token) {
        log.info("JwtTokenProvider getPayload");

        try {
            return Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody()
                    .getSubject();
        } catch (ExpiredJwtException e) {
            return e.getClaims().getSubject();
        } catch (JwtException e) {
            throw new RuntimeException("유효하지 않은 토큰 입니다");
        }
    }

    public boolean validateToken(String token) {
        log.info("JwtTokenProvider validateToken");

        if (tokenBlackListService.isTokenBlacklisted(token)) {
            return false;
        }

        try {
            Jws<Claims> claimsJws = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);
            return !claimsJws.getBody().getExpiration().before(new Date());
        } catch (JwtException | IllegalArgumentException exception) {
            return false;
        }
    }


    // JWT 토큰에서 인증 정보 조회
    public Authentication getAuthentication(String token) {
        log.info("JwtTokenProvider getAuthentication");
        UserDetails userDetails = userDetailsService.loadUserByUsername(this.getUserLoginId(token));
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    // 토큰에서 회원 정보 추출
    public String getUserLoginId(String token) {
        log.info("JwtTokenProvider getUserLoginId");
        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody().getSubject();
    }

    // Request의 Header에서 token 값을 가져옵니다. "Authorization" : "TOKEN값'
    public String resolveToken(HttpServletRequest request) {
        log.info("JwtTokenProvider resolveToken");
        return request.getHeader("Authorization");
    }

    public TokenDto generateTokenDto(Authentication authentication) {
        log.info("JwtTokenProvider generateTokenDto");

        Admin user = findUserByLoginId(authentication.getName());

        long now = (new Date()).getTime();

        Date accessTokenExpiresIn = new Date(now + accessTokenValidityInMilliseconds);

        String accessToken = Jwts.builder()
                .setSubject(authentication.getName())
                .setExpiration(accessTokenExpiresIn)
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();


        Date refreshTokenExpiresIn = new Date(now + refreshTokenValidityInMilliseconds);

        String refreshToken = Jwts.builder()
                .setSubject(authentication.getName())
                .setExpiration(refreshTokenExpiresIn)
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();

        return TokenDto.builder()
                .grantType(BEARER_TYPE)
                .accessToken(accessToken)
                .accessTokenExpiresTime(accessTokenExpiresIn.getTime())
                .refreshToken(refreshToken)
                .refreshTokenExpiresTime(refreshTokenExpiresIn.getTime())
                .build();
    }

    private Admin findUserByLoginId(String loginId) {
        return userRepository.findByLoginId(loginId)
                .orElseThrow(() -> new UsernameNotFoundException("Member id: " + loginId + " can't found."));
    }

    public Long getExpiration(String accessToken) {
        log.info("JwtTokenProvider getExpiration");

        Jws<Claims> claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(accessToken);
        Date expiration = claims.getBody().getExpiration();
        return expiration.getTime();
    }
}