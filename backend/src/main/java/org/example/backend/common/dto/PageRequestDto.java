package org.example.backend.common.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

@Getter
@Setter
public class PageRequestDto {

    @Min(value = 0, message = "페이지 번호는 0 이상이어야 합니다.")
    private int page = 0;

    @Min(value = 1, message = "페이지 크기는 최소 1이어야 합니다.")
    @Max(value = 100, message = "페이지 크기는 최대 100이어야 합니다.")
    private int size = 10;

    @Pattern(regexp = "^[a-zA-Z0-9_]+$", message = "정렬 기준은 알파벳, 숫자, 또는 언더스코어(_)만 포함할 수 있습니다.")
    private String sort = "id";

    @Pattern(regexp = "^(ASC|DESC)$", message = "정렬 방향은 'ASC' 또는 'DESC'만 가능합니다.")
    private String sortDirection = "ASC";

    public Pageable toPageable() {
        Sort.Direction direction = Sort.Direction.valueOf(sortDirection.toUpperCase());
        return PageRequest.of(page, size, direction, sort);
    }

    public Pageable toPageableUnsorted() {
        return PageRequest.of(page, size, Sort.unsorted());
    }
}
