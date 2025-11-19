package com.example.householdmanagement.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "HOKHAU")
public class HoKhau {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="SOHOKHAU")
    private Long soHoKhau;

    @Column(name="DIACHI",columnDefinition="VARCHAR(MAX)")
    private String diaChi;

    @ManyToOne
    @JoinColumn(name="MAXAPHUONG", nullable=false)
    private XaPhuong xaPhuong;

    @CreationTimestamp
    @Column(name="NGAYCAP")
    private LocalDateTime ngayCap;

    @Column(name="GHICHU",columnDefinition="VARCHAR(MAX)")
    private String ghiChu;
}
