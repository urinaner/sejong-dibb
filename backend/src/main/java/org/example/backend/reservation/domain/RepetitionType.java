package org.example.backend.reservation.domain;

public enum RepetitionType {
    DAILY("단일 일정"),
    WEEKLY("주간 반복")
    ;

    private final String description;

    RepetitionType(String description) {
        this.description = description;
    }
    public String getDescription() {
        return description;
    }
}
