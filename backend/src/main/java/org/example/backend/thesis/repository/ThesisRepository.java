package org.example.backend.thesis.repository;

import org.example.backend.thesis.domain.entity.Thesis;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ThesisRepository extends JpaRepository<Thesis, Long> {
    Page<Thesis> findByProfessorId(Long professorId, Pageable pageable);

    // title, author, journal, content 에서 키워드를 포함하는 데이터 검색
    // fetch join 사용하여 N+1 문제 해결 (Lazy Loading을 무시하고, 한 번의 쿼리로 논문과 교수 정보를 미리 가져옴)
    @Query("SELECT t FROM Thesis t JOIN FETCH t.professor WHERE t.title LIKE %:keyword% OR t.author LIKE %:keyword% "
            + "OR t.journal LIKE %:keyword% OR t.content LIKE %:keyword%")
    Page<Thesis> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);
}
