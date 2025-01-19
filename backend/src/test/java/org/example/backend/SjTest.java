package org.example.backend;

import org.example.backend.users.dto.SjLoginReq;
import org.example.backend.users.dto.SjUserProfile;
import org.example.backend.users.service.SjAuthService;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


@SpringBootTest
public class SjTest {

    @Autowired
    SjAuthService sjAuthService;

    @Test
    @Disabled
    void SjTest(){
        SjLoginReq test = new SjLoginReq("test", "test");
        SjUserProfile sjProfile = sjAuthService.authenticate(test);
        System.out.println(sjProfile.getMajor());
        System.out.println(sjProfile.getName());
    }
}
