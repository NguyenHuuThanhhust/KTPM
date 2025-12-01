import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../styles/modal.css";

export default function QuanLiHoKhau() {
  const navigate = useNavigate();
  const [selectedHoKhau, setSelectedHoKhau] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("view"); // 'view' or 'edit'
  const [formData, setFormData] = useState(null);

  const hoKhauData = useMemo(
    () => [
      {
        soHoKhau: "HK123456",
        chuHo: "Nguyễn Văn A",
        soNha: "25",
        duongPho: "Tố Hữu",
        phuong: "La Khê",
        quan: "Hà Đông",
        soNhanKhau: 3,
        ngayDangKy: "2001-05-10",
      },
      {
        soHoKhau: "HK654321",
        chuHo: "Trần Thị B",
        soNha: "10",
        duongPho: "Lê Văn Lương",
        phuong: "Mộ Lao",
        quan: "Hà Đông",
        soNhanKhau: 2,
        ngayDangKy: "2003-02-10",
      },
      {
        soHoKhau: "HK112233",
        chuHo: "Lê Văn C",
        soNha: "5",
        duongPho: "Quang Trung",
        phuong: "Văn Quán",
        quan: "Hà Đông",
        soNhanKhau: 4,
        ngayDangKy: "2005-01-15",
      },
      {
        soHoKhau: "HK445566",
        chuHo: "Phạm Thị D",
        soNha: "15",
        duongPho: "Trần Phú",
        phuong: "Yên Nghĩa",
        quan: "Hà Đông",
        soNhanKhau: 5,
        ngayDangKy: "2002-08-20",
      },
      {
        soHoKhau: "HK778899",
        chuHo: "Hoàng Văn E",
        soNha: "30",
        duongPho: "Nguyễn Trãi",
        phuong: "Hà Cầu",
        quan: "Hà Đông",
        soNhanKhau: 3,
        ngayDangKy: "2004-03-05",
      },
      {
        soHoKhau: "HK998877",
        chuHo: "Đỗ Thị F",
        soNha: "12",
        duongPho: "Phùng Hưng",
        phuong: "Phú Lãm",
        quan: "Hà Đông",
        soNhanKhau: 2,
        ngayDangKy: "2006-06-12",
      },
      {
        soHoKhau: "HK334455",
        chuHo: "Vũ Văn G",
        soNha: "8",
        duongPho: "Bà Triệu",
        phuong: "Kiến Hưng",
        quan: "Hà Đông",
        soNhanKhau: 6,
        ngayDangKy: "2003-11-08",
      },
      {
        soHoKhau: "HK556677",
        chuHo: "Trịnh Thị H",
        soNha: "20",
        duongPho: "Lý Thường Kiệt",
        phuong: "Dương Nội",
        quan: "Hà Đông",
        soNhanKhau: 4,
        ngayDangKy: "2005-04-22",
      },
      {
        soHoKhau: "HK221133",
        chuHo: "Lý Văn I",
        soNha: "18",
        duongPho: "Hà Trì",
        phuong: "Hà Cầu",
        quan: "Hà Đông",
        soNhanKhau: 3,
        ngayDangKy: "2001-12-10",
      },
      {
        soHoKhau: "HK887766",
        chuHo: "Phan Thị J",
        soNha: "22",
        duongPho: "Tô Hiệu",
        phuong: "La Khê",
        quan: "Hà Đông",
        soNhanKhau: 5,
        ngayDangKy: "2002-07-18",
      },
      {
        soHoKhau: "HK445577",
        chuHo: "Trần Văn K",
        soNha: "28",
        duongPho: "Quốc lộ 6",
        phuong: "Mộ Lao",
        quan: "Hà Đông",
        soNhanKhau: 2,
        ngayDangKy: "2004-09-25",
      },
      {
        soHoKhau: "HK667788",
        chuHo: "Ngô Thị L",
        soNha: "14",
        duongPho: "Văn Phú",
        phuong: "Phú Lãm",
        quan: "Hà Đông",
        soNhanKhau: 4,
        ngayDangKy: "2006-02-14",
      },
    ],
    []
  );

  // Search & sort state
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("");

  const filteredHoKhau = useMemo(() => {
    let arr = [...hoKhauData];
    if (query) {
      const q = query.toLowerCase();
      arr = arr.filter(
        (h) =>
          h.soHoKhau.toLowerCase().includes(q) ||
          h.chuHo.toLowerCase().includes(q) ||
          h.duongPho.toLowerCase().includes(q)
      );
    }
    if (sortBy === "name") {
      arr.sort((a, b) => a.chuHo.localeCompare(b.chuHo, "vi"));
    } else if (sortBy === "soHoKhau") {
      arr.sort((a, b) => a.soHoKhau.localeCompare(b.soHoKhau));
    } else if (sortBy === "ngayDangKy") {
      arr.sort((a, b) => new Date(b.ngayDangKy) - new Date(a.ngayDangKy));
    }
    return arr;
  }, [hoKhauData, query, sortBy]);

  const totalHoKhau = hoKhauData.length;
  const totalNhanKhau = hoKhauData.reduce((sum, h) => sum + h.soNhanKhau, 0);

  const openViewModal = (hoKhau) => {
    setSelectedHoKhau(hoKhau);
    setFormData(hoKhau);
    setModalMode("view");
    setIsModalOpen(true);
  };

  const openEditModal = (hoKhau) => {
    setSelectedHoKhau(hoKhau);
    setFormData({ ...hoKhau });
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedHoKhau(null);
    setFormData(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveForm = () => {
    console.log("Lưu dữ liệu:", formData);
    alert("Lưu thông tin hộ khẩu thành công!");
    closeModal();
  };

  // Quản lý scroll khi modal mở/đóng
  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isModalOpen]);

  return (
    <div className="flex h-screen w-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow-sm flex-shrink-0 border-b border-gray-200">
          <div className="px-6 md:px-8 py-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Quản lý Hộ khẩu
            </h1>
            <p className="text-gray-600 mt-2 text-sm">
              Danh sách và quản lý toàn bộ hộ khẩu
            </p>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-auto">
          <div className="w-full h-full p-6 md:p-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">
                      Tổng Hộ khẩu
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {totalHoKhau}
                    </p>
                  </div>
                  <div className="text-4xl text-blue-500">🏠</div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">
                      Tổng Nhân khẩu
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {totalNhanKhau}
                    </p>
                  </div>
                  <div className="text-4xl text-green-500">👥</div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">
                      Trung bình nhân khẩu
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {(totalNhanKhau / totalHoKhau).toFixed(1)}
                    </p>
                  </div>
                  <div className="text-4xl text-purple-500">📊</div>
                </div>
              </div>
            </div>

            {/* Main Table */}
            <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <h2 className="text-xl font-bold text-gray-900">
                    Danh sách Hộ khẩu
                  </h2>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full md:w-auto">
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <label className="text-sm text-gray-600 whitespace-nowrap">
                        Sắp xếp:
                      </label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="bg-gray-100 text-gray-900 p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1 sm:flex-none"
                      >
                        <option value="">Mặc định</option>
                        <option value="name">Tên chủ hộ</option>
                        <option value="soHoKhau">Số hộ khẩu</option>
                        <option value="ngayDangKy">Ngày đăng ký</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Tìm kiếm..."
                        className="bg-gray-100 text-gray-900 p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
                      />
                      <button
                        onClick={() => {
                          setQuery("");
                          setSortBy("");
                        }}
                        className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded transition whitespace-nowrap"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                        Số hộ khẩu
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                        Chủ hộ
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                        Địa chỉ
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                        Số nhân khẩu
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                        Ngày đăng ký
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                        Thao tác
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredHoKhau.length > 0 ? (
                      filteredHoKhau.map((hoKhau) => (
                        <tr
                          key={hoKhau.soHoKhau}
                          className="border-b border-gray-200 hover:bg-gray-50 transition"
                        >
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">
                            {hoKhau.soHoKhau}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {hoKhau.chuHo}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {hoKhau.soNha} {hoKhau.duongPho}, {hoKhau.phuong}
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                              {hoKhau.soNhanKhau} người
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {new Date(hoKhau.ngayDangKy).toLocaleDateString(
                              "vi-VN"
                            )}
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <div className="flex gap-2">
                              <button
                                onClick={() => openViewModal(hoKhau)}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs transition"
                              >
                                Xem
                              </button>
                              <button
                                onClick={() => openEditModal(hoKhau)}
                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs transition"
                              >
                                Sửa
                              </button>
                              <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs transition">
                                Xóa
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="6"
                          className="px-6 py-8 text-center text-gray-500"
                        >
                          Không tìm thấy hộ khẩu nào
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="px-6 py-4 border-t border-gray-200 text-sm text-gray-600">
                Hiển thị {filteredHoKhau.length} trên {totalHoKhau} hộ khẩu
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <>
          {/* Backdrop mờ */}
          <div 
            className="modal-backdrop"
            onClick={closeModal}
          />
          
          {/* Modal Form */}
          <div className="modal-container">
            <div className="modal-form">
              {/* Modal Header */}
              <div className="modal-header">
                <h2>
                  {modalMode === "view" ? "Xem Thông tin Hộ khẩu" : "Sửa Thông tin Hộ khẩu"}
                </h2>
                <button
                  onClick={closeModal}
                  className="modal-close-btn"
                >
                  ✕
                </button>
              </div>

              {/* Modal Body */}
              {formData && (
                <form className="modal-body">
                  <div className="modal-form-grid">
                    {/* Row 1 */}
                    <div className="modal-form-row modal-form-row-2">
                      <div className="form-group">
                        <label className="form-label">Số hộ khẩu</label>
                        <input
                          type="text"
                          name="soHoKhau"
                          value={formData.soHoKhau}
                          onChange={handleFormChange}
                          disabled={modalMode === "view"}
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Chủ hộ</label>
                        <input
                          type="text"
                          name="chuHo"
                          value={formData.chuHo}
                          onChange={handleFormChange}
                          disabled={modalMode === "view"}
                          className="form-input"
                        />
                      </div>
                    </div>

                    {/* Row 2 */}
                    <div className="modal-form-row modal-form-row-2">
                      <div className="form-group">
                        <label className="form-label">Số nhà</label>
                        <input
                          type="text"
                          name="soNha"
                          value={formData.soNha}
                          onChange={handleFormChange}
                          disabled={modalMode === "view"}
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Đường phố</label>
                        <input
                          type="text"
                          name="duongPho"
                          value={formData.duongPho}
                          onChange={handleFormChange}
                          disabled={modalMode === "view"}
                          className="form-input"
                        />
                      </div>
                    </div>

                    {/* Row 3 */}
                    <div className="modal-form-row modal-form-row-3">
                      <div className="form-group">
                        <label className="form-label">Phường</label>
                        <input
                          type="text"
                          name="phuong"
                          value={formData.phuong}
                          onChange={handleFormChange}
                          disabled={modalMode === "view"}
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Quận</label>
                        <input
                          type="text"
                          name="quan"
                          value={formData.quan}
                          onChange={handleFormChange}
                          disabled={modalMode === "view"}
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Số nhân khẩu</label>
                        <input
                          type="number"
                          name="soNhanKhau"
                          value={formData.soNhanKhau}
                          onChange={handleFormChange}
                          disabled={modalMode === "view"}
                          className="form-input"
                        />
                      </div>
                    </div>

                    {/* Row 4 */}
                    <div className="form-group">
                      <label className="form-label">Ngày đăng ký</label>
                      <input
                        type="date"
                        name="ngayDangKy"
                        value={formData.ngayDangKy}
                        onChange={handleFormChange}
                        disabled={modalMode === "view"}
                        className="form-input"
                      />
                    </div>

                    {/* Modal Footer */}
                    <div className="modal-footer">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="btn btn-cancel"
                      >
                        {modalMode === "view" ? "Đóng" : "Hủy"}
                      </button>
                      {modalMode === "edit" && (
                        <button
                          type="button"
                          onClick={handleSaveForm}
                          className="btn btn-save"
                        >
                          Lưu
                        </button>
                      )}
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
