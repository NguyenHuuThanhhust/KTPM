package com.example.householdmanagement.security;

import com.example.householdmanagement.entity.TaiKhoan;
import com.example.householdmanagement.repository.TaiKhoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * Load thông tin người dùng từ bảng TAIKHOAN.
 */
@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private TaiKhoanRepository taiKhoanRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        TaiKhoan tk = taiKhoanRepository.findByTenDangNhap(username)
                .orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy tài khoản: " + username));
        return new CustomUserDetails(tk);
    }
}


