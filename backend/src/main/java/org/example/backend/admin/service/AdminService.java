package org.example.backend.admin.service;

import static org.example.backend.admin.exception.AdminExceptionType.ALREADY_EXIST_LOGIN_ID;
import static org.example.backend.admin.exception.AdminExceptionType.INVALID_ACCESS_TOKEN;
import static org.example.backend.admin.exception.AdminExceptionType.NOT_FOUND_ADMIN;
import static org.example.backend.admin.exception.AdminExceptionType.NOT_FOUND_MAIL_RECEIVER;
import static org.example.backend.admin.exception.AdminExceptionType.NOT_MATCH_EMAIL;

import java.security.SecureRandom;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.backend.admin.domain.dto.AccessTokenReq;
import org.example.backend.admin.domain.dto.AdminReqDto;
import org.example.backend.admin.domain.dto.AdminResDto;
import org.example.backend.admin.domain.dto.SignInReqDto;
import org.example.backend.admin.domain.dto.mail.MailReqDto;
import org.example.backend.admin.domain.dto.mail.MailResDto;
import org.example.backend.admin.domain.entity.Admin;
import org.example.backend.admin.domain.mapper.AdminMapper;
import org.example.backend.admin.exception.AdminException;
import org.example.backend.admin.repository.AdminRepository;
import org.mapstruct.factory.Mappers;
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

    private final AdminMapper adminMapper = Mappers.getMapper(AdminMapper.class);
    private final AdminRepository userRepository;
    private final PasswordEncoder bCryptPasswordEncoder;
    private final JavaMailSender mailSender;

    private static final String BEARER_TYPE = "Bearer";
    private static final String DEFAULT_FROM_EMAIL = "zkffl0@naver.com";

    @Transactional
    public void joinProcess(SignInReqDto joinDTO) {
        String loginId = joinDTO.getLoginId();
        String password = joinDTO.getPassword();

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
        return userRepository.existsByLoginId(loginId);
    }

    public void signOut(AccessTokenReq accessTokenReq) {
        String accessToken = accessTokenReq.getAccessToken();

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

    @Transactional
    public MailResDto createTmpPasswordMail(MailReqDto mailReqDto) {
        Admin admin = findAdminByLoginId(mailReqDto.getLoginId());

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

    private Admin findAdminByLoginId(String loginId) {
        return userRepository.findByLoginId(loginId)
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

    private void updatePassword(Admin admin, String tmpPassword) {
        admin.updatePassword(bCryptPasswordEncoder.encode(tmpPassword));
        userRepository.save(admin);
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