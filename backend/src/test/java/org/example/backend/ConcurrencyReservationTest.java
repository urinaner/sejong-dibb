package org.example.backend;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import org.example.backend.reservationslot.domain.ReservationSlot;
import org.example.backend.reservationslot.domain.dto.ReservationCreateDto;
import org.example.backend.reservationslot.domain.dto.ReservationResDto;
import org.example.backend.reservationslot.repository.ReservationSlotRepository;
import org.example.backend.reservationslot.service.ReservationSlotService;
import org.example.backend.room.domain.Room;
import org.example.backend.room.repository.RoomRepository;
import org.example.backend.users.domain.entity.Role;
import org.example.backend.users.domain.entity.Users;
import org.example.backend.users.repository.UsersRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import org.springframework.test.context.ActiveProfiles;


@ActiveProfiles("test")
@SpringBootTest
public class ConcurrencyReservationTest {

    @Autowired
    private ReservationSlotService reservationSlotService;

    @Autowired
    private ReservationSlotRepository reservationRepository;

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private RoomRepository roomRepository;

    private final Long testRoomId = 1L; //
    private LocalDateTime endTime;
    private LocalDateTime startTime;

    @BeforeEach
    public void setUp() {

        startTime = LocalDateTime.now().plusDays(1);
        endTime = startTime.plusHours(2);

        Users user = Users.builder()
                .loginId("20003210")
                .username("장영재")
                .password("password")
                .role(Role.ROLE_MEMBER)
                .build();

        usersRepository.save(user); //저장

        Room room = Room.builder().build();

        roomRepository.save(room);
    }

    @Test
    public void 동시에_2개_예약_요청() throws InterruptedException {
        int threadCount = 2;
        ExecutorService executorService = Executors.newFixedThreadPool(threadCount);
        CountDownLatch latch = new CountDownLatch(threadCount);

        for (int i = 0; i < threadCount; i++) {
            executorService.submit(() -> {
                try {
                    ReservationCreateDto request = ReservationCreateDto.of(startTime, endTime, "CLASS", "기타 내용");
                    ReservationResDto response = reservationSlotService.createReservation(testRoomId, request, "20003210");
                    System.out.println("예약 완료: " + response);
                } catch (Exception e) {
                    System.err.println("예약 실패: " + e.getMessage());
                } finally {
                    latch.countDown();
                }
            });
        }

        latch.await();
        executorService.shutdown();

        List<ReservationSlot> allReservation = reservationRepository.findAll();
        int reservationLen = allReservation.size();
        assertEquals(2, reservationLen); //이거 하나만 되게 해야됨
    }
}
