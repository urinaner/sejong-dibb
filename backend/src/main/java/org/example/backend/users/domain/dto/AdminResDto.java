package org.example.backend.users.domain.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AdminResDto {

    private String loginId;
    private String email;
}
