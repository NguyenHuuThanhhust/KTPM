package com.example.householdmanagement.repository;

import com.example.householdmanagement.entity.LichSuThayDoiNhanKhau;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LichSuThayDoiNhanKhauRepository extends JpaRepository<LichSuThayDoiNhanKhau, Long> {
    List<LichSuThayDoiNhanKhau> findByNhanKhau_MaNhanKhauOrderByNgayThayDoiDesc(Long maNhanKhau);
    
    @Query("SELECT l FROM LichSuThayDoiNhanKhau l WHERE l.nhanKhau.hoKhau.soHoKhau = :soHoKhau ORDER BY l.ngayThayDoi DESC")
    List<LichSuThayDoiNhanKhau> findBySoHoKhauOrderByNgayThayDoiDesc(@Param("soHoKhau") Long soHoKhau);
}


