package com.example.householdmanagement.repository;

import com.example.householdmanagement.entity.ThuPhi;
import com.example.householdmanagement.dto.UnpaidHouseholdDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface ThuPhiRepository extends JpaRepository<ThuPhi, Long> {
    // Tổng số tiền đã thu cho 1 loại phí
    @Query("SELECT COALESCE(SUM(t.soTien),0) FROM ThuPhi t WHERE t.loaiPhi.maLoaiPhi = :maLoai")
    BigDecimal totalCollectedByLoai(@Param("maLoai") Long maLoai);

    // Số lượng người (nhân khẩu) đã đóng cho 1 loại phí (đếm distinct nhân khẩu theo hộ -> join NhanKhau)
    @Query("SELECT COUNT(DISTINCT nk.maNhanKhau) FROM ThuPhi t JOIN t.hoKhau hk, NhanKhau nk WHERE nk.hoKhau = hk AND t.loaiPhi.maLoaiPhi = :maLoai")
    Long countDistinctPeoplePaidByLoai(@Param("maLoai") Long maLoai);

    // Danh sách các hộ chưa đóng phí cho 1 loại phí, trả về cả số tiền đã nộp (COALESCE) và thông tin để tính số tiền phải nộp
    @Query("SELECT new com.example.householdmanagement.dto.UnpaidHouseholdDto(" +
           "  h.soHoKhau, h.diaChi, h.xaPhuong.tenXaPhuong, " +
           "  COALESCE((SELECT SUM(t2.soTien) FROM ThuPhi t2 WHERE t2.hoKhau = h AND t2.loaiPhi.maLoaiPhi = :maLoai), 0), " +
           "  lp.dinhMuc, " +
           "  (SELECT COUNT(nk) FROM NhanKhau nk WHERE nk.hoKhau = h) " +
           ") " +
           "FROM HoKhau h, LoaiPhi lp " +
           "WHERE lp.maLoaiPhi = :maLoai " +
           "  AND NOT EXISTS (SELECT 1 FROM ThuPhi t WHERE t.hoKhau = h AND t.loaiPhi.maLoaiPhi = :maLoai)")
    List<UnpaidHouseholdDto> findUnpaidHouseholdsByLoai(@Param("maLoai") Long maLoai);
}
