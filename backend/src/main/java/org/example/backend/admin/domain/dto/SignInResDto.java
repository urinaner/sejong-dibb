package org.example.backend.admin.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SignInResDto {
    private TokenDto tokenDto;
    private AdminResDto adminResDto; // TODO
}
