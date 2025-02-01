package org.example.backend;


import org.example.backend.users.domain.dto.SignInReqDto;
import org.example.backend.users.domain.dto.member.SjUserProfile;
import org.example.backend.users.service.MemberService;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


@SpringBootTest
public class SjTest {

    @Autowired
    MemberService sjAuthService;

    @Test
    @Disabled
    void SjTest() {
        SignInReqDto test = new SignInReqDto("loginId", "password");
        SjUserProfile sjProfile = sjAuthService.authenticate(test);
        System.out.println(sjProfile.getMajor());
        System.out.println(sjProfile.getName());
    }
}
