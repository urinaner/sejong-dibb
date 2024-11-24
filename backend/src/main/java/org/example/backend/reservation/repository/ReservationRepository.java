package org.example.backend.reservation.repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import org.example.backend.reservation.domain.Reservation;
import org.example.backend.reservation.domain.ReservationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    @Query("SELECT COUNT(r) > 0 FROM Reservation r " +
            "WHERE r.seminarRoom.id = :seminarRoomId " +
            "AND r.status = :status " +
            "AND r.startTime < :endTime " +
            "AND r.endTime > :startTime")
    boolean existsByTimePeriod(
            @Param("seminarRoomId") Long seminarRoomId,
            @Param("startTime") LocalDateTime startTime,
            @Param("endTime") LocalDateTime endTime,
            @Param("status") ReservationStatus status
    );

    // 특정 날짜의 모든 예약 조회 (달력 표시용)
    @Query("SELECT r FROM Reservation r " +
            "WHERE r.seminarRoom.id = :seminarRoomId " +
            "AND DATE(r.startTime) = :date " +
            "AND r.status = :status")
    List<Reservation> findAllByDateAndStatus(
            @Param("seminarRoomId") Long seminarRoomId,
            @Param("date") LocalDate date,
            @Param("status") ReservationStatus status
    );
}
