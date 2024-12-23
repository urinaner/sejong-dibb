package org.example.backend.department.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.department.domain.dto.Department.DepartmentReqDto;
import org.example.backend.department.domain.dto.Department.DepartmentResDto;
import org.example.backend.department.domain.entity.Department;
import org.example.backend.department.exception.DepartmentException;
import org.example.backend.department.repository.DepartmentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static org.example.backend.department.exception.DepartmentExceptionType.NOT_FOUND_DEPARTMENT;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DepartmentService {
    private final DepartmentRepository departmentRepository;

    @Transactional
    public Long saveDepartment(DepartmentReqDto departmentReqDto) {
        Department department = Department.of(departmentReqDto);
        departmentRepository.save(department);
        return department.getId();
    }

    public DepartmentResDto getDepartment(Long departmentId) {
        Department department = findDepartmentById(departmentId);
        return DepartmentResDto.of(department);
    }

    @Transactional
    public DepartmentResDto updateDepartment(Long departmentId, DepartmentReqDto departmentReqDto) {
        Department department = findDepartmentById(departmentId);
        department.update(departmentReqDto);
        return DepartmentResDto.of(department);
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