package org.example.backend.user.service;

import static org.example.backend.user.exception.UserExceptionType.NOT_FOUND_USER;

import org.example.backend.user.domain.entity.User;
import org.springframework.data.domain.Pageable;
import lombok.RequiredArgsConstructor;
import org.example.backend.admin.domain.dto.SignInReqDto;
import org.example.backend.jwt.JWTUtil;
import org.example.backend.user.domain.dto.UserReqDto;
import org.example.backend.user.domain.dto.UserResDto;
import org.example.backend.user.exception.UserException;
import org.example.backend.user.exception.UserExceptionType;
import org.example.backend.user.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.yj.sejongauth.controller.Sj;
import org.yj.sejongauth.domain.SjProfile;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {

    private final UserRepository userRepository;

    private final Sj sj;
    private final JWTUtil jwtUtil;

    @Transactional
    public String loginProcess(SignInReqDto joinDTO) {
        try {
            SjProfile sjProfile = sj.login(joinDTO.getLoginId(), joinDTO.getPassword());
            String token = jwtUtil.createJwt(sjProfile.getName(), "USER", 60 * 60 * 10L);
            UserReqDto userReqDto = UserReqDto.builder()
                    .name(sjProfile.getName())
                    .studentId(sjProfile.getStudentCode())
                    .major(sjProfile.getMajor())
                    .build();
            saveUser(userReqDto);
            return token;
        } catch (RuntimeException e) {
            throw new UserException(NOT_FOUND_USER);
        }
    }

    @Transactional
    public Long saveUser(UserReqDto userReqDto) {
        validateRequiredFields(userReqDto);
        User user = User.of(userReqDto);
        User savedUser = userRepository.save(user);
        return savedUser.getId();
    }

    private void validateRequiredFields(UserReqDto userReqDto) {
        if (userReqDto.getName() == null || userReqDto.getName().isEmpty()) {
            throw new UserException(UserExceptionType.REQUIRED_NAME);
        }
        if (userReqDto.getStudentId() == null || userReqDto.getStudentId().isEmpty()) {
            throw new UserException(UserExceptionType.REQUIRED_STUDENT_ID);
        }
    }

    public Page<UserResDto> getAllUsers(Pageable pageable) {
        return userRepository.findAll(pageable)
                .map(UserResDto::of);
    }

    @Transactional
    public UserResDto updateUser(Long userId, UserReqDto userReqDto) {
        User user = findUserById(userId);
        user.update(userReqDto);
        return UserResDto.of(user);
    }

    @Transactional
    public void deleteUser(Long userId) {
        User user = findUserById(userId);
        userRepository.delete(user);
    }

    private User findUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new UserException(NOT_FOUND_USER));
    }
}
