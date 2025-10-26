package com.example.householdmanagement.dto;

import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;

public class HoKhauDTO {
    
    private Long id;
    
    @NotBlank(message = "Số hộ khẩu không được để trống")
    private String soHoKhau;
    
    @NotBlank(message = "Họ tên chủ hộ không được để trống")
    private String hoTenChuHo;
    
    private String soNha;
    private String duongPho;
    private String phuongXa;
    private String quanHuyen;
    private LocalDateTime ngayTao;
    private LocalDateTime ngayCapNhat;
    private String noiDungThayDoi;
    private LocalDateTime ngayThayDoi;
    private List<NhanKhauDTO> nhanKhauList;
    
    // Constructors
    public HoKhauDTO() {}
    
    public HoKhauDTO(String soHoKhau, String hoTenChuHo, String soNha, String duongPho, 
                     String phuongXa, String quanHuyen) {
        this.soHoKhau = soHoKhau;
        this.hoTenChuHo = hoTenChuHo;
        this.soNha = soNha;
        this.duongPho = duongPho;
        this.phuongXa = phuongXa;
        this.quanHuyen = quanHuyen;
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
    
    public List<NhanKhauDTO> getNhanKhauList() {
        return nhanKhauList;
    }
    
    public void setNhanKhauList(List<NhanKhauDTO> nhanKhauList) {
        this.nhanKhauList = nhanKhauList;
    }
}
