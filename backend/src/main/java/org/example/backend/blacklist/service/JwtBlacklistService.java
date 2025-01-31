package org.example.backend.blacklist.service;

import jakarta.transaction.Transactional;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.backend.blacklist.repository.JwtBlacklistRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class JwtBlacklistService {
    private final JwtBlacklistRepository blacklistRepository;

    // 매 1시간마다 블랙리스트에서 만료된 JWT 삭제
    @Scheduled(fixedRate = 3600000)
    public void cleanUpExpiredTokens() {
        LocalDateTime now = LocalDateTime.now();
        blacklistRepository.deleteByExpiresAtBefore(now);
        log.info("만료된 JWT 블랙리스트 삭제 완료");
    }
}
