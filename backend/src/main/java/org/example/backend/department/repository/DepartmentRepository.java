package org.example.backend.department.repository;

import org.example.backend.department.domain.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartmentRepository extends JpaRepository<Department, Long> {
    boolean existsByKoreanName(String koreanName);
}
