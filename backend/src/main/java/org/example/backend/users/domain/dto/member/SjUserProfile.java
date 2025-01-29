package org.example.backend.users.domain.dto.member;

public class SjUserProfile {
    private final String name;
    private final String major;

    public SjUserProfile(String name, String major) {
        this.name = name;
        this.major = major;
    }

    public String getName() {
        return name;
    }

    public String getMajor() {
        return major;
    }
}