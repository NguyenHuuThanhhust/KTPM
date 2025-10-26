package com.example.householdmanagement.repository;

import com.example.householdmanagement.entity.HoKhau;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HoKhauRepository extends JpaRepository<HoKhau, Long> {
    //Đợi database
}
