import Header from "../headers/Header";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

export default function HouseholdDetail() {
  const navigate = useNavigate();

  const household = useMemo(
    () => [
      {
        soHoKhau: "HK123456",
        chuHo: "Nguyễn Văn A",
        soNha: "25",
        duongPho: "Tố Hữu",
        phuong: "La Khê",
        quan: "Hà Đông",
      },
      {
        soHoKhau: "HK654321",
        chuHo: "Trần Thị B",
        soNha: "10",
        duongPho: "Lê Văn Lương",
        phuong: "Mộ Lao",
        quan: "Hà Đông",
      },
      {
        soHoKhau: "HK112233",
        chuHo: "Lê Văn C",
        soNha: "5",
        duongPho: "Quang Trung",
        phuong: "Văn Quán",
        quan: "Hà Đông",
      },
      {
        soHoKhau: "HK445566",
        chuHo: "Phạm Thị D",
        soNha: "15",
        duongPho: "Trần Phú",
        phuong: "Yên Nghĩa",
        quan: "Hà Đông",
      },
      {
        soHoKhau: "HK778899",
        chuHo: "Hoàng Văn E",
        soNha: "30",
        duongPho: "Nguyễn Trãi",
        phuong: "Hà Cầu",
        quan: "Hà Đông",
      },
      {
        soHoKhau: "HK998877",
        chuHo: "Đỗ Thị F",
        soNha: "12",
        duongPho: "Phùng Hưng",
        phuong: "Phú Lãm",
        quan: "Hà Đông",
      },
      {
        soHoKhau: "HK334455",
        chuHo: "Vũ Văn G",
        soNha: "8",
        duongPho: "Bà Triệu",
        phuong: "Kiến Hưng",
        quan: "Hà Đông",
      },
      {
        soHoKhau: "HK556677",
        chuHo: "Trịnh Thị H",
        soNha: "20",
        duongPho: "Lý Thường Kiệt",
        phuong: "Dương Nội",
        quan: "Hà Đông",
      },
      {
        soHoKhau: "HK221133",
        chuHo: "Lý Văn I",
        soNha: "18",
        duongPho: "Hà Trì",
        phuong: "Hà Cầu",
        quan: "Hà Đông",
      },
      {
        soHoKhau: "HK887766",
        chuHo: "Phan Thị J",
        soNha: "22",
        duongPho: "Tô Hiệu",
        phuong: "La Khê",
        quan: "Hà Đông",
      },
      {
        soHoKhau: "HK445577",
        chuHo: "Trần Văn K",
        soNha: "28",
        duongPho: "Quốc lộ 6",
        phuong: "Mộ Lao",
        quan: "Hà Đông",
      },
      {
        soHoKhau: "HK667788",
        chuHo: "Ngô Thị L",
        soNha: "14",
        duongPho: "Văn Phú",
        phuong: "Phú Lãm",
        quan: "Hà Đông",
      },
    ],
    []
  );

  const nhanKhau = [
    {
      id: 1,
      hoTen: "Nguyễn Văn A",
      biDanh: "",
      ngaySinh: "1975-02-10",
      noiSinh: "Hà Nội",
      nguyenQuan: "Nam Định",
      danToc: "Kinh",
      ngheNghiep: "Công nhân",
      noiLamViec: "Công ty CP ABC",
      cccd: "012345678901",
      ngayCap: "2016-03-01",
      noiCap: "CA Hà Nội",
      dangKyThuongTru: "2001-05-10",
      thuongTruTruoc: "Nam Định",
      quanHeChuHo: "Chủ hộ",
    },
    {
      id: 2,
      hoTen: "Trần Thị B",
      biDanh: "",
      ngaySinh: "1979-12-22",
      noiSinh: "Hà Đông",
      nguyenQuan: "Hà Nam",
      danToc: "Kinh",
      ngheNghiep: "Nội trợ",
      noiLamViec: "",
      cccd: "012345678900",
      ngayCap: "2017-08-15",
      noiCap: "CA Hà Nội",
      dangKyThuongTru: "2003-02-10",
      thuongTruTruoc: "Hà Nam",
      quanHeChuHo: "Vợ",
    },
    {
      id: 3,
      hoTen: "Nguyễn Văn C",
      biDanh: "",
      ngaySinh: "2005-06-10",
      noiSinh: "Hà Đông",
      nguyenQuan: "Hà Nội",
      danToc: "Kinh",
      ngheNghiep: "Sinh viên",
      noiLamViec: "ĐH Bách Khoa",
      cccd: "",
      ngayCap: "",
      noiCap: "",
      dangKyThuongTru: "2005-06-12",
      thuongTruTruoc: "",
      quanHeChuHo: "Con trai",
    },
  ];

  // Search & sort state for household list
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState(""); // '', 'name', 'soHoKhau'

  const filteredHouseholds = useMemo(() => {
    let arr = [...household];
    if (query) {
      const q = query.toLowerCase();
      arr = arr.filter(
        (h) =>
          h.soHoKhau.toLowerCase().includes(q) ||
          h.chuHo.toLowerCase().includes(q)
      );
    }
    if (sortBy === "name") {
      arr.sort((a, b) => a.chuHo.localeCompare(b.chuHo, "vi"));
    } else if (sortBy === "soHoKhau") {
      arr.sort((a, b) => a.soHoKhau.localeCompare(b.soHoKhau));
    }
    return arr;
  }, [household, query, sortBy]);

  return (
    <>
      {/* Video nền */}
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

      {/* Card chính ở giữa màn hình */}
      <div className="min-h-screen rounded-t-2xl flex items-center justify-center p-6 relative z-10">
        <div className="w-[195vh] h-[93vh] max-h-screen rounded-t-2xl shadow-2xl bg-sky-500/95 backdrop-blur-md flex flex-col overflow-visible">
          {/* HEADER chạy ngang full card - overflow-visible để dropdown ra ngoài */}
          <div className="overflow-visible z-50">
            <Header />
          </div>

          {/* THÂN: scroll trong khung */}
          <div className="flex-1 overflow-hidden flex gap-6 p-6 md:p-8 rounded-b-2xl">
            {/* Nửa trái: Danh sách hộ khẩu + Nhân khẩu (scroll) */}
            <div className="flex-1 overflow-y-auto space-y-6">
              {/* Danh sách Nhân khẩu */}
              <div className="bg-gray-900 rounded-2xl shadow-xl p-8 border border-white/10 flex flex-col h-fit max-h-full">
                <h2 className="text-2xl font-semibold mb-6">
                  Danh sách Hộ khẩu
                </h2>

                {/* Taskbar: sort + search */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-300">Sắp xếp:</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-gray-800 text-gray-200 p-2 rounded"
                    >
                      <option value="">Mặc định</option>
                      <option value="name">Tên chủ hộ</option>
                      <option value="soHoKhau">Số hộ khẩu</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Tìm kiếm..."
                      className="bg-gray-800 text-gray-200 p-2 rounded w-48"
                    />
                    <button
                      onClick={() => {
                        setQuery("");
                        setSortBy("");
                      }}
                      className="bg-gray-700 text-gray-200 px-3 py-2 rounded"
                    >
                      Reset
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto flex-1 overflow-y-auto">
                  <table className="w-full text-gray-200 border-collapse">
                    <thead className="sticky top-0 bg-gray-900">
                      <tr className="bg-gray-800 text-gray-300 uppercase text-sm">
                        <th className="p-3 text-left">Số hộ khẩu</th>
                        <th className="p-3 text-left">Họ tên chủ hộ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredHouseholds.map((nk) => (
                        <tr
                          key={nk.soHoKhau}
                          onClick={() =>
                            navigate(`/population-detail/${nk.soHoKhau}`)
                          }
                          className={`border-b border-gray-700 hover:bg-gray-800/70 transition cursor-pointer`}
                        >
                          <td className="p-3 font-medium">{nk.soHoKhau}</td>
                          <td className="p-3 font-medium">{nk.chuHo}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Nửa phải: 1 khung to chứa 2 khung nhỏ */}
            <div className="w-72 shrink-0 bg-gray-900 rounded-2xl shadow-xl p-6 border border-white/10 flex flex-col gap-4 overflow-hidden">
              {/* Khung nhỏ trên: Hình tròn - Số nhân khẩu */}
              <div className="flex-1 bg-gray-800 rounded-xl p-4 flex items-center justify-center border border-gray-700">
                <div className="flex flex-col items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-linear-to-br from-white-600 to-yellow-600 flex items-center justify-center shadow-lg">
                    <div className="text-center">
                      <p className="text-white text-xs opacity-80">Nhân khẩu</p>
                      <p className="text-white text-3xl font-bold">
                        {nhanKhau.length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Khung nhỏ dưới: Lịch sử biến động */}
              <div className="flex-1 bg-gray-800 rounded-xl p-4 border border-gray-700 flex flex-col overflow-hidden">
                <h3 className="text-lg font-semibold mb-3 text-white shrink-0">
                  Lịch sử biến động
                </h3>
                <div className="flex-1 overflow-y-auto space-y-2 pr-2">
                  <div className="bg-gray-700 rounded-lg p-2 border border-gray-600 hover:border-purple-500 transition">
                    <p className="text-xs text-gray-400">01/01/2024</p>
                    <p className="text-white text-sm font-medium">
                      Thêm nhân khẩu
                    </p>
                    <p className="text-xs text-gray-500">Nguyễn Văn D</p>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-2 border border-gray-600 hover:border-purple-500 transition">
                    <p className="text-xs text-gray-400">15/12/2023</p>
                    <p className="text-white text-sm font-medium">
                      Xóa nhân khẩu
                    </p>
                    <p className="text-xs text-gray-500">Trần Thị E</p>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-2 border border-gray-600 hover:border-purple-500 transition">
                    <p className="text-xs text-gray-400">10/11/2023</p>
                    <p className="text-white text-sm font-medium">
                      Cập nhật thông tin
                    </p>
                    <p className="text-xs text-gray-500">Nguyễn Văn A</p>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-2 border border-gray-600 hover:border-purple-500 transition">
                    <p className="text-xs text-gray-400">15/12/2023</p>
                    <p className="text-white text-sm font-medium">
                      Xóa nhân khẩu
                    </p>
                    <p className="text-xs text-gray-500">Trần Thị E</p>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-2 border border-gray-600 hover:border-purple-500 transition">
                    <p className="text-xs text-gray-400">15/12/2023</p>
                    <p className="text-white text-sm font-medium">
                      Xóa nhân khẩu
                    </p>
                    <p className="text-xs text-gray-500">Trần Thị E</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
