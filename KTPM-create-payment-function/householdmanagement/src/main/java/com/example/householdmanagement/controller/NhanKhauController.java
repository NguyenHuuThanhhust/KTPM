package com.example.householdmanagement.controller;

import com.example.householdmanagement.dto.*;
import com.example.householdmanagement.entity.*;
import com.example.householdmanagement.service.NhanKhauService;
import com.example.householdmanagement.service.ThongKeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/nhankhau")
public class NhanKhauController {

    @Autowired
    private NhanKhauService nhanKhauService;

    @Autowired
    private ThongKeService thongKeService;

    // Thêm nhân khẩu mới (trẻ mới sinh)
    @PostMapping("/them-moi")
    public ResponseEntity<NhanKhau> themNhanKhauMoi(@RequestBody ThemNhanKhauMoiRequest request) {
        try {
            NhanKhau nhanKhau = nhanKhauService.themNhanKhauMoi(request);
            return ResponseEntity.ok(nhanKhau);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // Thay đổi nhân khẩu (chuyển đi, qua đời)
    @PutMapping("/thay-doi")
    public ResponseEntity<NhanKhau> thayDoiNhanKhau(@RequestBody ThayDoiNhanKhauRequest request) {
        try {
            NhanKhau nhanKhau = nhanKhauService.thayDoiNhanKhau(request);
            return ResponseEntity.ok(nhanKhau);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // Thay đổi chủ hộ
    @PutMapping("/thay-doi-chu-ho")
    public ResponseEntity<HoKhau> thayDoiChuHo(@RequestBody ThayDoiChuHoRequest request) {
        try {
            HoKhau hoKhau = nhanKhauService.thayDoiChuHo(request);
            return ResponseEntity.ok(hoKhau);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // Tách hộ khẩu
    @PostMapping("/tach-ho")
    public ResponseEntity<HoKhau> tachHo(@RequestBody TachHoRequest request) {
        try {
            HoKhau hoKhauMoi = nhanKhauService.tachHo(request);
            return ResponseEntity.ok(hoKhauMoi);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // Thêm tạm vắng
    @PostMapping("/tam-vang")
    public ResponseEntity<TamVang> themTamVang(@RequestBody TamVangRequest request) {
        try {
            TamVang tamVang = nhanKhauService.themTamVang(request);
            return ResponseEntity.ok(tamVang);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // Thêm tạm trú
    @PostMapping("/tam-tru")
    public ResponseEntity<TamTru> themTamTru(@RequestBody TamTruRequest request) {
        try {
            TamTru tamTru = nhanKhauService.themTamTru(request);
            return ResponseEntity.ok(tamTru);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // Tìm kiếm nhân khẩu
    @PostMapping("/tim-kiem")
    public ResponseEntity<List<NhanKhau>> timKiemNhanKhau(@RequestBody TimKiemRequest request) {
        try {
            List<NhanKhau> ketQua = nhanKhauService.timKiemNhanKhau(request);
            return ResponseEntity.ok(ketQua);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // Xem lịch sử thay đổi nhân khẩu của một hộ
    @GetMapping("/lich-su-nhan-khau/{soHoKhau}")
    public ResponseEntity<List<LichSuThayDoiNhanKhau>> xemLichSuThayDoiNhanKhau(@PathVariable Long soHoKhau) {
        try {
            List<LichSuThayDoiNhanKhau> lichSu = nhanKhauService.xemLichSuThayDoiNhanKhau(soHoKhau);
            return ResponseEntity.ok(lichSu);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // Xem lịch sử thay đổi hộ khẩu
    @GetMapping("/lich-su-ho-khau/{soHoKhau}")
    public ResponseEntity<List<LichSuThayDoiHoKhau>> xemLichSuThayDoiHoKhau(@PathVariable Long soHoKhau) {
        try {
            List<LichSuThayDoiHoKhau> lichSu = nhanKhauService.xemLichSuThayDoiHoKhau(soHoKhau);
            return ResponseEntity.ok(lichSu);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // Thống kê theo giới tính
    @GetMapping("/thong-ke/gioi-tinh")
    public ResponseEntity<Map<String, Object>> thongKeTheoGioiTinh() {
        Map<String, Object> ketQua = thongKeService.thongKeTheoGioiTinh();
        return ResponseEntity.ok(ketQua);
    }

    // Thống kê theo độ tuổi
    @GetMapping("/thong-ke/do-tuoi")
    public ResponseEntity<Map<String, Object>> thongKeTheoDoTuoi() {
        Map<String, Object> ketQua = thongKeService.thongKeTheoDoTuoi();
        return ResponseEntity.ok(ketQua);
    }

    // Thống kê theo thời gian
    @PostMapping("/thong-ke/thoi-gian")
    public ResponseEntity<Map<String, Object>> thongKeTheoThoiGian(@RequestBody ThongKeRequest request) {
        Map<String, Object> ketQua = thongKeService.thongKeTheoThoiGian(request);
        return ResponseEntity.ok(ketQua);
    }

    // Thống kê tạm vắng
    @PostMapping("/thong-ke/tam-vang")
    public ResponseEntity<Map<String, Object>> thongKeTamVang(@RequestBody ThongKeRequest request) {
        Map<String, Object> ketQua = thongKeService.thongKeTamVang(request);
        return ResponseEntity.ok(ketQua);
    }

    // Thống kê tạm trú
    @PostMapping("/thong-ke/tam-tru")
    public ResponseEntity<Map<String, Object>> thongKeTamTru(@RequestBody ThongKeRequest request) {
        Map<String, Object> ketQua = thongKeService.thongKeTamTru(request);
        return ResponseEntity.ok(ketQua);
    }

    // Thống kê tổng hợp
    @PostMapping("/thong-ke/tong-hop")
    public ResponseEntity<Map<String, Object>> thongKeTongHop(@RequestBody ThongKeRequest request) {
        Map<String, Object> ketQua = thongKeService.thongKeTongHop(request);
        return ResponseEntity.ok(ketQua);
    }

    // Mới: API lấy danh sách nhân khẩu (tùy chọn lọc theo soHoKhau)
    @GetMapping
    public ResponseEntity<List<NhanKhauDTO>> layDanhSachNhanKhau(@RequestParam(name = "hoKhauId", required = false) Long hoKhauId) {
        List<NhanKhau> danhSach;
        if (hoKhauId == null) {
            danhSach = nhanKhauService.layTatCaNhanKhau();
        } else {
            danhSach = nhanKhauService.layNhanKhauTheoSoHoKhau(hoKhauId);
        }
        List<NhanKhauDTO> dtos = danhSach.stream().map(this::toDto).collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    // Mới: API lấy danh sách nhân khẩu theo đường dẫn rõ ràng cho một hộ khẩu
    @GetMapping("/ho-khau/{soHoKhau}")
    public ResponseEntity<List<NhanKhauDTO>> layNhanKhauTheoHoKhau(@PathVariable Long soHoKhau) {
        List<NhanKhau> danhSach = nhanKhauService.layNhanKhauTheoSoHoKhau(soHoKhau);
        List<NhanKhauDTO> dtos = danhSach.stream().map(this::toDto).collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    private NhanKhauDTO toDto(NhanKhau n) {
        NhanKhauDTO d = new NhanKhauDTO();
        d.setMaNhanKhau(n.getMaNhanKhau());
        if (n.getHoKhau() != null) d.setSoHoKhau(n.getHoKhau().getSoHoKhau());
        d.setHoTen(n.getHoTen());
        d.setGioiTinh(n.getGioiTinh());
        d.setNgaySinh(n.getNgaySinh());
        d.setCmnd(n.getCmnd());
        d.setQuanHeVoiChuHo(n.getQuanHeVoiChuHo());
        d.setTrangThai(n.getTrangThai());
        d.setNgheNghiep(n.getNgheNghiep());
        return d;
    }

//    // New: Xóa một nhân khẩu
//    @DeleteMapping("/{maNhanKhau}")
//    public ResponseEntity<Void> xoaNhanKhau(@PathVariable Long maNhanKhau) {
//        try {
//            nhanKhauService.xoaNhanKhau(maNhanKhau);
//            return ResponseEntity.noContent().build();
//        } catch (Exception e) {
//            // Nếu không tìm thấy hoặc lỗi khác -> trả 404 (client có thể thay đổi thành 400/500 tuỳ ý)
//            return ResponseEntity.notFound().build();
//        }
//    }
}
