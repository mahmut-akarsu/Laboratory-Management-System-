package com.example.demo.DTO;

import com.example.demo.Entity.Laborant;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.processing.Pattern;

import java.util.Date;

@Getter
@Setter
public class ReportDTO {

    private Long id;
    private String fileNumber;
    private String patientFirstName;
    private String patientLastName;
    private String patientId;
    private String diagnosisTitle;
    private String diagnosisDetails;
    private String reportImagePath;
    private Date diagnosisDate;
    private LaborantDTO laborant;
}
