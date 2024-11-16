package org.example.backend.admin.service;

import static org.example.backend.admin.exception.AdminExceptionType.ALREADY_EXIST_LOGIN_ID;
import static org.example.backend.admin.exception.AdminExceptionType.INVALID_ACCESS_TOKEN;
import static org.example.backend.admin.exception.AdminExceptionType.NOT_FOUND_ADMIN;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.backend.admin.domain.dto.AccessTokenReq;
import org.example.backend.admin.domain.dto.AdminReqDto;
import org.example.backend.admin.domain.dto.AdminResDto;
import org.example.backend.admin.domain.dto.SignInReqDto;
import org.example.backend.admin.domain.entity.Admin;
import org.example.backend.admin.domain.mapper.AdminMapper;
import org.example.backend.admin.exception.AdminException;
import org.example.backend.admin.repository.AdminRepository;
import org.mapstruct.factory.Mappers;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AdminService {

    private final AdminMapper adminMapper = Mappers.getMapper(AdminMapper.class);
    private final AdminRepository userRepository;
    private final PasswordEncoder bCryptPasswordEncoder;
    private static final String BEARER_TYPE = "Bearer";

    @Transactional(readOnly = false)
    public void joinProcess(SignInReqDto joinDTO) {
        String loginId = joinDTO.getLoginId();
        String password = joinDTO.getPassword();

        log.info("loginId: " + loginId);
        log.info("password: " + password);

        if (validateExistLoginId(loginId)) {
            throw new AdminException(ALREADY_EXIST_LOGIN_ID);
        }

        Admin admin = Admin.builder()
                .loginId(loginId)
                .password(bCryptPasswordEncoder.encode(password))
                .role("ROLE_ADMIN")
                .build();

        userRepository.save(admin);
    }

    private boolean validateExistLoginId(String loginId) {
        Boolean isExist = userRepository.existsByLoginId(loginId);

        if (isExist) {
            return true;
        }
        return false;
    }

    public void signOut(AccessTokenReq accessTokenReq) {
        String accessToken = accessTokenReq.getAccessToken();

        // 토큰이 없거나 잘못된 형식이면 예외 발생
        if (accessToken == null || !accessToken.startsWith(BEARER_TYPE)) {
            throw new AdminException(INVALID_ACCESS_TOKEN);
        }
    }

    @Transactional
    public AdminResDto updateAdmin(Long adminId, AdminReqDto adminReqDto) {
        Admin admin = findAdminById(adminId);

        adminMapper.updateAdminFromDto(adminReqDto, admin);

        userRepository.save(admin);
        return adminMapper.toAdminDto(admin);
    }

    private Admin findAdminById(Long adminId) {
        return userRepository.findById(adminId)
                .orElseThrow(() -> new AdminException(NOT_FOUND_ADMIN));
    }
}
