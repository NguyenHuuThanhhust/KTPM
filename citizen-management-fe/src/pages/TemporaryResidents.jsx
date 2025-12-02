import { useMemo, useState } from "react";
import {
  CalendarClock,
  Clock3,
  MapPin,
  Phone,
  PlusCircle,
  RefreshCw,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../headers/Header";

const initialResidents = [
  {
    id: "TT-001",
    fullName: "Nguyễn Thị Hạnh",
    gender: "Nữ",
    hometown: "Thanh Hóa",
    stayAddress: "12 Ngách 5/34 Văn Khê",
    landlord: "Đỗ Văn Nam",
    phone: "0912 345 678",
    startDate: "2024-11-12",
    endDate: "2025-05-12",
    status: "active",
    purpose: "Chuyên viên Marketing",
    note: "Thuê căn hộ 2PN",
  },
  {
    id: "TT-002",
    fullName: "Trịnh Văn Tài",
    gender: "Nam",
    hometown: "Nghệ An",
    stayAddress: "Tòa S2.05 Sunshine City",
    landlord: "Lê Huyền",
    phone: "0987 444 222",
    startDate: "2024-07-01",
    endDate: "2025-01-18",
    status: "expiring",
    purpose: "Kỹ sư kết cấu",
    note: "Gia hạn 6 tháng",
  },
  {
    id: "TT-003",
    fullName: "Lê Đức Phú",
    gender: "Nam",
    hometown: "Đà Nẵng",
    stayAddress: "01 BT08, KĐT Geleximco",
    landlord: "Nguyễn Hải",
    phone: "0903 888 123",
    startDate: "2023-09-07",
    endDate: "2024-09-06",
    status: "completed",
    purpose: "Sinh viên Kiến trúc",
    note: "Đã chuyển về quê",
  },
  {
    id: "TT-004",
    fullName: "Trần Mỹ Duyên",
    gender: "Nữ",
    hometown: "Quảng Ninh",
    stayAddress: "B3-12 Roman Plaza",
    landlord: "Phạm Quảng",
    phone: "0979 120 333",
    startDate: "2024-03-20",
    endDate: "2025-03-20",
    status: "active",
    purpose: "Quản lý Spa",
    note: "Cần kiểm tra giấy bảo lãnh",
  },
];

const statusConfig = {
  active: {
    label: "Đang tạm trú",
    className: "text-green-300 bg-green-500/10 border border-green-500/40",
  },
  expiring: {
    label: "Sắp hết hạn",
    className: "text-yellow-200 bg-yellow-400/10 border border-yellow-400/40",
  },
  completed: {
    label: "Đã kết thúc",
    className: "text-gray-300 bg-gray-500/10 border border-gray-500/30",
  },
};

const quickActions = [
  {
    id: "register",
    title: "Đăng ký tạm trú mới",
    description: "Tiếp nhận hồ sơ đăng ký và phát sinh hợp đồng thuê mới",
    icon: PlusCircle,
    accent: "from-blue-500 to-indigo-500",
  },
  {
    id: "extend",
    title: "Gia hạn tạm trú",
    description: "Cập nhật thời hạn cư trú và giấy tờ liên quan",
    icon: RefreshCw,
    accent: "from-amber-500 to-yellow-500",
  },
  {
    id: "complete",
    title: "Kết thúc tạm trú",
    description: "Hoàn tất thủ tục trả nhà và xác nhận cư trú",
    icon: ShieldCheck,
    accent: "from-emerald-500 to-teal-500",
  },
];

const timeline = [
  {
    title: "Gia hạn cư trú",
    resident: "Trịnh Văn Tài",
    date: "18/01/2025",
    status: "Đang xử lý",
    type: "extend",
  },
  {
    title: "Tiếp nhận mới",
    resident: "Đặng Thùy Anh",
    date: "15/12/2024",
    status: "Hoàn tất",
    type: "register",
  },
  {
    title: "Kết thúc cư trú",
    resident: "Lê Đức Phú",
    date: "06/09/2024",
    status: "Đã xác nhận",
    type: "complete",
  },
];

const defaultForm = {
  fullName: "",
  idNumber: "",
  landlord: "",
  phone: "",
  stayAddress: "",
  startDate: "",
  endDate: "",
  note: "",
  targetId: "",
};

const generateResidentId = (list) => {
  const highest = list.reduce((acc, resident) => {
    const value = Number((resident.id || "").replace("TT-", "")) || 0;
    return Math.max(acc, value);
  }, 0);
  return `TT-${String(highest + 1).padStart(3, "0")}`;
};

const monthsBetween = (start, end) => {
  const diff = new Date(end) - new Date(start);
  return Math.max(1, Math.round(diff / (1000 * 60 * 60 * 24 * 30)));
};

export default function TemporaryResidents() {
  const [residents, setResidents] = useState(initialResidents);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [durationFilter, setDurationFilter] = useState("");
  const [activeForm, setActiveForm] = useState(null);
  const [formData, setFormData] = useState(defaultForm);
  const [selectedResident, setSelectedResident] = useState(null);

  const stats = useMemo(() => {
    const now = new Date();
    const expiringSoon = residents.filter((r) => {
      if (r.status !== "active") return false;
      const diffDays = (new Date(r.endDate) - now) / (1000 * 60 * 60 * 24);
      return diffDays <= 30 && diffDays >= 0;
    });
    return {
      total: residents.length,
      active: residents.filter((r) => r.status === "active").length,
      expiring: expiringSoon.length,
      completed: residents.filter((r) => r.status === "completed").length,
    };
  }, [residents]);

  const filteredResidents = useMemo(() => {
    return residents.filter((resident) => {
      const matchesSearch =
        resident.fullName.toLowerCase().includes(search.toLowerCase()) ||
        resident.id.toLowerCase().includes(search.toLowerCase()) ||
        resident.stayAddress.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ? true : resident.status === statusFilter;

      let matchesDuration = true;
      if (durationFilter) {
        const months = monthsBetween(resident.startDate, resident.endDate);
        if (durationFilter === "<3") matchesDuration = months < 3;
        if (durationFilter === "3-6") matchesDuration = months >= 3 && months <= 6;
        if (durationFilter === ">6") matchesDuration = months > 6;
      }

      return matchesSearch && matchesStatus && matchesDuration;
    });
  }, [residents, search, statusFilter, durationFilter]);

  const upcomingResidences = useMemo(() => {
    return [...residents]
      .filter((r) => r.status !== "completed")
      .sort((a, b) => new Date(a.endDate) - new Date(b.endDate))
      .slice(0, 4);
  }, [residents]);

  const openForm = (type, resident = null) => {
    setActiveForm(type);
    setSelectedResident(resident || null);
    if (resident) {
      setFormData({
        fullName: resident.fullName,
        idNumber: "",
        landlord: resident.landlord,
        phone: resident.phone,
        stayAddress: resident.stayAddress,
        startDate: resident.startDate,
        endDate: resident.endDate,
        note: resident.note,
        targetId: resident.id,
      });
    } else {
      setFormData({ ...defaultForm });
    }
  };

  const handleSubmit = () => {
    if (!activeForm) return;

    if (activeForm === "register") {
      if (!formData.fullName || !formData.startDate || !formData.endDate || !formData.stayAddress) {
        alert("Vui lòng nhập đầy đủ Họ tên, Địa chỉ, Ngày bắt đầu và Ngày kết thúc.");
        return;
      }
      const newResident = {
        id: generateResidentId(residents),
        fullName: formData.fullName,
        gender: "—",
        hometown: "—",
        stayAddress: formData.stayAddress,
        landlord: formData.landlord || "—",
        phone: formData.phone || "—",
        startDate: formData.startDate,
        endDate: formData.endDate,
        status: "active",
        purpose: "Tạm trú mới",
        note: formData.note || "",
      };
      setResidents((prev) => [newResident, ...prev]);
      alert("Đăng ký tạm trú mới đã được lưu (mô phỏng).");
    } else {
      const target =
        selectedResident ||
        residents.find((resident) => resident.id === formData.targetId);
      if (!target) {
        alert("Vui lòng chọn cư dân cần xử lý.");
        return;
      }

      if (activeForm === "extend") {
        if (!formData.endDate) {
          alert("Vui lòng chọn ngày kết thúc mới để gia hạn.");
          return;
        }
        setResidents((prev) =>
          prev.map((resident) =>
            resident.id === target.id
              ? {
                  ...resident,
                  endDate: formData.endDate,
                  note: formData.note || resident.note,
                  status: "active",
                }
              : resident
          )
        );
        alert(`Đã gia hạn tạm trú cho ${target.fullName} (mô phỏng).`);
      }

      if (activeForm === "complete") {
        const endDateValue =
          formData.endDate || new Date().toISOString().split("T")[0];
        setResidents((prev) =>
          prev.map((resident) =>
            resident.id === target.id
              ? {
                  ...resident,
                  endDate: endDateValue,
                  note: formData.note || resident.note,
                  status: "completed",
                }
              : resident
          )
        );
        alert(`Đã kết thúc tạm trú cho ${target.fullName} (mô phỏng).`);
      }
    }

    setActiveForm(null);
    setFormData(defaultForm);
    setSelectedResident(null);
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
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-blue-200">Module</p>
                  <h1 className="text-3xl font-semibold text-white flex items-center gap-3">
                    <UserCheck className="w-8 h-8 text-blue-300" />
                    Trung tâm Tạm trú
                  </h1>
                  <p className="text-gray-300 mt-1 max-w-2xl">
                    Giám sát cư dân thuê nhà, gia hạn và kết thúc tạm trú với giao diện hiện đại, đảm bảo tuân thủ quy định cư trú.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => openForm("register")}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-3 rounded-lg font-medium shadow-lg shadow-blue-600/30"
                  >
                    + Đăng ký ngay
                  </button>
                  <button
                    onClick={() => openForm("extend")}
                    className="bg-emerald-600/20 text-emerald-200 border border-emerald-500/30 px-5 py-3 rounded-lg font-medium"
                  >
                    Gia hạn nhanh
                  </button>
                </div>
              </div>

              <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  { label: "Tổng tạm trú", value: stats.total, color: "from-blue-500 to-indigo-600" },
                  { label: "Đang hiệu lực", value: stats.active, color: "from-emerald-500 to-green-600" },
                  { label: "Sắp hết hạn (30 ngày)", value: stats.expiring, color: "from-amber-500 to-orange-500" },
                  { label: "Đã kết thúc", value: stats.completed, color: "from-slate-600 to-slate-700" },
                ].map((card) => (
                  <div
                    key={card.label}
                    className={`rounded-2xl p-5 bg-gradient-to-br ${card.color} shadow-lg shadow-black/20`}
                  >
                    <p className="text-sm uppercase tracking-wider text-white/80">{card.label}</p>
                    <p className="text-3xl font-bold text-white mt-3">{card.value}</p>
                  </div>
                ))}
              </section>

              <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={action.id}
                      onClick={() => openForm(action.id)}
                      className={`group rounded-2xl bg-gray-900/80 border border-white/5 p-6 text-left hover:-translate-y-1 hover:border-white/20 transition-transform`}
                    >
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.accent} flex items-center justify-center text-white mb-4`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">{action.title}</h3>
                      <p className="text-sm text-gray-300">{action.description}</p>
                    </button>
                  );
                })}
              </section>

              <section className="bg-gray-900/80 border border-white/5 rounded-3xl shadow-2xl shadow-black/30">
                <div className="p-6 border-b border-white/5 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold text-white">Danh sách cư dân tạm trú</h2>
                    <p className="text-gray-400 text-sm">Theo dõi trạng thái cư trú và xử lý nhanh yêu cầu</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center bg-gray-800 rounded-xl px-3">
                      <input
                        className="bg-transparent px-3 py-2 text-sm focus:outline-none"
                        placeholder="Tìm tên, mã hoặc địa chỉ..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                      <CalendarClock className="w-4 h-4 text-gray-500" />
                    </div>
                    <select
                      className="bg-gray-800/80 text-gray-200 text-sm px-3 py-2 rounded-xl border border-gray-700/60"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="all">Tất cả trạng thái</option>
                      <option value="active">Đang tạm trú</option>
                      <option value="expiring">Sắp hết hạn</option>
                      <option value="completed">Đã kết thúc</option>
                    </select>
                    <select
                      className="bg-gray-800/80 text-gray-200 text-sm px-3 py-2 rounded-xl border border-gray-700/60"
                      value={durationFilter}
                      onChange={(e) => setDurationFilter(e.target.value)}
                    >
                      <option value="">Thời hạn cư trú</option>
                      <option value="<3">Dưới 3 tháng</option>
                      <option value="3-6">3 - 6 tháng</option>
                      <option value=">6">Trên 6 tháng</option>
                    </select>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-white/5 uppercase text-gray-400">
                      <tr>
                        <th className="px-6 py-4 text-left">Mã</th>
                        <th className="px-6 py-4 text-left">Họ tên</th>
                        <th className="px-6 py-4 text-left">Địa chỉ tạm trú</th>
                        <th className="px-6 py-4 text-left">Liên hệ</th>
                        <th className="px-6 py-4 text-left">Thời hạn</th>
                        <th className="px-6 py-4 text-left">Trạng thái</th>
                        <th className="px-6 py-4 text-center">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredResidents.length ? (
                        filteredResidents.map((resident) => {
                          const badge = statusConfig[resident.status];
                          return (
                            <tr key={resident.id} className="border-b border-white/5 hover:bg-white/5 transition">
                              <td className="px-6 py-4 font-semibold text-white">{resident.id}</td>
                              <td className="px-6 py-4">
                                <p className="font-medium">{resident.fullName}</p>
                                <p className="text-gray-400">{resident.purpose}</p>
                              </td>
                              <td className="px-6 py-4">
                                <p className="flex items-center gap-2 text-gray-200">
                                  <MapPin className="w-4 h-4 text-blue-300" />
                                  {resident.stayAddress}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">Chủ nhà: {resident.landlord}</p>
                              </td>
                              <td className="px-6 py-4">
                                <p className="flex items-center gap-2 text-gray-200">
                                  <Phone className="w-4 h-4 text-emerald-300" />
                                  {resident.phone}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">{resident.hometown}</p>
                              </td>
                              <td className="px-6 py-4">
                                <p className="font-semibold text-white">
                                  {new Date(resident.startDate).toLocaleDateString("vi-VN")} →{" "}
                                  {new Date(resident.endDate).toLocaleDateString("vi-VN")}
                                </p>
                                <p className="text-xs text-gray-400 mt-1">
                                  {monthsBetween(resident.startDate, resident.endDate)} tháng
                                </p>
                              </td>
                              <td className="px-6 py-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badge.className}`}>
                                  {badge.label}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex justify-center gap-2">
                                  {resident.status !== "completed" && (
                                    <button
                                      onClick={() => openForm("extend", resident)}
                                      className="px-3 py-2 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-400/30 hover:bg-emerald-500/20"
                                    >
                                      Gia hạn
                                    </button>
                                  )}
                                  {resident.status === "active" && (
                                    <button
                                      onClick={() => openForm("complete", resident)}
                                      className="px-3 py-2 rounded-lg bg-red-500/10 text-red-300 border border-red-400/30 hover:bg-red-500/20"
                                    >
                                      Kết thúc
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                            Không có bản ghi phù hợp
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-gray-900/80 border border-white/5 rounded-3xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-white">Nhắc việc & thời hạn</h3>
                    <Clock3 className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="space-y-4">
                    {upcomingResidences.map((resident) => (
                      <div key={resident.id} className="flex items-center justify-between rounded-2xl bg-white/5 p-4">
                        <div>
                          <p className="font-semibold text-white">{resident.fullName}</p>
                          <p className="text-sm text-gray-400">{resident.stayAddress}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-300">
                            Hết hạn: {new Date(resident.endDate).toLocaleDateString("vi-VN")}
                          </p>
                          <button
                            onClick={() => openForm("extend", resident)}
                            className="mt-2 text-xs text-blue-300 hover:text-blue-200"
                          >
                            Gia hạn nhanh →
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-900/80 border border-white/5 rounded-3xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Timeline xử lý</h3>
                  <div className="space-y-6">
                    {timeline.map((item, index) => (
                      <div key={item.title} className="relative pl-8">
                        {index !== timeline.length - 1 && (
                          <span className="absolute left-3 top-6 bottom-0 w-px bg-white/10" />
                        )}
                        <span className="absolute left-0 top-1 w-6 h-6 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-xs text-blue-200">
                          {index + 1}
                        </span>
                        <p className="text-white font-semibold">{item.title}</p>
                        <p className="text-sm text-gray-300">{item.resident}</p>
                        <p className="text-xs text-gray-500">{item.date}</p>
                        <span className="inline-flex mt-2 text-xs px-3 py-1 rounded-full bg-white/10 text-gray-200">
                          {item.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>

      {activeForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setActiveForm(null)} />
          <div className="relative bg-gray-900 rounded-3xl border border-white/5 w-full max-w-xl p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-gray-400">Thao tác</p>
                <h3 className="text-2xl font-semibold text-white">
                  {activeForm === "register" && "Đăng ký tạm trú"}
                  {activeForm === "extend" && "Gia hạn tạm trú"}
                  {activeForm === "complete" && "Kết thúc tạm trú"}
                </h3>
              </div>
              <button onClick={() => setActiveForm(null)} className="text-gray-400 hover:text-white">
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activeForm !== "register" && (
                <label className="text-sm text-gray-300 sm:col-span-2">
                  Chọn cư dân cần xử lý
                  <select
                    className="mt-2 w-full rounded-xl bg-gray-800/80 border border-gray-700 px-3 py-2 text-gray-100 focus:outline-none focus:border-blue-500"
                    value={formData.targetId}
                    onChange={(e) => {
                      const target = residents.find(
                        (resident) => resident.id === e.target.value
                      );
                      setSelectedResident(target || null);
                      if (target) {
                        setFormData((prev) => ({
                          ...prev,
                          targetId: target.id,
                          fullName: target.fullName,
                          landlord: target.landlord,
                          phone: target.phone,
                          stayAddress: target.stayAddress,
                          startDate: target.startDate,
                          endDate: target.endDate,
                          note: target.note || "",
                        }));
                      } else {
                        setFormData((prev) => ({
                          ...prev,
                          targetId: e.target.value,
                        }));
                      }
                    }}
                  >
                    <option value="">-- Lựa chọn cư dân --</option>
                    {residents.map((resident) => (
                      <option key={resident.id} value={resident.id}>
                        {resident.id} - {resident.fullName}
                      </option>
                    ))}
                  </select>
                </label>
              )}
              <label className="text-sm text-gray-300">
                Họ tên cư dân
                <input
                  className="mt-2 w-full rounded-xl bg-gray-800/80 border border-gray-700 px-3 py-2 focus:outline-none focus:border-blue-500"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </label>
              <label className="text-sm text-gray-300">
                CCCD/CMND
                <input
                  className="mt-2 w-full rounded-xl bg-gray-800/80 border border-gray-700 px-3 py-2 focus:outline-none focus:border-blue-500"
                  value={formData.idNumber}
                  onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                />
              </label>
              <label className="text-sm text-gray-300">
                Chủ nhà
                <input
                  className="mt-2 w-full rounded-xl bg-gray-800/80 border border-gray-700 px-3 py-2 focus:outline-none focus:border-blue-500"
                  value={formData.landlord}
                  onChange={(e) => setFormData({ ...formData, landlord: e.target.value })}
                />
              </label>
              <label className="text-sm text-gray-300">
                Số điện thoại
                <input
                  className="mt-2 w-full rounded-xl bg-gray-800/80 border border-gray-700 px-3 py-2 focus:outline-none focus:border-blue-500"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </label>
              <label className="text-sm text-gray-300 sm:col-span-2">
                Địa chỉ tạm trú
                <input
                  className="mt-2 w-full rounded-xl bg-gray-800/80 border border-gray-700 px-3 py-2 focus:outline-none focus:border-blue-500"
                  value={formData.stayAddress}
                  onChange={(e) => setFormData({ ...formData, stayAddress: e.target.value })}
                />
              </label>
              <label className="text-sm text-gray-300">
                Bắt đầu
                <input
                  type="date"
                  className="mt-2 w-full rounded-xl bg-gray-800/80 border border-gray-700 px-3 py-2 focus:outline-none focus:border-blue-500"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />
              </label>
              <label className="text-sm text-gray-300">
                Kết thúc
                <input
                  type="date"
                  className="mt-2 w-full rounded-xl bg-gray-800/80 border border-gray-700 px-3 py-2 focus:outline-none focus:border-blue-500"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                />
              </label>
              <label className="text-sm text-gray-300 sm:col-span-2">
                Ghi chú / Yêu cầu
                <textarea
                  className="mt-2 w-full rounded-xl bg-gray-800/80 border border-gray-700 px-3 py-2 focus:outline-none focus:border-blue-500"
                  rows={3}
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                />
              </label>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={handleSubmit}
                className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-2xl"
              >
                Lưu thao tác
              </button>
              <button
                onClick={() => setActiveForm(null)}
                className="flex-1 bg-gray-800 text-gray-300 border border-gray-600 hover:bg-gray-700 font-semibold py-3 rounded-2xl"
              >
                Hủy bỏ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


