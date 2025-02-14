package org.example.backend.log.service;

import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.LinkedBlockingQueue;
import lombok.RequiredArgsConstructor;
import org.example.backend.log.domain.RequestResponseLog;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class BulkLogManager {
    private final LogService logService;
    private final Logger log = LoggerFactory.getLogger(BulkLogManager.class);

    private final BlockingQueue<RequestResponseLog> logQueue = new LinkedBlockingQueue<>();
    private final int BULK_SIZE = 100;

    private final ExecutorService leaderExecutor = Executors.newSingleThreadExecutor();
    private final ExecutorService workerExecutor = Executors.newFixedThreadPool(5);

    @PostConstruct
    public void startProcessing() {
        leaderExecutor.submit(this::processLogs);
    }

    public void addLog(RequestResponseLog log) {
        logQueue.add(log);
    }

    private void processLogs() {
        while (true) {
            try {
                List<RequestResponseLog> bulkLogs = new ArrayList<>(BULK_SIZE);
                logQueue.drainTo(bulkLogs, BULK_SIZE);

                if (!bulkLogs.isEmpty()) {
                    workerExecutor.submit(() -> {
                        try {
                            logService.saveAll(bulkLogs);
                        } catch (Exception e) {
                            log.error("Failed to save bulk logs", e);
                        }
                    });
                } else {
                    // 큐가 비어있으면 잠시 대기
                    Thread.sleep(100);
                }
            } catch (InterruptedException e) {
                log.error("Log processing interrupted", e);
                Thread.currentThread().interrupt();
            }
        }
    }

    @PreDestroy
    public void shutdown() {
        leaderExecutor.shutdown();
        workerExecutor.shutdown();
    }
}