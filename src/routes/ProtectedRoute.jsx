// ProtectedRoute의 원리
// 로그인이나 권한 체크 후, 조건에 따라 접근을 허용 / 다른 페이지로 리다이렉트
// 1. Outlet 기반 패턴 2. children 기반 패턴
// Outlet은 "여기에 자식 라우트 넣어!" 라는 자리 표시


import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute () {
  const { isAuthenticated } = useAuth();

  // 로그인 안 되어 있으면 로그인 페이지로 리다이렉트
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};