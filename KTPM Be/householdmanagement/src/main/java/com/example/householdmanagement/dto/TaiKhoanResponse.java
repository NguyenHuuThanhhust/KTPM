package com.example.householdmanagement.dto;

import lombok.Data;

@Data
public class TaiKhoanResponse {
    private Long maTaiKhoan;
    private Long maCanBo;
    private String tenDangNhap;
    private String vaiTro;
    private String email;
    private String trangThai;
}

