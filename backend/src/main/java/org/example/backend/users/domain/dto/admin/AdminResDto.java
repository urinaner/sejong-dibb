package org.example.backend.users.domain.dto.admin;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.backend.users.domain.entity.Users;

@Data
@NoArgsConstructor
public class AdminResDto {

    private String loginId;
    private String email;

    @Builder
    private AdminResDto(String loginId, String email) {
        this.loginId = loginId;
        this.email = email;
    }

    public static AdminResDto of(Users admin) {
        return AdminResDto.builder()
            .loginId(admin.getLoginId())
            .email(admin.getEmail())
            .build();
    }
}
