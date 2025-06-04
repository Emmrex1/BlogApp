import { useDispatch } from "react-redux";
import { logoutAdmin } from "@/redux/features/auth/AdminAuthSlice";
import { useNavigate } from "react-router-dom";
import { LogOut, UserCircle2 } from "lucide-react";
import { useState } from "react";
import ConfirmLogoutModal from "@/share/common/ConfirmLogoutModal";

const AdminTopbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    dispatch(logoutAdmin());
    navigate("/admin-login");
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white shadow-sm border-b">
      <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>

      <div className="flex items-center gap-4">
        <UserCircle2 className="w-6 h-6 text-gray-600" />
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1 text-sm text-red-500 hover:underline"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>

      <ConfirmLogoutModal
        isOpen={showModal}
        onCancel={() => setShowModal(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
};

export default AdminTopbar;
