package org.example.backend.reservation.service;

import org.example.backend.reservation.domain.dto.ReservationCreateDto;
import org.example.backend.reservation.domain.dto.ReservationResDto;
import org.example.backend.reservation.repository.RedisReservationRepository;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class ReservationLockFacade {

    private RedisReservationRepository redisReservationRepository;
    private ReservationService reservationService;

    public ReservationLockFacade(RedisReservationRepository redisReservationRepository, ReservationService reservationService) {
        this.redisReservationRepository = redisReservationRepository;
        this.reservationService = reservationService;
    }

    @Transactional
    public ReservationResDto createReservation(Long seminarRoomId, ReservationCreateDto reqDto, String loginId) throws InterruptedException {
        while (!redisReservationRepository.lock(seminarRoomId)){
            Thread.sleep(100);
        }
        try {
            return reservationService.createReservation(seminarRoomId, reqDto, loginId);
        } finally {
            redisReservationRepository.unlock(seminarRoomId);
        }
    }
}
