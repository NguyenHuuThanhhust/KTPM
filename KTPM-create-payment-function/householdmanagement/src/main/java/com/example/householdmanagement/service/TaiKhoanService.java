package com.example.householdmanagement.service;

import com.example.householdmanagement.dto.TaiKhoanRequest;
import com.example.householdmanagement.dto.TaiKhoanResponse;
import com.example.householdmanagement.entity.CanBo;
import com.example.householdmanagement.entity.TaiKhoan;
import com.example.householdmanagement.repository.CanBoRepository;
import com.example.householdmanagement.repository.TaiKhoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaiKhoanService {

    @Autowired
    private TaiKhoanRepository taiKhoanRepository;

    @Autowired
    private CanBoRepository canBoRepository;

    public List<TaiKhoanResponse> layTatCaTaiKhoan() {
        return taiKhoanRepository.findAll().stream().map(this::toResponse).collect(Collectors.toList());
    }

    public TaiKhoanResponse layTaiKhoanTheoId(Long id) {
        TaiKhoan tk = taiKhoanRepository.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy tài khoản: " + id));
        return toResponse(tk);
    }

    @Transactional
    public TaiKhoanResponse taoTaiKhoan(TaiKhoanRequest req) {
        if (req.getTenDangNhap() == null || req.getTenDangNhap().trim().isEmpty()) {
            throw new RuntimeException("tenDangNhap là bắt buộc");
        }
        if (taiKhoanRepository.existsByTenDangNhap(req.getTenDangNhap())) {
            throw new RuntimeException("Tên đăng nhập đã tồn tại");
        }
        if (req.getEmail() != null && taiKhoanRepository.existsByEmail(req.getEmail())) {
            throw new RuntimeException("Email đã tồn tại");
        }

        CanBo canBo = canBoRepository.findById(req.getMaCanBo())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy cán bộ: " + req.getMaCanBo()));

        TaiKhoan tk = new TaiKhoan();
        tk.setMaCanBo(canBo);
        tk.setTenDangNhap(req.getTenDangNhap());
        tk.setMatKhau(req.getMatKhau()); // NOTE: mật khẩu hiện lưu thô, nên băm khi production
        tk.setVaiTro(req.getVaiTro());
        tk.setEmail(req.getEmail());
        if (req.getTrangThai() != null) tk.setTrangThai(req.getTrangThai());

        TaiKhoan saved = taiKhoanRepository.save(tk);
        return toResponse(saved);
    }

    @Transactional
    public TaiKhoanResponse capNhatTaiKhoan(Long id, TaiKhoanRequest req) {
        TaiKhoan tk = taiKhoanRepository.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy tài khoản: " + id));

        if (req.getMaCanBo() != null) {
            CanBo canBo = canBoRepository.findById(req.getMaCanBo())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy cán bộ: " + req.getMaCanBo()));
            tk.setMaCanBo(canBo);
        }
        if (req.getTenDangNhap() != null && !req.getTenDangNhap().trim().isEmpty()) {
            if (!req.getTenDangNhap().equals(tk.getTenDangNhap()) && taiKhoanRepository.existsByTenDangNhap(req.getTenDangNhap())) {
                throw new RuntimeException("Tên đăng nhập đã tồn tại");
            }
            tk.setTenDangNhap(req.getTenDangNhap());
        }
        if (req.getMatKhau() != null) tk.setMatKhau(req.getMatKhau());
        if (req.getVaiTro() != null) tk.setVaiTro(req.getVaiTro());
        if (req.getEmail() != null) {
            if (!req.getEmail().equals(tk.getEmail()) && taiKhoanRepository.existsByEmail(req.getEmail())) {
                throw new RuntimeException("Email đã tồn tại");
            }
            tk.setEmail(req.getEmail());
        }
        if (req.getTrangThai() != null) tk.setTrangThai(req.getTrangThai());

        TaiKhoan saved = taiKhoanRepository.save(tk);
        return toResponse(saved);
    }

    @Transactional
    public void xoaTaiKhoan(Long id) {
        TaiKhoan tk = taiKhoanRepository.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy tài khoản: " + id));
        taiKhoanRepository.delete(tk);
    }

    private TaiKhoanResponse toResponse(TaiKhoan tk) {
        TaiKhoanResponse r = new TaiKhoanResponse();
        r.setMaTaiKhoan(tk.getMaTaiKhoan());
        r.setMaCanBo(tk.getMaCanBo() != null ? tk.getMaCanBo().getMaCanBo() : null);
        r.setTenDangNhap(tk.getTenDangNhap());
        r.setVaiTro(tk.getVaiTro());
        r.setEmail(tk.getEmail());
        r.setTrangThai(tk.getTrangThai());
        return r;
    }
}

