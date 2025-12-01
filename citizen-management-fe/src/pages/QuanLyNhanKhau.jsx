import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../headers/Header";

export default function QuanLyNhanKhau() {
  const navigate = useNavigate();

  const nhanKhau = useMemo(
    () => [
      {
        id: 1,
        hoTen: "Nguyễn Văn A",
        ngaySinh: "1975-02-10",
        noiSinh: "Hà Nội",
        nguyenQuan: "Nam Định",
        ngheNghiep: "Công nhân",
        noiLamViec: "Công ty CP ABC",
        cccd: "012345678901",
        ngayCap: "2016-03-01",
        noiCap: "CA Hà Nội",
        dangKyThuongTru: "2001-05-10",
        thuongTruTruoc: "Nam Định",
        quanHeChuHo: "Chủ hộ",
        gioiTinh: "Nam",
      },
      {
        id: 2,
        hoTen: "Trần Thị B",
        ngaySinh: "1979-12-22",
        noiSinh: "Hà Đông",
        nguyenQuan: "Hà Nam",
        ngheNghiep: "Nội trợ",
        noiLamViec: "",
        cccd: "012345678900",
        ngayCap: "2017-08-15",
        noiCap: "CA Hà Nội",
        dangKyThuongTru: "2003-02-10",
        thuongTruTruoc: "Hà Nam",
        quanHeChuHo: "Vợ",
        gioiTinh: "Nữ",
      },
      {
        id: 3,
        hoTen: "Nguyễn Văn C",
        ngaySinh: "2005-06-10",
        noiSinh: "Hà Đông",
        nguyenQuan: "Hà Nội",
        ngheNghiep: "Sinh viên",
        noiLamViec: "ĐH Bách Khoa",
        cccd: "",
        ngayCap: "",
        noiCap: "",
        dangKyThuongTru: "2005-06-12",
        thuongTruTruoc: "",
        quanHeChuHo: "Con trai",
        gioiTinh: "Nam",
      },
    ],
    []
  );

  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({ gioiTinh: "", quanHe: "", ngheNghiep: "" });

  const [splitMode, setSplitMode] = useState(false);
  const [selectedForSplit, setSelectedForSplit] = useState([]);

  const [showCreateBubble, setShowCreateBubble] = useState(false);
  const [showDetailBubble, setShowDetailBubble] = useState(null);

  const filtered = useMemo(() => {
    let arr = [...nhanKhau];
    if (query) {
      const q = query.toLowerCase();
      arr = arr.filter(
        (p) => p.hoTen.toLowerCase().includes(q) || (p.cccd || "").toLowerCase().includes(q)
      );
    }
    if (filters.gioiTinh) arr = arr.filter((p) => p.gioiTinh === filters.gioiTinh);
    if (filters.quanHe) arr = arr.filter((p) => p.quanHeChuHo === filters.quanHe);
    if (filters.ngheNghiep) arr = arr.filter((p) => p.ngheNghiep.includes(filters.ngheNghiep));

    if (sortBy === "name") arr.sort((a, b) => a.hoTen.localeCompare(b.hoTen, "vi"));
    if (sortBy === "birthPlace") arr.sort((a, b) => a.noiSinh.localeCompare(b.noiSinh, "vi"));
    if (sortBy === "cccd") arr.sort((a, b) => (a.cccd || "").localeCompare(b.cccd || ""));
    return arr;
  }, [nhanKhau, query, sortBy, filters]);

  const total = nhanKhau.length;

  return (
    <div className="relative min-h-screen bg-gray-900 text-gray-100">
      {/* Background video (decorative) */}
      <video
        className="fixed inset-0 w-full h-full object-cover pointer-events-none"
        src="/videos/background.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        style={{ zIndex: 0 }}
      />

      <div className="flex h-screen w-screen relative z-10 bg-transparent">
        <Sidebar />

        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />

          <main className="flex-1 overflow-auto">
            <div className="w-full h-full p-6 md:p-8">
              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-800/80 rounded-lg shadow p-6 border-l-4 border-blue-400 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-300 text-sm font-medium">Tổng Nhân khẩu</p>
                      <p className="text-3xl font-bold text-white mt-2">{total}</p>
                    </div>
                    <div className="text-4xl text-blue-400">👥</div>
                  </div>
                </div>

                <div className="bg-gray-800/80 rounded-lg shadow p-6 border-l-4 border-green-400 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-300 text-sm font-medium">Nam / Nữ</p>
                      <p className="text-3xl font-bold text-white mt-2">—</p>
                    </div>
                    <div className="text-4xl text-green-400">⚧️</div>
                  </div>
                </div>

                <div className="bg-gray-800/80 rounded-lg shadow p-6 border-l-4 border-purple-400 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-300 text-sm font-medium">Khoảng tuổi trung bình</p>
                      <p className="text-3xl font-bold text-white mt-2">—</p>
                    </div>
                    <div className="text-4xl text-purple-400">📊</div>
                  </div>
                </div>
              </div>

              {/* List card */}
              <div className="bg-gray-800/80 rounded-lg shadow hover:shadow-lg transition-shadow">
                <div className="p-6 border-b border-gray-700">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <h2 className="text-xl font-bold">Danh sách Nhân khẩu</h2>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full md:w-auto">
                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <label className="text-sm text-gray-300 whitespace-nowrap">Sắp xếp:</label>
                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-gray-700 text-gray-200 p-2 rounded">
                          <option value="">Mặc định</option>
                          <option value="name">Tên</option>
                          <option value="birthPlace">Nơi sinh</option>
                          <option value="cccd">CCCD</option>
                        </select>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Tìm kiếm..." className="bg-gray-700 text-gray-200 p-2 rounded w-48" />
                        <button onClick={() => { setQuery(""); setSortBy(""); setFilters({ gioiTinh: "", quanHe: "", ngheNghiep: "" }); }} className="bg-gray-700 text-gray-200 px-3 py-2 rounded hover:bg-gray-600 transition">Reset</button>
                      </div>

                      <button onClick={() => setFilterOpen(!filterOpen)} className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded transition">Lọc</button>

                      <div className="flex items-center gap-2">
                        <button onClick={() => { setShowCreateBubble(true); setShowDetailBubble(null); }} className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded">+ Thêm</button>
                        <button onClick={() => { setSplitMode(!splitMode); setSelectedForSplit([]); }} className={`px-3 py-2 rounded text-white transition ${splitMode ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"}`}>{splitMode ? "Hủy" : "Tách hộ"}</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Filter panel */}
                {filterOpen && (
                  <div className="bg-gray-800 rounded-b p-4 border-b border-gray-700">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-sm text-gray-300">Giới tính</label>
                        <select className="w-full bg-gray-700 text-gray-200 p-2 rounded" value={filters.gioiTinh} onChange={(e) => setFilters({ ...filters, gioiTinh: e.target.value })}>
                          <option value="">Tất cả</option>
                          <option value="Nam">Nam</option>
                          <option value="Nữ">Nữ</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-sm text-gray-300">Quan hệ với chủ hộ</label>
                        <select className="w-full bg-gray-700 text-gray-200 p-2 rounded" value={filters.quanHe} onChange={(e) => setFilters({ ...filters, quanHe: e.target.value })}>
                          <option value="">Tất cả</option>
                          <option value="Chủ hộ">Chủ hộ</option>
                          <option value="Vợ">Vợ</option>
                          <option value="Con trai">Con trai</option>
                          <option value="Con gái">Con gái</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-sm text-gray-300">Nghề nghiệp</label>
                        <input className="w-full bg-gray-700 text-gray-200 p-2 rounded" placeholder="Nhập nghề nghiệp..." value={filters.ngheNghiep} onChange={(e) => setFilters({ ...filters, ngheNghiep: e.target.value })} />
                      </div>
                    </div>
                  </div>
                )}

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-900 border-b border-gray-700 sticky top-0">
                      <tr className="text-sm text-gray-300 uppercase">
                        {splitMode && <th className="px-6 py-3 text-center w-12">Chọn</th>}
                        <th className="px-6 py-3 text-left">Họ tên</th>
                        <th className="px-6 py-3 text-left">Ngày sinh</th>
                        <th className="px-6 py-3 text-left">Nơi sinh</th>
                        <th className="px-6 py-3 text-left">CCCD</th>
                        <th className="px-6 py-3 text-left">Quan hệ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.length > 0 ? (
                        filtered.map((p) => (
                          <tr
                            key={p.id}
                            className={`border-b border-gray-700 hover:bg-gray-800/70 transition cursor-pointer ${selectedForSplit.includes(p.id) ? "bg-blue-900/30" : ""}`}
                            onClick={() => {
                              if (!splitMode) {
                                setShowDetailBubble(p);
                                setShowCreateBubble(false);
                              }
                            }}
                          >
                            {splitMode && (
                              <td className="px-6 py-3 text-center">
                                <input
                                  type="checkbox"
                                  checked={selectedForSplit.includes(p.id)}
                                  onChange={(e) => {
                                    e.stopPropagation();
                                    if (e.target.checked) setSelectedForSplit([...selectedForSplit, p.id]);
                                    else setSelectedForSplit(selectedForSplit.filter((id) => id !== p.id));
                                  }}
                                />
                              </td>
                            )}

                            <td className="px-6 py-3 font-semibold">{p.hoTen}</td>
                            <td className="px-6 py-3">{new Date(p.ngaySinh).toLocaleDateString("vi-VN")}</td>
                            <td className="px-6 py-3">{p.noiSinh}</td>
                            <td className="px-6 py-3">{p.cccd || "—"}</td>
                            <td className="px-6 py-3">{p.quanHeChuHo}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={splitMode ? 6 : 5} className="px-6 py-8 text-center text-gray-400">Không tìm thấy nhân khẩu nào</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="px-6 py-4 border-t border-gray-700 text-sm text-gray-300">Hiển thị {filtered.length} trên {total} nhân khẩu</div>
              </div>

              {/* Create bubble */}
              {showCreateBubble && (
                <div className="fixed right-6 top-24 w-80 bg-gray-800 border border-gray-700 rounded-2xl p-5 shadow-xl z-50">
                  <h3 className="text-xl font-bold mb-3">Thêm nhân khẩu</h3>
                  <div className="space-y-3">
                    <input className="w-full p-2 rounded bg-gray-700 text-white" placeholder="Họ tên" />
                    <input className="w-full p-2 rounded bg-gray-700 text-white" placeholder="Ngày sinh" />
                    <input className="w-full p-2 rounded bg-gray-700 text-white" placeholder="Nơi sinh" />
                    <input className="w-full p-2 rounded bg-gray-700 text-white" placeholder="Nghề nghiệp" />
                    <input className="w-full p-2 rounded bg-gray-700 text-white" placeholder="CCCD" />
                    <div className="flex gap-2 mt-2">
                      <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white w-full" onClick={() => { alert('Tạo nhân khẩu (chưa lưu)'); setShowCreateBubble(false); }}>✔ Xác nhận</button>
                      <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white w-full" onClick={() => setShowCreateBubble(false)}>Hủy</button>
                    </div>
                  </div>
                </div>
              )}

              {/* Detail bubble */}
              {showDetailBubble && (
                <div className="fixed right-6 top-24 w-96 bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-xl z-50">
                  <h3 className="text-xl font-bold mb-4">Thông tin nhân khẩu</h3>
                  <div className="space-y-2 text-gray-200 text-sm">
                    <p><strong>Họ tên:</strong> {showDetailBubble.hoTen}</p>
                    <p><strong>Ngày sinh:</strong> {showDetailBubble.ngaySinh}</p>
                    <p><strong>Nơi sinh:</strong> {showDetailBubble.noiSinh}</p>
                    <p><strong>Nguyên quán:</strong> {showDetailBubble.nguyenQuan}</p>
                    <p><strong>Nghề nghiệp:</strong> {showDetailBubble.ngheNghiep}</p>
                    <p><strong>Nơi làm việc:</strong> {showDetailBubble.noiLamViec || '—'}</p>
                    <p><strong>CCCD:</strong> {showDetailBubble.cccd || '—'}</p>
                    <p><strong>Ngày cấp:</strong> {showDetailBubble.ngayCap || '—'}</p>
                    <p><strong>Nơi cấp:</strong> {showDetailBubble.noiCap || '—'}</p>
                    <p><strong>ĐK thường trú:</strong> {showDetailBubble.dangKyThuongTru || '—'}</p>
                    <p><strong>Trước đó:</strong> {showDetailBubble.thuongTruTruoc || '—'}</p>
                    <p><strong>Quan hệ:</strong> {showDetailBubble.quanHeChuHo}</p>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button onClick={() => setShowDetailBubble(null)} className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white w-full">Đóng</button>
                    <button onClick={() => { alert('Chuyển tới trang sửa (chưa cài đặt)'); }} className="px-4 py-2 rounded bg-yellow-600 hover:bg-yellow-700 text-white w-full">Sửa</button>
                  </div>
                </div>
              )}

              {/* Confirm split panel */}
              {splitMode && selectedForSplit.length > 0 && (
                <div className="mt-6 bg-gray-800 p-4 rounded-xl border border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-2">Xác nhận tách hộ</h3>
                  <p className="text-gray-300 text-sm mb-3">Bạn đã chọn <strong>{selectedForSplit.length}</strong> nhân khẩu để tách:</p>
                  <ul className="list-disc list-inside text-gray-200 mb-4">
                    {selectedForSplit.map((id) => {
                      const person = nhanKhau.find((p) => p.id === id);
                      return <li key={id}>{person?.hoTen}</li>;
                    })}
                  </ul>
                  <div className="flex gap-3">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded" onClick={() => { alert('Tách hộ thành công (tạm)'); setSelectedForSplit([]); setSplitMode(false); }}>✔ Xác nhận tách hộ</button>
                    <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded" onClick={() => setSelectedForSplit([])}>Hủy chọn</button>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
