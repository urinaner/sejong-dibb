package org.example.backend.reservation.domain.dto;


import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.backend.reservation.domain.RepetitionType;
import org.example.backend.reservation.domain.ReservationPurpose;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReservationReqDto {
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private ReservationPurpose purpose;
    private String etc;
    private String repetitionType;
    private Long userId;

    @Builder
    private ReservationReqDto(LocalDateTime startTime, LocalDateTime endTime,
                              ReservationPurpose purpose, String etc, String repetitionType, Long userId) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.purpose = purpose;
        this.etc = etc;
        this.repetitionType = repetitionType;
        this.userId = userId;
    }

    public static ReservationReqDto of(LocalDateTime startTime, LocalDateTime endTime,
                                       ReservationPurpose purpose, String repetitionType, String etc, Long userId) {
        return ReservationReqDto.builder()
                .startTime(startTime)
                .endTime(endTime)
                .purpose(purpose)
                .etc(etc)
                .repetitionType(repetitionType)
                .userId(userId)
                .build();
    }
}