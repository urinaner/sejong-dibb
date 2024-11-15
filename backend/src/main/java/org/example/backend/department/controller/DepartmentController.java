package org.example.backend.department.controller;


import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.example.backend.department.domain.dto.Department.DepartmentReqDto;
import org.example.backend.department.domain.dto.Department.DepartmentResDto;
import org.example.backend.department.service.DepartmentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/department")
public class DepartmentController {

    private final DepartmentService departmentService;

    @GetMapping("/{departmentId}")
    @Operation(summary = "부서 조회", description = "부서 조회")
    public ResponseEntity<DepartmentResDto> getDepartment(
            @PathVariable(name = "departmentId") Long departmentId) {
        DepartmentResDto department = departmentService.getDepartment(departmentId);
        return ResponseEntity.ok(department);
    }

    @PostMapping
    @Operation(summary = "부서 생성", description = "부서 생성")
    public ResponseEntity<Long> createDepartment(
            @RequestBody DepartmentReqDto departmentReqDto) {
        Long createdDepartment = departmentService.saveDepartment(departmentReqDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdDepartment);
    }

    @PutMapping("/{departmentId}")
    @Operation(summary = "부서 수정", description = "부서 수정")
    public ResponseEntity<DepartmentResDto> updateDepartment(
            @PathVariable(name = "departmentId") Long departmentId, @RequestBody DepartmentReqDto departmentReqDto) {
        DepartmentResDto updatedDepartment = departmentService.updateDepartment(departmentId, departmentReqDto);
        return ResponseEntity.ok(updatedDepartment);
    }

    @DeleteMapping("/{departmentId}")
    @Operation(summary = "부서 삭제", description = "부서 삭제")
    public ResponseEntity<Void> deleteDepartment(
            @PathVariable(name = "departmentId") Long departmentId) {
        departmentService.deleteDepartment(departmentId);
        return ResponseEntity.noContent().build();
    }
}
