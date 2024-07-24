package com.example.demo.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String fileNumber;
    private String patientFirstName;
    private String patientLastName;
    private String patientId;
    private String diagnosisTitle;
    private String diagnosisDetails;
    private String reportImagePath;
    private Date diagnosisDate;

    @ManyToOne
    @JoinColumn(name = "laborant_id")
    private Laborant laborant;
}
