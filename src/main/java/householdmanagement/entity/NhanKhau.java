package com.example.householdmanagement.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "nhan_khau")
public class NhanKhau {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "ho_va_ten", nullable = false)
    @NotBlank(message = "Họ và tên không được để trống")
    private String hoVaTen;
    
    @Column(name = "bi_danh")
    private String biDanh;
    
    @Column(name = "ngay_sinh")
    private LocalDate ngaySinh;
    
    @Column(name = "noi_sinh")
    private String noiSinh;
    
    @Column(name = "nguyen_quan")
    private String nguyenQuan;
    
    @Column(name = "dan_toc")
    private String danToc;
    
    @Column(name = "nghe_nghiep")
    private String ngheNghiep;
    
    @Column(name = "noi_lam_viec")
    private String noiLamViec;
    
    @Column(name = "so_cmnd_cccd", unique = true)
    private String soCmndCccd;
    
    @Column(name = "ngay_cap")
    private LocalDate ngayCap;
    
    @Column(name = "noi_cap")
    private String noiCap;
    
    @Column(name = "ngay_dang_ky_thuong_tru")
    private LocalDate ngayDangKyThuongTru;
    
    @Column(name = "dia_chi_thuong_tru_truoc")
    private String diaChiThuongTruTruoc;
    
    @Column(name = "quan_he_voi_chu_ho")
    private String quanHeVoiChuHo;
    
    @Column(name = "ghi_chu")
    private String ghiChu;
    
    @Column(name = "ngay_chuyen_di")
    private LocalDate ngayChuyenDi;
    
    @Column(name = "noi_chuyen")
    private String noiChuyen;
    
    @Column(name = "ngay_tao")
    private LocalDateTime ngayTao;
    
    @Column(name = "ngay_cap_nhat")
    private LocalDateTime ngayCapNhat;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ho_khau_id", nullable = false)
    @NotNull(message = "Hộ khẩu không được để trống")
    private HoKhau hoKhau;
    
    // Constructors
    public NhanKhau() {}
    
    public NhanKhau(String hoVaTen, String soCmndCccd, HoKhau hoKhau) {
        this.hoVaTen = hoVaTen;
        this.soCmndCccd = soCmndCccd;
        this.hoKhau = hoKhau;
        this.ngayTao = LocalDateTime.now();
        this.ngayCapNhat = LocalDateTime.now();
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getHoVaTen() {
        return hoVaTen;
    }
    
    public void setHoVaTen(String hoVaTen) {
        this.hoVaTen = hoVaTen;
    }
    
    public String getBiDanh() {
        return biDanh;
    }
    
    public void setBiDanh(String biDanh) {
        this.biDanh = biDanh;
    }
    
    public LocalDate getNgaySinh() {
        return ngaySinh;
    }
    
    public void setNgaySinh(LocalDate ngaySinh) {
        this.ngaySinh = ngaySinh;
    }
    
    public String getNoiSinh() {
        return noiSinh;
    }
    
    public void setNoiSinh(String noiSinh) {
        this.noiSinh = noiSinh;
    }
    
    public String getNguyenQuan() {
        return nguyenQuan;
    }
    
    public void setNguyenQuan(String nguyenQuan) {
        this.nguyenQuan = nguyenQuan;
    }
    
    public String getDanToc() {
        return danToc;
    }
    
    public void setDanToc(String danToc) {
        this.danToc = danToc;
    }
    
    public String getNgheNghiep() {
        return ngheNghiep;
    }
    
    public void setNgheNghiep(String ngheNghiep) {
        this.ngheNghiep = ngheNghiep;
    }
    
    public String getNoiLamViec() {
        return noiLamViec;
    }
    
    public void setNoiLamViec(String noiLamViec) {
        this.noiLamViec = noiLamViec;
    }
    
    public String getSoCmndCccd() {
        return soCmndCccd;
    }
    
    public void setSoCmndCccd(String soCmndCccd) {
        this.soCmndCccd = soCmndCccd;
    }
    
    public LocalDate getNgayCap() {
        return ngayCap;
    }
    
    public void setNgayCap(LocalDate ngayCap) {
        this.ngayCap = ngayCap;
    }
    
    public String getNoiCap() {
        return noiCap;
    }
    
    public void setNoiCap(String noiCap) {
        this.noiCap = noiCap;
    }
    
    public LocalDate getNgayDangKyThuongTru() {
        return ngayDangKyThuongTru;
    }
    
    public void setNgayDangKyThuongTru(LocalDate ngayDangKyThuongTru) {
        this.ngayDangKyThuongTru = ngayDangKyThuongTru;
    }
    
    public String getDiaChiThuongTruTruoc() {
        return diaChiThuongTruTruoc;
    }
    
    public void setDiaChiThuongTruTruoc(String diaChiThuongTruTruoc) {
        this.diaChiThuongTruTruoc = diaChiThuongTruTruoc;
    }
    
    public String getQuanHeVoiChuHo() {
        return quanHeVoiChuHo;
    }
    
    public void setQuanHeVoiChuHo(String quanHeVoiChuHo) {
        this.quanHeVoiChuHo = quanHeVoiChuHo;
    }
    
    public String getGhiChu() {
        return ghiChu;
    }
    
    public void setGhiChu(String ghiChu) {
        this.ghiChu = ghiChu;
    }
    
    public LocalDate getNgayChuyenDi() {
        return ngayChuyenDi;
    }
    
    public void setNgayChuyenDi(LocalDate ngayChuyenDi) {
        this.ngayChuyenDi = ngayChuyenDi;
    }
    
    public String getNoiChuyen() {
        return noiChuyen;
    }
    
    public void setNoiChuyen(String noiChuyen) {
        this.noiChuyen = noiChuyen;
    }
    
    public LocalDateTime getNgayTao() {
        return ngayTao;
    }
    
    public void setNgayTao(LocalDateTime ngayTao) {
        this.ngayTao = ngayTao;
    }
    
    public LocalDateTime getNgayCapNhat() {
        return ngayCapNhat;
    }
    
    public void setNgayCapNhat(LocalDateTime ngayCapNhat) {
        this.ngayCapNhat = ngayCapNhat;
    }
    
    public HoKhau getHoKhau() {
        return hoKhau;
    }
    
    public void setHoKhau(HoKhau hoKhau) {
        this.hoKhau = hoKhau;
    }
    
    @PreUpdate
    public void preUpdate() {
        this.ngayCapNhat = LocalDateTime.now();
    }
}
