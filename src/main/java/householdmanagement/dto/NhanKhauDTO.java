package com.example.householdmanagement.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class NhanKhauDTO {
    
    private Long id;
    
    @NotBlank(message = "Họ và tên không được để trống")
    private String hoVaTen;
    
    private String biDanh;
    private LocalDate ngaySinh;
    private String noiSinh;
    private String nguyenQuan;
    private String danToc;
    private String ngheNghiep;
    private String noiLamViec;
    private String soCmndCccd;
    private LocalDate ngayCap;
    private String noiCap;
    private LocalDate ngayDangKyThuongTru;
    private String diaChiThuongTruTruoc;
    private String quanHeVoiChuHo;
    private String ghiChu;
    private LocalDate ngayChuyenDi;
    private String noiChuyen;
    private LocalDateTime ngayTao;
    private LocalDateTime ngayCapNhat;
    
    @NotNull(message = "Hộ khẩu không được để trống")
    private Long hoKhauId;
    
    private String hoKhauSoHoKhau;
    
    // Constructors
    public NhanKhauDTO() {}
    
    public NhanKhauDTO(String hoVaTen, String soCmndCccd, Long hoKhauId) {
        this.hoVaTen = hoVaTen;
        this.soCmndCccd = soCmndCccd;
        this.hoKhauId = hoKhauId;
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
    
    public Long getHoKhauId() {
        return hoKhauId;
    }
    
    public void setHoKhauId(Long hoKhauId) {
        this.hoKhauId = hoKhauId;
    }
    
    public String getHoKhauSoHoKhau() {
        return hoKhauSoHoKhau;
    }
    
    public void setHoKhauSoHoKhau(String hoKhauSoHoKhau) {
        this.hoKhauSoHoKhau = hoKhauSoHoKhau;
    }
}
