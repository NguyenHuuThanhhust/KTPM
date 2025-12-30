package com.example.householdmanagement.dto;

/**
 * Dữ liệu đăng ký tài khoản mới.
 * Gồm thông tin cho cả bảng CANBO và TAIKHOAN.
 */
public class RegisterRequest {
    // CANBO
    private String hoTen;
    private String chucVu;
    private Long maXaPhuong;

    // TAIKHOAN
    private String tenDangNhap;
    private String matKhau;
    private String email;
    private String vaiTro; // ví dụ: ADMIN, "Cán bộ", "Quản trị viên"

    public String getHoTen() {
        return hoTen;
    }

    public void setHoTen(String hoTen) {
        this.hoTen = hoTen;
    }

    public String getChucVu() {
        return chucVu;
    }

    public void setChucVu(String chucVu) {
        this.chucVu = chucVu;
    }

    public Long getMaXaPhuong() {
        return maXaPhuong;
    }

    public void setMaXaPhuong(Long maXaPhuong) {
        this.maXaPhuong = maXaPhuong;
    }

    public String getTenDangNhap() {
        return tenDangNhap;
    }

    public void setTenDangNhap(String tenDangNhap) {
        this.tenDangNhap = tenDangNhap;
    }

    public String getMatKhau() {
        return matKhau;
    }

    public void setMatKhau(String matKhau) {
        this.matKhau = matKhau;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getVaiTro() {
        return vaiTro;
    }

    public void setVaiTro(String vaiTro) {
        this.vaiTro = vaiTro;
    }
}


