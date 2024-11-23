package org.example.backend.seminarRoom.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.seminarRoom.domain.SeminarRoom;
import org.example.backend.seminarRoom.domain.dto.SeminarRoomReqDto;
import org.example.backend.seminarRoom.domain.dto.SeminarRoomResDto;
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
                .orElseThrow(() -> new IllegalArgumentException("세미나실이 존재하지 않습니다."));
        return SeminarRoomResDto.of(seminarRoom);
    }

    @Transactional
    public SeminarRoomResDto updateSeminarRoom(Long id, SeminarRoomReqDto reqDto) {
        validateSeminarRoom(reqDto);

        SeminarRoom seminarRoom = seminarRoomRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("세미나실이 존재하지 않습니다."));

        seminarRoom.update(reqDto);
        return SeminarRoomResDto.of(seminarRoom);
    }

    @Transactional
    public void deleteSeminarRoom(Long id) {
        SeminarRoom seminarRoom = seminarRoomRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("세미나실이 존재하지 않습니다."));
        seminarRoomRepository.delete(seminarRoom);
    }

    private void validateSeminarRoom(SeminarRoomReqDto reqDto) {
        if (reqDto.getName() == null || reqDto.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("세미나실 이름은 필수입니다.");
        }
        if (reqDto.getPersonCapacity() == null || reqDto.getPersonCapacity() <= 0) {
            throw new IllegalArgumentException("수용 인원은 1명 이상이어야 합니다.");
        }
    }
}
