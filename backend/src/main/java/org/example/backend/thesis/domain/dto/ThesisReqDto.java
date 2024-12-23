package org.example.backend.thesis.domain.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ThesisReqDto {

    @NotBlank(message = "논문 제목은 필수 입력값입니다.")
    @Size(max = 255, message = "논문 제목은 최대 255자까지 입력 가능합니다.")
    private String title;

    @NotBlank(message = "저자는 필수 입력값입니다.")
    @Size(max = 255, message = "저자 이름은 최대 255자까지 입력 가능합니다.")
    private String author;

    @Size(max = 255, message = "저널 이름은 최대 255자까지 입력 가능합니다.")
    private String journal;

    private String content;

    @Size(max = 2083, message = "링크는 최대 2083자까지 입력 가능합니다.")
    private String link;

    private String publicationDate;

    @Schema(hidden = true)
    private String thesisImage;

    private String publicationCollection;
    private String publicationIssue;
    private String publicationPage;

    @Size(max = 255, message = "ISSN은 최대 255자까지 입력 가능합니다.")
    private String issn;

    private Long professorId;

    @Builder
    private ThesisReqDto(String title, String author, String journal, String content, String link,
                         String publicationDate, String publicationCollection,
                         String publicationIssue, String publicationPage, String issn, Long professorId) {
        this.title = title;
        this.author = author;
        this.journal = journal;
        this.content = content;
        this.link = link;
        this.publicationDate = publicationDate;
        this.publicationCollection = publicationCollection;
        this.publicationIssue = publicationIssue;
        this.publicationPage = publicationPage;
        this.issn = issn;
        this.professorId = professorId;
    }

    public static ThesisReqDto of(String title, String author, String journal, String content, String link,
                                  String publicationDate, String publicationCollection,
                                  String publicationIssue, String publicationPage, String issn, Long professorId) {
        return ThesisReqDto.builder()
                .title(title)
                .author(author)
                .journal(journal)
                .content(content)
                .link(link)
                .publicationDate(publicationDate)
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
