package org.example.backend.thesis.domain.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.backend.professor.domain.entity.Professor;
import org.example.backend.thesis.domain.dto.ThesisReqDto;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "thesis")
public class Thesis {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "thesis_id", nullable = false)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "author")
    private String author;

    @Column(name = "journal")
    private String journal;

    @Column(name = "content")
    private String content;

    @Column(name = "link")
    private String link;

    @Column(name = "publication_date")
    private String publicationDate;

    @Column(name = "thesis_image", length = 1000)
    private String thesisImage;

    @Column(name = "publication_collection")
    private String publicationCollection;

    @Column(name = "publication_issue")
    private String publicationIssue;

    @Column(name = "publication_page")
    private String publicationPage;

    @Column(name = "issn")
    private String issn;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "professor_id", nullable = true)
    private Professor professor;

    @Builder
    private Thesis(String title, String author, String journal, String content, String link,
                   String publicationDate, String thesisImage, String publicationCollection,
                   String publicationIssue, String publicationPage, String issn, Professor professor) {
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
        this.professor = professor;
    }

    public static Thesis of(ThesisReqDto dto, Professor professor) {
        return Thesis.builder()
                .title(dto.getTitle())
                .author(dto.getAuthor())
                .journal(dto.getJournal())
                .content(dto.getContent())
                .link(dto.getLink())
                .publicationDate(dto.getPublicationDate())
                .thesisImage(dto.getThesisImage())
                .publicationCollection(dto.getPublicationCollection())
                .publicationIssue(dto.getPublicationIssue())
                .publicationPage(dto.getPublicationPage())
                .issn(dto.getIssn())
                .professor(professor)
                .build();
    }

    public void update(ThesisReqDto dto, Professor professor) {
        this.title = dto.getTitle();
        this.author = dto.getAuthor();
        this.journal = dto.getJournal();
        this.content = dto.getContent();
        this.link = dto.getLink();
        this.publicationDate = dto.getPublicationDate();
        this.thesisImage = dto.getThesisImage();
        this.publicationCollection = dto.getPublicationCollection();
        this.publicationIssue = dto.getPublicationIssue();
        this.publicationPage = dto.getPublicationPage();
        this.issn = dto.getIssn();
        this.professor = professor;
    }
}
