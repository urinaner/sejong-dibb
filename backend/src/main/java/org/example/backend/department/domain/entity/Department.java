package org.example.backend.department.domain.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.example.backend.department.domain.dto.Department.DepartmentDto;
import org.example.backend.professor.domain.entity.Professor;

import java.util.List;

@Entity
@Getter
@Setter
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "department_id", nullable = false)
    private Long departmentId;

    @Column(name = "koreanName", unique = true)
    private String koreanName;

    @Column(name = "englishName", unique = true)
    private String englishName;

    @Column(name = "intro")
    private String intro;

    @Column(name = "phone", unique = true)
    private String phoneN;

    @Column(name = "location")
    private String location;

    @Column(name = "educationalObjective")
    private String educationalObjective;

    @Column(name = "workHour")
    private String workHour;

    @Column(name = "map")
    private String map;

    @OneToMany(mappedBy = "department", cascade = CascadeType.REMOVE)
    private List<Professor> professors;

    public static Department toSaveEntity(DepartmentDto departmentDTO) {
        Department departmentEntity = new Department();
        departmentEntity.setKoreanName(departmentDTO.getKoreanName());
        departmentEntity.setEnglishName(departmentDTO.getEnglishName());
        departmentEntity.setIntro(departmentDTO.getIntro());
        departmentEntity.setPhoneN(departmentDTO.getPhoneN());
        departmentEntity.setLocation(departmentDTO.getLocation());
        departmentEntity.setEducationalObjective(departmentDTO.getEducationalObjective());
        departmentEntity.setWorkHour(departmentDTO.getWorkHour());
        departmentEntity.setMap(departmentDTO.getMap());
        return departmentEntity;
    }

    public static Department toUpdateEntity(DepartmentDto departmentDTO) {
        Department departmentEntity = new Department();
        departmentEntity.setKoreanName(departmentDTO.getKoreanName());
        departmentEntity.setEnglishName(departmentDTO.getEnglishName());
        departmentEntity.setIntro(departmentDTO.getIntro());
        departmentEntity.setPhoneN(departmentDTO.getPhoneN());
        departmentEntity.setLocation(departmentDTO.getLocation());
        departmentEntity.setEducationalObjective(departmentDTO.getEducationalObjective());
        departmentEntity.setWorkHour(departmentDTO.getWorkHour());
        departmentEntity.setMap(departmentDTO.getMap());
        return departmentEntity;
    }


}
