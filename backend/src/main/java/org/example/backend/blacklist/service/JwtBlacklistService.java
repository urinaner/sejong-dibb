package org.example.backend.blacklist.service;

import jakarta.transaction.Transactional;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.backend.blacklist.domain.JwtBlacklist;
import org.example.backend.blacklist.dto.BlackListTokenDto;
import org.example.backend.blacklist.repository.JwtBlacklistRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class JwtBlacklistService {
    private final JwtBlacklistRepository blacklistRepository;

    // JWT를 블랙리스트에 추가하는 메서드
    public void addToBlacklist(BlackListTokenDto blackListTokenDto) {
        if (!blacklistRepository.existsByToken(blackListTokenDto.getToken())) {
            blacklistRepository.save(JwtBlacklist.of(blackListTokenDto));
        }
    }

    // 블랙리스트에 있는지 확인하는 메서드
    public boolean isBlacklisted(String token) {
        return blacklistRepository.existsByToken(token);
    }

    // 매 1시간마다 블랙리스트에서 만료된 JWT 삭제
    @Scheduled(fixedRate = 3600000)
    public void cleanUpExpiredTokens() {
        LocalDateTime now = LocalDateTime.now();
        blacklistRepository.deleteByExpiredTimeBefore(now);
        log.info("만료된 JWT 블랙리스트 삭제 완료");
    }
}
