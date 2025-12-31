import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import UserLayout from "../components/UserLayout";
import ResidentDetailModal from "../components/ResidentDetailModal";
import AddResidentModal from "../components/AddResidentModal";
import residentService from "../services/resident.service";
import householdService from "../services/household.service";

export default function UserMembers() {
  const { user } = useAuth();
  const [members, setMembers] = useState([]);
  const [selectedResident, setSelectedResident] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [household, setHousehold] = useState(null);

  // Check if user is household head - User role means they are household head
  const isHouseholdHead = user?.role === "User";

  useEffect(() => {
    fetchMembers();
  }, [user?.householdId, user?.fullName]);

  const handleAddResident = async (result) => {
    // Yêu cầu đã được gửi, chỉ cần refresh danh sách yêu cầu (nếu cần)
    // Hoặc có thể fetch lại danh sách nhân khẩu
    if (result && result.success) {
      // Yêu cầu đã được gửi thành công
      // Có thể hiển thị thông báo hoặc refresh
    }
  };

  const fetchMembers = async () => {
    try {
      setLoading(true);
      setError(null);

      if (user?.householdId) {
        const householdData = await householdService.getHouseholdByNumber(user.householdId);
        setHousehold(householdData);

        const residentsData = await residentService.getResidentsByHousehold(user.householdId);

        if (Array.isArray(residentsData)) {
          setMembers(residentsData);
        } else if (residentsData && Array.isArray(residentsData.data)) {
          setMembers(residentsData.data);
        } else if (residentsData && typeof residentsData === "object") {
          setMembers([residentsData]);
        }
      }
    } catch (err) {
      setError(err.message);
      console.error("Failed to fetch members:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDetail = (resident) => {
    setSelectedResident(resident);
    setIsDetailOpen(true);
  };

  return (
    <UserLayout
      title="Nhân khẩu trong hộ"
      subtitle="Danh sách các nhân khẩu thuộc hộ khẩu gắn với tài khoản hiện tại"
    >
      <div className="space-y-4">
        {/* Add button - show for all User role (household heads) */}
        {user?.role === "User" && !loading && (
          <div className="flex justify-end">
            <button
              onClick={() => setIsAddOpen(true)}
              className="px-4 py-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 font-medium transition flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Thêm nhân khẩu mới
            </button>
          </div>
        )}

        {loading && (
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">
            <div className="flex items-center gap-2">
              <div className="animate-spin h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
              Đang tải danh sách nhân khẩu...
            </div>
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            Lỗi: {error}
          </div>
        )}

        {!loading && members.length === 0 && (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
            Chưa tìm thấy nhân khẩu nào cho hộ khẩu{" "}
            <span className="font-semibold">{user?.householdId || user?.soHoKhau || "—"}</span>.
            {user?.role === "User" &&
              " Bạn có thể nhấn nút ở trên để thêm nhân khẩu mới."}
          </div>
        )}

        {!loading && members.length > 0 && (
          <div className="rounded-xl border border-gray-200 bg-white p-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-500 border-b border-gray-200">
                  <th className="text-left py-2 font-medium">Họ tên</th>
                  <th className="text-left py-2 font-medium">CCCD</th>
                  <th className="text-left py-2 font-medium hidden sm:table-cell">
                    Ngày sinh
                  </th>
                  <th className="text-left py-2 font-medium hidden sm:table-cell">
                    Nghề nghiệp
                  </th>
                  <th className="text-left py-2 font-medium">Loại cư trú</th>
                </tr>
              </thead>
              <tbody>
                {members.map((m) => (
                  <tr
                    key={m.maNhanKhau || m.id}
                    className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleOpenDetail(m)}
                  >
                    <td className="py-2 text-gray-900">{m.hoTen || m.name}</td>
                    <td className="py-2 text-gray-700">
                      {m.soCCCD || m.cccd || "—"}
                    </td>
                    <td className="py-2 text-gray-600 hidden sm:table-cell">
                      {m.ngaySinh || m.birthDate || "—"}
                    </td>
                    <td className="py-2 text-gray-600 hidden sm:table-cell">
                      {m.ngheNghiep || m.occupation || "—"}
                    </td>
                    <td className="py-2">
                      <span className="px-2 py-0.5 rounded-full text-xs bg-blue-100 text-blue-700 border border-blue-300">
                        {m.loaiCuTru === "Thường trú" ||
                        m.residenceType === "thuong-tru"
                          ? "Thường trú"
                          : m.loaiCuTru === "Tạm trú" ||
                            m.residenceType === "tam-tru"
                          ? "Tạm trú"
                          : "Khác"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modals */}
        <ResidentDetailModal
          resident={selectedResident}
          isOpen={isDetailOpen}
          onClose={() => {
            setIsDetailOpen(false);
            setSelectedResident(null);
          }}
          onUpdate={() => {
            // Refresh danh sách nhân khẩu
            fetchMembers();
          }}
          onDelete={() => {
            // Refresh danh sách nhân khẩu
            fetchMembers();
          }}
        />
        <AddResidentModal
          householdId={user?.householdId}
          isOpen={isAddOpen}
          onClose={() => setIsAddOpen(false)}
          onAdd={handleAddResident}
        />
      </div>
    </UserLayout>
  );
}
