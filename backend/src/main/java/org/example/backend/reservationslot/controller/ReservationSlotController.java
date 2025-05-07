package org.example.backend.reservationslot.controller;

import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.backend.common.aop.auth.LoginUser;
import org.example.backend.reservationslot.domain.dto.ReservationReqDto;
import org.example.backend.reservationslot.domain.dto.ReservationResDto;
import org.example.backend.reservationslot.service.ReservationSlotService;
import org.springframework.http.HttpStatus;
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
public class ReservationSlotController {
    private final ReservationSlotService reservationSlotService;

    @PostMapping("/{roomId}/reservation")
    public ResponseEntity<List<ReservationResDto>> createReservation(
            @PathVariable(value = "roomId") Long roomId,
            @RequestBody @Valid ReservationReqDto reqDto,
            @LoginUser String loginId) {
        List<ReservationResDto> resDtos = reservationSlotService.createReservation(roomId, reqDto, loginId);
        return ResponseEntity.status(HttpStatus.CREATED).body(resDtos);
    }


    @GetMapping("/{roomId}/reservation")
    public ResponseEntity<List<ReservationResDto>> getReservationsByRoomAndDate(
            @PathVariable(name = "roomId") Long roomId,
            @RequestParam(value = "date", required = false) String date
    ) {
        List<ReservationResDto> reservations = reservationSlotService.getReservationsByRoomAndDate(roomId, date);
        return ResponseEntity.ok(reservations);
    }

    @GetMapping("/{roomId}/reservation/month")
    public ResponseEntity<List<ReservationResDto>> getReservationsByRoomAndMonth(
            @PathVariable(value = "roomId") Long roomId,
            @RequestParam(required = false) String yearMonth) {
        List<ReservationResDto> reservations;
        if (yearMonth == null) {
            reservations = reservationSlotService.getCurrentMonthReservations(roomId);
        } else {
            reservations = reservationSlotService.getMonthReservations(roomId, yearMonth);
        }
        return ResponseEntity.ok(reservations);
    }

    // TODO: id 여러개 받아서 삭제하는 API 추가 or 그대로?
    @DeleteMapping("/{roomId}/reservation/{reservationId}")
    public ResponseEntity<Void> deleteReservation(
            @PathVariable(value = "roomId") Long roomId,
            @PathVariable(value = "reservationId") Long reservationId,
            @LoginUser String loginId) {
        reservationSlotService.deleteReservation(reservationId, loginId);
        return ResponseEntity.ok().build();
    }

}