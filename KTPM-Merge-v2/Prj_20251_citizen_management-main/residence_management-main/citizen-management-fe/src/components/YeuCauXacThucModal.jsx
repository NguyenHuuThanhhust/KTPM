import { useState } from "react";
import { X, Check, XCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const API_BASE = "http://localhost:8080/api";

export default function YeuCauXacThucModal({ yeuCau, isOpen, onClose, onUpdate }) {
  const { user } = useAuth();
  const [hanhDong, setHanhDong] = useState(null); // "XAC_THUC" hoặc "TU_CHOI"
  const [lyDoTuChoi, setLyDoTuChoi] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  if (!isOpen || !yeuCau) return null;

  const handleXacThuc = async () => {
    if (!user || !user.maCanBo) {
      setMessage({ type: "error", text: "Không tìm thấy thông tin cán bộ" });
      return;
    }

    setSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch(`${API_BASE}/yeucau/xac-thuc`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          maYeuCau: yeuCau.maYeuCau,
          maCanBo: user.maCanBo,
          hanhDong: "XAC_THUC",
          lyDoTuChoi: null,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Xác thực thất bại");
      }

      setMessage({ type: "success", text: "Đã xác thực yêu cầu thành công!" });
      if (onUpdate) onUpdate();
      
      setTimeout(() => {
        onClose();
        setMessage(null);
      }, 1500);
    } catch (error) {
      setMessage({ type: "error", text: error.message || "Có lỗi xảy ra" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleTuChoi = async () => {
    if (!lyDoTuChoi.trim()) {
      setMessage({ type: "error", text: "Vui lòng nhập lý do từ chối" });
      return;
    }

    if (!user || !user.maCanBo) {
      setMessage({ type: "error", text: "Không tìm thấy thông tin cán bộ" });
      return;
    }

    setSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch(`${API_BASE}/yeucau/xac-thuc`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          maYeuCau: yeuCau.maYeuCau,
          maCanBo: user.maCanBo,
          hanhDong: "TU_CHOI",
          lyDoTuChoi: lyDoTuChoi,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Từ chối thất bại");
      }

      setMessage({ type: "success", text: "Đã từ chối yêu cầu" });
      if (onUpdate) onUpdate();
      
      setTimeout(() => {
        onClose();
        setMessage(null);
        setLyDoTuChoi("");
      }, 1500);
    } catch (error) {
      setMessage({ type: "error", text: error.message || "Có lỗi xảy ra" });
    } finally {
      setSubmitting(false);
    }
  };

  const parseDuLieu = () => {
    try {
      return yeuCau.duLieu ? JSON.parse(yeuCau.duLieu) : null;
    } catch (e) {
      return null;
    }
  };

  const duLieu = parseDuLieu();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Xác thực yêu cầu</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Thông tin yêu cầu */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Loại yêu cầu:</span>
              <span className="font-medium">{yeuCau.loaiYeuCauLabel}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Chủ hộ:</span>
              <span className="font-medium">{yeuCau.hoTenChuHo} ({yeuCau.tenDangNhap})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Số hộ khẩu:</span>
              <span className="font-medium">{yeuCau.soHoKhau}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Ngày tạo:</span>
              <span className="font-medium">
                {yeuCau.ngayTao ? new Date(yeuCau.ngayTao).toLocaleString("vi-VN") : "—"}
              </span>
            </div>
            {yeuCau.ghiChu && (
              <div>
                <span className="text-sm text-gray-500">Ghi chú:</span>
                <p className="text-sm mt-1">{yeuCau.ghiChu}</p>
              </div>
            )}
          </div>

          {/* Dữ liệu nhân khẩu */}
          {duLieu && (
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-3">Thông tin nhân khẩu:</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {duLieu.hoTen && (
                  <div>
                    <span className="text-gray-500">Họ tên:</span>
                    <p className="font-medium">{duLieu.hoTen}</p>
                  </div>
                )}
                {duLieu.gioiTinh && (
                  <div>
                    <span className="text-gray-500">Giới tính:</span>
                    <p className="font-medium">{duLieu.gioiTinh}</p>
                  </div>
                )}
                {duLieu.ngaySinh && (
                  <div>
                    <span className="text-gray-500">Ngày sinh:</span>
                    <p className="font-medium">{duLieu.ngaySinh}</p>
                  </div>
                )}
                {duLieu.cmnd && (
                  <div>
                    <span className="text-gray-500">CCCD:</span>
                    <p className="font-medium">{duLieu.cmnd}</p>
                  </div>
                )}
                {duLieu.ngheNghiep && (
                  <div>
                    <span className="text-gray-500">Nghề nghiệp:</span>
                    <p className="font-medium">{duLieu.ngheNghiep}</p>
                  </div>
                )}
                {duLieu.quanHeVoiChuHo && (
                  <div>
                    <span className="text-gray-500">Quan hệ với chủ hộ:</span>
                    <p className="font-medium">{duLieu.quanHeVoiChuHo}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Form từ chối */}
          {hanhDong === "TU_CHOI" && (
            <div>
              <label className="block text-sm font-medium mb-2">Lý do từ chối *</label>
              <textarea
                className="w-full px-3 py-2 border rounded-lg"
                rows="3"
                value={lyDoTuChoi}
                onChange={(e) => setLyDoTuChoi(e.target.value)}
                placeholder="Nhập lý do từ chối yêu cầu này..."
                disabled={submitting}
              />
            </div>
          )}

          {message && (
            <div className={`p-3 rounded-lg text-sm ${
              message.type === "success" 
                ? "bg-green-50 text-green-700 border border-green-200" 
                : "bg-red-50 text-red-700 border border-red-200"
            }`}>
              {message.text}
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            {hanhDong !== "TU_CHOI" && (
              <>
                <button
                  onClick={handleXacThuc}
                  disabled={submitting}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  {submitting ? "Đang xử lý..." : "Xác thực"}
                </button>
                <button
                  onClick={() => setHanhDong("TU_CHOI")}
                  disabled={submitting}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <XCircle className="w-4 h-4" />
                  Từ chối
                </button>
              </>
            )}
            {hanhDong === "TU_CHOI" && (
              <>
                <button
                  onClick={handleTuChoi}
                  disabled={submitting || !lyDoTuChoi.trim()}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                >
                  {submitting ? "Đang xử lý..." : "Xác nhận từ chối"}
                </button>
                <button
                  onClick={() => {
                    setHanhDong(null);
                    setLyDoTuChoi("");
                  }}
                  disabled={submitting}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
                >
                  Hủy
                </button>
              </>
            )}
            <button
              onClick={onClose}
              disabled={submitting}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

