package org.example.backend.reservation.domain;

public enum ReservationPurpose {
    SEMINAR("세미나"),
    MEETING("회의"),
    STUDY("스터디"),
    CLASS("수업"),
    OTHER("기타");

    private final String description;

    ReservationPurpose(String description) {
        this.description = description;
    }
}
