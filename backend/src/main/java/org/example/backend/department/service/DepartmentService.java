package org.example.backend.department.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.backend.department.domain.dto.Department.DepartmentReqDto;
import org.example.backend.department.domain.dto.Department.DepartmentResDto;
import org.example.backend.department.domain.entity.Department;
import org.example.backend.department.domain.mapper.DepartmentMapper;
import org.example.backend.department.repository.DepartmentRepository;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DepartmentService {

    private final DepartmentMapper departmentMapper = Mappers.getMapper(DepartmentMapper.class);
    private final DepartmentRepository departmentRepository;

    @Transactional
    public Long saveDepartment(DepartmentReqDto departmentReqDto) {
        Department department = departmentMapper.toEntity(departmentReqDto);
        departmentRepository.save(department);
        return department.getDepartmentId();
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
                .orElseThrow(() -> new IllegalArgumentException("부서 정보가 존재하지 않습니다."));
    }

}
