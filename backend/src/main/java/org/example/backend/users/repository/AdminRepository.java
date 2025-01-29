package org.example.backend.users.repository;

import org.example.backend.users.domain.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    Admin findByUsername(String username);

    Optional<Admin> findByLoginId(String loginId);

    Boolean existsByUsername(String username);

    Boolean existsByLoginId(String loginId);
}
