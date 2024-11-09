package org.example.backend.seminar.domain.mapper;

import javax.annotation.processing.Generated;
import org.example.backend.department.repository.DepartmentRepository;
import org.example.backend.seminar.domain.dto.SeminarReqDto;
import org.example.backend.seminar.domain.dto.SeminarResDto;
import org.example.backend.seminar.domain.entity.Seminar;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-11-09T13:53:21+0900",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.4 (Eclipse Adoptium)"
)
@Component
public class SeminarMapperImpl implements SeminarMapper {

    @Override
    public Seminar toEntity(SeminarReqDto seminarReqDto, DepartmentRepository departmentRepository) {
        if ( seminarReqDto == null ) {
            return null;
        }

        Seminar seminar = new Seminar();

        seminar.setName( seminarReqDto.getName() );
        seminar.setWriter( seminarReqDto.getWriter() );
        seminar.setPlace( seminarReqDto.getPlace() );
        seminar.setStartDate( seminarReqDto.getStartDate() );
        seminar.setEndDate( seminarReqDto.getEndDate() );
        seminar.setSpeaker( seminarReqDto.getSpeaker() );
        seminar.setCompany( seminarReqDto.getCompany() );

        seminar.setDepartment( mapDepartment(seminarReqDto.getDepartmentId(), null, departmentRepository) );

        return seminar;
    }

    @Override
    public SeminarResDto toSeminarDto(Seminar seminar) {
        if ( seminar == null ) {
            return null;
        }

        SeminarResDto seminarResDto = new SeminarResDto();

        seminarResDto.setName( seminar.getName() );
        seminarResDto.setWriter( seminar.getWriter() );
        seminarResDto.setPlace( seminar.getPlace() );
        seminarResDto.setStartDate( seminar.getStartDate() );
        seminarResDto.setEndDate( seminar.getEndDate() );
        seminarResDto.setSpeaker( seminar.getSpeaker() );
        seminarResDto.setCompany( seminar.getCompany() );

        return seminarResDto;
    }

    @Override
    public void updateSeminarFromDto(SeminarReqDto seminarReqDto, Seminar seminar, DepartmentRepository departmentRepository) {
        if ( seminarReqDto == null ) {
            return;
        }

        if ( seminarReqDto.getName() != null ) {
            seminar.setName( seminarReqDto.getName() );
        }
        if ( seminarReqDto.getWriter() != null ) {
            seminar.setWriter( seminarReqDto.getWriter() );
        }
        if ( seminarReqDto.getPlace() != null ) {
            seminar.setPlace( seminarReqDto.getPlace() );
        }
        if ( seminarReqDto.getStartDate() != null ) {
            seminar.setStartDate( seminarReqDto.getStartDate() );
        }
        if ( seminarReqDto.getEndDate() != null ) {
            seminar.setEndDate( seminarReqDto.getEndDate() );
        }
        if ( seminarReqDto.getSpeaker() != null ) {
            seminar.setSpeaker( seminarReqDto.getSpeaker() );
        }
        if ( seminarReqDto.getCompany() != null ) {
            seminar.setCompany( seminarReqDto.getCompany() );
        }

        seminar.setDepartment( mapDepartment(seminarReqDto.getDepartmentId(), seminar.getDepartment(), departmentRepository) );
    }
}
