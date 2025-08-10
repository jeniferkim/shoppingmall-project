import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute () {
  const { isAuthenticated } = useAuth();

  // 로그인 안 되어 있으면 로그인 페이지로 리다이렉트
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};