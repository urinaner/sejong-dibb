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
import org.example.backend.common.utils.TimeParsingUtils;
import org.example.backend.global.config.BaseEntity;
import org.example.backend.reservation.domain.dto.ReservationReqDto;
import org.example.backend.room.domain.Room;
import org.example.backend.user.domain.entity.User;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private Room room;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Builder
    private Reservation(LocalDateTime startTime, LocalDateTime endTime, ReservationPurpose purpose,
                        String etc, RepetitionType repetitionType, Room room, User user) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.purpose = purpose;
        this.etc = etc;
        this.repetitionType = repetitionType;
        this.room = room;
        this.user = user;
    }

    public static Reservation of(ReservationReqDto dto, Room room, User user) {
        return Reservation.builder()
                .startTime(TimeParsingUtils.formatterLocalDateTime(dto.getStartTime()))
                .endTime(TimeParsingUtils.formatterLocalDateTime(dto.getEndTime()))
                .purpose(ReservationPurpose.valueOf(dto.getDefaultPurpose()))
                .etc(dto.getEtc())
                .repetitionType(RepetitionType.valueOf(dto.getRepetitionType()))
                .room(room)
                .user(user)
                .build();
    }

}