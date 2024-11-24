package org.example.backend.reservation.domain;

public enum ReservationStatus {
    PENDING("대기중"),
    APPROVED("승인됨"),
    REJECTED("거절됨"),
    CANCELLED("취소됨");

    private final String description;

    ReservationStatus(String description) {
        this.description = description;

    }
}
