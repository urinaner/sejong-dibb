package org.example.backend.blacklist.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.Date;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.backend.blacklist.dto.BlackListTokenDto;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "jwt_blacklist")
public class JwtBlacklist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "jwt_blacklist_id")
    private Long id;

    @Column(nullable = false, unique = true)
    private String token;

    @Column(nullable = false)
    private Date expiredTime;

    @Builder
    private JwtBlacklist(final String token, final Date expiredTime) {
        this.token = token;
        this.expiredTime = expiredTime;
    }

    public static JwtBlacklist of(BlackListTokenDto dto) {
        return JwtBlacklist.builder().token(dto.getToken()).expiredTime(dto.getExpiredTime()).build();
    }
}
