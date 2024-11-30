package org.example.backend.reservation.domain.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.backend.common.utils.TimeParsingUtils;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReservationReqDto {
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private String startTime;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private String endTime;
    private String purpose;
    private String etc;
    private String repetitionType;

    @Builder
    private ReservationReqDto(String startTime, String endTime,
                              String purpose, String etc, String repetitionType) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.purpose = purpose;
        this.etc = etc;
        this.repetitionType = repetitionType;
    }

    public static ReservationReqDto of(LocalDateTime startTime, LocalDateTime endTime,
                                       String purpose, String repetitionType, String etc) {
        return ReservationReqDto.builder()
                .startTime(TimeParsingUtils.formatterString(startTime))
                .endTime(TimeParsingUtils.formatterString(endTime))
                .purpose(purpose)
                .etc(etc)
                .repetitionType(repetitionType)
                .build();
    }

    public boolean isWeeklyReservation() {
        return !startTime.equals(endTime);
    }

    public String getDefaultPurpose() {
        return (purpose == null || purpose.isBlank()) ? "CLASS" : purpose;
    }
}