package org.example.backend.timetable.repository;

import org.example.backend.timetable.domain.Timetable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TimetableRepository extends JpaRepository<Timetable, Long> {
}
