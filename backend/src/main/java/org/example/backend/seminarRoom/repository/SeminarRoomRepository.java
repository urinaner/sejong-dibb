package org.example.backend.seminarRoom.repository;

import org.example.backend.seminarRoom.domain.SeminarRoom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SeminarRoomRepository extends JpaRepository<SeminarRoom, Long> {
}
