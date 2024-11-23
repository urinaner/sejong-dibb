package org.example.backend.seminarRoom.domain.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SeminarRoomReqDto {
    private String name;
    private Integer personCapacity;
    private String place;
    private String image;

    @Builder
    private SeminarRoomReqDto(String name, Integer personCapacity, String place, String image) {
        this.name = name;
        this.personCapacity = personCapacity;
        this.place = place;
        this.image = image;
    }

    public static SeminarRoomReqDto of(String name, Integer personCapacity, String place, String image) {
        return SeminarRoomReqDto.builder()
                .name(name)
                .personCapacity(personCapacity)
                .place(place)
                .image(image)
                .build();
    }
}