package org.example.backend.seminar.repository;

import java.util.List;
import org.example.backend.seminar.domain.entity.Seminar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SeminarRepository extends JpaRepository<Seminar, Long> {
    // name, speaker, company, place에서 키워드를 포함하는 데이터 검색
    @Query("SELECT s FROM Seminar s WHERE s.name LIKE %:keyword% OR s.speaker LIKE %:keyword% OR s.company LIKE %:keyword% OR s.place LIKE %:keyword%")
    List<Seminar> searchByKeyword(@Param("keyword") String keyword);
}
