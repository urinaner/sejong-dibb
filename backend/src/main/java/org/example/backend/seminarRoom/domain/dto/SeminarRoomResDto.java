package org.example.backend.seminarRoom.domain.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.backend.seminarRoom.domain.SeminarRoom;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SeminarRoomResDto {
    private Long id;
    private String name;
    private Integer personCapacity;
    private String place;
    private String image;

    @Builder
    private SeminarRoomResDto(Long id, String name, Integer personCapacity, String place, String image) {
        this.id = id;
        this.name = name;
        this.personCapacity = personCapacity;
        this.place = place;
        this.image = image;
    }

    public static SeminarRoomResDto of(SeminarRoom seminarRoom) {
        return SeminarRoomResDto.builder()
                .id(seminarRoom.getId())
                .name(seminarRoom.getName())
                .personCapacity(seminarRoom.getPersonCapacity())
                .place(seminarRoom.getPlace())
                .image(seminarRoom.getImage())
                .build();
    }
}