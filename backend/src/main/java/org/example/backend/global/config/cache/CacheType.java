package org.example.backend.global.config.cache;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum CacheType {
    // 게시판 목록 캐시 (60분, 최대 1,000개)
    BOARDS("boards", 60, 1000),

    // 뉴스 목록 캐시 (60분, 최대 1,000개)
    NEWS("news", 60, 1000),

    // 세미나 목록 캐시 (60분, 최대 1,000개)
    SEMINARS("seminars", 60, 1000),

    // 논문 목록 캐시 (60분, 최대 1,000개)
    THESES("theses", 60, 1000);

    private final String cacheName;
    private final int expiredAfterWrite;
    private final int maximumSize;
}
