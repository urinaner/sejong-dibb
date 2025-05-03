package org.example.backend.blacklist.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.backend.blacklist.dto.BlackListTokenDto;
import org.springframework.context.annotation.Primary;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Date;

@Primary
@Service
@RequiredArgsConstructor
@Slf4j
public class RedisBlacklistService implements BlacklistService {

    private static final String BLACKLIST_PREFIX = "blacklist:";

    private final RedisTemplate<String, String> redisTemplate;

    @Override
    public void addToBlacklist(BlackListTokenDto blackListTokenDto) {
        String tokenKey = BLACKLIST_PREFIX + blackListTokenDto.getToken();
        Date expiredTime = blackListTokenDto.getExpiredTime();
        long current = System.currentTimeMillis();
        long remainMillis = expiredTime.getTime() - current;

        // 남은 유효 기간보다 0이 크면 Redis에 저장(만료 시간 설정)
        if (remainMillis > 0) {
            redisTemplate.opsForValue().set(tokenKey, expiredTime.toString(), Duration.ofMillis(remainMillis));
            log.debug("Redis에 블랙리스트 등록 완료: {}", tokenKey);
        } else {
            log.debug("이미 만료되었거나 유효기간이 지났습니다: {}", tokenKey);
        }
    }

    @Override
    public boolean isBlacklisted(String token) {
        String tokenKey = BLACKLIST_PREFIX + token;
        return redisTemplate.hasKey(tokenKey);
    }
}