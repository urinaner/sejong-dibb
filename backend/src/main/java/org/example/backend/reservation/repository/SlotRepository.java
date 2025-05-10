package org.example.backend.reservation.repository;

import jakarta.persistence.LockModeType;
import org.example.backend.reservation.domain.Reservation;
import org.example.backend.reservation.domain.Slot;
import org.example.backend.room.domain.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface SlotRepository extends JpaRepository <Slot, Long> {
    boolean existsByRoomAndStartTime(Room room, LocalDateTime startTime);

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
}
