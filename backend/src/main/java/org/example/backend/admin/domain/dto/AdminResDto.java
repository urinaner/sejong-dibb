package org.example.backend.admin.domain.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@NoArgsConstructor
public class AdminResDto {

    private String password;
    private String email;
}
