package com.example.demo.Service;

import com.example.demo.DTO.LaborantDTO;
import com.example.demo.Entity.Laborant;
import com.example.demo.Repository.LaborantRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class LaborantService {

    @Autowired
    private LaborantRepository laborantRepository;

    public List<LaborantDTO> getAllLaborants() {
        List<Laborant> laborants = laborantRepository.findAll();
        return laborants.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public LaborantDTO updateLaborant(Long laborantId, LaborantDTO updatedLaborantDTO) {

        Laborant existingLaborant = laborantRepository.findById(laborantId)
                .orElseThrow(() -> new EntityNotFoundException("Laborant bulunamadı"));


        existingLaborant.setFirstName(updatedLaborantDTO.getFirstName());
        existingLaborant.setLastName(updatedLaborantDTO.getLastName());
        existingLaborant.setHospitalId(updatedLaborantDTO.getHospitalId());


        return convertToDTO(laborantRepository.save(existingLaborant));
    }

    public Optional<LaborantDTO> getLaborantById(Long id) {
        return laborantRepository.findById(id)
                .map(this::convertToDTO);
    }

    public LaborantDTO saveLaborant(LaborantDTO laborantDTO) {
        Laborant laborant = convertToEntity(laborantDTO);
        return convertToDTO(laborantRepository.save(laborant));
    }

    public void deleteLaborant(Long id) {
        laborantRepository.deleteById(id);
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
}