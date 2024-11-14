package org.example.backend.user.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.admin.domain.dto.SignInReqDto;
import org.example.backend.user.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {
    private final UserService userService;
    @PostMapping("/join")
    public ResponseEntity<String> joinProcess(@RequestBody SignInReqDto joinDTO) {
        String token = userService.joinProcess(joinDTO);

        return ResponseEntity.ok()
                .header("Authorization", "Bearer " + token)
                .body("ok");
    }

}
