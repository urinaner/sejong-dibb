package org.example.backend.thesis.domain.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
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

    @Builder
    private ThesisReqDto(String author, String journal, String content, String link,
                         String publicationDate, String thesisImage, String publicationCollection,
                         String publicationIssue, String publicationPage, String issn, Long professorId) {
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

    public static ThesisReqDto of(String author, String journal, String content, String link,
                                  String publicationDate, String thesisImage, String publicationCollection,
                                  String publicationIssue, String publicationPage, String issn, Long professorId) {
        return ThesisReqDto.builder()
                .author(author)
                .journal(journal)
                .content(content)
                .link(link)
                .publicationDate(publicationDate)
                .thesisImage(thesisImage)
                .publicationCollection(publicationCollection)
                .publicationIssue(publicationIssue)
                .publicationPage(publicationPage)
                .issn(issn)
                .professorId(professorId)
                .build();
    }

    public void setThesisImage(String thesisImage) {
        this.thesisImage = thesisImage;
    }
}
