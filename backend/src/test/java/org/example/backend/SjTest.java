package org.example.backend;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.yj.sejongauth.controller.Sj;
import org.yj.sejongauth.domain.SjProfile;

@SpringBootTest
public class SjTest {

    @Autowired
    protected Sj sj;

    @Test
    @Disabled
    void SjTest(){
        SjProfile sjProfile = sj.login("학번", "비번");
        System.out.println(sjProfile);
    }
}
