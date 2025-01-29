package org.example.backend.users.domain.dto.member;

import lombok.Data;

@Data
public class SjLoginReq {
    private final String userId;
    private final String password;

    public SjLoginReq(String userId, String password) {
        this.userId = userId;
        this.password = password;
    }

    public String getUserId() {
        return userId;
    }

    public String getPassword() {
        return password;
    }
}