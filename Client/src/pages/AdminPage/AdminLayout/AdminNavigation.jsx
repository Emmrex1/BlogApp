// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate, NavLink } from "react-router-dom";
// import { logoutAdmin } from "@/redux/features/auth/AdminAuthSlice";
// import AdminImg from "../../../assets/logo/commentIcon.png";
// import ConfirmLogoutModal from "@/share/common/ConfirmLogoutModal";


// const AdminNavigation = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [showModal, setShowModal] = useState(false);

//   const handleLogout = () => {
//     dispatch(logoutAdmin());
//     navigate("/admin-login");
//   };

//   return (
//     <div className="space-y-5 bg-white p-8 md:h-[calc(100vh-98px)] flex flex-col justify-between">
//       <div>
//         <div className="mb-5">
//           <img src={AdminImg} alt="Admin Logo" className="size-14" />
//           <p className="font-semibold">Admin</p>
//         </div>
//         <hr />
//         <ul className="space-y-5 pt-5">
//           <li>
//             <NavLink
//               to="dashboard"
//               end
//               className={({ isActive }) =>
//                 isActive ? "text-blue-600 font-bold" : "text-black"
//               }
//             >
//               Dashboard
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/emmrexadmin/add-new-post"
//               className={({ isActive }) =>
//                 isActive ? "text-blue-600 font-bold" : "text-black"
//               }
//             >
//               Add New Post
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/emmrexadmin/manage-items"
//               className={({ isActive }) =>
//                 isActive ? "text-blue-600 font-bold" : "text-black"
//               }
//             >
//               Manage Items
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/emmrexadmin/users"
//               className={({ isActive }) =>
//                 isActive ? "text-blue-600 font-bold" : "text-black"
//               }
//             >
//               Users
//             </NavLink>
//           </li>
//         </ul>
//       </div>

//       <div className="mb-3">
//         <hr className="mb-3" />
//         <button
//           onClick={() => setShowModal(true)}
//           className="text-white bg-red-500 font-medium px-5 py-1 rounded-sm"
//         >
//           Logout
//         </button>
//       </div>

//       <ConfirmLogoutModal
//         isOpen={showModal}
//         onCancel={() => setShowModal(false)}
//         onConfirm={handleLogout}
//       />
//     </div>
//   );
// };

// export default AdminNavigation;

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { logoutAdmin } from "@/redux/features/auth/AdminAuthSlice";
// import { ConfirmLogoutModal } from "@/share/common/ConfirmLogoutModal";
import AdminImg from "../../../assets/logo/commentIcon.png";

import {
  LayoutDashboard,
  FilePlus,
  FileText,
  Users,
  LogOut,
} from "lucide-react";
import ConfirmLogoutModal from "@/share/common/ConfirmLogoutModal";

const navItems = [
  { to: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
  {
    to: "/emmrexadmin/add-new-post",
    label: "Add New Post",
    icon: <FilePlus size={18} />,
  },
  {
    to: "/emmrexadmin/manage-items",
    label: "Manage Items",
    icon: <FileText size={18} />,
  },
  { to: "/emmrexadmin/users", label: "Users", icon: <Users size={18} /> },
];

const AdminNavigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    dispatch(logoutAdmin());
    navigate("/admin-login");
  };

  return (
    <div className="h-full p-6 flex flex-col justify-between">
      {/* Top Section */}
      <div>
        <div className="mb-6 flex items-center gap-3">
          <img src={AdminImg} alt="Admin Logo" className="w-10 h-10" />
          <p className="font-bold text-xl">Admin</p>
        </div>

        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-md transition ${
                    isActive
                      ? "bg-blue-100 text-blue-600 font-semibold"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Logout Section */}
      <div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

      {/* Confirmation Modal */}
      <ConfirmLogoutModal
        isOpen={showModal}
        onCancel={() => setShowModal(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
};

export default AdminNavigation;
