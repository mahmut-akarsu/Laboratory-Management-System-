package com.example.demo.Controller;

import com.example.demo.DTO.LaborantDTO;
import com.example.demo.Service.LaborantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/laborants")
@CrossOrigin(origins = "http://localhost:5173")
public class LaborantController {

    @Autowired
    private LaborantService laborantService;

    @GetMapping
    public List<LaborantDTO> getAllLaborants() {
        return laborantService.getAllLaborants();
    }

    @GetMapping("/{id}")
    public ResponseEntity<LaborantDTO> getLaborantById(@PathVariable Long id) {
        return laborantService.getLaborantById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<LaborantDTO> updateLaborant(@PathVariable Long id, @RequestBody LaborantDTO updatedLaborant) {
        LaborantDTO laborant = laborantService.updateLaborant(id, updatedLaborant);
        return ResponseEntity.ok(laborant);
    }

    @PostMapping
    public LaborantDTO createLaborant(@RequestBody LaborantDTO laborant) {
        return laborantService.saveLaborant(laborant);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLaborant(@PathVariable Long id) {
        laborantService.deleteLaborant(id);
        return ResponseEntity.ok().build();
    }
}