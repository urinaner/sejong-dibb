package org.example.backend.thesis.domain.mapper;

import javax.annotation.processing.Generated;
import org.example.backend.professor.repository.ProfessorRepository;
import org.example.backend.thesis.domain.dto.ThesisReqDto;
import org.example.backend.thesis.domain.dto.ThesisResDto;
import org.example.backend.thesis.domain.entity.Thesis;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-11-09T13:53:21+0900",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.4 (Eclipse Adoptium)"
)
@Component
public class ThesisMapperImpl implements ThesisMapper {

    @Override
    public Thesis toEntity(ThesisReqDto thesisReqDto, ProfessorRepository professorRepository) {
        if ( thesisReqDto == null ) {
            return null;
        }

        Thesis thesis = new Thesis();

        thesis.setAuthor( thesisReqDto.getAuthor() );
        thesis.setJournal( thesisReqDto.getJournal() );
        thesis.setContent( thesisReqDto.getContent() );
        thesis.setLink( thesisReqDto.getLink() );
        thesis.setPublicationDate( thesisReqDto.getPublicationDate() );
        thesis.setThesisImage( thesisReqDto.getThesisImage() );
        thesis.setPublicationCollection( thesisReqDto.getPublicationCollection() );
        thesis.setPublicationIssue( thesisReqDto.getPublicationIssue() );
        thesis.setPublicationPage( thesisReqDto.getPublicationPage() );
        thesis.setIssn( thesisReqDto.getIssn() );

        thesis.setProfessor( mapProfessor(thesisReqDto.getProfessorId(), null, professorRepository) );

        return thesis;
    }

    @Override
    public ThesisResDto toThesisDto(Thesis thesis) {
        if ( thesis == null ) {
            return null;
        }

        ThesisResDto thesisResDto = new ThesisResDto();

        thesisResDto.setAuthor( thesis.getAuthor() );
        thesisResDto.setJournal( thesis.getJournal() );
        thesisResDto.setContent( thesis.getContent() );
        thesisResDto.setLink( thesis.getLink() );
        thesisResDto.setPublicationDate( thesis.getPublicationDate() );
        thesisResDto.setThesisImage( thesis.getThesisImage() );
        thesisResDto.setPublicationCollection( thesis.getPublicationCollection() );
        thesisResDto.setPublicationIssue( thesis.getPublicationIssue() );
        thesisResDto.setPublicationPage( thesis.getPublicationPage() );
        thesisResDto.setIssn( thesis.getIssn() );

        return thesisResDto;
    }

    @Override
    public void updateThesisFromDto(ThesisReqDto thesisReqDto, Thesis thesis, ProfessorRepository professorRepository) {
        if ( thesisReqDto == null ) {
            return;
        }

        if ( thesisReqDto.getAuthor() != null ) {
            thesis.setAuthor( thesisReqDto.getAuthor() );
        }
        if ( thesisReqDto.getJournal() != null ) {
            thesis.setJournal( thesisReqDto.getJournal() );
        }
        if ( thesisReqDto.getContent() != null ) {
            thesis.setContent( thesisReqDto.getContent() );
        }
        if ( thesisReqDto.getLink() != null ) {
            thesis.setLink( thesisReqDto.getLink() );
        }
        if ( thesisReqDto.getPublicationDate() != null ) {
            thesis.setPublicationDate( thesisReqDto.getPublicationDate() );
        }
        if ( thesisReqDto.getThesisImage() != null ) {
            thesis.setThesisImage( thesisReqDto.getThesisImage() );
        }
        if ( thesisReqDto.getPublicationCollection() != null ) {
            thesis.setPublicationCollection( thesisReqDto.getPublicationCollection() );
        }
        if ( thesisReqDto.getPublicationIssue() != null ) {
            thesis.setPublicationIssue( thesisReqDto.getPublicationIssue() );
        }
        if ( thesisReqDto.getPublicationPage() != null ) {
            thesis.setPublicationPage( thesisReqDto.getPublicationPage() );
        }
        if ( thesisReqDto.getIssn() != null ) {
            thesis.setIssn( thesisReqDto.getIssn() );
        }

        thesis.setProfessor( mapProfessor(thesisReqDto.getProfessorId(), thesis.getProfessor(), professorRepository) );
    }
}
