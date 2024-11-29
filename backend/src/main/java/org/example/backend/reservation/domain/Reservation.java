package org.example.backend.reservation.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.backend.global.config.BaseEntity;
import org.example.backend.reservation.domain.dto.ReservationReqDto;
import org.example.backend.seminarRoom.domain.SeminarRoom;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "reservation")
public class Reservation extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reservation_id")
    private Long id;

    @Column(name = "start_time")
    private LocalDateTime startTime;

    @Column(name = "end_time")
    private LocalDateTime endTime;

    @Enumerated(EnumType.STRING)
    @Column(name = "purpose")
    private ReservationPurpose purpose;

    @Column(name = "etc")
    private String etc;

    @Enumerated(EnumType.STRING)
    @Column(name = "repetition_type")
    private RepetitionType repetitionType;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private ReservationStatus status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seminar_room_id")
    private SeminarRoom seminarRoom;

    @Column(name = "user_id")
    private Long userId;

    @Builder
    private Reservation(LocalDateTime startTime, LocalDateTime endTime, ReservationPurpose purpose,
                        String etc, RepetitionType repetitionType, ReservationStatus status, SeminarRoom seminarRoom, Long userId) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.purpose = purpose;
        this.etc = etc;
        this.repetitionType = repetitionType;
        this.status = status;
        this.seminarRoom = seminarRoom;
        this.userId = userId;
    }

    public static Reservation of(ReservationReqDto dto, SeminarRoom seminarRoom) {
        return Reservation.builder()
                .startTime(dto.getStartTime())
                .endTime(dto.getEndTime())
                .purpose(ReservationPurpose.valueOf(dto.getDefaultPurpose()))
                .etc(dto.getEtc())
                .repetitionType(RepetitionType.valueOf(dto.getRepetitionType()))
                .status(ReservationStatus.APPROVED)
                .seminarRoom(seminarRoom)
                .userId(dto.getUserId())
                .build();
    }

    public void update(ReservationReqDto dto, SeminarRoom seminarRoom) {
        this.startTime = dto.getStartTime();
        this.endTime = dto.getEndTime();
        this.purpose = ReservationPurpose.valueOf(dto.getDefaultPurpose());
        this.etc = dto.getEtc();
        this.seminarRoom = seminarRoom;
    }

    public void updateStatus(ReservationStatus status) {
        this.status = status;
    }
}