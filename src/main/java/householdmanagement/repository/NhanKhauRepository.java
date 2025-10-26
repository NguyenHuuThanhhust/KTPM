package com.example.householdmanagement.repository;

import com.example.householdmanagement.entity.NhanKhau;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NhanKhauRepository extends JpaRepository<NhanKhau, Long> {
    //Đợi database
}
