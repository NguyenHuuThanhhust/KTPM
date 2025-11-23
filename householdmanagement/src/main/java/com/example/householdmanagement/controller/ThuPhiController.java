package com.example.householdmanagement.controller;

import com.example.householdmanagement.dto.ThuPhiDTO;
import com.example.householdmanagement.service.ThuPhiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/thu-phi")
@CrossOrigin(origins = "*")
public class ThuPhiController {
    
    @Autowired
    private ThuPhiService thuPhiService;
    
    // CRUD cơ bản
    @GetMapping
    public ResponseEntity<List<ThuPhiDTO>> getAllThuPhi() {
        List<ThuPhiDTO> thuPhiList = thuPhiService.getAllThuPhi();
        return ResponseEntity.ok(thuPhiList);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ThuPhiDTO> getThuPhiById(@PathVariable Long id) {
        Optional<ThuPhiDTO> thuPhi = thuPhiService.getThuPhiById(id);
        return thuPhi.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<ThuPhiDTO> createThuPhi(@Valid @RequestBody ThuPhiDTO thuPhiDTO) {
        try {
            ThuPhiDTO createdThuPhi = thuPhiService.createThuPhi(thuPhiDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdThuPhi);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ThuPhiDTO> updateThuPhi(@PathVariable Long id, @Valid @RequestBody ThuPhiDTO thuPhiDTO) {
        try {
            ThuPhiDTO updatedThuPhi = thuPhiService.updateThuPhi(id, thuPhiDTO);
            return ResponseEntity.ok(updatedThuPhi);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteThuPhi(@PathVariable Long id) {
        try {
            thuPhiService.deleteThuPhi(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
