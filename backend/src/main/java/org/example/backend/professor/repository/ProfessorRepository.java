package org.example.backend.professor.repository;

import org.example.backend.professor.domain.entity.ProfessorTypes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfessorRepository extends JpaRepository<ProfessorTypes, Long> {
    boolean existsByPhoneN(String phoneN);

    boolean existsByEmail(String email);
}
