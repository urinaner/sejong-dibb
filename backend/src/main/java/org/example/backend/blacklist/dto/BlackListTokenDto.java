package org.example.backend.blacklist.dto;

import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class BlackListTokenDto {
    private String token;
    private Date expiredTime;
}
