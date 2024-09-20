package org.example.backend.repository;

import org.example.backend.domain.entity.Professor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfessorRepository extends JpaRepository<Professor, Long> {
    boolean existsByPhoneN(String phoneN);

    boolean existsByEmail(String email);
}
