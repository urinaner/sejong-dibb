package org.example.backend.users.service;

import static org.example.backend.users.exception.admin.AdminExceptionType.ALREADY_EXIST_LOGIN_ID;
import static org.example.backend.users.exception.admin.AdminExceptionType.INVALID_ACCESS_TOKEN;
import static org.example.backend.users.exception.admin.AdminExceptionType.INVALID_PASSWORD_PATTERN;
import static org.example.backend.users.exception.admin.AdminExceptionType.NOT_VALID_PASSWORD;

import java.util.regex.Pattern;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.backend.users.domain.dto.LoginReqDto;
import org.example.backend.users.domain.dto.admin.AccessTokenReq;
import org.example.backend.users.domain.dto.admin.AdminResDto;
import org.example.backend.users.domain.entity.Role;
import org.example.backend.users.domain.entity.Users;
import org.example.backend.users.exception.admin.AdminException;
import org.example.backend.users.repository.UsersRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AdminService {

    private final UsersRepository usersRepository;
    private final PasswordEncoder bCryptPasswordEncoder;
    private static final String BEARER_TYPE = "Bearer";

    @Transactional(readOnly = false)
    public void joinProcess(LoginReqDto joinDTO) {
        String loginId = joinDTO.getLoginId();
        String password = joinDTO.getPassword();

        log.info("loginId: " + loginId);
        log.info("password: " + password);

        if (validateExistLoginId(loginId)) {
            throw new AdminException(ALREADY_EXIST_LOGIN_ID);
        }

        Users admin = Users.builder()
                .loginId(loginId)
                .password(bCryptPasswordEncoder.encode(password))
                .role(Role.ROLE_ADMIN)
                .build();

        usersRepository.save(admin);
    }

    private boolean validateExistLoginId(String loginId) {
        Boolean isExist = usersRepository.existsByLoginId(loginId);

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
    public AdminResDto updateAdminPassword(Long adminId, String password) {
        checkPassword(password);
        Users admin = getAdminById(adminId);
        admin.updatePassword(bCryptPasswordEncoder.encode(password));
        return AdminResDto.of(admin);
    }


    public void validatePassword(Long adminId, String password) {
        Users admin = getAdminById(adminId);
        boolean matched = admin.matchPassword(password, bCryptPasswordEncoder);
        if (!matched) {
            throw new AdminException(NOT_VALID_PASSWORD);
        }
    }

    private void checkPassword(String password) {
        String passwordPattern = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$";

        if (!Pattern.matches(passwordPattern, password)) {
            throw new AdminException(INVALID_PASSWORD_PATTERN);
        }
    }
    public Users getAdminById(Long id) {
        return usersRepository.findById(id)
                .orElseThrow(() -> new AdminException(INVALID_ACCESS_TOKEN));
    }
}
