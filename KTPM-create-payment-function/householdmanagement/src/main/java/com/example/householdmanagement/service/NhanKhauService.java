package com.example.householdmanagement.service;

import com.example.householdmanagement.dto.*;
import com.example.householdmanagement.entity.*;
import com.example.householdmanagement.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NhanKhauService {

    @Autowired
    private NhanKhauRepository nhanKhauRepository;

    @Autowired
    private HoKhauRepository hoKhauRepository;

    @Autowired
    private LichSuThayDoiNhanKhauRepository lichSuThayDoiNhanKhauRepository;

    @Autowired
    private LichSuThayDoiHoKhauRepository lichSuThayDoiHoKhauRepository;

    @Autowired
    private XaPhuongRepository xaPhuongRepository;

    @Autowired
    private TamVangRepository tamVangRepository;

    @Autowired
    private TamTruRepository tamTruRepository;

    // Thêm nhân khẩu mới (trẻ mới sinh)
    @Transactional
    public NhanKhau themNhanKhauMoi(ThemNhanKhauMoiRequest request) {
        HoKhau hoKhau = hoKhauRepository.findById(request.getSoHoKhau())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy hộ khẩu"));

        NhanKhau nhanKhau = new NhanKhau();
        nhanKhau.setHoKhau(hoKhau);
        nhanKhau.setHoTen(request.getHoTen());
        nhanKhau.setGioiTinh(request.getGioiTinh());
        nhanKhau.setNgaySinh(request.getNgaySinh());
        nhanKhau.setQuanHeVoiChuHo(request.getQuanHeVoiChuHo());
        nhanKhau.setTrangThai("Thuong tru");
        // Lưu nghề nghiệp nếu có (trước đây đặt null cứng)
        nhanKhau.setNgheNghiep(request.getNgheNghiep());
        // CMND để trống
        nhanKhau.setCmnd(null);
        // Ghi "mới sinh" cho nơi thường trú chuyển đến
        nhanKhau.setNoiThuongTruChuyenDen("mới sinh");

        NhanKhau savedNhanKhau = nhanKhauRepository.save(nhanKhau);

        // Lưu lịch sử thay đổi
        LichSuThayDoiNhanKhau lichSu = new LichSuThayDoiNhanKhau();
        lichSu.setNhanKhau(savedNhanKhau);
        lichSu.setLoaiThayDoi("Them moi");
        lichSu.setNoiDungThayDoi("Thêm nhân khẩu mới: " + request.getHoTen());
        lichSu.setNgayThayDoi(LocalDateTime.now());
        lichSu.setGhiChu("Trẻ mới sinh");
        lichSuThayDoiNhanKhauRepository.save(lichSu);

        return savedNhanKhau;
    }

    // Thay đổi nhân khẩu (chuyển đi, qua đời)
    @Transactional
    public NhanKhau thayDoiNhanKhau(ThayDoiNhanKhauRequest request) {
        NhanKhau nhanKhau = nhanKhauRepository.findById(request.getMaNhanKhau())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy nhân khẩu"));

        if ("Chuyen di".equals(request.getLoaiThayDoi())) {
            nhanKhau.setNgayChuyenDi(request.getNgayChuyenDi());
            nhanKhau.setNoiChuyen(request.getNoiChuyen());
            nhanKhau.setGhiChu(request.getGhiChu());
            nhanKhau.setTrangThai("Chuyen di");
        } else if ("Qua doi".equals(request.getLoaiThayDoi())) {
            nhanKhau.setGhiChu("Đã qua đời");
            nhanKhau.setTrangThai("Qua doi");
        } else if ("Thay doi thong tin".equals(request.getLoaiThayDoi())) {
            // Có thể cập nhật các thông tin khác
            if (request.getGhiChu() != null) {
                nhanKhau.setGhiChu(request.getGhiChu());
            }
        }

        NhanKhau savedNhanKhau = nhanKhauRepository.save(nhanKhau);

        // Lưu lịch sử thay đổi
        LichSuThayDoiNhanKhau lichSu = new LichSuThayDoiNhanKhau();
        lichSu.setNhanKhau(savedNhanKhau);
        lichSu.setLoaiThayDoi(request.getLoaiThayDoi());
        lichSu.setNoiDungThayDoi(request.getNoiDungThayDoi() != null ? 
                request.getNoiDungThayDoi() : "Thay đổi nhân khẩu: " + request.getLoaiThayDoi());
        lichSu.setNgayThayDoi(LocalDateTime.now());
        lichSu.setGhiChu(request.getGhiChu());
        lichSuThayDoiNhanKhauRepository.save(lichSu);

        return savedNhanKhau;
    }

    // Thay đổi chủ hộ
    @Transactional
    public HoKhau thayDoiChuHo(ThayDoiChuHoRequest request) {
        HoKhau hoKhau = hoKhauRepository.findById(request.getSoHoKhau())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy hộ khẩu"));

        NhanKhau chuHoCu = nhanKhauRepository.findChuHoBySoHoKhau(request.getSoHoKhau());
        if (chuHoCu != null) {
            chuHoCu.setQuanHeVoiChuHo("Thanh vien");
            nhanKhauRepository.save(chuHoCu);
        }

        NhanKhau chuHoMoi = nhanKhauRepository.findById(request.getMaNhanKhauMoi())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy nhân khẩu mới"));
        chuHoMoi.setQuanHeVoiChuHo("Chu ho");
        nhanKhauRepository.save(chuHoMoi);

        // Lưu lịch sử thay đổi hộ khẩu
        LichSuThayDoiHoKhau lichSu = new LichSuThayDoiHoKhau();
        lichSu.setHoKhau(hoKhau);
        lichSu.setNoiDungThayDoi(request.getNoiDungThayDoi() != null ?
                request.getNoiDungThayDoi() : "Thay đổi chủ hộ");
        lichSu.setNgayThayDoi(LocalDateTime.now());
        lichSu.setGhiChu(request.getGhiChu());
        lichSuThayDoiHoKhauRepository.save(lichSu);

        return hoKhau;
    }

    // Tách hộ khẩu
    @Transactional
    public HoKhau tachHo(TachHoRequest request) {
        HoKhau hoKhauGoc = hoKhauRepository.findById(request.getSoHoKhauGoc())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy hộ khẩu gốc"));

        XaPhuong xaPhuong = xaPhuongRepository.findById(request.getMaXaPhuong())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy xã phường"));

        // Tạo hộ khẩu mới
        HoKhau hoKhauMoi = new HoKhau();
        hoKhauMoi.setDiaChi(request.getDiaChiMoi());
        hoKhauMoi.setXaPhuong(xaPhuong);
        hoKhauMoi.setGhiChu(request.getGhiChu());
        HoKhau savedHoKhauMoi = hoKhauRepository.save(hoKhauMoi);

        // Chuyển các nhân khẩu được chọn sang hộ khẩu mới
        // Đảm bảo có ít nhất một chủ hộ trong hộ mới
        boolean coChuHo = false;
        for (Long maNhanKhau : request.getDanhSachMaNhanKhau()) {
            NhanKhau nhanKhau = nhanKhauRepository.findById(maNhanKhau)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy nhân khẩu: " + maNhanKhau));
            
            if ("Chu ho".equals(nhanKhau.getQuanHeVoiChuHo())) {
                coChuHo = true;
            }
            
            nhanKhau.setHoKhau(savedHoKhauMoi);
            nhanKhauRepository.save(nhanKhau);
        }

        // Nếu không có chủ hộ, đặt nhân khẩu đầu tiên làm chủ hộ
        if (!coChuHo && !request.getDanhSachMaNhanKhau().isEmpty()) {
            NhanKhau nhanKhauDauTien = nhanKhauRepository.findById(request.getDanhSachMaNhanKhau().get(0))
                    .orElseThrow();
            nhanKhauDauTien.setQuanHeVoiChuHo("Chu ho");
            nhanKhauRepository.save(nhanKhauDauTien);
        }

        // Lưu lịch sử thay đổi cho cả hai hộ
        LichSuThayDoiHoKhau lichSuGoc = new LichSuThayDoiHoKhau();
        lichSuGoc.setHoKhau(hoKhauGoc);
        lichSuGoc.setNoiDungThayDoi("Tách hộ - một số nhân khẩu chuyển sang hộ khẩu mới: " + savedHoKhauMoi.getSoHoKhau());
        lichSuGoc.setNgayThayDoi(LocalDateTime.now());
        lichSuGoc.setGhiChu(request.getGhiChu());
        lichSuThayDoiHoKhauRepository.save(lichSuGoc);

        LichSuThayDoiHoKhau lichSuMoi = new LichSuThayDoiHoKhau();
        lichSuMoi.setHoKhau(savedHoKhauMoi);
        lichSuMoi.setNoiDungThayDoi("Hộ khẩu mới được tách từ hộ khẩu: " + hoKhauGoc.getSoHoKhau());
        lichSuMoi.setNgayThayDoi(LocalDateTime.now());
        lichSuMoi.setGhiChu("Hộ khẩu mới");
        lichSuThayDoiHoKhauRepository.save(lichSuMoi);

        return savedHoKhauMoi;
    }

    // Quản lý tạm vắng
    @Transactional
    public TamVang themTamVang(TamVangRequest request) {
        NhanKhau nhanKhau = nhanKhauRepository.findById(request.getMaNhanKhau())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy nhân khẩu"));

        TamVang tamVang = new TamVang();
        tamVang.setNhanKhau(nhanKhau);
        tamVang.setNoiDi(request.getNoiDi());
        tamVang.setTuNgay(request.getTuNgay());
        tamVang.setDenNgay(request.getDenNgay());
        tamVang.setLyDo(request.getLyDo());
        tamVang.setGhiChu(request.getGhiChu());
        tamVang.setTrangThai("Dang tam vang");

        return tamVangRepository.save(tamVang);
    }

    // Quản lý tạm trú
    @Transactional
    public TamTru themTamTru(TamTruRequest request) {
        NhanKhau nhanKhau = nhanKhauRepository.findById(request.getMaNhanKhau())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy nhân khẩu"));

        TamTru tamTru = new TamTru();
        tamTru.setNhanKhau(nhanKhau);
        tamTru.setNoiTamTru(request.getNoiTamTru());
        tamTru.setTuNgay(request.getTuNgay());
        tamTru.setDenNgay(request.getDenNgay());
        tamTru.setLyDo(request.getLyDo());
        tamTru.setGhiChu(request.getGhiChu());
        tamTru.setTrangThai("Dang tam tru");

        return tamTruRepository.save(tamTru);
    }

    // Tìm kiếm nhân khẩu
    public List<NhanKhau> timKiemNhanKhau(TimKiemRequest request) {
        if (request.getHoTen() != null && !request.getHoTen().isEmpty()) {
            return nhanKhauRepository.findByHoTenContainingIgnoreCase(request.getHoTen());
        } else if (request.getSoHoKhau() != null) {
            return nhanKhauRepository.findByHoKhau_SoHoKhau(request.getSoHoKhau());
        } else if (request.getCmnd() != null && !request.getCmnd().isEmpty()) {
            return nhanKhauRepository.findByCmnd(request.getCmnd());
        }
        return nhanKhauRepository.findAll();
    }

    // Xem lịch sử thay đổi nhân khẩu của một hộ
    public List<LichSuThayDoiNhanKhau> xemLichSuThayDoiNhanKhau(Long soHoKhau) {
        return lichSuThayDoiNhanKhauRepository.findBySoHoKhauOrderByNgayThayDoiDesc(soHoKhau);
    }

    // Xem lịch sử thay đổi hộ khẩu
    public List<LichSuThayDoiHoKhau> xemLichSuThayDoiHoKhau(Long soHoKhau) {
        return lichSuThayDoiHoKhauRepository.findByHoKhau_SoHoKhauOrderByNgayThayDoiDesc(soHoKhau);
    }

    // Thêm các phương thức đọc (chỉ đọc) để trả danh sách nhân khẩu
    @Transactional(readOnly = true)
    public List<NhanKhau> layTatCaNhanKhau() {
        return nhanKhauRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<NhanKhau> layNhanKhauTheoSoHoKhau(Long soHoKhau) {
        return nhanKhauRepository.findByHoKhau_SoHoKhau(soHoKhau);
    }

    // New: trả về tất cả hộ khẩu
    @Transactional(readOnly = true)
    public List<HoKhau> layTatCaHoKhau() {
        return hoKhauRepository.findAll();
    }

    // New: trả về 1 hộ khẩu theo soHoKhau (hoặc null nếu không tồn tại)
    @Transactional(readOnly = true)
    public HoKhau layHoKhauTheoSoHoKhau(Long soHoKhau) {
        return hoKhauRepository.findById(soHoKhau).orElse(null);
    }

    // New: xóa một nhân khẩu (delete resident)
    @Transactional
    public void xoaNhanKhau(Long maNhanKhau) {
        NhanKhau nhanKhau = nhanKhauRepository.findById(maNhanKhau)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy nhân khẩu: " + maNhanKhau));

        // Lưu lịch sử thay đổi trước khi xóa
        LichSuThayDoiNhanKhau lichSu = new LichSuThayDoiNhanKhau();
        lichSu.setNhanKhau(nhanKhau);
        lichSu.setLoaiThayDoi("Xoa");
        lichSu.setNoiDungThayDoi("Xóa nhân khẩu: " + nhanKhau.getHoTen() + " (id=" + maNhanKhau + ")");
        lichSu.setNgayThayDoi(LocalDateTime.now());
        lichSu.setGhiChu("Xóa bởi hệ thống hoặc người dùng");
        lichSuThayDoiNhanKhauRepository.save(lichSu);

        // Xóa thực sự
        nhanKhauRepository.delete(nhanKhau);
    }
}
