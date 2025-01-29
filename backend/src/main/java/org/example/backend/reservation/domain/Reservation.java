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
import org.example.backend.common.domain.BaseEntity;
import org.example.backend.reservation.domain.dto.ReservationCreateDto;
import org.example.backend.room.domain.Room;
import org.example.backend.users.domain.entity.Users;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private Room room;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private Users admin;


    @Builder
    private Reservation(LocalDateTime startTime, LocalDateTime endTime, ReservationPurpose purpose,
                        String etc, Room room, Users admin) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.purpose = purpose;
        this.etc = etc;
        this.room = room;
        this.admin = admin;

    }

    public static Reservation of(ReservationCreateDto dto, Room room, Users admin) {
        return Reservation.builder()
                .startTime(dto.getStartTime())
                .endTime(dto.getEndTime())
                .purpose(ReservationPurpose.valueOf(dto.getPurpose()))
                .etc(dto.getEtc())
                .room(room)
                .admin(admin)
                .build();
    }

}