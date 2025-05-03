package org.example.backend.reservationslot.domain;

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
import org.example.backend.reservationslot.domain.dto.ReservationCreateDto;
import org.example.backend.room.domain.Room;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "reservation_slot")
public class ReservationSlot extends BaseEntity {
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

    @Column(name = "login_id")
    private String loginId;

    @Column(name = "reserved")
    private boolean reserved;


    @Builder
    private ReservationSlot(LocalDateTime startTime, LocalDateTime endTime, ReservationPurpose purpose,
                        String etc, Room room, String loginId, boolean reserved) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.purpose = purpose;
        this.etc = etc;
        this.room = room;
        this.loginId = loginId;
        this.reserved = reserved;
    }

    public static ReservationSlot of(ReservationCreateDto dto, Room room, String loginId) {
        return ReservationSlot.builder()
                .startTime(dto.getStartTime())
                .endTime(dto.getEndTime())
                .purpose(ReservationPurpose.valueOf(dto.getPurpose()))
                .etc(dto.getEtc())
                .room(room)
                .loginId(loginId)
                .reserved(false)
                .build();
    }

    public void reserve(String loginId) {
        this.reserved = true;
        this.loginId = loginId;
    }
}