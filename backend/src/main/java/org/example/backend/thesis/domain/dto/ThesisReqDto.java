package org.example.backend.thesis.domain.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ThesisReqDto {

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

    private Long professorId;
}
