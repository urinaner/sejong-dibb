package org.example.backend.admin.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.admin.domain.dto.AccessTokenReq;
import org.example.backend.admin.domain.dto.SignInReqDto;
import org.example.backend.admin.domain.dto.SingInResDto;
import org.example.backend.admin.domain.dto.TokenDto;
import org.example.backend.admin.domain.entity.Admin;
import org.example.backend.admin.domain.mapper.SignInMapper;
import org.example.backend.admin.service.AdminService;
import org.example.backend.professor.domain.dto.ResponseDto;
import org.mapstruct.factory.Mappers;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService userService;
    private final SignInMapper signInMapper = Mappers.getMapper(SignInMapper.class);

    @PostMapping("/signIn")
    public ResponseEntity<SingInResDto> signIn(@RequestBody SignInReqDto signInReqDto) {
        ResponseDto responseDto = new ResponseDto();
        TokenDto tokenDto = userService.signIn(signInReqDto);
        responseDto.setResponse("success");
        responseDto.setMessage("로그인을 성공적으로 완료했습니다.");
        Admin user = userService.findByLoginID(signInReqDto.getLoginId());
        SingInResDto singInResDto = signInMapper.toSingInResDto(tokenDto, signInMapper.toAdminResDto(user));
        return ResponseEntity.ok(singInResDto);
    }

    @PostMapping("/signOut")
    public ResponseEntity<Void> signOut(@RequestHeader(value = AUTHORIZATION) String accessToken) {
        AccessTokenReq accessTokenReq = new AccessTokenReq();
        accessTokenReq.setAccessToken(accessToken);
        userService.signOut(accessTokenReq);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
