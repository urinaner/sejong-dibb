package org.example.backend.room.domain.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RoomReqDto {
    private String name;
    private Integer personCapacity;
    private String place;
    private String image;

    @Builder
    private RoomReqDto(String name, Integer personCapacity, String place, String image) {
        this.name = name;
        this.personCapacity = personCapacity;
        this.place = place;
        this.image = image;
    }

    public static RoomReqDto of(String name, Integer personCapacity, String place, String image) {
        return RoomReqDto.builder()
                .name(name)
                .personCapacity(personCapacity)
                .place(place)
                .image(image)
                .build();
    }
}