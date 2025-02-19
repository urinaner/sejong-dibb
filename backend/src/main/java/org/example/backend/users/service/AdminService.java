package org.example.backend.users.service;

import static org.example.backend.users.exception.admin.AdminExceptionType.ALREADY_EXIST_LOGIN_ID;
import static org.example.backend.users.exception.admin.AdminExceptionType.INVALID_ACCESS_TOKEN;
import static org.example.backend.users.exception.admin.AdminExceptionType.INVALID_PASSWORD_PATTERN;
import static org.example.backend.users.exception.admin.AdminExceptionType.NOT_VALID_PASSWORD;

import java.util.regex.Pattern;
import static org.example.backend.users.exception.admin.AdminExceptionType.NOT_FOUND_ADMIN;
import static org.example.backend.users.exception.admin.AdminExceptionType.NOT_FOUND_MAIL_RECEIVER;
import static org.example.backend.users.exception.admin.AdminExceptionType.NOT_MATCH_EMAIL;
import static org.example.backend.users.exception.admin.AdminExceptionType.NOT_VALID_PASSWORD;

import java.security.SecureRandom;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.backend.users.domain.dto.LoginReqDto;
import org.example.backend.users.domain.dto.admin.AccessTokenReq;
import org.example.backend.users.domain.dto.admin.AdminReqDto;
import org.example.backend.users.domain.dto.admin.AdminResDto;
import org.example.backend.users.domain.dto.admin.mail.MailReqDto;
import org.example.backend.users.domain.dto.admin.mail.MailResDto;
import org.example.backend.users.domain.entity.Role;
import org.example.backend.users.domain.entity.Users;
import org.example.backend.users.exception.admin.AdminException;
import org.example.backend.users.repository.UsersRepository;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
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
    private static final String DEFAULT_FROM_EMAIL = "zkffl0@naver.com";
    private final JavaMailSender mailSender;

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

    @Transactional
    public MailResDto createTmpPasswordMail(MailReqDto mailReqDto) {
        Users admin = findAdminByLoginId(mailReqDto.getLoginId());

        if (!admin.isEqualEmail(mailReqDto.getEmail())) {
            throw new AdminException(NOT_MATCH_EMAIL);
        }

        String tmpPassword = getTmpPassword();
        updatePassword(admin, tmpPassword);

        MailResDto dto = new MailResDto();
        dto.setAddress(mailReqDto.getEmail());
        dto.setTitle("임시 비밀번호 발송");
        dto.setMessage("임시 비밀번호는 " + tmpPassword + " 입니다.");

        return dto;
    }

    private Users findAdminByLoginId(String loginId) {
        return usersRepository.findByLoginId(loginId)
                .orElseThrow(() -> new AdminException(NOT_FOUND_ADMIN));
    }

    private String getTmpPassword() {
        char[] charSet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".toCharArray();
        SecureRandom random = new SecureRandom();
        StringBuilder str = new StringBuilder();

        for (int i = 0; i < 8; i++) {
            int idx = random.nextInt(charSet.length);
            str.append(charSet[idx]);
        }

        return str.toString();
    }

    private void updatePassword(Users admin, String tmpPassword) {
        admin.updatePassword(bCryptPasswordEncoder.encode(tmpPassword));
        usersRepository.save(admin);
    }

    public void mailSend(MailResDto dto) {
        if (dto.getAddress() == null || dto.getAddress().isBlank()) {
            log.error("메일 발송 실패: 이메일 주소가 비어 있습니다.");
            throw new AdminException(NOT_FOUND_MAIL_RECEIVER);
        }

        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(dto.getAddress());
            message.setSubject(dto.getTitle());
            message.setText(dto.getMessage());
            message.setFrom(DEFAULT_FROM_EMAIL);
            message.setReplyTo(DEFAULT_FROM_EMAIL);

            mailSender.send(message);
        } catch (Exception e) {
            log.error("메일 발송 중 오류 발생: {}", e.getMessage(), e);
            throw new RuntimeException("메일 발송에 실패했습니다.", e);
        }
    }
}
