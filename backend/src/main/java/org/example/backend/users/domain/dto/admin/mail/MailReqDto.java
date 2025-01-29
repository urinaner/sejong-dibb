package org.example.backend.users.domain.dto.admin.mail;

import lombok.Data;

@Data
public class MailReqDto {

    private String loginId;

    private String email;
}
