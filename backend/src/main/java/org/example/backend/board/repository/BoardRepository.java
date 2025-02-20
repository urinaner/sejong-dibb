package org.example.backend.board.repository;

import org.example.backend.board.domain.entity.Board;
import org.example.backend.board.domain.entity.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BoardRepository extends JpaRepository<Board, Long> {
    Page<Board> findAllByCategory(Category category, Pageable pageable);

    @Modifying
    @Query("UPDATE Board b SET b.viewCount = b.viewCount + 1 WHERE b.id = :boardId")
    void incrementViewCount(@Param("boardId") Long boardId);

    @Query(value = """
        SELECT b.*
        FROM board b
        WHERE MATCH(b. title, b.content)
              AGAINST(:keyword IN NATURAL LANGUAGE MODE)
        """,
            countQuery = """
        SELECT COUNT(*)
        FROM board b
        WHERE MATCH(b. title, b.content)
              AGAINST(:keyword IN NATURAL LANGUAGE MODE)
        """,
        nativeQuery = true)
    Page<Board> searchByKeywordFulltext(@Param("keyword") String keyword, Pageable pageable);
}
