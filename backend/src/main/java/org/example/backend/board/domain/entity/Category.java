package org.example.backend.board.domain.entity;

import java.util.Arrays;

public enum Category {
    undergraduate("학부"),
    graduate("대학원"),
    employment("취업"),
    scholarship("장학금");

    private final String description;

    Category(String description) {
        this.description = description;
    }

    public static boolean contains(final String name) {
        return Arrays.stream(Category.values())
                .anyMatch(o -> o.name().equals(name));
    }
    public String getDescription() {
        return description;
    }
}