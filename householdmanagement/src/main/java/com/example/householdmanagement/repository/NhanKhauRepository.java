package com.example.householdmanagement.repository;

import com.example.householdmanagement.entity.NhanKhau;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface NhanKhauRepository extends JpaRepository<NhanKhau, Long> {
    List<NhanKhau> findByHoKhau_SoHoKhau(Long soHoKhau);
    
    List<NhanKhau> findByHoTenContainingIgnoreCase(String hoTen);
    
    List<NhanKhau> findByGioiTinh(String gioiTinh);
    
    @Query("SELECT n FROM NhanKhau n WHERE n.ngaySinh BETWEEN :tuNgay AND :denNgay")
    List<NhanKhau> findByNgaySinhBetween(@Param("tuNgay") LocalDateTime tuNgay, @Param("denNgay") LocalDateTime denNgay);
    
    @Query("SELECT n FROM NhanKhau n WHERE n.trangThai = :trangThai")
    List<NhanKhau> findByTrangThai(@Param("trangThai") String trangThai);
    
    @Query("SELECT n FROM NhanKhau n WHERE n.hoKhau.soHoKhau = :soHoKhau AND n.quanHeVoiChuHo = 'Chu ho'")
    NhanKhau findChuHoBySoHoKhau(@Param("soHoKhau") Long soHoKhau);
    
    List<NhanKhau> findByCmnd(String cmnd);
}

