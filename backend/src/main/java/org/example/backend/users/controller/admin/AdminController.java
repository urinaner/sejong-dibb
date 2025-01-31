package org.example.backend.users.controller.admin;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.backend.users.domain.dto.admin.SignInReqDto;
import org.example.backend.users.service.AdminService;
import org.example.backend.users.service.MemberService;
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
    private final AdminService adminService;
    private final MemberService memberService;

    @PostMapping("/join")
    public String joinProcess(@RequestBody SignInReqDto joinDTO) {
        adminService.joinProcess(joinDTO);

        return "ok";
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader(value = AUTHORIZATION) String accessToken,
                                    @RequestBody Map<String, String> body) {
        log.info("entered logout api");
        memberService.logout(accessToken, body.get("refreshToken"));
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build(); // 성공 시 204 반환
    }

    @PostMapping("/test")
    public String test() {
        return "test";
    }
}
