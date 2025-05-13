package org.example.backend.reservation;

import org.example.backend.reservation.domain.dto.ReservationReqDto;
import org.example.backend.reservation.exception.ReservationException;
import org.example.backend.reservation.repository.ReservationRepository;
import org.example.backend.reservation.repository.SlotRepository;
import org.example.backend.reservation.service.ReservationService;
import org.example.backend.room.repository.RoomRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ReservationServiceTest {

    @Mock
    private SlotRepository slotRepository;

    @Mock
    private ReservationRepository reservationRepository;

    @Mock
    private RoomRepository roomRepository;

    @InjectMocks
    private ReservationService reservationService;

    @Test
    @DisplayName("슬롯들이_불가용_상태면_예외처리")
    void createReservation_ShouldThrowException_WhenSlotsAreUnavailable() {
        // Given
        Long roomId = 1L;
        ReservationReqDto reqDto = ReservationReqDto.of(
                LocalDateTime.of(2099, 12, 31, 10, 0),
                LocalDateTime.of(2099, 12, 31, 11, 0),
                "MEETTING",
                "Test"
        );

        // When
        when(slotRepository.findSlotsForUpdate(roomId, reqDto.getStartTime(), reqDto.getEndTime()))
                .thenReturn(List.of()); // 슬롯이 부족한 상황

        // Then
        assertThrows(ReservationException.class, () ->
                reservationService.createReservation(roomId, reqDto, "testUser")
        );
    }
}
