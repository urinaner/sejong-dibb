package org.example.backend.board.repository;

import org.example.backend.board.domain.entity.Board;
import org.example.backend.board.domain.entity.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepository extends JpaRepository<Board, Long> {
    Page<Board> findAllByCategory(Category category, Pageable pageable);
}
