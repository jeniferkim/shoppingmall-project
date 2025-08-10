// 백엔드가 JWT에 role을 담아주면 베스트(ROLE_ADMIN, ROLE_USER). 없다면 로그인 응답에 user.role을 함께 내려주게 해두세요.

/* eslint react-refresh/only-export-components: "off" */
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);

  // user는 안전 파싱 (문자열 "undefined"/"null" 들어왔을 때 방어)
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("user");
    if (!raw || raw === "undefined" || raw === "null") return null;
  try { return JSON.parse(raw); } catch { return null; }
  });

  const isAuthenticated = !!token;
  const role = user?.role || "GUEST";

  // 앱 처음 로드할 때 localStorage에서 토큰 불러오기
  // axios 인터셉터 : 토큰 자동첨부 + 401 자동로그아웃
  useEffect(() => {
    const reqId = axios.interceptors.request.use((config) => {
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
    const resId = axios.interceptors.response.use(
      (res) => res,
      (err) => {
        if (err?.response?.status === 401) {
          // 만료/무효 토큰이면 클라이언트 상태 초기화
          setToken(null);
          setUser(null);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
        return Promise.reject(err);
      }
    );
    return () => {
      axios.interceptors.request.eject(reqId);
      axios.interceptors.response.eject(resId);
    };
  }, [token]);

  // 로그인 시 상태/스토리지 동기화 (undefined 저장 방지)
  const login = (newToken, newUser) => {
    setToken(newToken ?? null);
    setUser(newUser ?? null);
    
    if (newToken) localStorage.setItem("token", newToken);
    else localStorage.removeItem("token");

    if (newUser) localStorage.setItem("user", JSON.stringify(newUser));
    else localStorage.removeItem("user");
  };

  const logout = () => {
    // (선택) 서버에 로그아웃 알림: await axios.post('/api/users/logout')
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login"; // 페이지 이동
  };

  const value = useMemo(() => (
    { token, user, role, isAuthenticated, login, logout }
  ), [token, user, role, isAuthenticated]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); // 경고 무시
