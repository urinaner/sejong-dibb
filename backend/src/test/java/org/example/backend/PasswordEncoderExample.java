package org.example.backend;
import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

class PasswordEncoderExample {
        // BCryptPasswordEncoder 객체 생성
    @Test
                void passwordtest(){
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        // 인코딩할 비밀번호
        String rawPassword = "1234";

        // 비밀번호 인코딩
        String encodedPassword = passwordEncoder.encode(rawPassword);

        // 인코딩된 비밀번호 출력
        System.out.println("Encoded Password: " + encodedPassword);
}}