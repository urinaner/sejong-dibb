package org.example.backend.board.domain.mapper;

import jakarta.persistence.EntityNotFoundException;
import org.example.backend.board.domain.dto.BoardResDto;
import org.example.backend.board.domain.dto.reqDto.BoardCreateReqDto;
import org.example.backend.board.domain.dto.reqDto.BoardUpdateReqDto;
import org.example.backend.board.domain.entity.Board;
import org.example.backend.department.domain.entity.Department;
import org.example.backend.department.repository.DepartmentRepository;
import org.example.backend.global.config.CentralMapperConfig;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

@Mapper(config = CentralMapperConfig.class, componentModel = "spring")
public interface BoardMapper {
    BoardMapper INSTANCE = Mappers.getMapper(BoardMapper.class);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "department", expression = "java(mapDepartment(boardReqDto.getDepartmentId(), null, departmentRepository))")
    Board toEntity(BoardCreateReqDto boardReqDto, @Context DepartmentRepository departmentRepository);

    @Mapping(target = "id", ignore = true)
    Board toEntity(BoardUpdateReqDto boardReqDto);

    BoardResDto toBoardDto(Board board);

    @Mapping(target = "id", ignore = true)
    void updateBoardFromDto(BoardUpdateReqDto boardReqDto, @MappingTarget Board board);

    // Long을 Department로 매핑하는 헬퍼 메서드 추가
    default Department mapDepartment(Long departmentId, Department currentDepartment,
                                     @Context DepartmentRepository departmentRepository) {
        if (departmentId == null) {
            return currentDepartment;
        }
        return departmentRepository.findById(departmentId)
                .orElseThrow(() -> new EntityNotFoundException("Department not found with id " + departmentId));
    }
}
