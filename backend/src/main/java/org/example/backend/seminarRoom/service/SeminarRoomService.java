package org.example.backend.seminarRoom.service;

import static org.example.backend.seminarRoom.exception.SeminarRoomExceptionType.INVALID_CAPACITY;
import static org.example.backend.seminarRoom.exception.SeminarRoomExceptionType.INVALID_NAME_VALUE;
import static org.example.backend.seminarRoom.exception.SeminarRoomExceptionType.NOT_FOUND_SEMINAR_ROOM;

import lombok.RequiredArgsConstructor;
import org.example.backend.seminarRoom.domain.SeminarRoom;
import org.example.backend.seminarRoom.domain.dto.SeminarRoomReqDto;
import org.example.backend.seminarRoom.domain.dto.SeminarRoomResDto;
import org.example.backend.seminarRoom.exception.SeminarRoomException;
import org.example.backend.seminarRoom.repository.SeminarRoomRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SeminarRoomService {
    private final SeminarRoomRepository seminarRoomRepository;

    @Transactional
    public SeminarRoomResDto createSeminarRoom(SeminarRoomReqDto reqDto) {
        validateSeminarRoom(reqDto);

        SeminarRoom seminarRoom = SeminarRoom.of(reqDto);
        seminarRoomRepository.save(seminarRoom);

        return SeminarRoomResDto.of(seminarRoom);
    }

    public SeminarRoomResDto getSeminarRoom(Long id) {
        SeminarRoom seminarRoom = seminarRoomRepository.findById(id)
                .orElseThrow(() -> new SeminarRoomException(NOT_FOUND_SEMINAR_ROOM));
        return SeminarRoomResDto.of(seminarRoom);
    }

    @Transactional
    public SeminarRoomResDto updateSeminarRoom(Long id, SeminarRoomReqDto reqDto) {
        validateSeminarRoom(reqDto);

        SeminarRoom seminarRoom = seminarRoomRepository.findById(id)
                .orElseThrow(() -> new SeminarRoomException(NOT_FOUND_SEMINAR_ROOM));

        seminarRoom.update(reqDto);
        return SeminarRoomResDto.of(seminarRoom);
    }

    @Transactional
    public void deleteSeminarRoom(Long id) {
        SeminarRoom seminarRoom = seminarRoomRepository.findById(id)
                .orElseThrow(() -> new SeminarRoomException(NOT_FOUND_SEMINAR_ROOM));
        seminarRoomRepository.delete(seminarRoom);
    }

    private void validateSeminarRoom(SeminarRoomReqDto reqDto) {
        if (reqDto.getName() == null || reqDto.getName().trim().isEmpty()) {
            throw new SeminarRoomException(INVALID_NAME_VALUE);
        }
        if (reqDto.getPersonCapacity() == null || reqDto.getPersonCapacity() <= 0) {
            throw new SeminarRoomException(INVALID_CAPACITY);
        }
    }
}
