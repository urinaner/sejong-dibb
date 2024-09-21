package org.example.backend.department.controller;


import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.example.backend.department.domain.dto.Department.DepartmentReqDto;
import org.example.backend.department.domain.dto.Department.DepartmentResDto;
import org.example.backend.department.service.DepartmentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/departments")
public class DepartmentController {

    private final DepartmentService departmentService;

    @GetMapping("/{id}")
    @ApiOperation("부서 상세 조회")
    public ResponseEntity<DepartmentResDto> getDepartment(
            @PathVariable Long id) {
        DepartmentResDto department = departmentService.getDepartment(id);
        return ResponseEntity.ok(department);
    }

    @PostMapping
    @ApiOperation("신규 부서 생성")
    public ResponseEntity<Long> createDepartment(
            @RequestBody DepartmentReqDto departmentReqDto) {
        Long createdDepartment = departmentService.saveDepartment(departmentReqDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdDepartment);
    }

    @PutMapping("/{id}")
    @ApiOperation("부서 정보 수정")
    public ResponseEntity<DepartmentResDto> updateDepartment(
            @PathVariable Long id, @RequestBody DepartmentReqDto departmentReqDto) {
        DepartmentResDto updatedDepartment = departmentService.updateDepartment(id, departmentReqDto);
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
