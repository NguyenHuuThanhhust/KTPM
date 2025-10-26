package com.example.householdmanagement.controller;

import com.example.householdmanagement.dto.HoKhauDTO;
import com.example.householdmanagement.service.HoKhauService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/ho-khau")
@CrossOrigin(origins = "*")
public class HoKhauController {
    
    @Autowired
    private HoKhauService hoKhauService;
    
    // CRUD
    @GetMapping
    public ResponseEntity<List<HoKhauDTO>> getAllHoKhau() {
        List<HoKhauDTO> hoKhauList = hoKhauService.getAllHoKhau();
        return ResponseEntity.ok(hoKhauList);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<HoKhauDTO> getHoKhauById(@PathVariable Long id) {
        Optional<HoKhauDTO> hoKhau = hoKhauService.getHoKhauById(id);
        return hoKhau.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<HoKhauDTO> createHoKhau(@Valid @RequestBody HoKhauDTO hoKhauDTO) {
        try {
            HoKhauDTO createdHoKhau = hoKhauService.createHoKhau(hoKhauDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdHoKhau);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<HoKhauDTO> updateHoKhau(@PathVariable Long id, @Valid @RequestBody HoKhauDTO hoKhauDTO) {
        try {
            HoKhauDTO updatedHoKhau = hoKhauService.updateHoKhau(id, hoKhauDTO);
            return ResponseEntity.ok(updatedHoKhau);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHoKhau(@PathVariable Long id) {
        try {
            hoKhauService.deleteHoKhau(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
