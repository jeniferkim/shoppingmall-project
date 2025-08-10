import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminRoute() {
  const { isAuthenticated, user } = useAuth();
  const role = user?.role ?? "GUEST";
  
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return role === "ADMIN" ? <Outlet /> : <Navigate to="/" replace />;
}
