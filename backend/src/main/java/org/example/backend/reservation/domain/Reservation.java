package org.example.backend.reservation.domain;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.backend.common.domain.BaseEntity;
import org.example.backend.reservation.domain.dto.ReservationReqDto;
import org.example.backend.room.domain.Room;

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

    @Column(name = "login_id")
    private String loginId;

    @OneToMany(mappedBy = "reservation", cascade = CascadeType.ALL)
    private List<Slot> slots;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "room_id")
    private Room room;

    @Builder
    private Reservation(LocalDateTime startTime, LocalDateTime endTime, ReservationPurpose purpose,
                        String etc, String loginId, List<Slot> slots, Room room) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.purpose = purpose;
        this.etc = etc;
        this.loginId = loginId;
        this.slots = slots;
        this.room = room;
    }

    public static Reservation of(ReservationReqDto reqDto, String loginId, List<Slot> slots){
        return Reservation.builder()
                .startTime(reqDto.getStartTime())
                .endTime(reqDto.getEndTime())
                .purpose(ReservationPurpose.valueOf(reqDto.getPurpose()))
                .etc(reqDto.getEtc())
                .loginId(loginId)
                .slots(slots)
                .room(slots.getFirst().getRoom())
                .build();
    }
}