package org.example.backend.reservationslot.domain.dto;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.*;

import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.backend.reservationslot.exception.ReservationException;

import static org.example.backend.reservationslot.exception.ReservationExceptionType.INVALID_TIME_ORDER;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReservationReqDto {

    @NotNull(message = "시작 시간은 필수 입력값입니다.")
    @FutureOrPresent(message = "시작 시간은 현재 이후여야 합니다.")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime startTime;

    @NotNull(message = "종료 시간은 필수 입력값입니다.")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime endTime;

    @NotBlank(message = "목적은 필수 입력값입니다.")
    @Size(max = 100, message = "목적은 최대 100자까지 입력 가능합니다.")
    private String purpose;

    @Size(max = 200, message = "기타 내용은 최대 200자까지 입력 가능합니다.")
    private String etc;

    @AssertTrue(message = "시작 시간은 종료 시간 이전이어야 합니다.")
    private boolean isTimeOrderValid() {
        if (startTime == null || endTime == null) return true;
        return !startTime.isAfter(endTime);
    }

    @Builder
    private ReservationReqDto(LocalDateTime startTime, LocalDateTime endTime,
                              String purpose, String etc) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.purpose = purpose;
        this.etc = etc;
    }

    public static ReservationReqDto of(LocalDateTime startTime, LocalDateTime endTime,
                                       String purpose, String etc) {
        return ReservationReqDto.builder()
                .startTime(startTime)
                .endTime(endTime)
                .purpose(purpose)
                .etc(etc)
                .build();
    }
}
