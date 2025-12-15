package com.example.householdmanagement.controller;

import com.example.householdmanagement.dto.TaiKhoanRequest;
import com.example.householdmanagement.dto.TaiKhoanResponse;
import com.example.householdmanagement.service.TaiKhoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/taikhoan")
public class TaiKhoanController {

    @Autowired
    private TaiKhoanService taiKhoanService;

    @GetMapping
    public ResponseEntity<List<TaiKhoanResponse>> layTatCa() {
        return ResponseEntity.ok(taiKhoanService.layTatCaTaiKhoan());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaiKhoanResponse> layTheoId(@PathVariable Long id) {
        return ResponseEntity.ok(taiKhoanService.layTaiKhoanTheoId(id));
    }

    @PostMapping
    public ResponseEntity<TaiKhoanResponse> tao(@RequestBody TaiKhoanRequest req) {
        TaiKhoanResponse created = taiKhoanService.taoTaiKhoan(req);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaiKhoanResponse> capNhat(@PathVariable Long id, @RequestBody TaiKhoanRequest req) {
        TaiKhoanResponse updated = taiKhoanService.capNhatTaiKhoan(id, req);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> xoa(@PathVariable Long id) {
        taiKhoanService.xoaTaiKhoan(id);
        return ResponseEntity.ok().build();
    }
}

