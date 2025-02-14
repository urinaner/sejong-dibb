package org.example.backend.log.repository;

import org.example.backend.log.domain.RequestResponseLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LogRepository extends JpaRepository<RequestResponseLog, Long> {
}