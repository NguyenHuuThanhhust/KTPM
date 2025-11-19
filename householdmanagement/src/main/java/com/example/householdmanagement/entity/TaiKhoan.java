package com.example.householdmanagement.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "TAIKHOAN")
public class TaiKhoan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="MATAIKHOAN")
    private Long maTaiKhoan;

    @ManyToOne
    @JoinColumn(name="MACANBO", nullable=false)
    private CanBo maCanBo;

    @Column(name="TENDANGNHAP",columnDefinition="VARCHAR(50)", unique=true)
    private String tenDangNhap;

    @Column(name="MATKHAU",columnDefinition="VARCHAR(100)")
    private String matKhau;

    @Column(name="VAITRO",columnDefinition="VARCHAR(50)")
    private String vaiTro;
}
