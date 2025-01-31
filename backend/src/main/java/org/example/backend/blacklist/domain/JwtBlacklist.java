package org.example.backend.blacklist.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.backend.blacklist.dto.BlackListTokenDto;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "black_list")
public class JwtBlacklist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "black_list_id")
    private Long id;
    private String token;
    private LocalDateTime expiredTime;

    @Builder
    private JwtBlacklist(final String token, final LocalDateTime expiredTime) {
        this.token = token;
        this.expiredTime = expiredTime;
    }

    public static JwtBlacklist of(BlackListTokenDto dto) {
        return JwtBlacklist.builder().token(dto.getToken()).expiredTime(dto.getExpiredTime()).build();
    }
}
