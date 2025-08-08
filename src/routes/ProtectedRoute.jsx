// src/routes/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  // 로그인 안 되어 있으면 로그인 페이지로 리다이렉트
  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
