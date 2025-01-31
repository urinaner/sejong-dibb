package org.example.backend.blacklist.repository;

import java.time.LocalDateTime;
import org.example.backend.blacklist.domain.JwtBlacklist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JwtBlacklistRepository extends JpaRepository<JwtBlacklist, Long> {
    void deleteByExpiresAtBefore(LocalDateTime time);
}
