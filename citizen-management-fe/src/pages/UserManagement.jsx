import { useMemo, useState } from "react";
import { Mail, PlusCircle, Shield, UserCog, Users } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../headers/Header";

const seedUsers = [
  {
    id: "USR-001",
    username: "admin.phuonglk",
    email: "admin@lakhé.gov.vn",
    role: "Admin",
    fullName: "Nguyễn Hoàng Anh",
    phone: "0901 222 333",
    status: "active",
    createdAt: "2024-01-03",
  },
  {
    id: "USR-002",
    username: "canbo.thuphi",
    email: "thuphi@lakhé.gov.vn",
    role: "User",
    fullName: "Trần Thị Phương",
    phone: "0933 789 456",
    status: "active",
    createdAt: "2024-02-18",
  },
  {
    id: "USR-003",
    username: "ton.gia",
    email: "ton.gia@lakhé.gov.vn",
    role: "Viewer",
    fullName: "Tôn Bảo Gia",
    phone: "0987 555 222",
    status: "pending",
    createdAt: "2024-11-12",
  },
];

const roles = [
  { value: "Admin", label: "Admin", description: "Quyền cao nhất, quản trị hệ thống" },
  { value: "User", label: "User", description: "Cán bộ xử lý nghiệp vụ" },
  { value: "Viewer", label: "Viewer", description: "Chỉ xem báo cáo, không chỉnh sửa" },
];

const defaultForm = {
  username: "",
  email: "",
  password: "",
  role: "User",
  fullName: "",
  phone: "",
  sendEmail: true,
};

const roleBadges = {
  Admin: "bg-red-500/10 text-red-300 border border-red-500/40",
  User: "bg-blue-500/10 text-blue-300 border border-blue-500/40",
  Viewer: "bg-emerald-500/10 text-emerald-300 border border-emerald-500/40",
};

