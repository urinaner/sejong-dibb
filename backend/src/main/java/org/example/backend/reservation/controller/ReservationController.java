package org.example.backend.reservation.controller;

import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.backend.reservation.domain.dto.ReservationCreateDto;
import org.example.backend.reservation.domain.dto.ReservationDeleteRequest;
import org.example.backend.reservation.domain.dto.ReservationResDto;
import org.example.backend.reservation.service.ReservationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/room")
public class ReservationController {
    private final ReservationService reservationService;

    @PostMapping("/{roomId}/reservation")
    public ResponseEntity<List<ReservationResDto>> createReservation(
            @PathVariable(value = "roomId") Long roomId,
            @RequestBody @Valid ReservationCreateDto reqDto) {
        List<ReservationResDto> resDtos = reservationService.createReservation(roomId, reqDto);
        log.debug("Reservation created successfully: {}", resDtos);
        return ResponseEntity.ok(resDtos);
    }


    @GetMapping("/{roomId}/reservation")
    public ResponseEntity<List<ReservationResDto>> getReservationsByRoomAndDate(
            @PathVariable(name = "roomId") Long roomId,
            @RequestParam(value = "date", required = false) String date
    ) {
        List<ReservationResDto> reservations = reservationService.getReservationsByRoomAndDate(roomId, date);
        return ResponseEntity.ok(reservations);
    }

    @GetMapping("/{roomId}/reservation/month")
    public ResponseEntity<List<ReservationResDto>> getReservationsByRoomAndMonth(
            @PathVariable(value = "roomId") Long roomId,
            @RequestParam(required = false) String yearMonth) {
        List<ReservationResDto> reservations;
        if (yearMonth == null) {
            reservations = reservationService.getCurrentMonthReservations(roomId);
        } else {
            reservations = reservationService.getMonthReservations(roomId, yearMonth);
        }
        return ResponseEntity.ok(reservations);
    }


    @GetMapping("/{roomId}/reservation/{reservationId}")
    public ResponseEntity<ReservationResDto> getReservation(
            @PathVariable(value = "roomId") Long roomId,
            @PathVariable(value = "reservationId") Long reservationId) {
        ReservationResDto resDto = reservationService.getReservation(reservationId);
        return ResponseEntity.ok(resDto);
    }

    @DeleteMapping("/{roomId}/reservation/{reservationId}")
    public ResponseEntity<Void> deleteReservation(
            @PathVariable(value = "roomId") Long roomId,
            @PathVariable(value = "reservationId") Long reservationId,
            @RequestBody ReservationDeleteRequest request) {
        reservationService.deleteReservation(reservationId, request.getPassword());
        return ResponseEntity.ok().build();
    }

}