package org.example.backend.reservation.controller;

import io.swagger.v3.oas.annotations.Parameter;
import java.time.LocalDate;
import lombok.RequiredArgsConstructor;
import org.example.backend.reservation.domain.ReservationStatus;
import org.example.backend.reservation.domain.dto.ReservationReqDto;
import org.example.backend.reservation.domain.dto.ReservationResDto;
import org.example.backend.reservation.service.ReservationService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/reservations")
public class ReservationController {
    private final ReservationService reservationService;

    @PostMapping("/seminarRoom/{seminarRoomId}")
    public ResponseEntity<ReservationResDto> createReservation(
            @PathVariable(value = "seminarRoomId") Long seminarRoomId,
            @RequestBody ReservationReqDto reqDto) {
        ReservationResDto resDto = reservationService.createReservation(seminarRoomId, reqDto);
        return ResponseEntity.ok(resDto);
    }

    @GetMapping
    public ResponseEntity<List<ReservationResDto>> getAllReservations() {
        List<ReservationResDto> reservations = reservationService.getAllReservations();
        return ResponseEntity.ok(reservations);
    }

    @GetMapping("seminarRoom/{seminarRoomId}")
    public ResponseEntity<List<ReservationResDto>> getReservationsBySeminarRoomAndDate(@PathVariable(name = "seminarRoomId") Long seminarRoomId,
                                                                                       @RequestParam(value = "status") ReservationStatus status,
                                                                                       @RequestParam(value = "date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date
                                                                                       ) {
        List<ReservationResDto> reservations = reservationService.getReservationsByRoomAndDate(seminarRoomId, date, status);
        return ResponseEntity.ok(reservations);
    }


    public ResponseEntity<List<ReservationResDto>> getReservationsBySeminarRoom(
            @PathVariable(value = "seminarRoomId") Long seminarRoomId) {
        List<ReservationResDto> reservations = reservationService.getReservationsByRoom(seminarRoomId);
        return ResponseEntity.ok(reservations);
    }

    @GetMapping("/{reservationId}")
    public ResponseEntity<ReservationResDto> getReservation(@PathVariable(value = "reservationId") Long id) {
        ReservationResDto resDto = reservationService.getReservation(id);
        return ResponseEntity.ok(resDto);
    }

    @PatchMapping("/{reservationId}/status")
    public ResponseEntity<ReservationResDto> updateReservationStatus(
            @PathVariable(value = "reservationId") Long id,
            @RequestParam(value = "status") ReservationStatus status) {
        ReservationResDto resDto = reservationService.updateReservationStatus(id, status);
        return ResponseEntity.ok(resDto);
    }

    @DeleteMapping("/{reservationId}")
    public ResponseEntity<Void> deleteReservation(@PathVariable(value = "reservationId") Long id) {
        reservationService.deleteReservation(id);
        return ResponseEntity.ok().build();
    }
}