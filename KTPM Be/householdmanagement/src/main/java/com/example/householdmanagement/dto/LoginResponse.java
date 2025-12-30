package com.example.householdmanagement.dto;

import lombok.Data;

@Data
public class LoginResponse {
    private String token;
    private String type = "Bearer";
    private Long maTaiKhoan;
    private String tenDangNhap;
    private String email;
    private String vaiTro;
    private String hoTen;
    private String chucVu;
}

