package org.example.backend.users.controller.member;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.backend.users.domain.dto.LogoutReqDto;
import org.example.backend.users.domain.dto.member.SjLoginReq;
import org.example.backend.users.service.MemberService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/member")
public class MemberController {
    private final MemberService memberService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody SjLoginReq loginRequest) {
        return memberService.authenticateAndGenerateToken(loginRequest);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestBody LogoutReqDto logoutDto) {
        memberService.logout(logoutDto);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build(); // 성공 시 204 반환
    }
}


