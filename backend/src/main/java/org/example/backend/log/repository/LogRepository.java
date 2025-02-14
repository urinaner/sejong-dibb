package org.example.backend.log.repository;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.example.backend.log.domain.RequestResponseLog;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class LogRepository {
    private final JdbcTemplate jdbcTemplate;

    public void saveAllLogs(List<RequestResponseLog> logs) {
        String sql = "INSERT INTO request_response_log (method, path, request_body, response_status, response_body, created_at, client_ip) VALUES (?, ?, ?, ?, ?, ?, ?)";

        List<Object[]> batchArgs = logs.stream()
                .map(log -> new Object[]{log.getMethod(), log.getPath(), log.getRequestBody(), log.getResponseStatus(), log.getResponseBody(), log.getCreatedAt(), log.getClientIp()})
                .toList();

        jdbcTemplate.batchUpdate(sql, batchArgs);
    }
}