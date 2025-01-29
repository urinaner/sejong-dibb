package org.example.backend.users.controller;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.backend.users.domain.dto.AccessTokenReq;
import org.example.backend.users.domain.dto.SignInReqDto;
import org.example.backend.users.service.AdminService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin")
public class AdminController {
    private final AdminService userService;

    @PostMapping("/join")
    public String joinProcess(@RequestBody SignInReqDto joinDTO) {
        userService.joinProcess(joinDTO);

        return "ok";
    }

    @PostMapping("/signOut")
    public ResponseEntity<Void> signOut(@RequestHeader(value = AUTHORIZATION) String accessToken) {
        AccessTokenReq accessTokenReq = new AccessTokenReq();
        accessTokenReq.setAccessToken(accessToken);
        userService.signOut(accessTokenReq);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PostMapping("/test")
    public String test() {
        return "test";
    }
}
