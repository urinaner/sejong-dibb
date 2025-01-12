package org.example.backend.seminar.domain.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SeminarReqDto {

    @NotBlank(message = "세미나 이름은 필수 입력값입니다.")
    @Size(max = 200, message = "세미나 이름은 최대 200자까지 입력 가능합니다")
    private String name;

    @Size(max = 100, message = "작성자는 최대 100자까지 입력 가능합니다")
    private String writer;

    @Size(max = 100, message = "장소는 최대 100자까지 입력 가능합니다")
    private String place;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    @NotNull(message = "시작 시간은 필수 입력값입니다.")
    private String startTime;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    @NotNull(message = "종료 시간은 필수 입력값입니다.")
    private String endTime;

    @Size(max = 100, message = "연사는 최대 100자까지 입력 가능합니다")
    private String speaker;

    @Size(max = 100, message = "소속은 최대 100자까지 입력 가능합니다")
    private String company;

    @Builder
    private SeminarReqDto(String name, String writer, String place,
                          String startTime, String endTime, String speaker, String company) {
        this.name = name;
        this.writer = writer;
        this.place = place;
        this.startTime = startTime;
        this.endTime = endTime;
        this.speaker = speaker;
        this.company = company;
    }

    public static SeminarReqDto of(String name, String writer, String place,
                                   String startTime, String endTime, String speaker, String company) {
        return SeminarReqDto.builder()
                .name(name)
                .writer(writer)
                .place(place)
                .startTime(startTime)
                .endTime(endTime)
                .speaker(speaker)
                .company(company)
                .build();
    }
}
