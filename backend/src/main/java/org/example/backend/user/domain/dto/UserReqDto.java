package org.example.backend.user.domain.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserReqDto {

    private String studentId;

    private String name;

    private String major;

    private String phoneN;

    @Builder
    private UserReqDto(String studentId, String name, String major, String phoneN) {
        this.studentId = studentId;
        this.name = name;
        this.major = major;
        this.phoneN = phoneN;
    }

    public static UserReqDto of(String studentId, String name, String major, String phoneN) {
        return UserReqDto.builder()
                .studentId(studentId)
                .name(name)
                .major(major)
                .phoneN(phoneN)
                .build();
    }
}
