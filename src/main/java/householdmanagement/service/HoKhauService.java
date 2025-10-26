package com.example.householdmanagement.service;

import com.example.householdmanagement.dto.HoKhauDTO;
import com.example.householdmanagement.entity.HoKhau;
import com.example.householdmanagement.repository.HoKhauRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class HoKhauService {
    
    @Autowired
    private HoKhauRepository hoKhauRepository;
    
    // CRUD cơ bản
    public List<HoKhauDTO> getAllHoKhau() {
        return hoKhauRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public Optional<HoKhauDTO> getHoKhauById(Long id) {
        return hoKhauRepository.findById(id)
                .map(this::convertToDTO);
    }
    
    public HoKhauDTO createHoKhau(HoKhauDTO hoKhauDTO) {
        HoKhau hoKhau = convertToEntity(hoKhauDTO);
        hoKhau.setNgayTao(LocalDateTime.now());
        hoKhau.setNgayCapNhat(LocalDateTime.now());
        
        HoKhau savedHoKhau = hoKhauRepository.save(hoKhau);
        return convertToDTO(savedHoKhau);
    }
    
    public HoKhauDTO updateHoKhau(Long id, HoKhauDTO hoKhauDTO) {
        HoKhau existingHoKhau = hoKhauRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy hộ khẩu với ID: " + id));
        
        // Update fields
        existingHoKhau.setSoHoKhau(hoKhauDTO.getSoHoKhau());
        existingHoKhau.setHoTenChuHo(hoKhauDTO.getHoTenChuHo());
        existingHoKhau.setSoNha(hoKhauDTO.getSoNha());
        existingHoKhau.setDuongPho(hoKhauDTO.getDuongPho());
        existingHoKhau.setPhuongXa(hoKhauDTO.getPhuongXa());
        existingHoKhau.setQuanHuyen(hoKhauDTO.getQuanHuyen());
        existingHoKhau.setNgayCapNhat(LocalDateTime.now());
        
        HoKhau updatedHoKhau = hoKhauRepository.save(existingHoKhau);
        return convertToDTO(updatedHoKhau);
    }
    
    public void deleteHoKhau(Long id) {
        hoKhauRepository.deleteById(id);
    }
    
    private HoKhauDTO convertToDTO(HoKhau hoKhau) {
        HoKhauDTO dto = new HoKhauDTO();
        dto.setId(hoKhau.getId());
        dto.setSoHoKhau(hoKhau.getSoHoKhau());
        dto.setHoTenChuHo(hoKhau.getHoTenChuHo());
        dto.setSoNha(hoKhau.getSoNha());
        dto.setDuongPho(hoKhau.getDuongPho());
        dto.setPhuongXa(hoKhau.getPhuongXa());
        dto.setQuanHuyen(hoKhau.getQuanHuyen());
        dto.setNgayTao(hoKhau.getNgayTao());
        dto.setNgayCapNhat(hoKhau.getNgayCapNhat());
        return dto;
    }
    
    private HoKhau convertToEntity(HoKhauDTO dto) {
        HoKhau hoKhau = new HoKhau();
        hoKhau.setId(dto.getId());
        hoKhau.setSoHoKhau(dto.getSoHoKhau());
        hoKhau.setHoTenChuHo(dto.getHoTenChuHo());
        hoKhau.setSoNha(dto.getSoNha());
        hoKhau.setDuongPho(dto.getDuongPho());
        hoKhau.setPhuongXa(dto.getPhuongXa());
        hoKhau.setQuanHuyen(dto.getQuanHuyen());
        return hoKhau;
    }
}
