package org.example.backend.global.config.cashe;

import com.github.benmanes.caffeine.cache.Caffeine;
import org.springframework.cache.CacheManager;
import org.springframework.cache.caffeine.CaffeineCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.cache.annotation.EnableCaching;
import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;

@Configuration
@EnableCaching
@RequiredArgsConstructor
public class CacheConfig {

    @Bean
    public CacheManager cacheManager() {

        // 하나의 CacheManager로 여러 CacheType을 순회하며 등록
        CaffeineCacheManager cacheManager = new CaffeineCacheManager();

        for (CacheType cacheType : CacheType.values()) {
            cacheManager.registerCustomCache(
                    cacheType.getCacheName(),
                    Caffeine.newBuilder()
                            .expireAfterWrite(cacheType.getExpiredAfterWrite(), TimeUnit.MINUTES)
                            .maximumSize(cacheType.getMaximumSize())
                            .build()
            );
        }

        return cacheManager;
    }
}