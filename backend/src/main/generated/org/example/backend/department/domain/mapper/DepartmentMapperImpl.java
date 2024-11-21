package org.example.backend.department.domain.mapper;

import javax.annotation.processing.Generated;
import org.example.backend.department.domain.dto.Department.DepartmentReqDto;
import org.example.backend.department.domain.dto.Department.DepartmentResDto;
import org.example.backend.department.domain.entity.Department;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-11-17T20:22:38+0900",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.5 (Azul Systems, Inc.)"
)
@Component
public class DepartmentMapperImpl implements DepartmentMapper {

    @Override
    public Department toEntity(DepartmentReqDto departmentReqDto) {
        if ( departmentReqDto == null ) {
            return null;
        }

        Department department = new Department();

        department.setKoreanName( departmentReqDto.getKoreanName() );
        department.setEnglishName( departmentReqDto.getEnglishName() );
        department.setIntro( departmentReqDto.getIntro() );
        department.setPhoneN( departmentReqDto.getPhoneN() );
        department.setLocation( departmentReqDto.getLocation() );
        department.setEducationalObjective( departmentReqDto.getEducationalObjective() );
        department.setWorkHour( departmentReqDto.getWorkHour() );
        department.setMap( departmentReqDto.getMap() );

        return department;
    }

    @Override
    public DepartmentResDto toDepartmentDto(Department department) {
        if ( department == null ) {
            return null;
        }

        DepartmentResDto departmentResDto = new DepartmentResDto();

        departmentResDto.setId( department.getId() );
        departmentResDto.setKoreanName( department.getKoreanName() );
        departmentResDto.setEnglishName( department.getEnglishName() );
        departmentResDto.setIntro( department.getIntro() );
        departmentResDto.setPhoneN( department.getPhoneN() );
        departmentResDto.setLocation( department.getLocation() );
        departmentResDto.setEducationalObjective( department.getEducationalObjective() );
        departmentResDto.setWorkHour( department.getWorkHour() );
        departmentResDto.setMap( department.getMap() );

        return departmentResDto;
    }

    @Override
    public void updateDepartmentFromDto(DepartmentReqDto departmentReqDto, Department department) {
        if ( departmentReqDto == null ) {
            return;
        }

        if ( departmentReqDto.getKoreanName() != null ) {
            department.setKoreanName( departmentReqDto.getKoreanName() );
        }
        if ( departmentReqDto.getEnglishName() != null ) {
            department.setEnglishName( departmentReqDto.getEnglishName() );
        }
        if ( departmentReqDto.getIntro() != null ) {
            department.setIntro( departmentReqDto.getIntro() );
        }
        if ( departmentReqDto.getPhoneN() != null ) {
            department.setPhoneN( departmentReqDto.getPhoneN() );
        }
        if ( departmentReqDto.getLocation() != null ) {
            department.setLocation( departmentReqDto.getLocation() );
        }
        if ( departmentReqDto.getEducationalObjective() != null ) {
            department.setEducationalObjective( departmentReqDto.getEducationalObjective() );
        }
        if ( departmentReqDto.getWorkHour() != null ) {
            department.setWorkHour( departmentReqDto.getWorkHour() );
        }
        if ( departmentReqDto.getMap() != null ) {
            department.setMap( departmentReqDto.getMap() );
        }
    }
}
