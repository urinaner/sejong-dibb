package org.example.backend.log.service;

import com.zaxxer.hikari.HikariDataSource;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.TimeUnit;
import javax.sql.DataSource;
import lombok.extern.slf4j.Slf4j;
import org.example.backend.log.domain.RequestResponseLog;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class BulkLogManager {
    private final LogService logService;
    private final BlockingQueue<RequestResponseLog> logQueue = new LinkedBlockingQueue<>();
    private final int BULK_SIZE;
    private final long TIMEOUT_MS;
    private final ExecutorService leaderExecutor;
    private final ExecutorService workerExecutor;

    /**
     * 생성자 예시
     *
     * @param logService  DB 저장 로직을 담당하는 서비스/리포지토리
     * @param dataSource  HikariCP 같은 커넥션 풀
     * @param bulkSize    배치 처리 개수 (환경설정 or 기본값)
     * @param timeoutMs   시간 기준 배치 처리 타임아웃 (환경설정 or 기본값)
     */
    public BulkLogManager(
            LogService logService,
            DataSource dataSource,
            @Value("${app.bulkInsert.size:100}") int bulkSize,
            @Value("${app.bulkInsert.timeoutMs:500}") long timeoutMs
    ) {
        this.logService = logService;
        this.BULK_SIZE = bulkSize;
        this.TIMEOUT_MS = timeoutMs;
        this.leaderExecutor = Executors.newSingleThreadExecutor();

        // 예) HikariCP의 풀 크기를 구해서 워커 스레드풀 크기를 동적으로 조정
        if (!(dataSource instanceof HikariDataSource)) {
            throw new IllegalArgumentException("DataSource must be HikariDataSource.");
        }
        HikariDataSource hikariDataSource = (HikariDataSource) dataSource;
        int poolSize = hikariDataSource.getMaximumPoolSize();

        int workerThreads = Math.max(1, poolSize / 2);
        this.workerExecutor = Executors.newFixedThreadPool(workerThreads);

        log.info("[BulkLogManager] Initialized. bulkSize={}, timeoutMs={}, workerThreads={}",
                BULK_SIZE, TIMEOUT_MS, workerThreads);
    }

    @PostConstruct
    public void startProcessing() {
        leaderExecutor.submit(this::processLogs);
    }

    public void addLog(RequestResponseLog log) {
        logQueue.add(log);
    }

    private void processLogs() {
        while (!Thread.currentThread().isInterrupted()) {
            try {
                // 1) TIMEOUT_MS 동안 로그를 한 건 가져옴
                RequestResponseLog firstLog = logQueue.poll(TIMEOUT_MS, TimeUnit.MILLISECONDS);

                // 로그가 전혀 안 들어왔으면(타임아웃이 경과), 다음 루프로
                if (firstLog == null) {
                    continue;
                }

                // 2) 첫 번째 로그는 이미 확보했으므로 리스트 초기화
                List<RequestResponseLog> bulkLogs = new ArrayList<>(BULK_SIZE);
                bulkLogs.add(firstLog);

                // 3) 나머지 BULK_SIZE-1개를 한 번에 가져옴
                logQueue.drainTo(bulkLogs, BULK_SIZE - 1);

                // 4) 이제 worker 스레드에서 DB에 저장
                workerExecutor.submit(() -> {
                    try {
                        logService.saveAll(bulkLogs);
                    } catch (Exception e) {
                        log.error("[BulkLogManager] Failed to save bulk logs", e);
                    }
                });

            } catch (InterruptedException e) {
                log.warn("[BulkLogManager] Log processing interrupted. Stopping leader thread.", e);
                Thread.currentThread().interrupt();
                break;
            } catch (Exception ex) {
                log.error("[BulkLogManager] Unexpected error in leader thread", ex);
            }
        }
    }

    @PreDestroy
    public void shutdown() {
        log.info("[BulkLogManager] Shutting down...");

        leaderExecutor.shutdownNow();
        workerExecutor.shutdown();

        try {
            if (!workerExecutor.awaitTermination(5, TimeUnit.SECONDS)) {
                log.warn("[BulkLogManager] Forcing worker executor shutdown...");
                workerExecutor.shutdownNow();
            }
        } catch (InterruptedException e) {
            log.error("[BulkLogManager] Shutdown interrupted", e);
            workerExecutor.shutdownNow();
            Thread.currentThread().interrupt();
        }

        log.info("[BulkLogManager] Shutdown complete.");
    }
}
