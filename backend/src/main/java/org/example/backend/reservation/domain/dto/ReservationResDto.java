package org.example.backend.reservation.domain.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.backend.common.utils.TimeParsingUtils;
import org.example.backend.reservation.domain.Reservation;
import org.example.backend.reservation.domain.ReservationPurpose;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReservationResDto {
    private Long id;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private String startTime;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private String endTime;
    private ReservationPurpose purpose;
    private String etc;
    private Long roomId;
    private Long userId;

    @Builder
    private ReservationResDto(Long id, String startTime, String endTime,
                              ReservationPurpose purpose, String etc,
                              Long roomId, Long userId) {
        this.id = id;
        this.startTime = startTime;
        this.endTime = endTime;
        this.purpose = purpose;
        this.etc = etc;
        this.roomId = roomId;
        this.userId = userId;
    }

    public static ReservationResDto of(Reservation reservation) {
        return ReservationResDto.builder()
                .id(reservation.getId())
                .startTime(TimeParsingUtils.formatterString(reservation.getStartTime()))
                .endTime(TimeParsingUtils.formatterString(reservation.getEndTime()))
                .purpose(reservation.getPurpose())
                .etc(reservation.getEtc())
                .roomId(reservation.getRoom().getId())
                .userId(reservation.getUser().getId())
                .build();
    }
}