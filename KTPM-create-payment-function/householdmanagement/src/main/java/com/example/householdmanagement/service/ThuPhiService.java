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

    // ================= CRUD =================

    public List<ThuPhiDTO> getAllThuPhi() {
        return thuPhiRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public Optional<ThuPhiDTO> getThuPhiById(Long id) {
        return thuPhiRepository.findById(id)
                .map(this::convertToDTO);
    }

    public ThuPhiDTO createThuPhi(ThuPhiDTO dto) {

        HoKhau hoKhau = hoKhauRepository.findById(dto.getSoHoKhau())
                .orElseThrow(() ->
                        new RuntimeException("Không tìm thấy hộ khẩu ID: " + dto.getSoHoKhau()));

        DotThu dotThu = dotThuRepository.findById(dto.getMaDotThu())
                .orElseThrow(() ->
                        new RuntimeException("Không tìm thấy đợt thu ID: " + dto.getMaDotThu()));

        ThuPhi thuPhi = new ThuPhi();
        thuPhi.setHoKhau(hoKhau);
        thuPhi.setDotThu(dotThu);
        thuPhi.setSoTien(dto.getSoTien());
        thuPhi.setNgayDong(dto.getNgayDong());
        thuPhi.setGhiChu(dto.getGhiChu());

        return convertToDTO(thuPhiRepository.save(thuPhi));
    }

    public ThuPhiDTO updateThuPhi(Long id, ThuPhiDTO dto) {

        ThuPhi thuPhi = thuPhiRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Không tìm thấy thu phí ID: " + id));

        if (!thuPhi.getHoKhau().getSoHoKhau().equals(dto.getSoHoKhau())) {
            HoKhau hoKhau = hoKhauRepository.findById(dto.getSoHoKhau())
                    .orElseThrow(() ->
                            new RuntimeException("Không tìm thấy hộ khẩu ID: " + dto.getSoHoKhau()));
            thuPhi.setHoKhau(hoKhau);
        }

        if (!thuPhi.getDotThu().getMaDotThu().equals(dto.getMaDotThu())) {
            DotThu dotThu = dotThuRepository.findById(dto.getMaDotThu())
                    .orElseThrow(() ->
                            new RuntimeException("Không tìm thấy đợt thu ID: " + dto.getMaDotThu()));
            thuPhi.setDotThu(dotThu);
        }

        thuPhi.setSoTien(dto.getSoTien());
        thuPhi.setNgayDong(dto.getNgayDong());
        thuPhi.setGhiChu(dto.getGhiChu());

        return convertToDTO(thuPhiRepository.save(thuPhi));
    }

    public void deleteThuPhi(Long id) {
        thuPhiRepository.deleteById(id);
    }

    // ================= MAPPING =================

    private ThuPhiDTO convertToDTO(ThuPhi thuPhi) {
        ThuPhiDTO dto = new ThuPhiDTO();
        dto.setMaThuPhi(thuPhi.getMaThuPhi());
        dto.setSoHoKhau(thuPhi.getHoKhau().getSoHoKhau());
        dto.setMaDotThu(thuPhi.getDotThu().getMaDotThu());
        dto.setSoTien(thuPhi.getSoTien());
        dto.setNgayDong(thuPhi.getNgayDong());
        dto.setGhiChu(thuPhi.getGhiChu());

        // THÔNG TIN SUY RA
        dto.setTenDotThu(thuPhi.getDotThu().getTenDotThu());
        dto.setTenLoaiPhi(thuPhi.getDotThu().getLoaiPhi().getTenLoaiPhi());

        return dto;
    }
}
