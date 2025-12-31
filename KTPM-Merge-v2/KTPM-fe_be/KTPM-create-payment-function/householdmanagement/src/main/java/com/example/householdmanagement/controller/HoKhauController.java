package com.example.householdmanagement.controller;

import com.example.householdmanagement.dto.HoKhauDTO;
import com.example.householdmanagement.entity.HoKhau;
import com.example.householdmanagement.entity.NhanKhau;
import com.example.householdmanagement.service.HoKhauService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/hokhau")
@CrossOrigin(origins = "*")
public class HoKhauController {

    @Autowired
    private HoKhauService hoKhauService;

    @GetMapping("/{soHoKhau}")
    public ResponseEntity<HoKhauDTO> layHoKhauTheoSoHoKhau(@PathVariable Long soHoKhau) {
        try {
            HoKhau hoKhau = hoKhauService.layHoKhauTheoSoHoKhau(soHoKhau);
            HoKhauDTO dto = toDto(hoKhau);
            return ResponseEntity.ok(dto);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping
    public ResponseEntity<List<HoKhauDTO>> layTatCaHoKhau() {
        try {
            List<HoKhau> hoKhauList = hoKhauService.layTatCaHoKhau();
            List<HoKhauDTO> dtos = hoKhauList.stream()
                    .map(this::toDto)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(dtos);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    private HoKhauDTO toDto(HoKhau hoKhau) {
        HoKhauDTO dto = new HoKhauDTO();
        dto.setSoHoKhau(hoKhau.getSoHoKhau());
        dto.setDiaChi(hoKhau.getDiaChi());
        dto.setNgayCap(hoKhau.getNgayCap());
        dto.setGhiChu(hoKhau.getGhiChu());
        
        if (hoKhau.getXaPhuong() != null) {
            dto.setMaXaPhuong(hoKhau.getXaPhuong().getMaXaPhuong());
            dto.setTenXaPhuong(hoKhau.getXaPhuong().getTenXaPhuong());
        }
        
        // Đếm số nhân khẩu
        Long soNhanKhau = hoKhauService.demSoNhanKhau(hoKhau.getSoHoKhau());
        dto.setSoNhanKhau(soNhanKhau);
        
        // Lấy thông tin chủ hộ
        NhanKhau chuHo = hoKhauService.layChuHo(hoKhau.getSoHoKhau());
        if (chuHo != null) {
            dto.setChuHo(chuHo.getHoTen());
            dto.setMaNhanKhauChuHo(chuHo.getMaNhanKhau());
        }
        
        return dto;
    }
}

