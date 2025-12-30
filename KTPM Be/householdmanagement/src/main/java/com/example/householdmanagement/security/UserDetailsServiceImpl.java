package com.example.householdmanagement.security;

import com.example.householdmanagement.entity.TaiKhoan;
import com.example.householdmanagement.repository.TaiKhoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private TaiKhoanRepository taiKhoanRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        TaiKhoan taiKhoan = taiKhoanRepository.findByTenDangNhap(username)
                .orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy tài khoản: " + username));

        // Kiểm tra trạng thái tài khoản
        if (!"DANG_HOAT_DONG".equals(taiKhoan.getTrangThai())) {
            throw new UsernameNotFoundException("Tài khoản chưa được kích hoạt hoặc đã bị khóa");
        }

        return org.springframework.security.core.userdetails.User.builder()
                .username(taiKhoan.getTenDangNhap())
                .password(taiKhoan.getMatKhau())
                .authorities(taiKhoan.getVaiTro() != null ? taiKhoan.getVaiTro() : "USER")
                .accountExpired(false)
                .accountLocked(false)
                .credentialsExpired(false)
                .disabled(!"DANG_HOAT_DONG".equals(taiKhoan.getTrangThai()))
                .build();
    }

    public UserDetails loadUserByEmail(String email) throws UsernameNotFoundException {
        TaiKhoan taiKhoan = taiKhoanRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy tài khoản với email: " + email));

        if (!"DANG_HOAT_DONG".equals(taiKhoan.getTrangThai())) {
            throw new UsernameNotFoundException("Tài khoản chưa được kích hoạt hoặc đã bị khóa");
        }

        return org.springframework.security.core.userdetails.User.builder()
                .username(taiKhoan.getTenDangNhap())
                .password(taiKhoan.getMatKhau())
                .authorities(taiKhoan.getVaiTro() != null ? taiKhoan.getVaiTro() : "USER")
                .accountExpired(false)
                .accountLocked(false)
                .credentialsExpired(false)
                .disabled(!"DANG_HOAT_DONG".equals(taiKhoan.getTrangThai()))
                .build();
    }
}

