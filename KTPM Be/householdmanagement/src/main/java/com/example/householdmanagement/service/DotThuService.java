package com.example.householdmanagement.service;

import com.example.householdmanagement.dto.DotThuDTO;
import com.example.householdmanagement.entity.DotThu;
import com.example.householdmanagement.repository.DotThuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class DotThuService {
    
    @Autowired
    private DotThuRepository dotThuRepository;
    
    // CRUD cơ bản
    public List<DotThuDTO> getAllDotThu() {
        return dotThuRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public Optional<DotThuDTO> getDotThuById(Long id) {
        return dotThuRepository.findById(id)
                .map(this::convertToDTO);
    }
    
    public DotThuDTO createDotThu(DotThuDTO dotThuDTO) {
        DotThu dotThu = convertToEntity(dotThuDTO);
        DotThu savedDotThu = dotThuRepository.save(dotThu);
        return convertToDTO(savedDotThu);
    }
    
    public DotThuDTO updateDotThu(Long id, DotThuDTO dotThuDTO) {
        DotThu existingDotThu = dotThuRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đợt thu với ID: " + id));
        
        existingDotThu.setTenDotThu(dotThuDTO.getTenDotThu());
        existingDotThu.setNgayBatDau(dotThuDTO.getNgayBatDau());
        existingDotThu.setNgayKetThuc(dotThuDTO.getNgayKetThuc());
        
        DotThu updatedDotThu = dotThuRepository.save(existingDotThu);
        return convertToDTO(updatedDotThu);
    }
    
    public void deleteDotThu(Long id) {
        dotThuRepository.deleteById(id);
    }
    
    private DotThuDTO convertToDTO(DotThu dotThu) {
        DotThuDTO dto = new DotThuDTO();
        dto.setMaDotThu(dotThu.getMaDotThu());
        dto.setTenDotThu(dotThu.getTenDotThu());
        dto.setNgayBatDau(dotThu.getNgayBatDau());
        dto.setNgayKetThuc(dotThu.getNgayKetThuc());
        return dto;
    }
    
    private DotThu convertToEntity(DotThuDTO dto) {
        DotThu dotThu = new DotThu();
        dotThu.setMaDotThu(dto.getMaDotThu());
        dotThu.setTenDotThu(dto.getTenDotThu());
        dotThu.setNgayBatDau(dto.getNgayBatDau());
        dotThu.setNgayKetThuc(dto.getNgayKetThuc());
        return dotThu;
    }
}
