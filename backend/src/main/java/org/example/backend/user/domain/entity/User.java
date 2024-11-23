package org.example.backend.user.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.backend.user.domain.dto.UserReqDto;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", nullable = false)
    private Long id;

    @Column(name = "student_id", unique = true)
    private String studentId;

    @Column(name = "name")
    private String name;

    @Column(name = "major")
    private String major;

    @Column(name = "phone", unique = true)
    private String phoneN;

    @Column(name = "role", nullable = false)
    private String role = "USER";

    @Builder
    private User(String studentId, String name, String major, String phoneN) {
        this.studentId = studentId;
        this.name = name;
        this.major = major;
        this.phoneN = phoneN;
    }

    public static User of(UserReqDto dto) {
        return User.builder()
                .studentId(dto.getStudentId())
                .name(dto.getName())
                .major(dto.getMajor())
                .phoneN(dto.getPhoneN())
                .build();
    }

    public void update(UserReqDto dto) {
        this.name = dto.getName();
        this.major = dto.getMajor();
        this.phoneN = dto.getPhoneN();
    }
}
