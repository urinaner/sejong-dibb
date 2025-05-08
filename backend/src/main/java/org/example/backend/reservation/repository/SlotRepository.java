package org.example.backend.reservation.repository;

import org.example.backend.reservation.domain.Slot;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SlotRepository extends JpaRepository <Slot, Long> {

}
