package org.example.backend;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.TemporalAdjusters;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.AtomicInteger;
import org.example.backend.reservation.domain.Slot;
import org.example.backend.reservation.domain.dto.ReservationReqDto;
import org.example.backend.reservation.repository.ReservationRepository;
import org.example.backend.reservation.repository.SlotRepository;
import org.example.backend.reservation.service.ReservationService;
import org.example.backend.room.domain.Room;
import org.example.backend.room.repository.RoomRepository;
import org.example.backend.users.domain.entity.Role;
import org.example.backend.users.domain.entity.Users;
import org.example.backend.users.repository.UsersRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.orm.ObjectOptimisticLockingFailureException;
import org.springframework.test.context.ActiveProfiles;

@ActiveProfiles("test")
@SpringBootTest
public class LockPerformanceComparisonTest {

    @Autowired private ReservationService reservationService;
    @Autowired private SlotRepository slotRepository;
    @Autowired private ReservationRepository reservationRepository;
    @Autowired private RoomRepository roomRepository;
    @Autowired private UsersRepository usersRepository;

    private static final int THREAD_COUNT = 100;
    private static final String LOGIN_ID = "20003210";

    private Room testRoom;
    private LocalDateTime startTime;
    private LocalDateTime endTime;

    @BeforeEach
    void setUp() {
        reservationRepository.deleteAll();
        slotRepository.deleteAll();
        roomRepository.deleteAll();
        usersRepository.deleteAll();

        usersRepository.save(Users.builder()
                .loginId(LOGIN_ID)
                .username("테스트유저")
                .password("password")
                .role(Role.ROLE_MEMBER)
                .build());

        testRoom = roomRepository.save(Room.builder().build());

        LocalDate nextMonday = LocalDate.now().with(TemporalAdjusters.next(DayOfWeek.MONDAY));
        startTime = nextMonday.atTime(10, 0);
        endTime = startTime.plusHours(1);

        // 50개 스레드가 동시에 노리는 슬롯 2개 (10:00~10:30, 10:30~11:00)
        slotRepository.save(Slot.of(testRoom, startTime, startTime.plusMinutes(30), null));
        slotRepository.save(Slot.of(testRoom, startTime.plusMinutes(30), endTime, null));
    }

    @Test
    void 비관적락_성능_측정() throws InterruptedException {
        ExecutorService executorService = Executors.newFixedThreadPool(THREAD_COUNT);
        CountDownLatch latch = new CountDownLatch(THREAD_COUNT);

        AtomicInteger successCount = new AtomicInteger(0);
        AtomicInteger failCount = new AtomicInteger(0);

        long start = System.currentTimeMillis();

        for (int i = 0; i < THREAD_COUNT; i++) {
            executorService.execute(() -> {
                try {
                    ReservationReqDto req = ReservationReqDto.of(startTime, endTime, "CLASS", "성능테스트");
                    reservationService.createReservation(testRoom.getId(), req, LOGIN_ID);
                    successCount.incrementAndGet();
                } catch (Exception e) {
                    failCount.incrementAndGet();
                } finally {
                    latch.countDown();
                }
            });
        }

        latch.await();
        long elapsed = System.currentTimeMillis() - start;
        executorService.shutdown();

        System.out.printf("%n=== 비관적 락 (PESSIMISTIC_WRITE) ===%n");
        System.out.printf("스레드: %d | 성공: %d | 실패: %d | 소요: %dms%n",
                THREAD_COUNT, successCount.get(), failCount.get(), elapsed);

        assertEquals(1, successCount.get());
    }

    @Test
    void 낙관적락_성능_측정() throws InterruptedException {
        ExecutorService executorService = Executors.newFixedThreadPool(THREAD_COUNT);
        CountDownLatch latch = new CountDownLatch(THREAD_COUNT);

        AtomicInteger successCount = new AtomicInteger(0);
        AtomicInteger failCount = new AtomicInteger(0);

        long start = System.currentTimeMillis();

        for (int i = 0; i < THREAD_COUNT; i++) {
            executorService.execute(() -> {
                try {
                    ReservationReqDto req = ReservationReqDto.of(startTime, endTime, "CLASS", "성능테스트");
                    reservationService.createReservationOptimistic(testRoom.getId(), req, LOGIN_ID);
                    successCount.incrementAndGet();
                } catch (ObjectOptimisticLockingFailureException e) {
                    failCount.incrementAndGet();
                } catch (Exception e) {
                    failCount.incrementAndGet();
                } finally {
                    latch.countDown();
                }
            });
        }

        latch.await();
        long elapsed = System.currentTimeMillis() - start;
        executorService.shutdown();

        System.out.printf("%n=== 낙관적 락 (OPTIMISTIC) ===%n");
        System.out.printf("스레드: %d | 성공: %d | 실패: %d | 소요: %dms%n",
                THREAD_COUNT, successCount.get(), failCount.get(), elapsed);

        assertEquals(1, successCount.get());
    }
}