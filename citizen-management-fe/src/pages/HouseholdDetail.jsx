import Header from "../headers/Header";

export default function HouseholdDetail() {
  const household = [
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
  ];

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
      <div className="min-h-screen flex items-center justify-center p-6 relative z-10">
        <div className="w-[195vh] h-[93vh] max-h-screen rounded-2xl overflow-hidden shadow-2xl bg-sky-500/95 backdrop-blur-md flex flex-col">
          {/* HEADER chạy ngang full card */}
          <Header />

          {/* THÂN: scroll trong khung, full width */}
          <div className="flex-1 overflow-hidden flex gap-6 p-6 md:p-8">
            {/* Nửa trái: Danh sách hộ khẩu + Nhân khẩu (scroll) */}
            <div className="flex-1 overflow-y-auto space-y-6">
              {/* Danh sách Nhân khẩu */}
              <div className="bg-gray-900 rounded-2xl shadow-xl p-8 border border-white/10">
                <h2 className="text-2xl font-semibold mb-6">
                  Danh sách Hộ khẩu
                </h2>

                <div className="overflow-x-auto">
                  <table className="w-full text-gray-200 border-collapse">
                    <thead>
                      <tr className="bg-gray-800 text-gray-300 uppercase text-sm">
                        <th className="p-3 text-left">Số hộ khẩu</th>
                        <th className="p-3 text-left">Họ tên chủ hộ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {household.map((nk) => (
                        <tr
                          key={nk.soHoKhau}
                          className={`border-b border-gray-700 hover:bg-gray-800/70 transition `}
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

            {/* Nửa phải: Khung cố định */}
            <div className="w-72 shrink-0 bg-gray-900 rounded-2xl shadow-xl p-6 border border-white/10 h-fit sticky top-0">
              <h2 className="text-2xl font-semibold mb-4">
                Thông tin chi tiết
              </h2>
              <div className="space-y-4 text-gray-300">
                <div>
                  <p className="text-sm text-gray-400">Số hộ khẩu</p>
                  <p className="font-medium">HK123456</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Chủ hộ</p>
                  <p className="font-medium">Nguyễn Văn A</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Địa chỉ</p>
                  <p className="font-medium">25 Tố Hữu, La Khê, Hà Đông</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
