package com.example.householdmanagement.controller;

import com.example.householdmanagement.dto.LoginRequest;
import com.example.householdmanagement.dto.RegisterRequest;
import com.example.householdmanagement.dto.TaiKhoanResponse;
import com.example.householdmanagement.entity.CanBo;
import com.example.householdmanagement.entity.TaiKhoan;
import com.example.householdmanagement.entity.XaPhuong;
import com.example.householdmanagement.repository.CanBoRepository;
import com.example.householdmanagement.repository.TaiKhoanRepository;
import com.example.householdmanagement.repository.XaPhuongRepository;
import com.example.householdmanagement.security.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TaiKhoanRepository taiKhoanRepository;

    @Autowired
    private CanBoRepository canBoRepository;

    @Autowired
    private XaPhuongRepository xaPhuongRepository;

    /**
     * Đăng nhập: nhận username + password, nếu đúng sẽ tạo session (JSESSIONID)
     * và trả về thông tin tài khoản (không kèm mật khẩu).
     */
    @PostMapping("/login")
    public ResponseEntity<TaiKhoanResponse> login(@RequestBody LoginRequest request) {
        UsernamePasswordAuthenticationToken token =
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword());
        Authentication auth = authenticationManager.authenticate(token);
        SecurityContextHolder.getContext().setAuthentication(auth);

        CustomUserDetails userDetails = (CustomUserDetails) auth.getPrincipal();
        TaiKhoan tk = userDetails.getTaiKhoan();

        TaiKhoanResponse res = new TaiKhoanResponse();
        res.setMaTaiKhoan(tk.getMaTaiKhoan());
        res.setMaCanBo(tk.getMaCanBo() != null ? tk.getMaCanBo().getMaCanBo() : null);
        res.setTenDangNhap(tk.getTenDangNhap());
        res.setVaiTro(tk.getVaiTro());
        res.setEmail(tk.getEmail());
        res.setTrangThai(tk.getTrangThai());
        return ResponseEntity.ok(res);
    }

    /**
     * Đăng ký tài khoản mới (tạo CANBO + TAIKHOAN).
     */
    @PostMapping("/register")
    public ResponseEntity<TaiKhoanResponse> register(@RequestBody RegisterRequest req) {
        // validate tối thiểu
        if (req.getTenDangNhap() == null || req.getTenDangNhap().trim().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        if (req.getMatKhau() == null || req.getMatKhau().trim().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        if (req.getMaXaPhuong() == null) {
            return ResponseEntity.badRequest().build();
        }
        if (taiKhoanRepository.existsByTenDangNhap(req.getTenDangNhap())) {
            return ResponseEntity.badRequest().build();
        }
        if (req.getEmail() != null && taiKhoanRepository.existsByEmail(req.getEmail())) {
            return ResponseEntity.badRequest().build();
        }

        XaPhuong xaPhuong = xaPhuongRepository.findById(req.getMaXaPhuong())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy xã phường: " + req.getMaXaPhuong()));

        // Tạo CANBO
        CanBo canBo = new CanBo();
        canBo.setHoTen(req.getHoTen());
        canBo.setChucVu(req.getChucVu());
        canBo.setXaPhuong(xaPhuong);
        CanBo savedCanBo = canBoRepository.save(canBo);

        // Tạo TAIKHOAN
        TaiKhoan tk = new TaiKhoan();
        tk.setMaCanBo(savedCanBo);
        tk.setTenDangNhap(req.getTenDangNhap());
        tk.setMatKhau(req.getMatKhau());
        tk.setEmail(req.getEmail());
        tk.setVaiTro(req.getVaiTro() != null ? req.getVaiTro() : "ADMIN");
        tk.setTrangThai("DANG_HOAT_DONG");

        TaiKhoan savedTk = taiKhoanRepository.save(tk);

        TaiKhoanResponse res = new TaiKhoanResponse();
        res.setMaTaiKhoan(savedTk.getMaTaiKhoan());
        res.setMaCanBo(savedCanBo.getMaCanBo());
        res.setTenDangNhap(savedTk.getTenDangNhap());
        res.setVaiTro(savedTk.getVaiTro());
        res.setEmail(savedTk.getEmail());
        res.setTrangThai(savedTk.getTrangThai());

        return ResponseEntity.ok(res);
    }

    /**
     * Đăng xuất: xóa authentication khỏi SecurityContext.
     * FE chỉ cần gọi rồi xoá thông tin user phía client.
     */
    @PostMapping("/logout")
    public ResponseEntity<Void> logout() {
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok().build();
    }
}


