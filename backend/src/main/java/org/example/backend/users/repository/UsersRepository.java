package org.example.backend.users.repository;

import java.util.Optional;
import org.example.backend.users.domain.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersRepository extends JpaRepository<Users, Long> {
    Optional<Users> findByLoginId(String loginId);

    Boolean existsByLoginId(String loginId);
}
