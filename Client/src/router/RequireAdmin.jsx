// src/components/admin/RequireAdmin.jsx
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const RequireAdmin = ({ children }) => {
  const { admin, token } = useSelector((state) => state.adminAuth);
  const location = useLocation();

  if (!admin || !token) {
    return <Navigate to="/admin-login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAdmin;
