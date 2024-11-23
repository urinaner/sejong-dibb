package org.example.backend.seminarRoom.domain;

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
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.backend.reservation.domain.Reservation;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "seminar_room")
public class SeminarRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "seminar_room_id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "person_capacity")
    private Integer personCapacity;

    @Column(name = "place")
    private String place;

    @Column(name = "image")
    private String image;

    @OneToMany(mappedBy = "seminarRoom", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Reservation> reservations = new ArrayList<>();
}
