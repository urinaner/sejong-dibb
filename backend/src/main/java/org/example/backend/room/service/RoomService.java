package org.example.backend.room.service;

import static org.example.backend.room.exception.RoomExceptionType.INVALID_CAPACITY;
import static org.example.backend.room.exception.RoomExceptionType.INVALID_NAME_VALUE;
import static org.example.backend.room.exception.RoomExceptionType.NOT_FOUND_SEMINAR_ROOM;

import lombok.RequiredArgsConstructor;
import org.example.backend.room.domain.Room;
import org.example.backend.room.domain.dto.RoomReqDto;
import org.example.backend.room.domain.dto.RoomResDto;
import org.example.backend.room.exception.RoomException;
import org.example.backend.room.repository.RoomRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RoomService {
    private final RoomRepository roomRepository;

    @Transactional
    public RoomResDto createSeminarRoom(RoomReqDto reqDto) {
        validateSeminarRoom(reqDto);

        Room room = Room.of(reqDto);
        roomRepository.save(room);

        return RoomResDto.of(room);
    }

    public RoomResDto getSeminarRoom(Long id) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new RoomException(NOT_FOUND_SEMINAR_ROOM));
        return RoomResDto.of(room);
    }

    @Transactional
    public RoomResDto updateSeminarRoom(Long id, RoomReqDto reqDto) {
        validateSeminarRoom(reqDto);

        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new RoomException(NOT_FOUND_SEMINAR_ROOM));

        room.update(reqDto);
        return RoomResDto.of(room);
    }

    @Transactional
    public void deleteSeminarRoom(Long id) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new RoomException(NOT_FOUND_SEMINAR_ROOM));
        roomRepository.delete(room);
    }

    private void validateSeminarRoom(RoomReqDto reqDto) {
        if (reqDto.getName() == null || reqDto.getName().trim().isEmpty()) {
            throw new RoomException(INVALID_NAME_VALUE);
        }
        if (reqDto.getPersonCapacity() == null || reqDto.getPersonCapacity() <= 0) {
            throw new RoomException(INVALID_CAPACITY);
        }
    }
}
