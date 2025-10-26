package com.example.householdmanagement.controller;

import com.example.householdmanagement.dto.NhanKhauDTO;
import com.example.householdmanagement.service.NhanKhauService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/nhan-khau")
@CrossOrigin(origins = "*")
public class NhanKhauController {
    
    @Autowired
    private NhanKhauService nhanKhauService;
    
    // CRUD
    @GetMapping
    public ResponseEntity<List<NhanKhauDTO>> getAllNhanKhau() {
        List<NhanKhauDTO> nhanKhauList = nhanKhauService.getAllNhanKhau();
        return ResponseEntity.ok(nhanKhauList);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<NhanKhauDTO> getNhanKhauById(@PathVariable Long id) {
        Optional<NhanKhauDTO> nhanKhau = nhanKhauService.getNhanKhauById(id);
        return nhanKhau.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<NhanKhauDTO> createNhanKhau(@Valid @RequestBody NhanKhauDTO nhanKhauDTO) {
        try {
            NhanKhauDTO createdNhanKhau = nhanKhauService.createNhanKhau(nhanKhauDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdNhanKhau);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<NhanKhauDTO> updateNhanKhau(@PathVariable Long id, @Valid @RequestBody NhanKhauDTO nhanKhauDTO) {
        try {
            NhanKhauDTO updatedNhanKhau = nhanKhauService.updateNhanKhau(id, nhanKhauDTO);
            return ResponseEntity.ok(updatedNhanKhau);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNhanKhau(@PathVariable Long id) {
        try {
            nhanKhauService.deleteNhanKhau(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
