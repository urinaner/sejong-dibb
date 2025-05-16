package org.example.backend.users.domain.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginReqDto {

    @NotNull(message = "로그인 아이디는 필수 입력값입니다.")
    private String loginId;

    @NotNull(message = "패스워드는 필수 입력값입니다.")
    private String password;
}
