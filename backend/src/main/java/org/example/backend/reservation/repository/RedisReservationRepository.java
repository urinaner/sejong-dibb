
package org.example.backend.reservation.repository;

import java.time.Duration;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

@Component
public class RedisReservationRepository {
    private RedisTemplate<String, String> redisTemplate;

    public RedisReservationRepository(RedisTemplate<String, String> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public Boolean lock(Long seminarRoomId){
        return redisTemplate
                .opsForValue()
                .setIfAbsent(generateKey(seminarRoomId), "lock", Duration.ofMillis(3_000));
    }

    public Boolean unlock(Long seminarRoomId){
        return redisTemplate.delete(generateKey(seminarRoomId));
    }

    private String generateKey(Long seminarRoomId) {
        return "seminarRoom:lock:" + seminarRoomId;
    }
}
