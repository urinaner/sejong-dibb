package org.example.backend.users.repository;

import java.util.Optional;
import org.example.backend.users.domain.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersRepository extends JpaRepository<Users, Long> {
    Users findByUsername(String username);

    Optional<Users> findByLoginId(String loginId);

    Boolean existsByUsername(String username);

    Boolean existsByLoginId(String loginId);
}
