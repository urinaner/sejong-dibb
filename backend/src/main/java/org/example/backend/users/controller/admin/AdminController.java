package org.example.backend.users.controller.admin;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.backend.users.domain.dto.LoginReqDto;
import org.example.backend.users.domain.dto.admin.AdminResDto;
import org.example.backend.users.domain.entity.CustomUserDetails;
import org.example.backend.users.domain.entity.Users;
import org.example.backend.users.service.AdminService;
import org.example.backend.users.service.MemberService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
    public String joinProcess(@RequestBody LoginReqDto joinDTO) {
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

    @PostMapping("/{adminId}")
    public ResponseEntity<?> validatePassword(@PathVariable(name = "adminId") Long adminId,
                                                   @RequestBody Map<String, String> request) {
        String password = request.get("password");
        adminService.validatePassword(adminId, password);
        return new ResponseEntity<>("ok", HttpStatus.OK);
    }

    @PostMapping("/{adminId}")
    public ResponseEntity<AdminResDto> updateAdminPassword(@PathVariable(name = "adminId") Long adminId,
                                                           @RequestBody Map<String, String> request) {
        String password = request.get("password");
        AdminResDto adminResDto = adminService.updateAdminPassword(adminId, password);
        return new ResponseEntity<>(adminResDto, HttpStatus.OK);
    }

    @PostMapping("/test")
    public String test() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        String username = userDetails.getUsername();
        log.info("username: {}", username);
        return "test";
    }
}
