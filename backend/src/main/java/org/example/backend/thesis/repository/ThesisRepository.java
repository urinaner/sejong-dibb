package org.example.backend.thesis.repository;

import java.util.List;
import org.example.backend.thesis.domain.entity.Thesis;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ThesisRepository extends JpaRepository<Thesis, Long> {
    Page<Thesis> findByProfessorId(Long professorId, Pageable pageable);

    // title, author, journal, content 에서 키워드를 포함하는 데이터 검색
    @Query("SELECT t FROM Thesis t WHERE t.title LIKE %:keyword% OR t.author LIKE %:keyword% "
            + "OR t.journal LIKE %:keyword% OR t.content LIKE %:keyword%")
    List<Thesis> searchByKeyword(@Param("keyword") String keyword);
}
