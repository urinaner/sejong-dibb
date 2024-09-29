package org.example.backend.admin.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.backend.admin.domain.dto.*;
import org.example.backend.admin.domain.entity.Admin;
import org.example.backend.admin.domain.mapper.SignInMapper;
import org.example.backend.admin.service.AdminService;
import org.example.backend.admin.service.CustomUserDetailsService;
import org.example.backend.global.config.JWTUtil;
import org.example.backend.global.config.LoginFilter;
import org.example.backend.professor.domain.dto.ResponseDto;
import org.mapstruct.factory.Mappers;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin")
public class AdminController {
    private final AdminService userService;
    private final AuthenticationManager authenticationManager;
    private final JWTUtil jwtUtil;

    @PostMapping("/join")
    public String joinProcess(@RequestBody SignInReqDto joinDTO) {
        userService.joinProcess(joinDTO);

        return "ok";
    }

//    @PostMapping
//    public ResponseEntity<?> signIn(@RequestBody SignInReqDto signInReqDto) {
//        log.info("signIn");
//        // 사용자 인증
//        LoginFilter loginFilter = new LoginFilter(authenticationManager, jwtUtil);
//
//    }

    @PostMapping("/signOut")
    public ResponseEntity<Void> signOut(@RequestHeader(value = AUTHORIZATION) String accessToken) {
        AccessTokenReq accessTokenReq = new AccessTokenReq();
        accessTokenReq.setAccessToken(accessToken);
        userService.signOut(accessTokenReq);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
