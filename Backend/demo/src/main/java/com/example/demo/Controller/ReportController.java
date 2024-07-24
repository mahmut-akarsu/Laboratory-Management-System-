package com.example.demo.Controller;

import com.example.demo.DTO.ReportDTO;
import com.example.demo.Service.ReportService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/reports")
@CrossOrigin(origins = "http://localhost:5173")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @GetMapping
    public List<ReportDTO> getAllReports() {
        return reportService.getAllReports();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReportDTO> getReportById(@PathVariable Long id) {
        return reportService.getReportById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ReportDTO createReport(@RequestBody ReportDTO reportDTO) {
        return reportService.saveReport(reportDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReportDTO> updateReport(@PathVariable Long id, @RequestBody ReportDTO updatedReportDTO) {
        ReportDTO report = reportService.updateReport(id, updatedReportDTO);
        return ResponseEntity.ok(report);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReport(@PathVariable Long id) {
        reportService.deleteReport(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/upload")
    public ResponseEntity<String> uploadReportImage(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        try {
            String filePath = reportService.saveReportImage(id, file);
            ReportDTO reportDTO = reportService.getReportById(id)
                    .orElseThrow(() -> new EntityNotFoundException("Rapor bulunamadı"));
            reportDTO.setReportImagePath(filePath);
            reportService.updateReport(id, reportDTO);
            return ResponseEntity.ok("Resim başarıyla yüklendi.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Resim yüklenirken hata oluştu.");
        }
    }
}
