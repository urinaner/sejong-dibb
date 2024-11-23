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
    @Column(name = "user_id")
    private Long id;

    @Column(name = "student_id", unique = true)
    private String studentId;

    @Column(name = "name")
    private String name;

    @Column(name = "major")
    private String major;

    @Column(name = "phone", unique = true)
    private String phoneN;


    @Builder
    private User(String studentId, String name, String major, String phoneN) {
        this.studentId = studentId;
        this.name = name;
        this.major = major;
        this.phoneN = phoneN;
    }

    public static User of(String studentId, String name, String major, String phoneN) {
        return User.builder()
                .studentId(studentId)
                .name(name)
                .major(major)
                .phoneN(phoneN)
                .build();
    }

    public void update(UserReqDto dto) {
        this.name = dto.getName();
        this.major = dto.getMajor();
        this.phoneN = dto.getPhoneN();
    }
}
