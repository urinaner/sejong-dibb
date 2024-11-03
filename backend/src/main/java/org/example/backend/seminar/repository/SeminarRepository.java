package org.example.backend.seminar.repository;

import org.example.backend.seminar.domain.entity.Seminar;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SeminarRepository extends JpaRepository<Seminar, Long> {
}
