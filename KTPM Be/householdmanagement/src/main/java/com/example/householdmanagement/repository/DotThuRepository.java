package com.example.householdmanagement.repository;

import com.example.householdmanagement.entity.DotThu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DotThuRepository extends JpaRepository<DotThu, Long> {
    // Chỉ giữ JpaRepository cơ bản - không cần thêm query phức tạp
}
