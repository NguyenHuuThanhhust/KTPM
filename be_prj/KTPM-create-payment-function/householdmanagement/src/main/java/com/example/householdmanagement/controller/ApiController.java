package com.example.householdmanagement.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ApiController {

    @GetMapping
    public ResponseEntity<Map<String, Object>> apiRoot() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Welcome to Household Management API");
        response.put("version", "1.0.0");
        response.put("status", "running");
        response.put("endpoints", new String[] {
                "/api/taikhoan",
                "/api/nhankhau",
                "/api/thoiloai-phi",
                "/api/du-toan-thu-phi",
                "/api/tam-tru",
                "/api/phi-ve-sinh",
                "/api/dong-gop",
                "/api/thong-ke"
        });
        return ResponseEntity.ok(response);
    }
}
