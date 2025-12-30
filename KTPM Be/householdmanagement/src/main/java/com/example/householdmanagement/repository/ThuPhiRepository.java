package com.example.householdmanagement.repository;

import com.example.householdmanagement.entity.ThuPhi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ThuPhiRepository extends JpaRepository<ThuPhi, Long> {
    // Chỉ giữ JpaRepository cơ bản - không cần thêm query phức tạp
}
