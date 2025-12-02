import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, CheckCircle2, Hash, Home, PhoneCall, User } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../headers/Header";

const initialForm = {
  name: "",
  cccd: "",
  gender: "",
  birthDate: "",
  birthPlace: "",
  household: "",
  residenceType: "thuong-tru",
  occupation: "",
  workplace: "",
  phone: "",
};

const residenceOptions = [
  { value: "thuong-tru", label: "Thường trú" },
  { value: "tam-tru", label: "Tạm trú" },
  { value: "kinh-doanh", label: "Kinh doanh" },
];

export default function ResidentsAdd() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Vui lòng nhập họ tên";
    if (!formData.cccd || formData.cccd.length !== 12) newErrors.cccd = "CCCD phải đủ 12 số";
    if (!formData.gender) newErrors.gender = "Chọn giới tính";
    if (!formData.birthDate) newErrors.birthDate = "Chọn ngày sinh";
    if (!formData.household) newErrors.household = "Nhập số hộ khẩu";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      alert("Đã tạo nhân khẩu mới (mô phỏng).");
      navigate("/residents");
    }, 800);
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
                  <p className="text-xs uppercase tracking-[0.3em] text-blue-200">Workflow</p>
                  <h1 className="text-3xl font-semibold text-white">Thêm nhân khẩu mới</h1>
                  <p className="text-gray-300 mt-1 max-w-2xl">
                    Điền thông tin chi tiết, hệ thống sẽ tự động đồng bộ sang danh sách cư trú và hộ khẩu liên quan.
                  </p>
                </div>
                <button
                  onClick={() => navigate("/residents")}
                  className="px-5 py-3 rounded-xl bg-gray-800 text-gray-200 border border-white/10 hover:bg-gray-700"
                >
                  ← Quay lại danh sách
                </button>
              </div>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-gray-900/80 border border-white/5 rounded-3xl p-6 space-y-5 shadow-2xl shadow-black/40">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="text-sm text-gray-300">
                      Họ và tên *
                      <input
                        className={`mt-2 w-full rounded-xl bg-gray-800/80 border px-3 py-2 focus:outline-none ${
                          errors.name ? "border-red-500" : "border-gray-700 focus:border-blue-500"
                        }`}
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        placeholder="Nguyễn Văn A"
                      />
                      {errors.name && <span className="text-xs text-red-400">{errors.name}</span>}
                    </label>
                    <label className="text-sm text-gray-300">
                      CCCD *
                      <input
                        className={`mt-2 w-full rounded-xl bg-gray-800/80 border px-3 py-2 focus:outline-none ${
                          errors.cccd ? "border-red-500" : "border-gray-700 focus:border-blue-500"
                        }`}
                        value={formData.cccd}
                        onChange={(e) => handleChange("cccd", e.target.value)}
                        placeholder="012345678901"
                      />
                      {errors.cccd && <span className="text-xs text-red-400">{errors.cccd}</span>}
                    </label>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="text-sm text-gray-300">
                      Giới tính *
                      <select
                        className={`mt-2 w-full rounded-xl bg-gray-800/80 border px-3 py-2 focus:outline-none ${
                          errors.gender ? "border-red-500" : "border-gray-700 focus:border-blue-500"
                        }`}
                        value={formData.gender}
                        onChange={(e) => handleChange("gender", e.target.value)}
                      >
                        <option value="">Chọn giới tính</option>
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                      </select>
                      {errors.gender && <span className="text-xs text-red-400">{errors.gender}</span>}
                    </label>
                    <label className="text-sm text-gray-300">
                      Ngày sinh *
                      <input
                        type="date"
                        className={`mt-2 w-full rounded-xl bg-gray-800/80 border px-3 py-2 focus:outline-none ${
                          errors.birthDate ? "border-red-500" : "border-gray-700 focus:border-blue-500"
                        }`}
                        value={formData.birthDate}
                        onChange={(e) => handleChange("birthDate", e.target.value)}
                      />
                      {errors.birthDate && <span className="text-xs text-red-400">{errors.birthDate}</span>}
                    </label>
                  </div>
                  <label className="text-sm text-gray-300">
                    Nơi sinh
                    <input
                      className="mt-2 w-full rounded-xl bg-gray-800/80 border border-gray-700 px-3 py-2 focus:outline-none focus:border-blue-500"
                      value={formData.birthPlace}
                      onChange={(e) => handleChange("birthPlace", e.target.value)}
                      placeholder="Hà Nội"
                    />
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="text-sm text-gray-300">
                      Số hộ khẩu *
                      <div className="mt-2 flex items-center gap-2 rounded-xl bg-gray-800/80 border border-gray-700 px-3 py-2">
                        <Home className="w-4 h-4 text-gray-500" />
                        <input
                          className="bg-transparent flex-1 focus:outline-none text-gray-100"
                          value={formData.household}
                          onChange={(e) => handleChange("household", e.target.value)}
                          placeholder="HK-001"
                        />
                      </div>
                      {errors.household && <span className="text-xs text-red-400">{errors.household}</span>}
                    </label>
                    <label className="text-sm text-gray-300">
                      Loại cư trú
                      <select
                        className="mt-2 w-full rounded-xl bg-gray-800/80 border border-gray-700 px-3 py-2 focus:outline-none focus:border-blue-500"
                        value={formData.residenceType}
                        onChange={(e) => handleChange("residenceType", e.target.value)}
                      >
                        {residenceOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <label className="text-sm text-gray-300">
                    Nghề nghiệp
                    <input
                      className="mt-2 w-full rounded-xl bg-gray-800/80 border border-gray-700 px-3 py-2 focus:outline-none focus:border-blue-500"
                      value={formData.occupation}
                      onChange={(e) => handleChange("occupation", e.target.value)}
                      placeholder="Công chức, công nhân..."
                    />
                  </label>
                  <label className="text-sm text-gray-300">
                    Nơi làm việc
                    <input
                      className="mt-2 w-full rounded-xl bg-gray-800/80 border border-gray-700 px-3 py-2 focus:outline-none focus:border-blue-500"
                      value={formData.workplace}
                      onChange={(e) => handleChange("workplace", e.target.value)}
                      placeholder="Công ty / tổ chức"
                    />
                  </label>
                  <label className="text-sm text-gray-300">
                    Số điện thoại
                    <div className="mt-2 flex items-center gap-2 rounded-xl bg-gray-800/80 border border-gray-700 px-3 py-2">
                      <PhoneCall className="w-4 h-4 text-gray-500" />
                      <input
                        className="bg-transparent flex-1 focus:outline-none text-gray-100"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        placeholder="09xx xxx xxx"
                      />
                    </div>
                  </label>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-2xl flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    {submitting ? "Đang xử lý..." : "Lưu nhân khẩu"}
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-900/80 border border-white/5 rounded-3xl p-6">
                    <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                      <User className="w-5 h-5 text-blue-300" />
                      Thông tin nhập liệu
                    </h2>
                    <div className="mt-4 space-y-3 text-sm text-gray-300">
                      <p>
                        <span className="text-gray-500">Họ tên:</span> {formData.name || "—"}
                      </p>
                      <p>
                        <span className="text-gray-500">CCCD:</span> {formData.cccd || "—"}
                      </p>
                      <p>
                        <span className="text-gray-500">Hộ khẩu:</span> {formData.household || "—"}
                      </p>
                      <p>
                        <span className="text-gray-500">Loại cư trú:</span> {residenceOptions.find((o) => o.value === formData.residenceType)?.label}
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-900/80 border border-white/5 rounded-3xl p-6">
                    <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-blue-300" />
                      Thông tin cư trú
                    </h2>
                    <div className="mt-4 space-y-3 text-sm text-gray-300">
                      <p>
                        <span className="text-gray-500">Ngày sinh:</span>{" "}
                        {formData.birthDate ? new Date(formData.birthDate).toLocaleDateString("vi-VN") : "—"}
                      </p>
                      <p>
                        <span className="text-gray-500">Nơi sinh:</span> {formData.birthPlace || "—"}
                      </p>
                      <p>
                        <span className="text-gray-500">Số điện thoại:</span> {formData.phone || "—"}
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-900/80 border border-white/5 rounded-3xl p-6">
                    <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                      <Hash className="w-5 h-5 text-blue-300" />
                      Checklist
                    </h2>
                    <ul className="mt-4 space-y-3 text-sm text-gray-200">
                      {[
                        { label: "Thông tin cá nhân", done: formData.name && formData.gender && formData.birthDate },
                        { label: "CCCD & hộ khẩu", done: formData.cccd && formData.household },
                        { label: "Thông tin cư trú", done: !!formData.residenceType },
                        { label: "Thông tin liên hệ", done: !!formData.phone },
                      ].map((item) => (
                        <li key={item.label} className="flex items-center gap-2">
                          <CheckCircle2 className={`w-4 h-4 ${item.done ? "text-green-400" : "text-gray-600"}`} />
                          <span className={item.done ? "text-white" : "text-gray-500"}>{item.label}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

