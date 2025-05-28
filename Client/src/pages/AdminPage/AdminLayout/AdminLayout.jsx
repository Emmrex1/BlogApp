import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import AdminNavigation from "./AdminNavigation";
import { useSelector } from "react-redux";

const AdminLayout = () => {
  const { user, loading, error } = useSelector((state) => state.auth);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-medium">Checking admin access...</p>
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return <Navigate to="/login" />;
  }

  if (error) {
    return (
      <div className="text-red-600 p-8">
        <p>Error verifying user. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto flex flex-col md:flex-row gap-4 items-start justify-start min-h-screen">
      <header className="lg:w-1/5 sm:w-2/5 w-full">
        <AdminNavigation />
      </header>

      <main className="p-8 bg-white w-full shadow rounded-md">
       
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
