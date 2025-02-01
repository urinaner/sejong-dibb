package org.example.backend.users.service;

import lombok.extern.slf4j.Slf4j;
import org.example.backend.users.domain.entity.CustomUserDetails;
import org.example.backend.users.domain.entity.Users;
import org.example.backend.users.repository.UsersRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UsersRepository userRepository;

    public CustomUserDetailsService(UsersRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String loginId) throws UsernameNotFoundException {
        log.info("CustomUserDetailsService.loadUserByLoginId: {}", loginId);

        Users userData = userRepository.findByLoginId(loginId)
                .orElseThrow(() -> new UsernameNotFoundException(
                        "User not found with loginId: " + loginId)); // 사용자가 존재하지 않을 경우 예외 던지기

        return new CustomUserDetails(userData);
    }
}
