package org.example.backend.professor.domain.entity;

import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Embeddable
public class AcademicBackground {

    private String bachelor;
    private String master;
    private String doctor;

    public AcademicBackground(String bachelor, String master, String doctor) {
        this.bachelor = bachelor;
        this.master = master;
        this.doctor = doctor;
    }
}
