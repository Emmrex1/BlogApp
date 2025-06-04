import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminNavigation from "./AdminNavigation";
import AdminTopbar from "../Topbar/AdminTopbar";


const AdminLayout = () => {
  const { admin, token } = useSelector((state) => state.adminAuth);

  if (!admin || admin.role !== "admin" || !token) {
    return <Navigate to="/admin-login" />;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-full sm:w-2/5 md:w-1/4 lg:w-1/5 bg-white border-r">
        <AdminNavigation />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <AdminTopbar />

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
