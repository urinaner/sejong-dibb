package org.example.backend.admin.domain.entity;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

public class CustomUserDetails implements UserDetails {
    private final Admin admin;

    public CustomUserDetails(Admin admin) {
        this.admin = admin;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null; // 필요한 경우 권한 설정
    }

    @Override
    public String getPassword() {
        return admin.getPassword(); // Admin의 비밀번호 사용
    }

    @Override
    public String getUsername() {
        return admin.getLoginId(); // Admin의 로그인 ID 사용
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}