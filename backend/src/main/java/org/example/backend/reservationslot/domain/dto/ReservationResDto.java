package org.example.backend.reservationslot.domain.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDateTime;
import java.util.List;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.backend.reservationslot.domain.ReservationSlot;
import org.example.backend.reservationslot.domain.ReservationPurpose;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReservationResDto {
    private Long id;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime startTime;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime endTime;
    private ReservationPurpose purpose;
    private String etc;

    @Builder
    public ReservationResDto(Long id, LocalDateTime startTime, LocalDateTime endTime,
                             ReservationPurpose purpose, String etc) {
        this.id = id;
        this.startTime = startTime;
        this.endTime = endTime;
        this.purpose = purpose;
        this.etc = etc;

    }

    public static ReservationResDto of(ReservationSlot reservation) {
        return ReservationResDto.builder()
                .id(reservation.getId())
                .startTime(reservation.getStartTime())
                .endTime(reservation.getEndTime())
                .purpose(reservation.getPurpose())
                .etc(reservation.getEtc())
                .build();
    }

    public static List<ReservationResDto> of (List<ReservationSlot> reservations) {
        return reservations.stream()
                .map(ReservationResDto::of)
                .toList();
    }
}
