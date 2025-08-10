import { useAuth } from "../context/AuthContext";

export default function LogoutButton({ className }) {
  const { logout } = useAuth();
  const handleClick = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) logout();
  };
  return (
    <button className={className} onClick={handleClick}>
      로그아웃
    </button>
  );
}
