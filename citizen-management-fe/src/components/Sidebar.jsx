import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  const [expandedMenus, setExpandedMenus] = useState({});

  const toggleMenu = (menuName) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuName]: !prev[menuName]
    }));
  };

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: '📊', submenu: null, link: '/dashboard' },
    { id: 'nhankhau', name: 'Quản lý Nhân khẩu', icon: '👥', submenu: [
      { name: 'Danh sách nhân khẩu', link: '/nhankhau/danh-sach' },
      { name: 'Thêm nhân khẩu mới', link: '/nhankhau/them-moi' },
      { name: 'Tìm kiếm nâng cao', link: '/nhankhau/tim-kiem' }
    ]},
    { id: 'hokhau', name: 'Quản lý Hộ khẩu', icon: '🏠', submenu: [
      { name: 'Danh sách hộ khẩu', link: '/hokhau/danh-sach' },
      { name: 'Thêm hộ khẩu mới', link: '/hokhau/them-moi' },
      { name: 'Tìm kiếm theo tổ DP', link: '/hokhau/tim-kiem' }
    ]},
    { id: 'sinhvien', name: 'Sinh viên Thuê trọ', icon: '🎓', submenu: [
      { name: 'Danh sách sinh viên', link: '/sinhvien/danh-sach' },
      { name: 'Đăng ký mới', link: '/sinhvien/dang-ky' },
      { name: 'Sắp hết hạn thuê', link: '/sinhvien/het-han' }
    ]},
    { id: 'kinhdoanh', name: 'Hộ Kinh doanh', icon: '💼', submenu: [
      { name: 'Danh sách hộ KD', link: '/kinhdoanh/danh-sach' },
      { name: 'Đăng ký mới', link: '/kinhdoanh/dang-ky' },
      { name: 'Theo loại hình', link: '/kinhdoanh/loai-hinh' }
    ]},
    { id: 'tamtru', name: 'Dân cư Tạm trú', icon: '🏘️', submenu: null, link: '/tamtru' },
    { id: 'baocao', name: 'Báo cáo & Thống kê', icon: '📈', submenu: [
      { name: 'Báo cáo dân số', link: '/baocao/danso' },
      { name: 'Báo cáo sinh viên', link: '/baocao/sinhvien' },
      { name: 'Báo cáo kinh doanh', link: '/baocao/kinhdoanh' },
      { name: 'Biến động dân cư', link: '/baocao/bien-dong' }
    ]},
    { id: 'tailieu', name: 'Quản lý Tài liệu', icon: '📁', submenu: [
      { name: 'Upload tài liệu', link: '/tailieu/upload' },
      { name: 'Thư viện file', link: '/tailieu/thu-vien' },
      { name: 'Mẫu biểu', link: '/tailieu/mau-bieu' }
    ]},
    { id: 'caidat', name: 'Cài đặt', icon: '⚙️', submenu: [
      { name: 'Cài đặt hệ thống', link: '/caidat/he-thong' },
      { name: 'Quản lý người dùng', link: '/caidat/nguoi-dung' }
    ]},
    { id: 'trogiup', name: 'Trợ giúp', icon: '❓', submenu: null, link: '/trogiup' }
  ];

  return (
    <div className="w-64 min-w-[250px] bg-gradient-to-b from-blue-900 to-blue-800 text-white h-screen overflow-y-auto flex-shrink-0">
      {/* Header */}
      <div className="p-6 border-b border-blue-700">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
            <span className="text-lg font-bold text-blue-900">QL</span>
          </div>
          <div>
            <h1 className="text-sm font-bold">Quản lý Dân cư</h1>
            <p className="text-xs text-blue-200">Phường La Khê</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="p-4">
        {menuItems.map(item => (
          <div key={item.id} className="mb-1">
            {item.submenu ? (
              <div>
                <button
                  onClick={() => toggleMenu(item.id)}
                  className={
                    item.id === 'caidat'
                      ? "w-full flex items-center justify-center px-4 py-3 hover:bg-blue-700 rounded-lg transition-colors duration-200"
                      : "w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-700 rounded-lg transition-colors duration-200"
                  }
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className={item.id === 'caidat' ? "mx-2 text-sm font-medium truncate" : "flex-1 text-left text-sm font-medium truncate"}>{item.name}</span>
                  <span className={`text-xs transition-transform duration-200 ${expandedMenus[item.id] ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                {expandedMenus[item.id] && (
                  <div className="bg-blue-800 rounded-lg mt-1 ml-4 overflow-hidden">
                    {item.submenu.map((subitem, idx) => (
                      <Link
                        key={idx}
                        to={subitem.link}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-blue-100 hover:bg-blue-700 transition-colors duration-200 border-l-2 border-blue-600 hover:border-blue-300 truncate"
                      >
                        <span className="text-blue-300">├─</span>
                        <span className="truncate">{subitem.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                to={item.link}
                className="flex items-center gap-3 px-4 py-3 hover:bg-blue-700 rounded-lg transition-colors duration-200 truncate"
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm font-medium truncate">{item.name}</span>
              </Link>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}
