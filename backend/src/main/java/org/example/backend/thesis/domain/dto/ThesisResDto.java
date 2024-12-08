package org.example.backend.thesis.domain.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.backend.thesis.domain.entity.Thesis;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ThesisResDto {
    private Long id;
    private String title;
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

    @Builder
    private ThesisResDto(Long id, String title, String author, String journal, String content, String link,
                         String publicationDate, String thesisImage, String publicationCollection,
                         String publicationIssue, String publicationPage, String issn, Long professorId) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.journal = journal;
        this.content = content;
        this.link = link;
        this.publicationDate = publicationDate;
        this.thesisImage = thesisImage;
        this.publicationCollection = publicationCollection;
        this.publicationIssue = publicationIssue;
        this.publicationPage = publicationPage;
        this.issn = issn;
        this.professorId = professorId;
    }

    public static ThesisResDto of(Thesis thesis) {
        return ThesisResDto.builder()
                .id(thesis.getId())
                .title(thesis.getTitle())
                .author(thesis.getAuthor())
                .journal(thesis.getJournal())
                .content(thesis.getContent())
                .link(thesis.getLink())
                .publicationDate(thesis.getPublicationDate())
                .thesisImage(thesis.getThesisImage())
                .publicationCollection(thesis.getPublicationCollection())
                .publicationIssue(thesis.getPublicationIssue())
                .publicationPage(thesis.getPublicationPage())
                .issn(thesis.getIssn())
                .professorId(thesis.getProfessor().getId())
                .build();
    }
}