package org.example.backend.log.service;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.example.backend.log.domain.RequestResponseLog;
import org.example.backend.log.repository.LogRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LogService {
    private final LogRepository logRepository;

    public void saveAll(List<RequestResponseLog> logs) {
        logRepository.saveAllLogs(logs);
    }
}