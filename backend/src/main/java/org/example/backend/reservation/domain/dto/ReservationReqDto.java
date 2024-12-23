package org.example.backend.reservation.domain.dto;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReservationReqDto {

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    @NotNull(message = "시작 시간은 필수 입력값입니다.")
    private String startTime;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    @NotNull(message = "종료 시간은 필수 입력값입니다.")
    private String endTime;

    @NotBlank(message = "목적은 필수 입력값입니다.")
    @Size(max = 100, message = "목적은 최대 100자까지 입력 가능합니다.")
    private String purpose;

    @Size(max = 200, message = "기타 내용은 최대 200자까지 입력 가능합니다.")
    private String etc;

    @Builder
    private ReservationReqDto(String startTime, String endTime,
                              String purpose, String etc) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.purpose = purpose;
        this.etc = etc;
    }

    public static ReservationReqDto of(String startTime, String endTime,
                                       String purpose, String etc) {
        return ReservationReqDto.builder()
                .startTime(startTime)
                .endTime(endTime)
                .purpose(purpose)
                .etc(etc)
                .build();
    }
}
