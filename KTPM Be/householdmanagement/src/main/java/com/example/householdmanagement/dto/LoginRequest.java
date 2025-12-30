package com.example.householdmanagement.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String email; // Có thể đăng nhập bằng email hoặc tenDangNhap
    private String tenDangNhap;
    private String password;
}

