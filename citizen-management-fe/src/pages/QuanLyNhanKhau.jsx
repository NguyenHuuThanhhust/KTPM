import { useMemo, useState } from "react";
import { Filter, MapPin, Pencil, Search, Trash2, UserPlus, Users as UsersIcon } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../headers/Header";
import { residentRecords } from "../data/residents";

const perPageOptions = [5, 10, 20];
const residenceTypeMap = {
  "thuong-tru": { label: "Thường trú", className: "bg-emerald-500/10 text-emerald-200 border border-emerald-500/40" },
  "tam-tru": { label: "Tạm trú", className: "bg-amber-500/10 text-amber-200 border border-amber-500/40" },
  "kinh-doanh": { label: "Kinh doanh", className: "bg-blue-500/10 text-blue-200 border border-blue-500/40" },
};

export default function QuanLyNhanKhau() {
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("all");
  const [residenceType, setResidenceType] = useState("all");
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    return residentRecords.filter((resident) => {
      const matchesSearch =
        resident.name.toLowerCase().includes(search.toLowerCase()) ||
        resident.cccd.toLowerCase().includes(search.toLowerCase());
      const matchesGender = gender === "all" ? true : resident.gender === gender;
      const matchesType = residenceType === "all" ? true : resident.residenceType === residenceType;
      return matchesSearch && matchesGender && matchesType;
    });
  }, [search, gender, residenceType]);

  const totalPages = Math.ceil(filtered.length / perPage) || 1;
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const viewResident = (resident) => {
    setSelected(resident);
  };

  const deleteResident = (resident) => {
    if (confirm(`Bạn muốn xoá nhân khẩu ${resident.name}?`)) {
      alert("Đã xoá (mô phỏng).");
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-900 text-gray-100">
      <video
        className="fixed inset-0 w-full h-full object-cover opacity-30 pointer-events-none"
        src="/videos/background.mp4"
        autoPlay
        loop
        muted
      />
      <div className="flex h-screen w-screen relative z-10 bg-black/30 backdrop-blur-sm">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-auto">
            <div className="w-full h-full p-6 md:p-8 space-y-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-blue-200">Module</p>
                  <h1 className="text-3xl font-semibold text-white">Danh sách nhân khẩu</h1>
                  <p className="text-gray-300 mt-1 max-w-2xl">
                    Giám sát tình hình cư trú theo từng hộ, hỗ trợ thao tác nhanh xem/sửa/xóa thông tin nhân khẩu.
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => (window.location.href = "/residents/search")}
                    className="px-5 py-3 rounded-xl bg-gray-800 text-gray-200 border border-white/10 hover:bg-gray-700"
                  >
                    Tìm kiếm nâng cao
                  </button>
                  <button
                    onClick={() => (window.location.href = "/residents/add")}
                    className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium flex items-center gap-2"
                  >
                    <UserPlus className="w-5 h-5" />
                    Thêm nhân khẩu
                  </button>
                </div>
              </div>

              <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: "Tổng nhân khẩu", value: residentRecords.length, desc: "Tổng hợp toàn phường" },
                  { label: "Tạm trú", value: residentRecords.filter((r) => r.residenceType === "tam-tru").length, desc: "Đang lưu trú ngắn hạn" },
                  { label: "Kinh doanh", value: residentRecords.filter((r) => r.residenceType === "kinh-doanh").length, desc: "Hộ kinh doanh đăng ký" },
                ].map((card) => (
                  <div key={card.label} className="bg-gray-900/80 border border-white/5 rounded-2xl p-6 shadow-lg shadow-black/30">
                    <p className="text-sm text-gray-400 uppercase tracking-wide">{card.label}</p>
                    <p className="text-3xl font-bold text-white mt-2">{card.value}</p>
                    <p className="text-xs text-gray-500 mt-1">{card.desc}</p>
                  </div>
                ))}
              </section>

              <section className="bg-gray-900/80 border border-white/5 rounded-3xl shadow-2xl shadow-black/40">
                <div className="p-6 border-b border-white/5 flex flex-col gap-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2 bg-gray-800/80 px-3 py-2 rounded-xl flex-1 min-w-[220px]">
                      <Search className="w-4 h-4 text-gray-500" />
                      <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Tìm kiếm theo tên, CCCD..."
                        className="bg-transparent text-sm focus:outline-none flex-1"
                      />
                    </div>
                    <select
                      className="bg-gray-800/80 text-sm px-3 py-2 rounded-xl border border-gray-700 text-gray-100"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option value="all">Giới tính</option>
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                    </select>
                    <select
                      className="bg-gray-800/80 text-sm px-3 py-2 rounded-xl border border-gray-700 text-gray-100"
                      value={residenceType}
                      onChange={(e) => setResidenceType(e.target.value)}
                    >
                      <option value="all">Loại cư trú</option>
                      <option value="thuong-tru">Thường trú</option>
                      <option value="tam-tru">Tạm trú</option>
                      <option value="kinh-doanh">Kinh doanh</option>
                    </select>
                    <select
                      className="bg-gray-800/80 text-sm px-3 py-2 rounded-xl border border-gray-700 text-gray-100"
                      value={perPage}
                      onChange={(e) => {
                        setPerPage(Number(e.target.value));
                        setPage(1);
                      }}
                    >
                      {perPageOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt} dòng / trang
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-white/5 text-gray-400 uppercase">
                      <tr>
                        <th className="px-6 py-4 text-left">Họ tên</th>
                        <th className="px-6 py-4 text-left">Năm sinh</th>
                        <th className="px-6 py-4 text-left">CCCD</th>
                        <th className="px-6 py-4 text-left">Hộ khẩu</th>
                        <th className="px-6 py-4 text-left">Loại cư trú</th>
                        <th className="px-6 py-4 text-center">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginated.length ? (
                        paginated.map((resident) => {
                          const typeBadge = residenceTypeMap[resident.residenceType];
                          return (
                            <tr key={resident.id} className="border-b border-white/5 hover:bg-white/5 transition">
                              <td className="px-6 py-4 text-white font-semibold">{resident.name}</td>
                              <td className="px-6 py-4 text-gray-300">{new Date(resident.birthDate).toLocaleDateString("vi-VN")}</td>
                              <td className="px-6 py-4 text-gray-300">{resident.cccd}</td>
                              <td className="px-6 py-4 text-gray-300">{resident.household}</td>
                              <td className="px-6 py-4">
                                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${typeBadge.className}`}>
                                  {typeBadge.label}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex justify-center gap-2">
                                  <button
                                    className="px-3 py-2 rounded-lg bg-blue-500/10 text-blue-200 border border-blue-400/30"
                                    onClick={() => viewResident(resident)}
                                  >
                                    Xem
                                  </button>
                                  <button className="px-3 py-2 rounded-lg bg-yellow-500/10 text-yellow-200 border border-yellow-400/30">
                                    <Pencil className="w-4 h-4" />
                                  </button>
                                  <button
                                    className="px-3 py-2 rounded-lg bg-red-500/10 text-red-300 border border-red-400/30"
                                    onClick={() => deleteResident(resident)}
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={6} className="px-6 py-10 text-center text-gray-400">
                            Không có nhân khẩu phù hợp
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="px-6 py-4 flex flex-wrap items-center justify-between text-sm text-gray-400 border-t border-white/5 gap-3">
                  <p>
                    Hiển thị {(page - 1) * perPage + 1} - {Math.min(page * perPage, filtered.length)} / {filtered.length}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      disabled={page === 1}
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      className="px-3 py-1 rounded bg-gray-800 text-gray-200 disabled:opacity-40"
                    >
                      Prev
                    </button>
                    <span>
                      Trang {page}/{totalPages}
                    </span>
                    <button
                      disabled={page === totalPages}
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      className="px-3 py-1 rounded bg-gray-800 text-gray-200 disabled:opacity-40"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSelected(null)} />
          <div className="relative w-full max-w-md bg-gray-950 border-l border-white/10 h-full overflow-y-auto p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-gray-500">Thông tin chi tiết</p>
                <h3 className="text-2xl font-semibold text-white flex items-center gap-2">
                  <UsersIcon className="w-6 h-6 text-blue-300" />
                  {selected.name}
                </h3>
                <p className="text-xs text-gray-400">{selected.id} • {selected.cccd}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-white text-xl">
                ✕
              </button>
            </div>
            <div className="space-y-4 text-sm">
              {[
                { label: "Ngày sinh", value: new Date(selected.birthDate).toLocaleDateString("vi-VN") },
                { label: "Nơi sinh", value: selected.birthPlace },
                { label: "Giới tính", value: selected.gender },
                { label: "Hộ khẩu", value: selected.household },
                { label: "Loại cư trú", value: residenceTypeMap[selected.residenceType].label },
                { label: "Nghề nghiệp", value: selected.occupation },
                { label: "Nơi làm việc", value: selected.workplace || "—" },
                { label: "Số điện thoại", value: selected.phone || "—" },
                { label: "Ngày cấp CCCD", value: new Date(selected.issueDate).toLocaleDateString("vi-VN") },
                { label: "Nơi cấp CCCD", value: selected.issuePlace },
              ].map((row) => (
                <div key={row.label} className="rounded-2xl border border-white/10 p-4">
                  <p className="text-xs uppercase text-gray-400">{row.label}</p>
                  <p className="text-white font-semibold mt-1">{row.value}</p>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-2xl">
              Chỉnh sửa nhân khẩu
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

