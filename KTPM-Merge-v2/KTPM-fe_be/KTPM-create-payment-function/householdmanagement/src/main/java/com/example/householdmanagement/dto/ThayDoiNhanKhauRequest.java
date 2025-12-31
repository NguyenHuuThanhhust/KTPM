package com.example.householdmanagement.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ThayDoiNhanKhauRequest {
    private Long maNhanKhau;
    private String loaiThayDoi; // "Chuyen di", "Qua doi", "Thay doi thong tin"
    private LocalDateTime ngayChuyenDi;
    private String noiChuyen;
    private String ghiChu;
    private String noiDungThayDoi;
}


