package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.domain.dto.Department.DepartmentDto;
import org.example.backend.domain.entity.Department;
import org.example.backend.repository.DepartmentRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DepartmentService {

    private final DepartmentRepository departmentRepository;

    public List<DepartmentDto> getAllDepartments() {
        List<Department> departments = departmentRepository.findAll();
        return departments.stream()
                .map(DepartmentDto::toDepartmentDTO)
                .collect(Collectors.toList());
    }

    public DepartmentDto getDepartment(Long id) {
        Department department = findDepartmentById(id);
        return DepartmentDto.toDepartmentDTO(department);
    }

    public Department createDepartment(DepartmentDto departmentDto) {
        Department department = Department.toSaveEntity(departmentDto);
        return departmentRepository.save(department);
    }

    public Department updateDepartment(Long id, DepartmentDto departmentDto) {
        Department department = findDepartmentById(id);
        Department.toUpdateEntity(departmentDto);
        return departmentRepository.save(department);
    }

    public void deleteDepartment(Long id) {
        departmentRepository.deleteById(id);
    }
    private Department findDepartmentById(Long id){
        return departmentRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("부서가 존재하지 않습니다."));
    }
}