package org.example.backend.users.controller.member;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.backend.users.domain.dto.admin.AccessTokenReq;
import org.example.backend.users.domain.dto.admin.SignInReqDto;
import org.example.backend.users.service.MemberService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/member")
public class MemberController {
    private final  MemberService memberService;

//    @PostMapping("/join")
//    public String joinProcess(@RequestBody SignInReqDto joinDTO) {
//        memberService.joinProcess(joinDTO);
//
//        return "ok";
//    }
//
//    @PostMapping("/signOut")
//    public ResponseEntity<Void> signOut(@RequestHeader(value = AUTHORIZATION) String accessToken) {
//        AccessTokenReq accessTokenReq = new AccessTokenReq();
//        accessTokenReq.setAccessToken(accessToken);
//        memberService.signOut(accessTokenReq);
//        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
//    }
}


