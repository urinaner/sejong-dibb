package org.example.backend.global.config.cache;

import com.github.benmanes.caffeine.cache.Caffeine;
import com.github.benmanes.caffeine.cache.Scheduler;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.caffeine.CaffeineCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.TimeUnit;

@Configuration
@EnableCaching
public class CacheConfig {

    @Bean
    public CacheManager cacheManager() {

        // 하나의 CacheManager로 여러 CacheType을 순회하며 등록
        CaffeineCacheManager cacheManager = new CaffeineCacheManager();

        for (CacheType cacheType : CacheType.values()) {
            cacheManager.registerCustomCache(
                    cacheType.getCacheName(),
                    Caffeine.newBuilder()
                            .scheduler(Scheduler.systemScheduler())
                            .expireAfterWrite(cacheType.getExpiredAfterWrite(), TimeUnit.MINUTES)
                            .maximumSize(cacheType.getMaximumSize())
                            .build()
            );
        }

        return cacheManager;
    }
}