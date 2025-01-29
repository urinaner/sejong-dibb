package org.example.backend.users.domain.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AdminReqDto {

    private String loginId;

    private String password;

    private String email;
}
