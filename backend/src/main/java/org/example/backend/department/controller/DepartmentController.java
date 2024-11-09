package org.example.backend.department.controller;


import io.swagger.v3.oas.annotations.media.Schema;
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
@RequestMapping("/api/departments")
public class DepartmentController {

    private final DepartmentService departmentService;

    @GetMapping("/{id}")
    @Schema(example = "부서 상세 조회")
    public ResponseEntity<DepartmentResDto> getDepartment(
            @PathVariable Long id) {
        DepartmentResDto department = departmentService.getDepartment(id);
        return ResponseEntity.ok(department);
    }

    @PostMapping
    @Schema(example = "신규 부서 생성")
    public ResponseEntity<Long> createDepartment(
            @RequestBody DepartmentReqDto departmentReqDto) {
        Long createdDepartment = departmentService.saveDepartment(departmentReqDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdDepartment);
    }

    @PutMapping("/{id}")
    @Schema(example = "부서 정보 수정")
    public ResponseEntity<DepartmentResDto> updateDepartment(
            @PathVariable Long id, @RequestBody DepartmentReqDto departmentReqDto) {
        DepartmentResDto updatedDepartment = departmentService.updateDepartment(id, departmentReqDto);
        return ResponseEntity.ok(updatedDepartment);
    }

    @DeleteMapping("/{id}")
    @Schema(example = "부서 삭제")
    public ResponseEntity<Void> deleteDepartment(
            @PathVariable Long id) {
        departmentService.deleteDepartment(id);
        return ResponseEntity.noContent().build();
    }
}
