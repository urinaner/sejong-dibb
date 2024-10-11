package org.example.backend.admin.repository;

import org.example.backend.admin.domain.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    Admin findByUsername(String username);

    Admin findByLoginId(String loginId);

    Boolean existsByUsername(String username);

    Boolean existsByLoginId(String loginId);
}
