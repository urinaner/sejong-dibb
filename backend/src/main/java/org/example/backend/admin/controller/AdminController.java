package org.example.backend.admin.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.backend.admin.domain.dto.AccessTokenReq;
import org.example.backend.admin.domain.dto.AdminReqDto;
import org.example.backend.admin.domain.dto.AdminResDto;
import org.example.backend.admin.domain.dto.SignInReqDto;
import org.example.backend.admin.domain.dto.mail.MailReqDto;
import org.example.backend.admin.domain.dto.mail.MailResDto;
import org.example.backend.admin.service.AdminService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

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

    @PostMapping("/{adminId}")
    public ResponseEntity<AdminResDto> updateAdmin(@PathVariable(name = "adminId") Long adminId,
                                   @RequestBody AdminReqDto adminReqDto) {
        AdminResDto adminResDto = userService.updateAdmin(adminId, adminReqDto);
        return new ResponseEntity<>(adminResDto, HttpStatus.OK);
    }

    @PostMapping("/signOut")
    public ResponseEntity<Void> signOut(@RequestHeader(value = AUTHORIZATION) String accessToken) {
        AccessTokenReq accessTokenReq = new AccessTokenReq();
        accessTokenReq.setAccessToken(accessToken);
        userService.signOut(accessTokenReq);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @Transactional
    @PostMapping("/sendEmail")
    public ResponseEntity<Void> sendEmail(@RequestBody MailReqDto mailReqDto) {
        MailResDto dto = userService.createTmpPasswordMail(mailReqDto);
        userService.mailSend(dto);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
