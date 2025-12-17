import { useState } from "react";
import { useNavigate } from "react-router-dom";

const defaultForm = {
  hoTen: "",
  chucVu: "",
  maXaPhuong: "",
  tenDangNhap: "",
  matKhau: "",
  xacNhanMatKhau: "",
  email: "",
  vaiTro: "ADMIN",
};

const roleOptions = [
  { value: "ADMIN", label: "ADMIN" },
  { value: "Cán bộ", label: "Cán bộ" },
  { value: "Quản trị viên", label: "Quản trị viên" },
];

export default function Register() {
  const [form, setForm] = useState(defaultForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setError("");
  };

  const validate = () => {
    if (!form.hoTen) return "Vui lòng nhập họ và tên";
    if (!form.chucVu) return "Vui lòng nhập chức vụ";
    if (!form.maXaPhuong) return "Vui lòng nhập mã xã phường";
    if (!form.tenDangNhap) return "Vui lòng nhập tên đăng nhập";
    if (!form.matKhau) return "Vui lòng nhập mật khẩu";
    if (form.matKhau !== form.xacNhanMatKhau) return "Mật khẩu xác nhận không khớp";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const msg = validate();
    if (msg) {
      setError(msg);
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hoTen: form.hoTen,
          chucVu: form.chucVu,
          maXaPhuong: Number(form.maXaPhuong),
          tenDangNhap: form.tenDangNhap,
          matKhau: form.matKhau,
          email: form.email || null,
          vaiTro: form.vaiTro,
        }),
      });
      if (!res.ok) {
        setError("Đăng ký không thành công. Kiểm tra lại thông tin.");
        return;
      }
      alert("Đăng ký tài khoản thành công. Vui lòng đăng nhập.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Không thể kết nối máy chủ. Vui lòng thử lại.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gray-900 relative overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover opacity-100 pointer-events-none"
        src="/videos/background.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        style={{ zIndex: 1 }}
      />

      <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10" />

      <div className="relative z-20 w-full max-w-3xl bg-gray-900/95 border border-white/10 rounded-2xl p-8 shadow-2xl">
        <h1 className="text-3xl font-semibold text-white mb-2 text-center">
          Đăng ký tài khoản cán bộ
        </h1>
        <p className="text-gray-400 text-sm mb-6 text-center">
          Điền thông tin cán bộ và tài khoản để truy cập hệ thống.
        </p>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm text-gray-200">
          <label className="flex flex-col gap-1">
            Họ và tên *
            <input
              className="rounded-xl bg-gray-800/80 border border-gray-700 px-3 py-2 focus:outline-none focus:border-blue-500"
              value={form.hoTen}
              onChange={(e) => updateField("hoTen", e.target.value)}
              placeholder="Nguyễn Văn A"
            />
          </label>

          <label className="flex flex-col gap-1">
            Chức vụ *
            <input
              className="rounded-xl bg-gray-800/80 border border-gray-700 px-3 py-2 focus:outline-none focus:border-blue-500"
              value={form.chucVu}
              onChange={(e) => updateField("chucVu", e.target.value)}
              placeholder="Tổ trưởng, cán bộ..."
            />
          </label>

          <label className="flex flex-col gap-1">
            Mã xã phường *
            <input
              className="rounded-xl bg-gray-800/80 border border-gray-700 px-3 py-2 focus:outline-none focus:border-blue-500"
              value={form.maXaPhuong}
              onChange={(e) => updateField("maXaPhuong", e.target.value)}
              placeholder="Ví dụ: 1"
            />
          </label>

          <label className="flex flex-col gap-1">
            Email
            <input
              type="email"
              className="rounded-xl bg-gray-800/80 border border-gray-700 px-3 py-2 focus:outline-none focus:border-blue-500"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="you@example.com"
            />
          </label>

          <label className="flex flex-col gap-1">
            Tên đăng nhập *
            <input
              className="rounded-xl bg-gray-800/80 border border-gray-700 px-3 py-2 focus:outline-none focus:border-blue-500"
              value={form.tenDangNhap}
              onChange={(e) => updateField("tenDangNhap", e.target.value)}
              placeholder="username"
            />
          </label>

          <label className="flex flex-col gap-1">
            Vai trò *
            <select
              className="rounded-xl bg-gray-800/80 border border-gray-700 px-3 py-2 focus:outline-none focus:border-blue-500"
              value={form.vaiTro}
              onChange={(e) => updateField("vaiTro", e.target.value)}
            >
              {roleOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1">
            Mật khẩu *
            <input
              type="password"
              className="rounded-xl bg-gray-800/80 border border-gray-700 px-3 py-2 focus:outline-none focus:border-blue-500"
              value={form.matKhau}
              onChange={(e) => updateField("matKhau", e.target.value)}
            />
          </label>

          <label className="flex flex-col gap-1">
            Xác nhận mật khẩu *
            <input
              type="password"
              className="rounded-xl bg-gray-800/80 border border-gray-700 px-3 py-2 focus:outline-none focus:border-blue-500"
              value={form.xacNhanMatKhau}
              onChange={(e) => updateField("xacNhanMatKhau", e.target.value)}
            />
          </label>

          {error && (
            <div className="md:col-span-2 text-red-400 text-sm">
              {error}
            </div>
          )}

          <div className="md:col-span-2 flex flex-col sm:flex-row gap-3 mt-2">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-2xl disabled:opacity-70"
            >
              {submitting ? "Đang xử lý..." : "Đăng ký tài khoản"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="flex-1 bg-gray-800 text-gray-300 border border-gray-600 hover:bg-gray-700 font-semibold py-3 rounded-2xl"
            >
              Quay lại đăng nhập
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


