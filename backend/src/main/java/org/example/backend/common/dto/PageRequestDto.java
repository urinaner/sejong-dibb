package org.example.backend.common.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

@Getter
@Setter
public class PageRequestDto {
    @Min(0)
    private int page = 0;

    @Min(1) @Max(100)
    private int size = 10;

    private String sort = "id";
    private String sortDirection = "ASC";

    public Pageable toPageable() {
        Sort.Direction direction = Sort.Direction.valueOf(sortDirection.toUpperCase());
        return PageRequest.of(page, size, direction, sort);
    }
}