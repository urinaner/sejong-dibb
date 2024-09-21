package org.example.backend.controller;


import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.example.backend.domain.dto.Department.DepartmentDto;
import org.example.backend.domain.entity.Department;
import org.example.backend.service.DepartmentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/departments")
public class DepartmentController {

    private final DepartmentService departmentService;

    @GetMapping
    @ApiOperation("모든 부서 조회")
    public ResponseEntity<List<DepartmentDto>> getAllDepartments() {
        List<DepartmentDto> departments = departmentService.getAllDepartments();
        return ResponseEntity.ok(departments);
    }

    @GetMapping("/{id}")
    @ApiOperation("부서 상세 조회")
    public ResponseEntity<DepartmentDto> getDepartment(
            @PathVariable Long id) {
        DepartmentDto department = departmentService.getDepartment(id);
        return ResponseEntity.ok(department);
    }

    @PostMapping
    @ApiOperation("신규 부서 생성")
    public ResponseEntity<Department> createDepartment(
            @RequestBody DepartmentDto departmentDto) {
        Department createdDepartment = departmentService.createDepartment(departmentDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdDepartment);
    }

    @PutMapping("/{id}")
    @ApiOperation("부서 정보 수정")
    public ResponseEntity<Department> updateDepartment(
            @PathVariable Long id, @RequestBody DepartmentDto departmentDto) {
        Department updatedDepartment = departmentService.updateDepartment(id, departmentDto);
        return ResponseEntity.ok(updatedDepartment);
    }

    @DeleteMapping("/{id}")
    @ApiOperation("부서 삭제")
    public ResponseEntity<Void> deleteDepartment(
            @PathVariable Long id) {
        departmentService.deleteDepartment(id);
        return ResponseEntity.noContent().build();
    }
}
