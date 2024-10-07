package org.example.backend.admin.service;

import lombok.extern.slf4j.Slf4j;
import org.example.backend.admin.domain.entity.Admin;
import org.example.backend.admin.domain.entity.CustomUserDetails;
import org.example.backend.admin.repository.AdminRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final AdminRepository userRepository;

    public CustomUserDetailsService(AdminRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.info("CustomUserDetailsService.loadUserByUsername");
        Admin userData = userRepository.findByUsername(username);

        if (userData != null) {

            return new CustomUserDetails(userData);
        }

        return null;
    }
}
