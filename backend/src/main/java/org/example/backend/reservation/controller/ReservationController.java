package org.example.backend.reservation.controller;

import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.backend.reservation.domain.ReservationStatus;
import org.example.backend.reservation.domain.dto.ReservationReqDto;
import org.example.backend.reservation.domain.dto.ReservationResDto;
import org.example.backend.reservation.service.ReservationService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/reservations")
public class ReservationController {
    private final ReservationService reservationService;

    @PostMapping("/seminarRoom/{seminarRoomId}")
    public ResponseEntity<List<ReservationResDto>> createReservation(
            @PathVariable(value = "seminarRoomId") Long seminarRoomId,
            @RequestBody ReservationReqDto reqDto) {
        log.debug("Reservation creation request received: {}", reqDto);
        try {
            List<ReservationResDto> resDtos = reservationService.createReservation(seminarRoomId, reqDto);
            log.debug("Reservation created successfully: {}", resDtos);
            return ResponseEntity.ok(resDtos);
        } catch (Exception e) {
            log.error("Error during reservation creation", e);
            throw e; // 예외 다시 던지기
        }
    }

    @GetMapping
    public ResponseEntity<List<ReservationResDto>> getAllReservations() {
        List<ReservationResDto> reservations = reservationService.getAllReservations();
        return ResponseEntity.ok(reservations);
    }

    @GetMapping("seminarRoom/{seminarRoomId}")
    public ResponseEntity<List<ReservationResDto>> getReservationsBySeminarRoomAndDate(
            @PathVariable(name = "seminarRoomId") Long seminarRoomId,
            @RequestParam(value = "status") ReservationStatus status,
            @RequestParam(value = "date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date
    ) {
        List<ReservationResDto> reservations = reservationService.getReservationsByRoomAndDate(seminarRoomId, date,
                status);
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