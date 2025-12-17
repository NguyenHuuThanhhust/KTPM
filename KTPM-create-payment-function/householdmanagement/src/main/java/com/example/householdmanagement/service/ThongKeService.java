package com.example.householdmanagement.service;

import com.example.householdmanagement.dto.ThongKeRequest;
import com.example.householdmanagement.entity.NhanKhau;
import com.example.householdmanagement.entity.TamTru;
import com.example.householdmanagement.entity.TamVang;
import com.example.householdmanagement.repository.NhanKhauRepository;
import com.example.householdmanagement.repository.TamTruRepository;
import com.example.householdmanagement.repository.TamVangRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.Period;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ThongKeService {

    @Autowired
    private NhanKhauRepository nhanKhauRepository;

    @Autowired
    private TamVangRepository tamVangRepository;

    @Autowired
    private TamTruRepository tamTruRepository;

    // Thống kê theo giới tính
    public Map<String, Object> thongKeTheoGioiTinh() {
        List<NhanKhau> allNhanKhau = nhanKhauRepository.findAll();
        
        long soNam = allNhanKhau.stream()
                .filter(nk -> "Nam".equalsIgnoreCase(nk.getGioiTinh()))
                .count();
        
        long soNu = allNhanKhau.stream()
                .filter(nk -> "Nu".equalsIgnoreCase(nk.getGioiTinh()) || "Nữ".equalsIgnoreCase(nk.getGioiTinh()))
                .count();

        Map<String, Object> result = new HashMap<>();
        result.put("tongSo", allNhanKhau.size());
        result.put("nam", soNam);
        result.put("nu", soNu);
        return result;
    }

    // Thống kê theo độ tuổi
    public Map<String, Object> thongKeTheoDoTuoi() {
        List<NhanKhau> allNhanKhau = nhanKhauRepository.findAll();
        LocalDateTime now = LocalDateTime.now();

        Map<String, Long> thongKe = new HashMap<>();
        thongKe.put("Mam non", 0L); // 0-3 tuổi
        thongKe.put("Mau giao", 0L); // 3-6 tuổi
        thongKe.put("Cap 1", 0L); // 6-11 tuổi
        thongKe.put("Cap 2", 0L); // 11-15 tuổi
        thongKe.put("Cap 3", 0L); // 15-18 tuổi
        thongKe.put("Do tuoi lao dong", 0L); // 18-60 tuổi (nam), 18-55 tuổi (nữ)
        thongKe.put("Nghi huu", 0L); // >60 tuổi (nam), >55 tuổi (nữ)

        for (NhanKhau nk : allNhanKhau) {
            if (nk.getNgaySinh() == null) continue;

            int tuoi = Period.between(nk.getNgaySinh().toLocalDate(), now.toLocalDate()).getYears();
            String gioiTinh = nk.getGioiTinh();

            if (tuoi < 3) {
                thongKe.put("Mam non", thongKe.get("Mam non") + 1);
            } else if (tuoi < 6) {
                thongKe.put("Mau giao", thongKe.get("Mau giao") + 1);
            } else if (tuoi < 11) {
                thongKe.put("Cap 1", thongKe.get("Cap 1") + 1);
            } else if (tuoi < 15) {
                thongKe.put("Cap 2", thongKe.get("Cap 2") + 1);
            } else if (tuoi < 18) {
                thongKe.put("Cap 3", thongKe.get("Cap 3") + 1);
            } else {
                boolean isNu = "Nu".equalsIgnoreCase(gioiTinh) || "Nữ".equalsIgnoreCase(gioiTinh);
                int tuoiNghiHuu = isNu ? 55 : 60;
                
                if (tuoi < tuoiNghiHuu) {
                    thongKe.put("Do tuoi lao dong", thongKe.get("Do tuoi lao dong") + 1);
                } else {
                    thongKe.put("Nghi huu", thongKe.get("Nghi huu") + 1);
                }
            }
        }

        Map<String, Object> result = new HashMap<>();
        result.put("tongSo", allNhanKhau.size());
        result.put("chiTiet", thongKe);
        return result;
    }

    // Thống kê theo khoảng thời gian
    public Map<String, Object> thongKeTheoThoiGian(ThongKeRequest request) {
        LocalDateTime tuNgay = request.getTuNgay() != null ? request.getTuNgay() : LocalDateTime.now().minusYears(1);
        LocalDateTime denNgay = request.getDenNgay() != null ? request.getDenNgay() : LocalDateTime.now();

        List<NhanKhau> nhanKhauTrongKhoang = nhanKhauRepository.findByNgaySinhBetween(tuNgay, denNgay);

        Map<String, Object> result = new HashMap<>();
        result.put("tuNgay", tuNgay);
        result.put("denNgay", denNgay);
        result.put("tongSo", nhanKhauTrongKhoang.size());
        result.put("danhSach", nhanKhauTrongKhoang);
        return result;
    }

    // Thống kê tạm vắng
    public Map<String, Object> thongKeTamVang(ThongKeRequest request) {
        List<TamVang> tamVangList;
        
        if (request.getTuNgay() != null && request.getDenNgay() != null) {
            tamVangList = tamVangRepository.findByThoiGianBetween(request.getTuNgay(), request.getDenNgay());
        } else {
            tamVangList = tamVangRepository.findByTrangThai("Dang tam vang");
        }

        Map<String, Object> result = new HashMap<>();
        result.put("tongSo", tamVangList.size());
        result.put("danhSach", tamVangList);
        
        // Thống kê theo trạng thái
        Map<String, Long> theoTrangThai = tamVangList.stream()
                .collect(Collectors.groupingBy(TamVang::getTrangThai, Collectors.counting()));
        result.put("theoTrangThai", theoTrangThai);
        
        return result;
    }

    // Thống kê tạm trú
    public Map<String, Object> thongKeTamTru(ThongKeRequest request) {
        List<TamTru> tamTruList;
        
        if (request.getTuNgay() != null && request.getDenNgay() != null) {
            tamTruList = tamTruRepository.findByThoiGianBetween(request.getTuNgay(), request.getDenNgay());
        } else {
            tamTruList = tamTruRepository.findByTrangThai("Dang tam tru");
        }

        Map<String, Object> result = new HashMap<>();
        result.put("tongSo", tamTruList.size());
        result.put("danhSach", tamTruList);
        
        // Thống kê theo trạng thái
        Map<String, Long> theoTrangThai = tamTruList.stream()
                .collect(Collectors.groupingBy(TamTru::getTrangThai, Collectors.counting()));
        result.put("theoTrangThai", theoTrangThai);
        
        return result;
    }

    // Thống kê tổng hợp
    public Map<String, Object> thongKeTongHop(ThongKeRequest request) {
        Map<String, Object> result = new HashMap<>();
        
        if ("GioiTinh".equals(request.getLoaiThongKe())) {
            result = thongKeTheoGioiTinh();
        } else if ("DoTuoi".equals(request.getLoaiThongKe())) {
            result = thongKeTheoDoTuoi();
        } else if ("ThoiGian".equals(request.getLoaiThongKe())) {
            result = thongKeTheoThoiGian(request);
        } else if ("TamVang".equals(request.getLoaiThongKe())) {
            result = thongKeTamVang(request);
        } else if ("TamTru".equals(request.getLoaiThongKe())) {
            result = thongKeTamTru(request);
        }
        
        return result;
    }
}


