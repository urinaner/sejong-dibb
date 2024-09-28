package org.example.backend.admin.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SingInResDto {
    private TokenDto tokenDto;
    private AdminResDto adminResDto; // TODO
}
