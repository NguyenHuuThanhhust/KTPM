package com.example.householdmanagement.service;

import com.example.householdmanagement.dto.NhanKhauDTO;
import com.example.householdmanagement.entity.HoKhau;
import com.example.householdmanagement.entity.NhanKhau;
import com.example.householdmanagement.repository.HoKhauRepository;
import com.example.householdmanagement.repository.NhanKhauRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class NhanKhauService {
    
    @Autowired
    private NhanKhauRepository nhanKhauRepository;
    
    @Autowired
    private HoKhauRepository hoKhauRepository;
    
    // CRUD cơ bản
    public List<NhanKhauDTO> getAllNhanKhau() {
        return nhanKhauRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public Optional<NhanKhauDTO> getNhanKhauById(Long id) {
        return nhanKhauRepository.findById(id)
                .map(this::convertToDTO);
    }
    
    public NhanKhauDTO createNhanKhau(NhanKhauDTO nhanKhauDTO) {
        // Check if HoKhau exists
        HoKhau hoKhau = hoKhauRepository.findById(nhanKhauDTO.getHoKhauId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy hộ khẩu với ID: " + nhanKhauDTO.getHoKhauId()));
        
        NhanKhau nhanKhau = convertToEntity(nhanKhauDTO);
        nhanKhau.setHoKhau(hoKhau);
        nhanKhau.setNgayTao(LocalDateTime.now());
        nhanKhau.setNgayCapNhat(LocalDateTime.now());
        
        NhanKhau savedNhanKhau = nhanKhauRepository.save(nhanKhau);
        return convertToDTO(savedNhanKhau);
    }
    
    public NhanKhauDTO updateNhanKhau(Long id, NhanKhauDTO nhanKhauDTO) {
        NhanKhau existingNhanKhau = nhanKhauRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy nhân khẩu với ID: " + id));
        
        // Update fields
        existingNhanKhau.setHoVaTen(nhanKhauDTO.getHoVaTen());
        existingNhanKhau.setBiDanh(nhanKhauDTO.getBiDanh());
        existingNhanKhau.setNgaySinh(nhanKhauDTO.getNgaySinh());
        existingNhanKhau.setNoiSinh(nhanKhauDTO.getNoiSinh());
        existingNhanKhau.setNguyenQuan(nhanKhauDTO.getNguyenQuan());
        existingNhanKhau.setDanToc(nhanKhauDTO.getDanToc());
        existingNhanKhau.setNgheNghiep(nhanKhauDTO.getNgheNghiep());
        existingNhanKhau.setNoiLamViec(nhanKhauDTO.getNoiLamViec());
        existingNhanKhau.setSoCmndCccd(nhanKhauDTO.getSoCmndCccd());
        existingNhanKhau.setNgayCap(nhanKhauDTO.getNgayCap());
        existingNhanKhau.setNoiCap(nhanKhauDTO.getNoiCap());
        existingNhanKhau.setNgayDangKyThuongTru(nhanKhauDTO.getNgayDangKyThuongTru());
        existingNhanKhau.setDiaChiThuongTruTruoc(nhanKhauDTO.getDiaChiThuongTruTruoc());
        existingNhanKhau.setQuanHeVoiChuHo(nhanKhauDTO.getQuanHeVoiChuHo());
        existingNhanKhau.setGhiChu(nhanKhauDTO.getGhiChu());
        existingNhanKhau.setNgayChuyenDi(nhanKhauDTO.getNgayChuyenDi());
        existingNhanKhau.setNoiChuyen(nhanKhauDTO.getNoiChuyen());
        existingNhanKhau.setNgayCapNhat(LocalDateTime.now());
        
        // Update HoKhau if changed
        if (!existingNhanKhau.getHoKhau().getId().equals(nhanKhauDTO.getHoKhauId())) {
            HoKhau newHoKhau = hoKhauRepository.findById(nhanKhauDTO.getHoKhauId())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy hộ khẩu với ID: " + nhanKhauDTO.getHoKhauId()));
            existingNhanKhau.setHoKhau(newHoKhau);
        }
        
        NhanKhau updatedNhanKhau = nhanKhauRepository.save(existingNhanKhau);
        return convertToDTO(updatedNhanKhau);
    }
    
    public void deleteNhanKhau(Long id) {
        nhanKhauRepository.deleteById(id);
    }
    
    private NhanKhauDTO convertToDTO(NhanKhau nhanKhau) {
        NhanKhauDTO dto = new NhanKhauDTO();
        dto.setId(nhanKhau.getId());
        dto.setHoVaTen(nhanKhau.getHoVaTen());
        dto.setBiDanh(nhanKhau.getBiDanh());
        dto.setNgaySinh(nhanKhau.getNgaySinh());
        dto.setNoiSinh(nhanKhau.getNoiSinh());
        dto.setNguyenQuan(nhanKhau.getNguyenQuan());
        dto.setDanToc(nhanKhau.getDanToc());
        dto.setNgheNghiep(nhanKhau.getNgheNghiep());
        dto.setNoiLamViec(nhanKhau.getNoiLamViec());
        dto.setSoCmndCccd(nhanKhau.getSoCmndCccd());
        dto.setNgayCap(nhanKhau.getNgayCap());
        dto.setNoiCap(nhanKhau.getNoiCap());
        dto.setNgayDangKyThuongTru(nhanKhau.getNgayDangKyThuongTru());
        dto.setDiaChiThuongTruTruoc(nhanKhau.getDiaChiThuongTruTruoc());
        dto.setQuanHeVoiChuHo(nhanKhau.getQuanHeVoiChuHo());
        dto.setGhiChu(nhanKhau.getGhiChu());
        dto.setNgayChuyenDi(nhanKhau.getNgayChuyenDi());
        dto.setNoiChuyen(nhanKhau.getNoiChuyen());
        dto.setNgayTao(nhanKhau.getNgayTao());
        dto.setNgayCapNhat(nhanKhau.getNgayCapNhat());
        dto.setHoKhauId(nhanKhau.getHoKhau().getId());
        dto.setHoKhauSoHoKhau(nhanKhau.getHoKhau().getSoHoKhau());
        return dto;
    }
    
    private NhanKhau convertToEntity(NhanKhauDTO dto) {
        NhanKhau nhanKhau = new NhanKhau();
        nhanKhau.setId(dto.getId());
        nhanKhau.setHoVaTen(dto.getHoVaTen());
        nhanKhau.setBiDanh(dto.getBiDanh());
        nhanKhau.setNgaySinh(dto.getNgaySinh());
        nhanKhau.setNoiSinh(dto.getNoiSinh());
        nhanKhau.setNguyenQuan(dto.getNguyenQuan());
        nhanKhau.setDanToc(dto.getDanToc());
        nhanKhau.setNgheNghiep(dto.getNgheNghiep());
        nhanKhau.setNoiLamViec(dto.getNoiLamViec());
        nhanKhau.setSoCmndCccd(dto.getSoCmndCccd());
        nhanKhau.setNgayCap(dto.getNgayCap());
        nhanKhau.setNoiCap(dto.getNoiCap());
        nhanKhau.setNgayDangKyThuongTru(dto.getNgayDangKyThuongTru());
        nhanKhau.setDiaChiThuongTruTruoc(dto.getDiaChiThuongTruTruoc());
        nhanKhau.setQuanHeVoiChuHo(dto.getQuanHeVoiChuHo());
        nhanKhau.setGhiChu(dto.getGhiChu());
        nhanKhau.setNgayChuyenDi(dto.getNgayChuyenDi());
        nhanKhau.setNoiChuyen(dto.getNoiChuyen());
        return nhanKhau;
    }
}
