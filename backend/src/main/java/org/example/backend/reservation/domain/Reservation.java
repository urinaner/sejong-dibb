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
    private List<Slot> slots = new ArrayList<>();

    @Builder
    private Reservation(LocalDateTime startTime, LocalDateTime endTime, ReservationPurpose purpose,
                        String etc, String loginId) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.purpose = purpose;
        this.etc = etc;
        this.loginId = loginId;
    }

    public void reserve(ReservationReqDto dto, String loginId) {
        this.purpose = ReservationPurpose.valueOf(dto.getPurpose());
        this.etc = dto.getEtc();
        this.loginId = loginId;
    }

    public static Reservation of(LocalDateTime startTime, LocalDateTime endTime, ReservationPurpose purpose,
                                 String etc, String loginId){
        return Reservation.builder()
                .startTime(startTime)
                .endTime(endTime)
                .purpose(purpose)
                .etc(etc)
                .loginId(loginId)
                .build();
    }
}