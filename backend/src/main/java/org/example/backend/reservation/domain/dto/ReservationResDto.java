package org.example.backend.reservation.domain.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.backend.reservation.domain.Reservation;
import org.example.backend.reservation.domain.ReservationPurpose;

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
    private Long roomId;
    private String userName;

    public ReservationResDto(Long id, LocalDateTime startTime, LocalDateTime endTime,
                             ReservationPurpose purpose, String etc,
                             Long roomId, String userName) {
        this.id = id;
        this.startTime = startTime;
        this.endTime = endTime;
        this.purpose = purpose;
        this.etc = etc;
        this.roomId = roomId;
        this.userName = userName;
    }

    public static ReservationResDto of(Reservation reservation) {
        return new ReservationResDto(
                reservation.getId(),
                reservation.getStartTime(),
                reservation.getEndTime(),
                reservation.getPurpose(),
                reservation.getEtc(),
                reservation.getRoom().getId(),
                reservation.getAdmin().getUsername()
        );
    }
}
