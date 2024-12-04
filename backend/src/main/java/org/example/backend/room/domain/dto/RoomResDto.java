package org.example.backend.room.domain.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.backend.room.domain.Room;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RoomResDto {
    private Long id;
    private String name;
    private Integer personCapacity;
    private String place;
    private String image;

    @Builder
    private RoomResDto(Long id, String name, Integer personCapacity, String place, String image) {
        this.id = id;
        this.name = name;
        this.personCapacity = personCapacity;
        this.place = place;
        this.image = image;
    }

    public static RoomResDto of(Room room) {
        return RoomResDto.builder()
                .id(room.getId())
                .name(room.getName())
                .personCapacity(room.getPersonCapacity())
                .place(room.getPlace())
                .image(room.getImage())
                .build();
    }
}