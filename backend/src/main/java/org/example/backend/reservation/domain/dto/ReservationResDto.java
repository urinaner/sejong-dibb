package org.example.backend.reservation.domain.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.backend.reservation.domain.Reservation;
import org.example.backend.reservation.domain.ReservationPurpose;
import org.example.backend.reservation.domain.ReservationStatus;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReservationResDto {
    private Long id;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private ReservationPurpose purpose;
    private String etc;
    private ReservationStatus status;
    private String seminarRoomName;
    private Long userId;

    @Builder
    private ReservationResDto(Long id, LocalDateTime startTime, LocalDateTime endTime,
                              ReservationPurpose purpose, String etc, ReservationStatus status,
                              String seminarRoomName, Long userId) {
        this.id = id;
        this.startTime = startTime;
        this.endTime = endTime;
        this.purpose = purpose;
        this.etc = etc;
        this.status = status;
        this.seminarRoomName = seminarRoomName;
        this.userId = userId;
    }

    public static ReservationResDto of(Reservation reservation) {
        return ReservationResDto.builder()
                .id(reservation.getId())
                .startTime(reservation.getStartTime())
                .endTime(reservation.getEndTime())
                .purpose(reservation.getPurpose())
                .etc(reservation.getEtc())
                .status(reservation.getStatus())
                .seminarRoomName(reservation.getSeminarRoom().getName())
                .userId(reservation.getUserId())
                .build();
    }
}