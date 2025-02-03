package org.example.backend.news.repository;

import org.example.backend.news.domain.entity.News;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface NewsRepository extends JpaRepository<News, Long> {

    // name(title) 또는 content에서 키워드를 포함하는 데이터 검색
    @Query("SELECT n FROM News n WHERE n.title LIKE %:keyword% OR n.content LIKE %:keyword%")
    Page<News> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);
}
