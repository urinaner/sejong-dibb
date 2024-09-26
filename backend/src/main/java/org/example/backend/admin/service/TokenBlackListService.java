package org.example.backend.admin.service;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Iterator;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class TokenBlackListService {
    private final Map<String, Long> tokenBlacklist = new ConcurrentHashMap<>();

    // 토큰을 블랙리스트에 추가하고 만료 시간을 함께 저장
    public void addToBlacklist(String token, long expirationTimeInMillis) {
        tokenBlacklist.put(token, System.currentTimeMillis() + expirationTimeInMillis);
    }

    // 블랙리스트에 있는지 확인
    public boolean isTokenBlacklisted(String token) {
        return tokenBlacklist.containsKey(token);
    }

    // 주기적으로 만료된 토큰을 제거하는 작업
    @Scheduled(fixedRate = 3600000) // 1시간마다 실행
    public void cleanUpBlacklist() {
        long currentTime = System.currentTimeMillis();
        Iterator<Map.Entry<String, Long>> iterator = tokenBlacklist.entrySet().iterator();

        while (iterator.hasNext()) {
            Map.Entry<String, Long> entry = iterator.next();
            if (entry.getValue() <= currentTime) { // 만료된 토큰이면 제거
                iterator.remove();
            }
        }
    }
}
