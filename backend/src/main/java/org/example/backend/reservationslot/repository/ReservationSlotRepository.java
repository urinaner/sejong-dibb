package org.example.backend.reservationslot.repository;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.LockModeType;
import org.example.backend.reservationslot.domain.ReservationSlot;
import org.example.backend.room.domain.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ReservationSlotRepository extends JpaRepository<ReservationSlot, Long> {
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT s FROM ReservationSlot s " +
            "WHERE s.room.id = :roomId " +
            "AND s.startTime >= :startTime " +
            "AND s.endTime <= :endTime " +
            "AND s.reserved = false " +
            "ORDER BY s.startTime")
    List<ReservationSlot> findSlotsForUpdate(
            @Param("roomId") Long roomId,
            @Param("startTime") LocalDateTime startTime,
            @Param("endTime") LocalDateTime endTime);

    @Query("SELECT r FROM ReservationSlot r " +
            "WHERE r.room.id = :roomId " +
            "AND r.reserved = true " +
            "AND DATE_FORMAT(r.startTime, '%Y-%m-%d') = :date")
    List<ReservationSlot> findAllByDateAndStatus(
            @Param("roomId") Long roomId,
            @Param("date") String date
    );

    @Query("SELECT r FROM ReservationSlot r " +
            "WHERE r.room.id = :roomId " +
            "AND r.reserved = true " +
            "AND DATE_FORMAT(r.startTime, '%Y-%m') = :yearMonth " +
            "ORDER BY r.startTime")
    List<ReservationSlot> findAllByRoomAndYearMonth(
            @Param("roomId") Long roomId,
            @Param("yearMonth") String yearMonth
    );

    boolean existsByRoomAndStartTime(Room room, LocalDateTime startTime);
}
