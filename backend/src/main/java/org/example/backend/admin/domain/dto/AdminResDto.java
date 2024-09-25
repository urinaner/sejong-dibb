package org.example.backend.admin.domain.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AdminResDto {

    private String password;
    private String email;
}
