package com.example.householdmanagement.service;

import com.example.householdmanagement.entity.HoKhau;
import com.example.householdmanagement.entity.NhanKhau;
import com.example.householdmanagement.repository.HoKhauRepository;
import com.example.householdmanagement.repository.NhanKhauRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HoKhauService {

    @Autowired
    private HoKhauRepository hoKhauRepository;

    @Autowired
    private NhanKhauRepository nhanKhauRepository;

    public HoKhau layHoKhauTheoSoHoKhau(Long soHoKhau) {
        return hoKhauRepository.findById(soHoKhau)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy hộ khẩu: " + soHoKhau));
    }

    public List<HoKhau> layTatCaHoKhau() {
        return hoKhauRepository.findAll();
    }

    public Long demSoNhanKhau(Long soHoKhau) {
        List<NhanKhau> nhanKhauList = nhanKhauRepository.findByHoKhau_SoHoKhau(soHoKhau);
        return (long) nhanKhauList.size();
    }

    public NhanKhau layChuHo(Long soHoKhau) {
        List<NhanKhau> nhanKhauList = nhanKhauRepository.findByHoKhau_SoHoKhau(soHoKhau);
        return nhanKhauList.stream()
                .filter(nk -> "Chủ hộ".equals(nk.getQuanHeVoiChuHo()))
                .findFirst()
                .orElse(null);
    }
}

