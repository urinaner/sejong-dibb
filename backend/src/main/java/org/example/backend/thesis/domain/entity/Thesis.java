package org.example.backend.thesis.domain.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.backend.professor.domain.entity.Professor;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Thesis {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "thesis_id", nullable = false)
    private Long id;

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

    @Column(name = "thesis_image")
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
    @JoinColumn(name = "professor_id", nullable = false)
    private Professor professor;
}