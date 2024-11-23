package org.example.backend.user.domain.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.backend.user.domain.entity.User;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserResDto {

    private Long id;

    private String studentId;

    private String name;

    private String major;

    private String phoneN;

    @Builder
    private UserResDto(Long id, String studentId, String name, String major, String phoneN) {
        this.id = id;
        this.studentId = studentId;
        this.name = name;
        this.major = major;
        this.phoneN = phoneN;
    }

    public static UserResDto of(User user) {
        return UserResDto.builder()
                .id(user.getId())
                .studentId(user.getStudentId())
                .name(user.getName())
                .major(user.getMajor())
                .phoneN(user.getPhoneN())
                .build();
    }
}