package org.example.backend.users.domain.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SignInResDto {
    private TokenDto tokenDto;
    private AdminResDto adminResDto; // TODO
}
