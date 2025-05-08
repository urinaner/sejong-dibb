package org.example.backend.reservation.repository;

import org.example.backend.reservation.domain.Slot;
import org.example.backend.room.domain.Room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;

public interface SlotRepository extends JpaRepository <Slot, Long> {
    boolean existsByRoomAndStartTime(Room room, LocalDateTime startTime);
}
