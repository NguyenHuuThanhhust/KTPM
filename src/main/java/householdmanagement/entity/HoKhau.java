package com.example.householdmanagement.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "ho_khau")
public class HoKhau {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "so_ho_khau", unique = true, nullable = false)
    @NotBlank(message = "Số hộ khẩu không được để trống")
    private String soHoKhau;
    
    @Column(name = "ho_ten_chu_ho", nullable = false)
    @NotBlank(message = "Họ tên chủ hộ không được để trống")
    private String hoTenChuHo;
    
    @Column(name = "so_nha")
    private String soNha;
    
    @Column(name = "duong_pho")
    private String duongPho;
    
    @Column(name = "phuong_xa")
    private String phuongXa;
    
    @Column(name = "quan_huyen")
    private String quanHuyen;
    
    @Column(name = "ngay_tao")
    private LocalDateTime ngayTao;
    
    @Column(name = "ngay_cap_nhat")
    private LocalDateTime ngayCapNhat;
    
    @Column(name = "noi_dung_thay_doi")
    private String noiDungThayDoi;
    
    @Column(name = "ngay_thay_doi")
    private LocalDateTime ngayThayDoi;
    
    @OneToMany(mappedBy = "hoKhau", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<NhanKhau> nhanKhauList;
    
    // Constructors
    public HoKhau() {}
    
    public HoKhau(String soHoKhau, String hoTenChuHo, String soNha, String duongPho, 
                  String phuongXa, String quanHuyen) {
        this.soHoKhau = soHoKhau;
        this.hoTenChuHo = hoTenChuHo;
        this.soNha = soNha;
        this.duongPho = duongPho;
        this.phuongXa = phuongXa;
        this.quanHuyen = quanHuyen;
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
    
    public String getSoHoKhau() {
        return soHoKhau;
    }
    
    public void setSoHoKhau(String soHoKhau) {
        this.soHoKhau = soHoKhau;
    }
    
    public String getHoTenChuHo() {
        return hoTenChuHo;
    }
    
    public void setHoTenChuHo(String hoTenChuHo) {
        this.hoTenChuHo = hoTenChuHo;
    }
    
    public String getSoNha() {
        return soNha;
    }
    
    public void setSoNha(String soNha) {
        this.soNha = soNha;
    }
    
    public String getDuongPho() {
        return duongPho;
    }
    
    public void setDuongPho(String duongPho) {
        this.duongPho = duongPho;
    }
    
    public String getPhuongXa() {
        return phuongXa;
    }
    
    public void setPhuongXa(String phuongXa) {
        this.phuongXa = phuongXa;
    }
    
    public String getQuanHuyen() {
        return quanHuyen;
    }
    
    public void setQuanHuyen(String quanHuyen) {
        this.quanHuyen = quanHuyen;
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
    
    public String getNoiDungThayDoi() {
        return noiDungThayDoi;
    }
    
    public void setNoiDungThayDoi(String noiDungThayDoi) {
        this.noiDungThayDoi = noiDungThayDoi;
    }
    
    public LocalDateTime getNgayThayDoi() {
        return ngayThayDoi;
    }
    
    public void setNgayThayDoi(LocalDateTime ngayThayDoi) {
        this.ngayThayDoi = ngayThayDoi;
    }
    
    public List<NhanKhau> getNhanKhauList() {
        return nhanKhauList;
    }
    
    public void setNhanKhauList(List<NhanKhau> nhanKhauList) {
        this.nhanKhauList = nhanKhauList;
    }
    
    @PreUpdate
    public void preUpdate() {
        this.ngayCapNhat = LocalDateTime.now();
    }
}
