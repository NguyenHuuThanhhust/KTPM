package com.example.householdmanagement.service;

import com.example.householdmanagement.dto.ThuPhiDTO;
import com.example.householdmanagement.entity.DotThu;
import com.example.householdmanagement.entity.HoKhau;
import com.example.householdmanagement.entity.LoaiPhi;
import com.example.householdmanagement.entity.ThuPhi;
import com.example.householdmanagement.repository.DotThuRepository;
import com.example.householdmanagement.repository.HoKhauRepository;
import com.example.householdmanagement.repository.LoaiPhiRepository;
import com.example.householdmanagement.repository.ThuPhiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class ThuPhiService {
    
    @Autowired
    private ThuPhiRepository thuPhiRepository;
    
    @Autowired
    private HoKhauRepository hoKhauRepository;
    
    @Autowired
    private DotThuRepository dotThuRepository;
    
    @Autowired
    private LoaiPhiRepository loaiPhiRepository;
    
    // CRUD cơ bản
    public List<ThuPhiDTO> getAllThuPhi() {
        return thuPhiRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public Optional<ThuPhiDTO> getThuPhiById(Long id) {
        return thuPhiRepository.findById(id)
                .map(this::convertToDTO);
    }
    
    public ThuPhiDTO createThuPhi(ThuPhiDTO thuPhiDTO) {
        // Check if HoKhau exists
        HoKhau hoKhau = hoKhauRepository.findById(thuPhiDTO.getSoHoKhau())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy hộ khẩu với ID: " + thuPhiDTO.getSoHoKhau()));
        
        // Check if DotThu exists
        DotThu dotThu = dotThuRepository.findById(thuPhiDTO.getMaDotThu())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đợt thu với ID: " + thuPhiDTO.getMaDotThu()));
        
        // Check if LoaiPhi exists
        LoaiPhi loaiPhi = loaiPhiRepository.findById(thuPhiDTO.getMaLoai())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy loại phí với ID: " + thuPhiDTO.getMaLoai()));
        
        ThuPhi thuPhi = convertToEntity(thuPhiDTO);
        thuPhi.setHoKhau(hoKhau);
        thuPhi.setDotThu(dotThu);
        thuPhi.setLoaiPhi(loaiPhi);
        
        ThuPhi savedThuPhi = thuPhiRepository.save(thuPhi);
        return convertToDTO(savedThuPhi);
    }
    
    public ThuPhiDTO updateThuPhi(Long id, ThuPhiDTO thuPhiDTO) {
        ThuPhi existingThuPhi = thuPhiRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy thu phí với ID: " + id));
        
        // Update HoKhau if changed
        if (!existingThuPhi.getHoKhau().getSoHoKhau().equals(thuPhiDTO.getSoHoKhau())) {
            HoKhau newHoKhau = hoKhauRepository.findById(thuPhiDTO.getSoHoKhau())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy hộ khẩu với ID: " + thuPhiDTO.getSoHoKhau()));
            existingThuPhi.setHoKhau(newHoKhau);
        }
        
        // Update DotThu if changed
        if (!existingThuPhi.getDotThu().getMaDotThu().equals(thuPhiDTO.getMaDotThu())) {
            DotThu newDotThu = dotThuRepository.findById(thuPhiDTO.getMaDotThu())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy đợt thu với ID: " + thuPhiDTO.getMaDotThu()));
            existingThuPhi.setDotThu(newDotThu);
        }
        
        // Update LoaiPhi if changed
        if (!existingThuPhi.getLoaiPhi().getMaLoaiPhi().equals(thuPhiDTO.getMaLoai())) {
            LoaiPhi newLoaiPhi = loaiPhiRepository.findById(thuPhiDTO.getMaLoai())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy loại phí với ID: " + thuPhiDTO.getMaLoai()));
            existingThuPhi.setLoaiPhi(newLoaiPhi);
        }
        
        // Update fields
        existingThuPhi.setSoTien(thuPhiDTO.getSoTien());
        existingThuPhi.setNgayDong(thuPhiDTO.getNgayDong());
        existingThuPhi.setGhiChu(thuPhiDTO.getGhiChu());
        
        ThuPhi updatedThuPhi = thuPhiRepository.save(existingThuPhi);
        return convertToDTO(updatedThuPhi);
    }
    
    public void deleteThuPhi(Long id) {
        thuPhiRepository.deleteById(id);
    }
    
    private ThuPhiDTO convertToDTO(ThuPhi thuPhi) {
        ThuPhiDTO dto = new ThuPhiDTO();
        dto.setMaThuPhi(thuPhi.getMaThuPhi());
        dto.setSoHoKhau(thuPhi.getHoKhau().getSoHoKhau());
        dto.setMaDotThu(thuPhi.getDotThu().getMaDotThu());
        dto.setMaLoai(thuPhi.getLoaiPhi().getMaLoaiPhi());
        dto.setSoTien(thuPhi.getSoTien());
        dto.setNgayDong(thuPhi.getNgayDong());
        dto.setGhiChu(thuPhi.getGhiChu());
        dto.setTenDotThu(thuPhi.getDotThu().getTenDotThu());
        dto.setTenLoaiPhi(thuPhi.getLoaiPhi().getTenLoaiPhi());
        return dto;
    }
    
    private ThuPhi convertToEntity(ThuPhiDTO dto) {
        ThuPhi thuPhi = new ThuPhi();
        thuPhi.setMaThuPhi(dto.getMaThuPhi());
        thuPhi.setSoTien(dto.getSoTien());
        thuPhi.setNgayDong(dto.getNgayDong());
        thuPhi.setGhiChu(dto.getGhiChu());
        return thuPhi;
    }
}
