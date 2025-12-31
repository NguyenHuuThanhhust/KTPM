import { useMemo, useState, useEffect } from "react";
import { Filter, MapPin, Pencil, Trash2, Users, UserPlus, Key, X, CheckCircle, Clock } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../headers/Header";
import { householdRecords } from "../data/households";
import YeuCauXacThucModal from "../components/YeuCauXacThucModal";

const API_BASE = "http://localhost:8080/api";

const typeConfig = {
  "thuong-tru": { label: "Thường trú", className: "bg-emerald-500/10 text-emerald-300 border border-emerald-600/30" },
  "tam-tru": { label: "Tạm trú", className: "bg-amber-500/10 text-amber-200 border border-amber-500/30" },
  "kinh-doanh": { label: "Kinh doanh", className: "bg-blue-500/10 text-blue-200 border border-blue-500/30" },
};

const areas = Array.from({ length: 7 }, (_, i) => i + 1);

export default function QuanLiHoKhau() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ area: "all", type: "all" });
  const [selected, setSelected] = useState(null);
  const [detailMode, setDetailMode] = useState("view");
  
  // Quản lý tài khoản chủ hộ
  const [accountInfo, setAccountInfo] = useState(null);
  const [accountLoading, setAccountLoading] = useState(false);
  const [showAccountForm, setShowAccountForm] = useState(false);
  const [accountForm, setAccountForm] = useState({
    tenDangNhap: "",
    matKhau: "",
    email: "",
  });
  const [accountError, setAccountError] = useState(null);

  // Quản lý yêu cầu xác thực
  const [yeuCauList, setYeuCauList] = useState([]);
  const [yeuCauLoading, setYeuCauLoading] = useState(false);
  const [selectedYeuCau, setSelectedYeuCau] = useState(null);
  const [showYeuCauModal, setShowYeuCauModal] = useState(false);

  // Debug: Log khi showAccountForm thay đổi
  useEffect(() => {
    console.log("showAccountForm changed:", showAccountForm);
    console.log("accountInfo:", accountInfo);
  }, [showAccountForm, accountInfo]);

  // Fetch yêu cầu chờ xác thực
  const fetchYeuCauChoXacThuc = async () => {
    try {
      setYeuCauLoading(true);
      const response = await fetch(`${API_BASE}/yeucau/trang-thai/CHO_XAC_THUC`);
      if (response.ok) {
        const data = await response.json();
        setYeuCauList(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Error fetching yeu cau:", error);
    } finally {
      setYeuCauLoading(false);
    }
  };

  useEffect(() => {
    fetchYeuCauChoXacThuc();
    // Refresh mỗi 30 giây
    const interval = setInterval(fetchYeuCauChoXacThuc, 30000);
    return () => clearInterval(interval);
  }, []);

  const filteredHouseholds = useMemo(() => {
    return householdRecords.filter((household) => {
      const matchesSearch =
        household.id.toLowerCase().includes(search.toLowerCase()) ||
        household.headName.toLowerCase().includes(search.toLowerCase()) ||
        household.address.toLowerCase().includes(search.toLowerCase());
      const matchesArea = filters.area === "all" ? true : Number(filters.area) === household.area;
      const matchesType = filters.type === "all" ? true : filters.type === household.type;
      return matchesSearch && matchesArea && matchesType;
    });
  }, [search, filters]);

  const stats = useMemo(() => {
    const total = householdRecords.length;
    const residents = householdRecords.reduce((sum, item) => sum + item.members, 0);
    const thuongTru = householdRecords.filter((item) => item.type === "thuong-tru").length;
    return [
      { label: "Tổng hộ khẩu", value: total, description: "Toàn phường La Khê" },
      { label: "Thường trú", value: thuongTru, description: "Hộ cư trú ổn định" },
      { label: "Tổng nhân khẩu", value: residents, description: "Số nhân khẩu đã khai báo" },
    ];
  }, []);

  // Lấy thông tin tài khoản chủ hộ
  const fetchAccountInfo = async (soHoKhau) => {
    if (!soHoKhau) return;
    try {
      setAccountLoading(true);
      setAccountError(null);
      const response = await fetch(`${API_BASE}/taikhoan/ho-khau/${soHoKhau}`);
      
      if (response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          try {
            const text = await response.text();
            // Nếu response là "null" (string), không có tài khoản
            if (text.trim() === "null" || text.trim() === "") {
              setAccountInfo(null);
            } else {
              const data = JSON.parse(text);
              // Nếu data là null hoặc empty object, không có tài khoản
              if (data === null || (typeof data === 'object' && Object.keys(data).length === 0)) {
                setAccountInfo(null);
              } else {
                setAccountInfo(data);
              }
            }
          } catch (parseError) {
            console.error("Error parsing JSON:", parseError);
            setAccountInfo(null);
          }
        } else {
          // Nếu không phải JSON, không có tài khoản
          setAccountInfo(null);
        }
      } else {
        // Response không OK, không có tài khoản
        setAccountInfo(null);
      }
    } catch (error) {
      console.error("Error fetching account info:", error);
      setAccountError("Không thể tải thông tin tài khoản");
      setAccountInfo(null);
    } finally {
      setAccountLoading(false);
    }
  };

  const openDetail = (household, mode = "view") => {
    setSelected(household);
    setDetailMode(mode);
    // Lấy thông tin tài khoản nếu có số hộ khẩu
    let soHoKhau;
    if (household.soHoKhau !== undefined && household.soHoKhau !== null) {
      soHoKhau = typeof household.soHoKhau === 'number' ? household.soHoKhau : parseInt(household.soHoKhau);
    } else if (household.id) {
      const parsed = parseInt(household.id.replace(/\D/g, ""));
      soHoKhau = isNaN(parsed) ? null : parsed;
    }
    
    if (soHoKhau && !isNaN(soHoKhau)) {
      fetchAccountInfo(soHoKhau);
    }
  };

  const closeDetail = () => {
    setSelected(null);
    setAccountInfo(null);
    setShowAccountForm(false);
    setAccountForm({ tenDangNhap: "", matKhau: "", email: "" });
    setAccountError(null);
  };

  const handleDelete = (household) => {
    if (confirm(`Bạn chắc chắn muốn xoá hộ khẩu ${household.id}?`)) {
      alert("Đã xoá (mô phỏng).");
    }
  };

  const handleUpdate = () => {
    alert("Đã lưu thay đổi (mô phỏng).");
    setDetailMode("view");
  };

  // Lấy mã nhân khẩu của chủ hộ từ hộ khẩu
  const getChuHoMaNhanKhau = async (soHoKhau) => {
    try {
      console.log("Fetching chu ho for soHoKhau:", soHoKhau);
      const response = await fetch(`${API_BASE}/nhankhau/ho-khau/${soHoKhau}`);
      console.log("Response status:", response.status);
      
      if (response.ok) {
        const nhanKhauList = await response.json();
        console.log("Nhan khau list:", nhanKhauList);
        
        if (!Array.isArray(nhanKhauList) || nhanKhauList.length === 0) {
          console.warn("No residents found for household:", soHoKhau);
          console.warn("Hộ khẩu này chưa có nhân khẩu nào. Vui lòng thêm nhân khẩu trước.");
          return null;
        }
        
        console.log("Total residents found:", nhanKhauList.length);
        console.log("Residents:", nhanKhauList.map(nk => ({
          maNhanKhau: nk.maNhanKhau,
          hoTen: nk.hoTen,
          quanHeVoiChuHo: nk.quanHeVoiChuHo
        })));
        
        const chuHo = nhanKhauList.find(nk => 
          nk.quanHeVoiChuHo === "Chủ hộ" || 
          nk.quanHeVoiChuHo === "Ch? h?" || // Xử lý lỗi encoding
          nk.quanHeVoiChuHo === "Chu ho" || // Không dấu
          (nk.quanHeVoiChuHo && nk.quanHeVoiChuHo.toLowerCase().includes("chủ hộ")) ||
          (nk.quanHeVoiChuHo && nk.quanHeVoiChuHo.toLowerCase().includes("chu ho"))
        );
        
        console.log("Chu ho found:", chuHo);
        if (!chuHo) {
          console.warn("Không tìm thấy chủ hộ trong danh sách nhân khẩu. Danh sách quan hệ:", 
            nhanKhauList.map(nk => nk.quanHeVoiChuHo));
        }
        return chuHo ? chuHo.maNhanKhau : null;
      } else {
        const errorText = await response.text();
        console.error("Error response:", errorText);
      }
    } catch (error) {
      console.error("Error fetching chu ho:", error);
    }
    return null;
  };

  // Tạo hoặc cập nhật tài khoản
  const handleSaveAccount = async () => {
    // Validation
    if (!accountForm.tenDangNhap || accountForm.tenDangNhap.trim() === "") {
      setAccountError("Vui lòng nhập tên đăng nhập");
      return;
    }

    if (!accountForm.email || accountForm.email.trim() === "") {
      setAccountError("Vui lòng nhập email");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(accountForm.email)) {
      setAccountError("Email không hợp lệ");
      return;
    }

    if (!accountInfo && (!accountForm.matKhau || accountForm.matKhau.trim() === "")) {
      setAccountError("Vui lòng nhập mật khẩu");
      return;
    }

    if (accountForm.matKhau && accountForm.matKhau.length < 6) {
      setAccountError("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    try {
      setAccountLoading(true);
      setAccountError(null);

      // Lấy số hộ khẩu - ưu tiên soHoKhau, sau đó mới dùng id
      let soHoKhau;
      if (selected.soHoKhau !== undefined && selected.soHoKhau !== null) {
        soHoKhau = typeof selected.soHoKhau === 'number' ? selected.soHoKhau : parseInt(selected.soHoKhau);
      } else if (selected.id !== undefined && selected.id !== null) {
        if (typeof selected.id === 'number') {
          soHoKhau = selected.id;
        } else if (typeof selected.id === 'string') {
          // Thử parse số từ string (ví dụ: "HK001" -> 1, hoặc "1" -> 1)
          const parsed = parseInt(selected.id.replace(/\D/g, ""));
          soHoKhau = isNaN(parsed) ? null : parsed;
        } else {
          soHoKhau = selected.id;
        }
      }

      if (!soHoKhau || isNaN(soHoKhau)) {
        setAccountError("Không thể xác định số hộ khẩu. Vui lòng thử lại.");
        setAccountLoading(false);
        return;
      }

      console.log("Creating account for soHoKhau:", soHoKhau, "selected:", selected);
      
      const maNhanKhau = await getChuHoMaNhanKhau(soHoKhau);

      if (!maNhanKhau) {
        setAccountError(`Không tìm thấy chủ hộ cho hộ khẩu số ${soHoKhau}. Vui lòng:\n1. Kiểm tra xem hộ khẩu này có nhân khẩu nào chưa\n2. Đảm bảo có ít nhất một nhân khẩu với quan hệ "Chủ hộ"\n3. Nếu chưa có, vui lòng thêm nhân khẩu cho hộ khẩu này trước khi tạo tài khoản.`);
        setAccountLoading(false);
        return;
      }

      console.log("Using maNhanKhau:", maNhanKhau);

      if (accountInfo) {
        // Cập nhật tài khoản
        const updateData = {
          maNhanKhau: maNhanKhau,
          tenDangNhap: accountForm.tenDangNhap,
          email: accountForm.email,
          vaiTro: "User",
          trangThai: "DANG_HOAT_DONG",
        };
        if (accountForm.matKhau) {
          updateData.matKhau = accountForm.matKhau;
        }

        const response = await fetch(`${API_BASE}/taikhoan/${accountInfo.maTaiKhoan}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updateData),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || "Cập nhật tài khoản thất bại");
        }

        alert("Cập nhật tài khoản thành công!");
      } else {
        // Tạo tài khoản mới
        const createData = {
          maNhanKhau: maNhanKhau,
          tenDangNhap: accountForm.tenDangNhap,
          matKhau: accountForm.matKhau,
          email: accountForm.email,
          vaiTro: "User",
          trangThai: "DANG_HOAT_DONG",
        };

        console.log("=== FRONTEND: BẮT ĐẦU TẠO TÀI KHOẢN ===");
        console.log("Creating account with data:", JSON.stringify(createData, null, 2));
        
        const response = await fetch(`${API_BASE}/taikhoan`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(createData),
        });

        console.log("Create account response status:", response.status);
        console.log("Response headers:", Object.fromEntries(response.headers.entries()));
        
        if (!response.ok) {
          let errorText = "Tạo tài khoản thất bại";
          try {
            errorText = await response.text();
            console.error("=== FRONTEND: ERROR RESPONSE ===");
            console.error("Status:", response.status);
            console.error("Error response body:", errorText);
            // Nếu là JSON, parse nó
            if (errorText.startsWith("{")) {
              try {
                const errorJson = JSON.parse(errorText);
                errorText = errorJson.message || errorJson.error || errorText;
              } catch (parseError) {
                // Nếu không parse được JSON, dùng text gốc
                console.error("Cannot parse error JSON:", parseError);
              }
            }
          } catch (e) {
            console.error("Error reading error response:", e);
            errorText = `Lỗi ${response.status}: ${response.statusText}`;
          }
          console.error("=== FRONTEND: CREATE ACCOUNT FAILED ===");
          console.error("Status:", response.status);
          console.error("Error:", errorText);
          throw new Error(errorText || `Lỗi ${response.status}: Không thể tạo tài khoản`);
        }

        const result = await response.json();
        console.log("=== FRONTEND: ACCOUNT CREATED ===");
        console.log("Account created successfully:", JSON.stringify(result, null, 2));
        
        if (!result || !result.maTaiKhoan) {
          console.error("ERROR: Response không có maTaiKhoan!");
          throw new Error("Tạo tài khoản thành công nhưng không nhận được dữ liệu phản hồi");
        }
        
        console.log("maTaiKhoan:", result.maTaiKhoan);
        alert("Tạo tài khoản thành công! Mã tài khoản: " + result.maTaiKhoan);
      }

      // Refresh thông tin tài khoản
      const soHoKhauNum = parseInt(selected.id.replace(/\D/g, "")) || selected.id;
      await fetchAccountInfo(soHoKhauNum);
      setShowAccountForm(false);
      setAccountForm({ tenDangNhap: "", matKhau: "", email: "" });
    } catch (error) {
      console.error("Error saving account:", error);
      setAccountError(error.message || "Có lỗi xảy ra");
    } finally {
      setAccountLoading(false);
    }
  };

  // Xóa tài khoản
  const handleDeleteAccount = async () => {
    if (!accountInfo || !confirm(`Bạn chắc chắn muốn xóa tài khoản "${accountInfo.tenDangNhap}"?`)) {
      return;
    }

    try {
      setAccountLoading(true);
      setAccountError(null);

      const response = await fetch(`${API_BASE}/taikhoan/${accountInfo.maTaiKhoan}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Xóa tài khoản thất bại");
      }

      alert("Xóa tài khoản thành công!");
      setAccountInfo(null);
    } catch (error) {
      console.error("Error deleting account:", error);
      setAccountError(error.message || "Có lỗi xảy ra khi xóa tài khoản");
    } finally {
      setAccountLoading(false);
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
      <div className="flex h-screen w-screen relative z-10 bg-black/35 backdrop-blur-sm">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-auto">
            <div className="w-full h-full p-6 md:p-8 space-y-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-blue-200">Module</p>
                  <h1 className="text-3xl font-semibold text-white">Quản lý Hộ khẩu</h1>
                  <p className="text-gray-300 mt-1 max-w-2xl">
                    Theo dõi, tra cứu và thao tác nhanh với dữ liệu hộ khẩu của 7 tổ dân phố trong phường La Khê.
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => (window.location.href = "/households/add")}
                    className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium"
                  >
                    + Thêm hộ khẩu mới
                  </button>
                  <button
                    onClick={() => (window.location.href = "/households/by-area")}
                    className="px-5 py-3 rounded-xl bg-gray-800 text-gray-200 border border-white/10 hover:bg-gray-700"
                  >
                    Tìm kiếm theo tổ
                  </button>
                </div>
              </div>

              <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {stats.map((card) => (
                  <div key={card.label} className="bg-gray-900/80 border border-white/5 rounded-2xl p-6 shadow-lg shadow-black/30">
                    <p className="text-sm text-gray-400 uppercase tracking-wide">{card.label}</p>
                    <p className="text-3xl font-bold text-white mt-2">{card.value}</p>
                    <p className="text-xs text-gray-500 mt-1">{card.description}</p>
                  </div>
                ))}
              </section>

              <section className="bg-gray-900/80 border border-white/5 rounded-3xl shadow-2xl shadow-black/40">
                <div className="p-6 border-b border-white/5 flex flex-col gap-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2 bg-gray-800/80 px-3 py-2 rounded-xl flex-1 min-w-[220px]">
                      <Filter className="w-4 h-4 text-gray-500" />
                      <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Tìm số hộ khẩu, chủ hộ, địa chỉ..."
                        className="bg-transparent text-sm focus:outline-none flex-1"
                      />
                    </div>
                    <select
                      className="bg-gray-800/80 text-sm px-3 py-2 rounded-xl border border-gray-700 text-gray-100"
                      value={filters.area}
                      onChange={(e) => setFilters({ ...filters, area: e.target.value })}
                    >
                      <option value="all">Tất cả tổ dân phố</option>
                      {areas.map((area) => (
                        <option key={area} value={area}>
                          Tổ dân phố {area}
                        </option>
                      ))}
                    </select>
                    <select
                      className="bg-gray-800/80 text-sm px-3 py-2 rounded-xl border border-gray-700 text-gray-100"
                      value={filters.type}
                      onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                    >
                      <option value="all">Tất cả loại hộ</option>
                      <option value="thuong-tru">Thường trú</option>
                      <option value="tam-tru">Tạm trú</option>
                      <option value="kinh-doanh">Kinh doanh</option>
                    </select>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-white/5 text-gray-400 uppercase">
                      <tr>
                        <th className="px-6 py-4 text-left">Số hộ khẩu</th>
                        <th className="px-6 py-4 text-left">Chủ hộ</th>
                        <th className="px-6 py-4 text-left">Tổ / Địa chỉ</th>
                        <th className="px-6 py-4 text-left">Loại hộ</th>
                        <th className="px-6 py-4 text-left">Nhân khẩu</th>
                        <th className="px-6 py-4 text-center">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredHouseholds.length ? (
                        filteredHouseholds.map((household) => {
                          const typeStyle = typeConfig[household.type];
                          return (
                            <tr key={household.id} className="border-b border-white/5 hover:bg-white/5 transition">
                              <td className="px-6 py-4 font-semibold text-white">{household.id}</td>
                              <td className="px-6 py-4 text-gray-200">{household.headName}</td>
                              <td className="px-6 py-4 text-gray-300">
                                <p className="flex items-center gap-2">
                                  <MapPin className="w-4 h-4 text-blue-300" />Tổ {household.area}
                                </p>
                                <p className="text-xs text-gray-500">{household.address}</p>
                              </td>
                              <td className="px-6 py-4">
                                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${typeStyle.className}`}>
                                  {typeStyle.label}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <span className="inline-flex items-center gap-1 rounded-full bg-gray-800 px-3 py-1 text-xs text-gray-200">
                                  <Users className="w-3.5 h-3.5" />
                                  {household.members} người
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex justify-center gap-2">
                                  <button
                                    className="px-3 py-2 rounded-lg bg-blue-500/10 text-blue-200 border border-blue-400/30"
                                    onClick={() => openDetail(household, "view")}
                                  >
                                    Xem
                                  </button>
                                  <button
                                    className="px-3 py-2 rounded-lg bg-yellow-500/10 text-yellow-200 border border-yellow-400/30"
                                    onClick={() => openDetail(household, "edit")}
                                  >
                                    <Pencil className="w-4 h-4" />
                                  </button>
                                  <button
                                    className="px-3 py-2 rounded-lg bg-red-500/10 text-red-300 border border-red-400/30"
                                    onClick={() => handleDelete(household)}
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
                            Không có dữ liệu phù hợp
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="px-6 py-4 text-sm text-gray-400 border-t border-white/5">
                  Hiển thị {filteredHouseholds.length} trên {householdRecords.length} hộ khẩu
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/50" onClick={closeDetail} />
          <div className="relative w-full max-w-md bg-gray-950 border-l border-white/10 h-full overflow-y-auto p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-gray-500">Chi tiết hộ khẩu</p>
                <h3 className="text-2xl font-semibold text-white">{selected.headName}</h3>
                <p className="text-xs text-gray-400">{selected.id} • Tổ dân phố {selected.area}</p>
              </div>
              <button onClick={closeDetail} className="text-gray-400 hover:text-white text-xl">
                ✕
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div className="rounded-2xl border border-white/10 p-4">
                <p className="text-gray-400 text-xs uppercase">Địa chỉ</p>
                <p className="text-white font-semibold mt-1">{selected.address}</p>
              </div>
              <div className="rounded-2xl border border-white/10 p-4">
                <p className="text-gray-400 text-xs uppercase">Loại hộ</p>
                <p className="text-white font-semibold mt-1">{typeConfig[selected.type].label}</p>
                <p className="text-gray-500 text-xs mt-1">Đăng ký: {new Date(selected.registeredAt).toLocaleDateString("vi-VN")}</p>
              </div>
              <div className="rounded-2xl border border-white/10 p-4">
                <p className="text-gray-400 text-xs uppercase">Số nhân khẩu</p>
                <p className="text-white font-semibold mt-1">{selected.members} người</p>
              </div>
              <div className="rounded-2xl border border-white/10 p-4">
                <p className="text-gray-400 text-xs uppercase">Liên hệ</p>
                <p className="text-white font-semibold mt-1">{selected.phone}</p>
              </div>

              {/* Phần quản lý tài khoản chủ hộ */}
              <div className="rounded-2xl border border-white/10 p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Key className="w-4 h-4 text-yellow-400" />
                    <p className="text-gray-400 text-xs uppercase">Tài khoản đăng nhập chủ hộ</p>
                  </div>
                  {!accountInfo && !showAccountForm && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log("Button clicked - setting showAccountForm to true");
                        setShowAccountForm(true);
                      }}
                      className="px-3 py-1.5 text-xs bg-green-600 hover:bg-green-500 text-white rounded-lg cursor-pointer"
                      type="button"
                    >
                      + Tạo tài khoản
                    </button>
                  )}
                  {accountInfo && !showAccountForm && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setAccountForm({
                            tenDangNhap: accountInfo.tenDangNhap || "",
                            matKhau: "",
                            email: accountInfo.email || "",
                          });
                          setShowAccountForm(true);
                        }}
                        className="px-3 py-1.5 text-xs bg-blue-600 hover:bg-blue-500 text-white rounded-lg"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={handleDeleteAccount}
                        className="px-3 py-1.5 text-xs bg-red-600 hover:bg-red-500 text-white rounded-lg"
                      >
                        Xóa
                      </button>
                    </div>
                  )}
                </div>

                {/* Debug info */}
                {process.env.NODE_ENV === 'development' && (
                  <div className="mt-2 text-xs text-gray-500">
                    Debug: showAccountForm={String(showAccountForm)}, accountInfo={accountInfo ? 'exists' : 'null'}, accountLoading={String(accountLoading)}
                  </div>
                )}

                {accountLoading ? (
                  <p className="text-gray-500 text-sm mt-3">Đang tải...</p>
                ) : accountError && !showAccountForm ? (
                  <div className="mt-3">
                    <p className="text-red-400 text-sm">{accountError}</p>
                    <button
                      type="button"
                      onClick={() => {
                        setAccountError(null);
                        setShowAccountForm(true);
                      }}
                      className="mt-2 px-3 py-1.5 text-xs bg-blue-600 hover:bg-blue-500 text-white rounded-lg"
                    >
                      Thử lại
                    </button>
                  </div>
                ) : showAccountForm ? (
                  <div className="space-y-3 mt-3">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Tên đăng nhập</label>
                      <input
                        type="text"
                        value={accountForm.tenDangNhap}
                        onChange={(e) => setAccountForm({ ...accountForm, tenDangNhap: e.target.value })}
                        className="w-full bg-gray-900 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
                        placeholder="Nhập tên đăng nhập"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">
                        {accountInfo ? "Mật khẩu mới (để trống nếu không đổi)" : "Mật khẩu"}
                      </label>
                      <input
                        type="password"
                        value={accountForm.matKhau}
                        onChange={(e) => setAccountForm({ ...accountForm, matKhau: e.target.value })}
                        className="w-full bg-gray-900 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
                        placeholder={accountInfo ? "Nhập mật khẩu mới" : "Nhập mật khẩu"}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Email</label>
                      <input
                        type="email"
                        value={accountForm.email}
                        onChange={(e) => setAccountForm({ ...accountForm, email: e.target.value })}
                        className="w-full bg-gray-900 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
                        placeholder="Nhập email"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          console.log("Save account button clicked");
                          handleSaveAccount();
                        }}
                        disabled={accountLoading}
                        className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {accountLoading ? "Đang xử lý..." : accountInfo ? "Cập nhật" : "Tạo tài khoản"}
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          console.log("Cancel button clicked");
                          setShowAccountForm(false);
                          setAccountForm({ tenDangNhap: "", matKhau: "", email: "" });
                          setAccountError(null);
                        }}
                        disabled={accountLoading}
                        className="px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm disabled:opacity-50"
                      >
                        Hủy
                      </button>
                    </div>
                  </div>
                ) : accountInfo ? (
                  <div className="mt-3 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Tên đăng nhập:</span>
                      <span className="text-white font-semibold">{accountInfo.tenDangNhap}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Email:</span>
                      <span className="text-white">{accountInfo.email || "—"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Trạng thái:</span>
                      <span className={`${accountInfo.trangThai === "DANG_HOAT_DONG" ? "text-green-400" : "text-yellow-400"}`}>
                        {accountInfo.trangThai === "DANG_HOAT_DONG" ? "Đang hoạt động" : accountInfo.trangThai || "—"}
                      </span>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm mt-2">Chưa có tài khoản đăng nhập</p>
                )}
              </div>

              {/* Phần xác thực yêu cầu */}
              <div className="rounded-2xl border border-white/10 p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-yellow-400" />
                    <p className="text-gray-400 text-xs uppercase">Yêu cầu chờ xác thực</p>
                  </div>
                  {yeuCauList.length > 0 && (
                    <span className="bg-yellow-500/20 text-yellow-300 text-xs px-2 py-1 rounded-full">
                      {yeuCauList.length}
                    </span>
                  )}
                </div>

                {yeuCauLoading ? (
                  <p className="text-gray-500 text-sm">Đang tải...</p>
                ) : yeuCauList.length === 0 ? (
                  <p className="text-gray-500 text-sm">Không có yêu cầu nào chờ xác thực</p>
                ) : (
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {yeuCauList.map((yc) => (
                      <div
                        key={yc.maYeuCau}
                        className="bg-gray-900/50 rounded-lg p-3 border border-white/5 hover:border-yellow-500/30 cursor-pointer transition"
                        onClick={() => {
                          setSelectedYeuCau(yc);
                          setShowYeuCauModal(true);
                        }}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <p className="text-white text-xs font-semibold">{yc.loaiYeuCauLabel}</p>
                            <p className="text-gray-400 text-xs mt-1">
                              {yc.hoTenChuHo} • Hộ khẩu {yc.soHoKhau}
                            </p>
                            <p className="text-gray-500 text-xs mt-1">
                              {yc.ngayTao ? new Date(yc.ngayTao).toLocaleString("vi-VN") : ""}
                            </p>
                          </div>
                          <CheckCircle className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <label className="text-xs uppercase text-gray-400">Ghi chú</label>
              <textarea
                disabled={detailMode === "view"}
                defaultValue={selected.note}
                className="w-full rounded-2xl bg-gray-900 border border-white/10 text-gray-100 p-3 min-h-[120px] focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mt-6 flex gap-3">
              {detailMode === "edit" ? (
                <>
                  <button className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-2xl font-semibold" onClick={handleUpdate}>
                    Lưu thay đổi
                  </button>
                  <button className="flex-1 bg-gray-800 text-gray-300 border border-gray-700 py-3 rounded-2xl" onClick={() => setDetailMode("view")}>
                    Huỷ
                  </button>
                </>
              ) : (
                <button className="flex-1 bg-gray-800 text-gray-200 border border-gray-700 py-3 rounded-2xl" onClick={() => setDetailMode("edit")}>
                  Chỉnh sửa
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal xác thực yêu cầu */}
      <YeuCauXacThucModal
        yeuCau={selectedYeuCau}
        isOpen={showYeuCauModal}
        onClose={() => {
          setShowYeuCauModal(false);
          setSelectedYeuCau(null);
        }}
        onUpdate={() => {
          fetchYeuCauChoXacThuc();
        }}
      />
    </div>
  );
}

