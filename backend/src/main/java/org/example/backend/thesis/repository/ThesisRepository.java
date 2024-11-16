package org.example.backend.thesis.repository;

import org.example.backend.thesis.domain.entity.Thesis;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ThesisRepository extends JpaRepository<Thesis, Long> {
    Page<Thesis> findByProfessorId(Long professorId, Pageable pageable);
}
