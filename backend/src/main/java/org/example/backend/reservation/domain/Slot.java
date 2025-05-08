package org.example.backend.reservation.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.backend.common.domain.BaseEntity;
import org.example.backend.room.domain.Room;

import java.time.LocalDateTime;

import static jakarta.persistence.FetchType.LAZY;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "slot")
public class Slot extends BaseEntity {
    @Id @GeneratedValue
    @Column(name = "slot_id")
    private Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "room_id")
    private Room room;

    @Column(name = "start_time")
    private LocalDateTime startTime;

    @Column(name = "end_time")
    private LocalDateTime endTime;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "reservation_id")
    private Reservation reservation; // 예약이 붙어 있지 않으면 null

    @Builder
    private Slot(Room room, LocalDateTime startTime, LocalDateTime endTime, Reservation reservation) {
        this.room = room;
        this.startTime = startTime;
        this.endTime = endTime;
        this.reservation = reservation;
    }

    public static Slot of(Room room, LocalDateTime startTime, LocalDateTime endTime, Reservation reservation) {
        return Slot.builder()
                .room(room)
                .startTime(startTime)
                .endTime(endTime)
                .reservation(reservation)
                .build();
    }
}
