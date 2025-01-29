package org.example.backend.users.domain.dto.admin.mail;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MailResDto {

    private String address;

    private String title;

    private String message;
}
