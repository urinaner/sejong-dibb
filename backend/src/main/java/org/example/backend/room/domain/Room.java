package org.example.backend.room.domain;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.backend.reservation.domain.Reservation;
import org.example.backend.reservation.domain.Slot;
import org.example.backend.room.domain.dto.RoomReqDto;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "room")
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "person_capacity")
    private Integer personCapacity;

    @Column(name = "place")
    private String place;

    @Column(name = "image")
    private String image;

    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Slot> slots = new ArrayList<>();

    @Builder
    public Room(String name, Integer personCapacity, String place, String image) {
        this.name = name;
        this.personCapacity = personCapacity;
        this.place = place;
        this.image = image;
    }

    public static Room of(RoomReqDto dto) {
        return Room.builder()
                .name(dto.getName())
                .personCapacity(dto.getPersonCapacity())
                .place(dto.getPlace())
                .image(dto.getImage())
                .build();
    }

    public void update(RoomReqDto dto) {
        this.name = dto.getName();
        this.personCapacity = dto.getPersonCapacity();
        this.place = dto.getPlace();
        this.image = dto.getImage();
    }
}