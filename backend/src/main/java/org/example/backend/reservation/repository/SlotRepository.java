package org.example.backend.reservation.repository;

import jakarta.persistence.LockModeType;
import org.example.backend.reservation.domain.Slot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface SlotRepository extends JpaRepository <Slot, Long> {
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT s FROM Slot s " +
            "WHERE s.room.id = :roomId " +
            "AND s.startTime >= :startTime " +
            "AND s.endTime <= :endTime " +
            "AND s.reservation IS NULL " +
            "ORDER BY s.startTime")
    List<Slot> findSlotsForUpdate(
            @Param("roomId") Long roomId,
            @Param("startTime") LocalDateTime startTime,
            @Param("endTime") LocalDateTime endTime);

    @Lock(LockModeType.OPTIMISTIC)
    @Query("SELECT s FROM Slot s " +
            "WHERE s.room.id = :roomId " +
            "AND s.startTime >= :startTime " +
            "AND s.endTime <= :endTime " +
            "AND s.reservation IS NULL " +
            "ORDER BY s.startTime")
    List<Slot> findSlotsOptimistic(
            @Param("roomId") Long roomId,
            @Param("startTime") LocalDateTime startTime,
            @Param("endTime") LocalDateTime endTime);
}
