import Sidebar from '../components/Sidebar';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  return (
    <div className="flex h-screen w-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow-sm flex-shrink-0 border-b border-gray-200">
          <div className="px-6 md:px-8 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1 text-sm">Xin chào, quản trị viên</p>
            </div>

            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen((v) => !v)}
                className="flex items-center gap-3 bg-white border border-gray-200 px-3 py-2 rounded-md hover:shadow-sm"
                aria-expanded={profileOpen}
              >
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">A</div>
                <div className="text-sm text-gray-800">Admin</div>
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded shadow-lg z-50 py-2">
                  <Link to="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Thông tin tài khoản</Link>
                  <Link to="/account/change-password" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Đổi mật khẩu</Link>
                  <div className="border-t my-1" />
                  <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50">Đăng xuất</button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-auto">
          <div className="w-full h-full p-6 md:p-8">
            <div className="flex justify-end mb-4">
              <Link to="/nhankhau/danh-sach" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Quản lý Nhân khẩu</Link>
            </div>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                { label: 'Tổng Dân cư', value: '1,250', color: 'blue', icon: '👥' },
                { label: 'Hộ Khẩu', value: '420', color: 'green', icon: '🏠' },
                { label: 'Sinh viên Thuê trọ', value: '185', color: 'purple', icon: '🎓' },
                { label: 'Hộ Kinh doanh', value: '62', color: 'orange', icon: '💼' }
              ].map((card, idx) => (
                <div key={idx} className={`bg-white rounded-lg shadow p-6 border-l-4 border-${card.color}-500 hover:shadow-lg transition-shadow`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">{card.label}</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">{card.value}</p>
                    </div>
                    <div className={`text-4xl text-${card.color}-500`}>{card.icon}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts Area */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[
                { title: 'Biến động Dân cư' },
                { title: 'Thống kê theo Loại' },
                { title: 'Hoạt động gần đây' },
                { title: 'Thông báo' }
              ].map((chart, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">{chart.title}</h2>
                  <div className="h-64 flex items-center justify-center bg-gray-100 rounded-lg">
                    <p className="text-gray-500 text-center">Dữ liệu sẽ được thêm ở đây</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}