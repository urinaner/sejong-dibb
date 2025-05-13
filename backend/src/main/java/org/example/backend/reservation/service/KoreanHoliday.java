package org.example.backend.reservation.service;

import java.time.LocalDate;
import java.time.MonthDay;
import java.util.Arrays;

public enum KoreanHoliday {
    NEW_YEAR            (MonthDay.of(1, 1)),
    INDEPENDENCE_DAY    (MonthDay.of(3,  1)),  // 삼일절
    CHILDREN_DAY        (MonthDay.of(5,  5)),  // 어린이날
    MEMORIAL_DAY        (MonthDay.of(6,  6)),  // 현충일
    LIBERATION_DAY      (MonthDay.of(8, 15)),  // 광복절
    NATIONAL_FOUNDATION (MonthDay.of(10, 3)),  // 개천절
    HANGEUL_DAY         (MonthDay.of(10, 9)),  // 한글날
    CHRISTMAS_DAY       (MonthDay.of(12,25));  // 성탄절
    ;

    private final MonthDay monthDay;

    KoreanHoliday(MonthDay monthDay) {
        this.monthDay = monthDay;
    }

    public static boolean isHoliday(LocalDate date) {
        return Arrays.stream(KoreanHoliday.values()).anyMatch(k -> k.equalsHoliday(date));
    }

    public boolean equalsHoliday(LocalDate date) {
        return date.getMonth().equals(monthDay.getMonth()) && date.getDayOfMonth() == monthDay.getDayOfMonth();
    }
}
