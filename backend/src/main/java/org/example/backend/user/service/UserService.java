package org.example.backend.user.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.admin.domain.dto.SignInReqDto;
import org.example.backend.admin.exception.AdminException;
import org.example.backend.admin.exception.AdminExceptionType;
import org.example.backend.jwt.JWTUtil;
import org.springframework.stereotype.Service;
import org.yj.sejongauth.controller.Sj;
import org.yj.sejongauth.domain.SjProfile;

@RequiredArgsConstructor
@Service
public class UserService {
    private final Sj sj;
    private final JWTUtil jwtUtil;
    public String joinProcess(SignInReqDto joinDTO) {
        try {
            SjProfile sjProfile = sj.login(joinDTO.getLoginId(), joinDTO.getPassword());
            String token = jwtUtil.createJwt(sjProfile.getName(), "USER", 60 * 60 * 10L);
            return token;
        } catch (RuntimeException e) {
            throw new AdminException(AdminExceptionType.NOT_FOUND_ADMIN);
        }
    }
}
