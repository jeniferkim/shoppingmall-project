import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../styles/admin/admin.css";

export default function AdminLayout(){
  const { user, logout } = useAuth();
  const loc = useLocation();
  const nav = useNavigate();

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">SWICY Admin</div>
        <nav className="admin-nav">
          <NavLink to="/admin" end className={({isActive})=>`admin-link ${isActive?'active':''}`}>
            <span>대시보드</span>
          </NavLink>
          <NavLink to="/admin/products" className={({isActive})=>`admin-link ${isActive?'active':''}`}>
            <span>상품관리</span>
          </NavLink>
          {/* <NavLink to="/admin/orders" className={({isActive})=>`admin-link ${isActive?'active':''}`}><span>주문관리</span></NavLink> */}
          {/* <NavLink to="/admin/users" className={({isActive})=>`admin-link ${isActive?'active':''}`}><span>회원관리</span></NavLink> */}
        </nav>
      </aside>

      <div className="admin-main">
        <div className="admin-topbar">
          <div className="left">
            <strong>{getTitle(loc.pathname)}</strong>
          </div>
          <div className="right">
            <span className="badge">{user?.name ?? "관리자"}</span>
            <button className="btn-ghost" onClick={()=>nav("/")}>스토어로 이동</button>
            <button className="btn-outline" onClick={logout}>로그아웃</button>
          </div>
        </div>

        <div style={{overflow:"auto"}}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

function getTitle(path){
  if (path.startsWith("/admin/products")) return "상품관리";
  return "대시보드";
}