export default function UserManagement() {
  const [users, setUsers] = useState(seedUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState(defaultForm);
  const [formErrors, setFormErrors] = useState({});

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchSearch =
        user.username.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.fullName.toLowerCase().includes(search.toLowerCase());
      const matchRole = roleFilter === "all" ? true : user.role === roleFilter;
      return matchSearch && matchRole;
    });
  }, [users, search, roleFilter]);

  const stats = useMemo(() => ({
    total: users.length,
    active: users.filter((user) => user.status === "active").length,
    pending: users.filter((user) => user.status === "pending").length,
  }), [users]);

  const validate = () => {
    const errors = {};
    if (!formData.username.trim()) errors.username = "Bắt buộc";
    if (!formData.email.trim()) errors.email = "Bắt buộc";
    if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Email không hợp lệ";
    if (!formData.password.trim()) errors.password = "Bắt buộc";
    if (formData.password.length < 6) errors.password = "Tối thiểu 6 ký tự";
    if (!formData.fullName.trim()) errors.fullName = "Bắt buộc";
    if (!formData.role) errors.role = "Chọn quyền";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateUser = () => {
    if (!validate()) return;
    const newUser = {
      id: `USR-${String(users.length + 1).padStart(3, "0")}`,
      username: formData.username,
      email: formData.email,
      role: formData.role,
      fullName: formData.fullName,
      phone: formData.phone,
      status: "pending",
      createdAt: new Date().toISOString().split("T")[0],
    };
    setUsers([newUser, ...users]);
    alert(`User ${formData.username} đã được tạo${formData.sendEmail ? " và gửi email thông báo (giả lập)" : ""}.`);
    setFormData(defaultForm);
    setShowCreateModal(false);
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

      <div className="flex h-screen w-screen relative z-10 bg-black/40 backdrop-blur-sm">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-auto">
            <div className="w-full h-full p-6 md:p-8 space-y-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-blue-200">Admin only</p>
                  <h1 className="text-3xl font-semibold text-white flex items-center gap-3">
                    <UserCog className="w-8 h-8 text-blue-300" />
                    Quản lý người dùng
                  </h1>
                  <p className="text-gray-300 mt-1 max-w-2xl">
                    Phân quyền và giám sát tài khoản truy cập hệ thống dân cư. Mọi thay đổi đều được ghi nhận audit.
                  </p>
                </div>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-3 rounded-xl font-medium shadow-lg shadow-blue-600/30"
                >
                  <PlusCircle className="w-5 h-5" />
                  Thêm user mới
                </button>
              </div>

              <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-900/80 border border-white/5 rounded-2xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm uppercase tracking-wide">Tổng tài khoản</p>
                      <p className="text-3xl font-bold text-white mt-2">{stats.total}</p>
                    </div>
                    <Users className="w-10 h-10 text-blue-300" />
                  </div>
                </div>
                <div className="bg-gray-900/80 border border-white/5 rounded-2xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm uppercase tracking-wide">Đang hoạt động</p>
                      <p className="text-3xl font-bold text-emerald-300 mt-2">{stats.active}</p>
                    </div>
                    <Shield className="w-10 h-10 text-emerald-300" />
                  </div>
                </div>
                <div className="bg-gray-900/80 border border-white/5 rounded-2xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm uppercase tracking-wide">Chờ kích hoạt</p>
                      <p className="text-3xl font-bold text-amber-300 mt-2">{stats.pending}</p>
                    </div>
                    <Mail className="w-10 h-10 text-amber-300" />
                  </div>
                </div>
              </section>

              <section className="bg-gray-900/80 border border-white/5 rounded-3xl shadow-2xl shadow-black/30">
                <div className="p-6 border-b border-white/5 flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold text-white">Danh sách người dùng</h2>
                    <p className="text-gray-400 text-sm">Chỉ Admin mới có quyền thêm/sửa/xóa tài khoản</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <input
                      className="bg-gray-800/80 text-gray-100 text-sm px-4 py-2 rounded-xl border border-gray-700/60"
                      placeholder="Tìm username, email..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <select
                      className="bg-gray-800/80 text-gray-200 text-sm px-3 py-2 rounded-xl border border-gray-700/60"
                      value={roleFilter}
                      onChange={(e) => setRoleFilter(e.target.value)}
                    >
                      <option value="all">Tất cả quyền</option>
                      {roles.map((role) => (
                        <option key={role.value} value={role.value}>
                          {role.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-white/5 text-gray-400 uppercase">
                      <tr>
                        <th className="px-6 py-4 text-left">Username</th>
                        <th className="px-6 py-4 text-left">Họ tên</th>
                        <th className="px-6 py-4 text-left">Email</th>
                        <th className="px-6 py-4 text-left">Quyền</th>
                        <th className="px-6 py-4 text-left">SĐT</th>
                        <th className="px-6 py-4 text-left">Ngày tạo</th>
                        <th className="px-6 py-4 text-left">Trạng thái</th>
                        <th className="px-6 py-4 text-center">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.length ? (
                        filteredUsers.map((user) => (
                          <tr key={user.id} className="border-b border-white/5 hover:bg-white/5 transition">
                            <td className="px-6 py-4 font-semibold text-white">{user.username}</td>
                            <td className="px-6 py-4 text-gray-200">{user.fullName}</td>
                            <td className="px-6 py-4 text-gray-200">{user.email}</td>
                            <td className="px-6 py-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${roleBadges[user.role]}`}>
                                {user.role}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-gray-200">{user.phone || "—"}</td>
                            <td className="px-6 py-4 text-gray-400">{new Date(user.createdAt).toLocaleDateString("vi-VN")}</td>
                            <td className="px-6 py-4">
                              <span
                                className={`px-3 py-1 rounded-full text-xs ${
                                  user.status === "active"
                                    ? "bg-emerald-500/10 text-emerald-200"
                                    : "bg-amber-500/10 text-amber-200"
                                }`}
                              >
                                {user.status === "active" ? "Đang hoạt động" : "Chờ kích hoạt"}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex justify-center gap-2">
                                <button
                                  className="text-xs px-3 py-2 rounded-lg bg-blue-500/10 text-blue-300 border border-blue-400/30"
                                  onClick={() => alert("Chức năng xem chi tiết đang phát triển")}
                                >
                                  Xem
                                </button>
                                <button
                                  className="text-xs px-3 py-2 rounded-lg bg-yellow-500/10 text-yellow-300 border border-yellow-400/30"
                                  onClick={() => alert("Chức năng chỉnh sửa đang phát triển")}
                                >
                                  Sửa
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={8} className="px-6 py-10 text-center text-gray-400">
                            Không có người dùng phù hợp
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowCreateModal(false)} />
          <div className="relative bg-gray-900 rounded-3xl border border-white/5 w-full max-w-3xl p-8 shadow-2xl overflow-auto max-h-[90vh]">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-gray-500">Tạo tài khoản mới</p>
                <h3 className="text-2xl font-semibold text-white">Thông tin user</h3>
              </div>
              <button onClick={() => setShowCreateModal(false)} className="text-gray-400 hover:text-white">
                ✕
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { name: "username", label: "Username *", type: "text" },
                { name: "email", label: "Email *", type: "email" },
                { name: "password", label: "Password *", type: "password" },
                { name: "fullName", label: "Họ tên *", type: "text" },
                { name: "phone", label: "Số điện thoại", type: "text" },
              ].map((field) => (
                <label key={field.name} className="text-sm text-gray-300">
                  {field.label}
                  <input
                    type={field.type}
                    className={`mt-2 w-full rounded-xl bg-gray-800/80 border ${
                      formErrors[field.name] ? "border-red-500" : "border-gray-700"
                    } px-3 py-2 focus:outline-none focus:border-blue-500`}
                    value={formData[field.name]}
                    onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                  />
                  {formErrors[field.name] && <span className="text-xs text-red-400">{formErrors[field.name]}</span>}
                </label>
              ))}
              <label className="text-sm text-gray-300">
                Vai trò / Quyền *
                <select
                  className={`mt-2 w-full rounded-xl bg-gray-800/80 border ${
                    formErrors.role ? "border-red-500" : "border-gray-700"
                  } px-3 py-2 text-gray-100 focus:outline-none focus:border-blue-500`}
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                >
                  {roles.map((role) => (
                    <option key={role.value} value={role.value}>
                      {role.label}
                    </option>
                  ))}
                </select>
                {formErrors.role && <span className="text-xs text-red-400">{formErrors.role}</span>}
              </label>
              <div className="md:col-span-2 rounded-2xl bg-gray-800/60 border border-gray-700 p-4 space-y-3">
                <p className="text-sm font-semibold text-gray-200">Gửi email thông báo</p>
                <p className="text-xs text-gray-400">
                  Hệ thống sẽ gửi email chứa đường dẫn kích hoạt & hướng dẫn đăng nhập cho user mới.
                </p>
                <label className="flex items-center gap-3 text-sm text-gray-300">
                  <input
                    type="checkbox"
                    checked={formData.sendEmail}
                    onChange={(e) => setFormData({ ...formData, sendEmail: e.target.checked })}
                  />
                  Bật gửi email tự động sau khi tạo
                </label>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <button
                onClick={handleCreateUser}
                className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-2xl"
              >
                Tạo user
              </button>
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 bg-gray-800 text-gray-300 border border-gray-600 hover:bg-gray-700 font-semibold py-3 rounded-2xl"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


