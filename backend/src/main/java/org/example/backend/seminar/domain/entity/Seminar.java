package org.example.backend.seminar.domain.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.backend.department.domain.entity.Department;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Seminar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "seminar_id", nullable = false)
    private Long seminarId;

    @Column(name = "name")
    private String name;

    @Column(name = "writer")
    private String writer;

    @Column(name = "place")
    private String place;

    @Column(name = "start_date")
    private String startDate;

    @Column(name = "end_date")
    private String endDate;

    @Column(name = "speaker")
    private String speaker;

    @Column(name = "company")
    private String company;

    @ManyToOne
    @JoinColumn(name = "department_id", nullable = false)
    private Department department;
}
