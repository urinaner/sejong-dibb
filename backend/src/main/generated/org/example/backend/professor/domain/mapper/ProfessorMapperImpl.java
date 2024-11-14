package org.example.backend.professor.domain.mapper;

import javax.annotation.processing.Generated;
import org.example.backend.department.repository.DepartmentRepository;
import org.example.backend.professor.domain.dto.professor.ProfessorReqDto;
import org.example.backend.professor.domain.dto.professor.ProfessorResDto;
import org.example.backend.professor.domain.entity.Professor;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-11-14T00:22:51+0900",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.4 (Oracle Corporation)"
)
@Component
public class ProfessorMapperImpl implements ProfessorMapper {

    @Override
    public Professor toEntity(ProfessorReqDto professorReqDto, DepartmentRepository departmentRepository) {
        if ( professorReqDto == null ) {
            return null;
        }

        Professor professor = new Professor();

        professor.setName( professorReqDto.getName() );
        professor.setMajor( professorReqDto.getMajor() );
        professor.setPhoneN( professorReqDto.getPhoneN() );
        professor.setEmail( professorReqDto.getEmail() );
        professor.setPosition( professorReqDto.getPosition() );
        professor.setHomepage( professorReqDto.getHomepage() );
        professor.setLab( professorReqDto.getLab() );
        professor.setProfileImage( professorReqDto.getProfileImage() );

        professor.setDepartment( mapDepartment(professorReqDto.getDepartmentId(), null, departmentRepository) );

        return professor;
    }

    @Override
    public ProfessorResDto toProfessorDto(Professor professor) {
        if ( professor == null ) {
            return null;
        }

        ProfessorResDto professorResDto = new ProfessorResDto();

        professorResDto.setId( professor.getId() );
        professorResDto.setName( professor.getName() );
        professorResDto.setMajor( professor.getMajor() );
        professorResDto.setPhoneN( professor.getPhoneN() );
        professorResDto.setEmail( professor.getEmail() );
        professorResDto.setPosition( professor.getPosition() );
        professorResDto.setHomepage( professor.getHomepage() );
        professorResDto.setLab( professor.getLab() );
        professorResDto.setProfileImage( professor.getProfileImage() );

        return professorResDto;
    }

    @Override
    public void updateProfessorFromDto(ProfessorReqDto professorReqDto, Professor professor, DepartmentRepository departmentRepository) {
        if ( professorReqDto == null ) {
            return;
        }

        if ( professorReqDto.getName() != null ) {
            professor.setName( professorReqDto.getName() );
        }
        if ( professorReqDto.getMajor() != null ) {
            professor.setMajor( professorReqDto.getMajor() );
        }
        if ( professorReqDto.getPhoneN() != null ) {
            professor.setPhoneN( professorReqDto.getPhoneN() );
        }
        if ( professorReqDto.getEmail() != null ) {
            professor.setEmail( professorReqDto.getEmail() );
        }
        if ( professorReqDto.getPosition() != null ) {
            professor.setPosition( professorReqDto.getPosition() );
        }
        if ( professorReqDto.getHomepage() != null ) {
            professor.setHomepage( professorReqDto.getHomepage() );
        }
        if ( professorReqDto.getLab() != null ) {
            professor.setLab( professorReqDto.getLab() );
        }
        if ( professorReqDto.getProfileImage() != null ) {
            professor.setProfileImage( professorReqDto.getProfileImage() );
        }

        professor.setDepartment( mapDepartment(professorReqDto.getDepartmentId(), professor.getDepartment(), departmentRepository) );
    }
}
