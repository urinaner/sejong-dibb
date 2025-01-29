package org.example.backend.users.domain.dto.mail;

import lombok.Data;

@Data
public class MailReqDto {

    private String loginId;

    private String email;
}
