import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const GuestOnlyRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.token);
  return token ? <Navigate to="/" replace /> : children;
};

export default GuestOnlyRoute;
