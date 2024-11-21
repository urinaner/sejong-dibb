package org.example.backend.board.domain.entity;

public enum Category {
    undergraduate("학부"),
    graduate("대학원"),
    employment("취업"),
    scholarship("장학금");

    private final String description;

    Category(String description) {
        this.description = description;
    }
    public String getDescription() {
        return description;
    }
}