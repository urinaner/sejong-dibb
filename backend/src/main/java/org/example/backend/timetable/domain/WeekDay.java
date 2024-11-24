package org.example.backend.timetable.domain;

import lombok.Getter;

@Getter
public enum WeekDay {
    MONDAY("월"),
    TUESDAY("화"),
    WEDNESDAY("수"),
    THURSDAY("목"),
    FRIDAY("금"),
    SATURDAY("토"),
    SUNDAY("일");

    private final String korName;

    WeekDay(String korName) {
        this.korName = korName;
    }
}