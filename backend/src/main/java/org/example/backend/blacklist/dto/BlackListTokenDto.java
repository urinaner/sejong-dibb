package org.example.backend.blacklist.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class BlackListTokenDto {
    private String token;
    private LocalDateTime expiredTime;
}
