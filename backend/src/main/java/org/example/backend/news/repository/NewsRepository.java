package org.example.backend.news.repository;

import org.example.backend.news.domain.entity.News;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NewsRepository extends JpaRepository<News, Long> {
}
