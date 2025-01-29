package org.example.backend.users.domain.entity;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;

@Slf4j
public class CustomUserDetails implements UserDetails {
    private final Admin admin;

    public CustomUserDetails(Admin admin) {
        this.admin = admin;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        log.info("CustomUserDetails.getAuthorities");
        Collection<GrantedAuthority> collection = new ArrayList<>();

        collection.add(new GrantedAuthority() {

            @Override
            public String getAuthority() {

                return admin.getRole();
            }
        });

        return collection;
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