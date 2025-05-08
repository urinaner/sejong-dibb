package org.example.backend.reservation.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.backend.common.domain.BaseEntity;
import org.example.backend.room.domain.Room;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "slot")
public class Slot extends BaseEntity {
    @Id @GeneratedValue
    @Column(name = "slot_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private Room room;

    @Column(name = "start_time")
    private LocalDateTime startTime;

    @Column(name = "end_time")
    private LocalDateTime endTime;

    @Column(name = "reserved")
    private boolean reserved;

    @Builder
    private Slot(Room room, LocalDateTime startTime, LocalDateTime endTime, boolean reserved) {
        this.room = room;
        this.startTime = startTime;
        this.endTime = endTime;
        this.reserved = reserved;
    }
}
