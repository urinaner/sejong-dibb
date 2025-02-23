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

    // 1) thesis_id만 조회 (Native Query Using Ngram, Fulltext)
    @Query(value = """
        SELECT t.thesis_id
          FROM thesis t
         WHERE MATCH(t.title, t.author, t.journal, t.content)
               AGAINST(:keyword IN NATURAL LANGUAGE MODE)
        ORDER BY t.thesis_id
        """,
                countQuery = """
        SELECT COUNT(*)
          FROM thesis t
         WHERE MATCH(t.title, t.author, t.journal, t.content)
               AGAINST(:keyword IN NATURAL LANGUAGE MODE)
    """,
            nativeQuery = true)
    Page<Long> searchThesisIdsByFulltext(@Param("keyword") String keyword, Pageable pageable);

    // 2) Fetch Join으로 Thesis + Professor (N + 1 문제 해결)
    @Query("""
        SELECT t
          FROM Thesis t
          JOIN FETCH t.professor
         WHERE t.id IN :ids
    """)
    List<Thesis> findAllByIdInWithProfessor(@Param("ids") List<Long> ids);
}
