package org.example.backend.reservation.service.validation.strategy;

import static org.example.backend.reservation.exception.ReservationExceptionType.CONFLICT_TIMETABLE;

import lombok.RequiredArgsConstructor;
import org.example.backend.reservation.domain.dto.ReservationReqDto;
import org.example.backend.reservation.exception.ReservationException;
import org.example.backend.timetable.domain.WeekDay;
import org.example.backend.timetable.repository.TimetableRepository;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TimeTableOverlapValidator implements ReservationValidationStrategy {
    private final TimetableRepository timetableRepository;

    @Override
    public void validate(ReservationReqDto reqDto, Long seminarRoomId) {
        WeekDay weekDay = WeekDay.from(reqDto.getStartTime().getDayOfWeek());

        boolean hasTimeTableConflict = timetableRepository.existsByTimeOverlap(
                seminarRoomId,
                reqDto.getStartTime().toLocalDate(),
                reqDto.getStartTime().toLocalTime(),
                reqDto.getEndTime().toLocalTime(),
                weekDay
        );

        if (hasTimeTableConflict) {
            throw new ReservationException(CONFLICT_TIMETABLE);
        }
    }
}