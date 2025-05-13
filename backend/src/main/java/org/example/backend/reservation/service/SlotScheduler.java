package org.example.backend.reservation.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.example.backend.reservation.domain.Slot;
import org.example.backend.reservation.repository.SlotRepository;
import org.example.backend.room.domain.Room;
import org.example.backend.room.repository.RoomRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;


@Service
@RequiredArgsConstructor
public class SlotScheduler {
   private final SlotRepository slotRepository;
   private final RoomRepository roomRepository;

   @Scheduled(cron = "0 0 3 * * *", zone = "Asia/Seoul")
   @Transactional
   public void generateSlots() {
      LocalDate startDate = LocalDate.now().plusDays(1);
      LocalDate endDate = startDate.plusWeeks(4);
      for (Room room : roomRepository.findAll()) {
         for (LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {
            for (int min = 0; min < 24 * 60 ; min += 30) {
               LocalDateTime start = date.atTime(0, 0).plusMinutes(min);
               LocalDateTime end = start.plusMinutes(30);
               if (!slotRepository.existsByRoomAndStartTime(room, start)) {
                  Slot slot = Slot.of(room, start, end, null);
                  slotRepository.save(slot);
               }
            }
         }
      }
   }
}
