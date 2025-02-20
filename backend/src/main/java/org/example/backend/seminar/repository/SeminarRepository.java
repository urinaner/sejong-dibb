package org.example.backend.seminar.repository;

import org.example.backend.seminar.domain.entity.Seminar;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SeminarRepository extends JpaRepository<Seminar, Long> {
    // name, speaker, company, place에서 키워드를 포함하는 데이터 검색
    @Query(value = """
        SELECT s.*
          FROM seminar s
         WHERE MATCH(s.name, s.speaker, s.company, s.place)
               AGAINST(:keyword IN NATURAL LANGUAGE MODE)
        ORDER BY s.seminar_id
        """,
            countQuery = """
        SELECT COUNT(*)
          FROM seminar s
         WHERE MATCH(s.name, s.speaker, s.company, s.place)
               AGAINST(:keyword IN NATURAL LANGUAGE MODE)
        """,
            nativeQuery = true)
    Page<Seminar> searchByKeywordFulltext(@Param("keyword") String keyword, Pageable pageable);
}
