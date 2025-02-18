package org.example.backend.global.config.auth;

import java.util.Arrays;
import java.util.Collections;
import lombok.extern.slf4j.Slf4j;
import org.example.backend.blacklist.service.JwtBlacklistService;
import org.example.backend.jwt.JWTFilter;
import org.example.backend.jwt.JWTUtil;
import org.example.backend.jwt.LoginFilter;
import org.example.backend.jwt.exception.JwtExceptionFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

@Slf4j
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final AuthenticationConfiguration authenticationConfiguration;
    private final JWTUtil jwtUtil;
    private final JwtBlacklistService jwtBlacklistService;

    public SecurityConfig(AuthenticationConfiguration authenticationConfiguration, JWTUtil jwtUtil,
                          JwtBlacklistService jwtBlacklistService) {

        this.authenticationConfiguration = authenticationConfiguration;
        this.jwtUtil = jwtUtil;
        this.jwtBlacklistService = jwtBlacklistService;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {

        return configuration.getAuthenticationManager();
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {

        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        log.info("SecurityConfig.filterChain");

        LoginFilter loginFilter = new LoginFilter(authenticationManager(authenticationConfiguration), jwtUtil);
        loginFilter.setFilterProcessesUrl("/api/admin/login");
        loginFilter.setAuthenticationFailureHandler(new CustomAuthenticationFailureHandler());

        http
                .cors((corsCustomizer -> corsCustomizer.configurationSource(request -> {
                    CorsConfiguration configuration = new CorsConfiguration();
                    configuration.setAllowedOrigins(Arrays.asList(
                            "http://localhost:3000",
                            "https://ibb.sejong.ac.kr"
                    ));
                    configuration.setAllowedMethods(Collections.singletonList("*"));
                    configuration.setAllowCredentials(true);
                    configuration.setAllowedHeaders(Collections.singletonList("*"));
                    configuration.setMaxAge(3600L);
                    configuration.setExposedHeaders(Collections.singletonList("Authorization"));
                    return configuration;
                })))
                .csrf(csrf -> csrf.disable())
                .formLogin(formLogin -> formLogin.disable())
                .httpBasic(httpBasic -> httpBasic.disable())
                .authorizeHttpRequests(auth -> auth
                        // 관리자 전용: 뉴스 생성, 수정, 삭제 엔드포인트
                        .requestMatchers(HttpMethod.POST, "/api/news").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/news/*").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/news/*").hasRole("ADMIN")

                        // 조회 관련 엔드포인트는 모두에게 허용
                        .requestMatchers(HttpMethod.GET, "/api/news/**").permitAll()

                        // 관리자 전용: 공지사항 생성, 수정, 삭제 엔드포인트
                        .requestMatchers(HttpMethod.POST, "/api/board").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/board/*").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/board/*").hasRole("ADMIN")

                        // 조회 관련 엔드포인트는 모두에게 허용
                        .requestMatchers(HttpMethod.GET, "/api/board/**").permitAll()

                        // 관리자 전용: 세미나 생성, 수정, 삭제 엔드포인트
                        .requestMatchers(HttpMethod.POST, "/api/seminar").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/seminar/*").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/seminar/*").hasRole("ADMIN")

                        // 조회 관련 엔드포인트는 모두에게 허용
                        .requestMatchers(HttpMethod.GET, "/api/seminar/**").permitAll()

                        // 관리자 전용: 논문 생성, 수정, 삭제 엔드포인트
                        .requestMatchers(HttpMethod.POST, "/api/thesis").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/thesis/*").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/thesis/*").hasRole("ADMIN")

                        // 조회 관련 엔드포인트는 모두에게 허용
                        .requestMatchers(HttpMethod.GET, "/api/thesis/**").permitAll()

                        .requestMatchers("/api/admin/login", "/api/member/login",
                                "/", "/api/**", "/v3/api-docs/**", "/swagger-ui/**", // TODO: 배포 전에  "/api/**" 삭제 필요
                                "/swagger-resources/**", "/swagger*/**", "/uploads/**")
                        .permitAll()
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")
                        .requestMatchers("/api/member/**").hasRole("MEMBER")
                        .anyRequest().authenticated())
                .addFilterBefore(new JwtExceptionFilter(), UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(new JWTFilter(jwtUtil, jwtBlacklistService),
                        UsernamePasswordAuthenticationFilter.class)
                .addFilterAt(loginFilter, UsernamePasswordAuthenticationFilter.class)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        return http.build();
    }
}
