package org.example.backend.department.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.backend.department.domain.dto.Department.DepartmentReqDto;
import org.example.backend.department.domain.dto.Department.DepartmentResDto;
import org.example.backend.department.domain.entity.Department;
import org.example.backend.department.domain.mapper.DepartmentMapper;
import org.example.backend.department.exception.DepartmentException;
import org.example.backend.department.repository.DepartmentRepository;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static org.example.backend.department.exception.DepartmentExceptionType.NOT_FOUND_DEPARTMENT;
import static org.example.backend.department.exception.DepartmentExceptionType.REQUIRED_KOREAN_NAME;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DepartmentService {

    private final DepartmentMapper departmentMapper = Mappers.getMapper(DepartmentMapper.class);
    private final DepartmentRepository departmentRepository;

    @Transactional
    public Long saveDepartment(DepartmentReqDto departmentReqDto) {
        validateDepartmentRequiredFields(departmentReqDto);
        Department department = departmentMapper.toEntity(departmentReqDto);
        departmentRepository.save(department);
        return department.getId();
    }

    private void validateDepartmentRequiredFields(DepartmentReqDto departmentReqDto) {
        if (departmentReqDto.getKoreanName() == null || departmentReqDto.getKoreanName().isEmpty()) {
            throw new DepartmentException(REQUIRED_KOREAN_NAME);
        }
    }

    public DepartmentResDto getDepartment(Long departmentId) {
        Department department = findDepartmentById(departmentId);
        return departmentMapper.toDepartmentDto(department);
    }

    @Transactional
    public DepartmentResDto updateDepartment(Long departmentId, DepartmentReqDto departmentReqDto) {
        Department department = findDepartmentById(departmentId);
        departmentMapper.updateDepartmentFromDto(departmentReqDto, department);
        departmentRepository.save(department);
        return departmentMapper.toDepartmentDto(department);
    }

    @Transactional
    public void deleteDepartment(Long departmentId) {
        Department department = findDepartmentById(departmentId);
        departmentRepository.delete(department);
    }

    private Department findDepartmentById(Long departmentId) {
        return departmentRepository.findById(departmentId)
                .orElseThrow(() -> new DepartmentException(NOT_FOUND_DEPARTMENT));
    }
}
