package org.example.backend.board.domain.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.example.backend.department.domain.entity.Department;

@Entity
@Getter
@Setter
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_id", nullable = false)
    private Long boardId;

    @Column(name = "title")
    private String title;

    @Column(name = "content")
    private String content;

    @Column(name = "view_count")
    private int viewCount;

    @Column(name = "writer")
    private String writer;

    @Column(name = "file")
    private String file;

    @Column(name = "create_date")
    private String createDate;

    @Column(name = "category")
    private String category;

    @ManyToOne
    @JoinColumn(name = "department_id", nullable = false)
    private Department department;
}
