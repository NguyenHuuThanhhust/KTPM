import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import QuanLiHoKhau from "./pages/quanlihokhau";
import QuanLyNhanKhau from "./pages/QuanLyNhanKhau";
import AccountInfo from "./pages/AccountInfo";
import ChangePassword from "./pages/ChangePassword";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/hokhau/danh-sach" element={<QuanLiHoKhau />} />
      <Route path="/nhankhau/danh-sach" element={<QuanLyNhanKhau />} />
      <Route path="/account" element={<AccountInfo />} />
      <Route path="/account/change-password" element={<ChangePassword />} />
    </Routes>
  );
}
