package org.example.backend.user.controller;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.example.backend.admin.domain.dto.SignInReqDto;
import org.example.backend.common.exception.dto.ResponseDto;
import org.example.backend.user.domain.dto.UserReqDto;
import org.example.backend.user.domain.dto.UserResDto;
import org.example.backend.user.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
        String token = userService.loginProcess(joinDTO);

        return ResponseEntity.ok()
                .header("Authorization", "Bearer " + token)
                .body("ok");
    }

    @PostMapping
    public ResponseEntity<Long> createUser(@RequestBody UserReqDto userReqDto) {
        Long userId = userService.saveUser(userReqDto);
        return new ResponseEntity<>(userId, HttpStatus.OK);
    }

    @GetMapping
    public ResponseDto<List<UserResDto>> getAllUsers(Pageable pageable) {
        Page<UserResDto> userList = userService.getAllUsers(pageable);
        return ResponseDto.ok(userList.getNumber(), userList.getTotalPages(), userList.getContent());
    }

    @PostMapping("/{userId}")
    public ResponseEntity<UserResDto> updateUser(@PathVariable(name = "userId") Long userId,
                                                 @RequestBody UserReqDto userReqDto) {
        UserResDto userResDto = userService.updateUser(userId, userReqDto);
        return new ResponseEntity<>(userResDto, HttpStatus.OK);
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable(name = "userId") Long userId) {
        userService.deleteUser(userId);
        return ResponseEntity.noContent().build();
    }
}
