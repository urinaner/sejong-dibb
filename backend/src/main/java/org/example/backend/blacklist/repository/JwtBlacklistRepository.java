package org.example.backend.blacklist.repository;

import java.time.LocalDateTime;
import org.example.backend.blacklist.domain.JwtBlacklist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JwtBlacklistRepository extends JpaRepository<JwtBlacklist, Long> {
    // 특정 토큰이 블랙리스트에 존재하는지 확인
    boolean existsByToken(String token);

    // 만료된 블랙리스트 토큰 삭제
    void deleteByExpiredTimeBefore(LocalDateTime time);
}
