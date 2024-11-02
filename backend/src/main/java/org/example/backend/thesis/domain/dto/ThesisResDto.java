package org.example.backend.thesis.domain.dto;

import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import org.example.backend.professor.domain.entity.Professor;

@Data
public class ThesisResDto {

    private String author;

    private String journal;

    private String content;

    private String link;

    private String publicationDate;

    private String thesisImage;

    private String publicationCollection;

    private String publicationIssue;

    private String publicationPage;

    private String issn;
}
