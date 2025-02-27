package org.example.backend.log.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDateTime;
import lombok.Data;

@Entity
@Data
public class RequestResponseLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String method;

    private String path;

    @Column(name = "request_body")
    private String requestBody;

    @Column(name = "request_status")
    private String responseStatus;

    @Column(name = "response_body", length = 10000)
    private String responseBody;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "client_ip")
    private String clientIp;

}