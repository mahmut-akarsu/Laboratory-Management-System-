package com.example.demo.Service;

import com.example.demo.DTO.LaborantDTO;
import com.example.demo.DTO.ReportDTO;
import com.example.demo.Entity.Report;
import com.example.demo.Entity.Laborant;
import com.example.demo.Repository.ReportRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ReportService {

    private String uploadDir = "demo/target/uploads/";

    @Autowired
    private ReportRepository reportRepository;

    public List<ReportDTO> getAllReports() {
        List<Report> reports = reportRepository.findAll();
        return reports.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public ReportDTO updateReport(Long reportId, ReportDTO updatedReportDTO) {

        Report existingReport = reportRepository.findById(reportId)
                .orElseThrow(() -> new EntityNotFoundException("Rapor bulunamadı"));


        existingReport.setFileNumber(updatedReportDTO.getFileNumber());
        existingReport.setPatientFirstName(updatedReportDTO.getPatientFirstName());
        existingReport.setPatientLastName(updatedReportDTO.getPatientLastName());
        existingReport.setPatientId(updatedReportDTO.getPatientId());
        existingReport.setDiagnosisTitle(updatedReportDTO.getDiagnosisTitle());
        existingReport.setDiagnosisDetails(updatedReportDTO.getDiagnosisDetails());
        existingReport.setReportImagePath(updatedReportDTO.getReportImagePath());
        existingReport.setDiagnosisDate(updatedReportDTO.getDiagnosisDate());


        existingReport.setLaborant(convertToEntity(updatedReportDTO.getLaborant()));


        return convertToDTO(reportRepository.save(existingReport));
    }

    public Optional<ReportDTO> getReportById(Long id) {
        return reportRepository.findById(id)
                .map(this::convertToDTO);
    }

    public ReportDTO saveReport(ReportDTO reportDTO) {
        Report report = convertToEntity(reportDTO);
        return convertToDTO(reportRepository.save(report));
    }

    public void deleteReport(Long id) {
        reportRepository.deleteById(id);
    }

    private ReportDTO convertToDTO(Report report) {
        ReportDTO reportDTO = new ReportDTO();
        reportDTO.setId(report.getId());
        reportDTO.setFileNumber(report.getFileNumber());
        reportDTO.setPatientFirstName(report.getPatientFirstName());
        reportDTO.setPatientLastName(report.getPatientLastName());
        reportDTO.setPatientId(report.getPatientId());
        reportDTO.setDiagnosisTitle(report.getDiagnosisTitle());
        reportDTO.setDiagnosisDetails(report.getDiagnosisDetails());
        reportDTO.setReportImagePath(report.getReportImagePath());
        reportDTO.setDiagnosisDate(report.getDiagnosisDate());


        reportDTO.setLaborant(convertToDTO(report.getLaborant()));

        return reportDTO;
    }

    private Report convertToEntity(ReportDTO reportDTO) {
        Report report = new Report();
        report.setId(reportDTO.getId());
        report.setFileNumber(reportDTO.getFileNumber());
        report.setPatientFirstName(reportDTO.getPatientFirstName());
        report.setPatientLastName(reportDTO.getPatientLastName());
        report.setPatientId(reportDTO.getPatientId());
        report.setDiagnosisTitle(reportDTO.getDiagnosisTitle());
        report.setDiagnosisDetails(reportDTO.getDiagnosisDetails());
        report.setReportImagePath(reportDTO.getReportImagePath());
        report.setDiagnosisDate(reportDTO.getDiagnosisDate());

        // LaborantDTO'dan Laborant entity'sine dönüşüm
        report.setLaborant(convertToEntity(reportDTO.getLaborant()));

        return report;
    }

    private LaborantDTO convertToDTO(Laborant laborant) {
        LaborantDTO laborantDTO = new LaborantDTO();
        laborantDTO.setId(laborant.getId());
        laborantDTO.setFirstName(laborant.getFirstName());
        laborantDTO.setLastName(laborant.getLastName());
        laborantDTO.setHospitalId(laborant.getHospitalId());
        return laborantDTO;
    }

    private Laborant convertToEntity(LaborantDTO laborantDTO) {
        Laborant laborant = new Laborant();
        laborant.setId(laborantDTO.getId());
        laborant.setFirstName(laborantDTO.getFirstName());
        laborant.setLastName(laborantDTO.getLastName());
        laborant.setHospitalId(laborantDTO.getHospitalId());
        return laborant;
    }


    public String saveReportImage(Long id, MultipartFile file) {
        try {
            if (file.isEmpty()) {
                throw new RuntimeException("Dosya boş olamaz.");
            }

            String filename = id + "_" + file.getOriginalFilename();
            Path path = Paths.get(uploadDir, filename); // Yol birleşimini düzelttik
            Files.createDirectories(path.getParent());
            Files.write(path, file.getBytes());

            return "/uploads/" + filename; // Web yolu olarak döndürün
        } catch (IOException e) {
            throw new RuntimeException("Dosya kaydedilirken hata oluştu", e);
        }
    }

    public void updateReportImage(Long id, MultipartFile file) {

        ReportDTO reportDTO = getReportById(id)
                .orElseThrow(() -> new EntityNotFoundException("Rapor bulunamadı"));


        String existingImagePath = reportDTO.getReportImagePath();
        if (existingImagePath != null) {
            Path existingPath = Paths.get(uploadDir, existingImagePath.substring("/uploads/".length()));
            try {
                Files.deleteIfExists(existingPath);
            } catch (IOException e) {
                throw new RuntimeException("Mevcut dosya silinirken hata oluştu", e);
            }
        }


        String newFilePath = saveReportImage(id, file);
        reportDTO.setReportImagePath(newFilePath);


        updateReport(id, reportDTO);
    }


}
