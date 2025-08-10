import { useNavigate } from "react-router-dom";
import InputField from "../InputField";

import LogoImg from "../../assets/swicy_logo.png";
import LoginImg from "../../assets/login.png";
import LogoutImg from "../../assets/logout.png";
import CartImg from "../../assets/cart.png";


import { useAuth } from "../../context/AuthContext";

import '../../styles/product/ProductHeader.css';

  // ProductHeader에서 입력한 검색어를 ProductMainPage의 searchTerm 상태에 반영해야함
const ProductHeader = ({ onSearchChange }) => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    if (!window.confirm("로그아웃 하시겠습니까?")) return;

    if(typeof logout === "function") {
      logout(); // AuthContext에 정의된 정식 로그아웃
    } else {
      // 폴백(혹시 컨텍스트가 없을 때)
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  return (
    <header className="product-header">
      <div className="header-top">
        <div className="logo">
          <img 
            src={LogoImg} 
            alt="로고" 
            onClick={()=>navigate("/")}
            style={{cursor: "pointer"}}
          />
        </div>


        <div className="header-actions">
          <div className="header-search">
            <InputField 
              type="text" 
              placeholder="Search"
              onChange={(e) => onSearchChange(e.target.value)} 
            />
          </div>

          {isAuthenticated ? (
            <img
              src={LogoutImg}
              alt="로그아웃"
              onClick={handleLogout}
              style={{cursor: "pointer"}}
            />
          ) : (
            <img 
            src={LoginImg} 
            alt="로그인"
            onClick={()=>navigate("/login")} 
            style={{cursor: "pointer"}}
            /> 
          )
        }
          
          <img 
            src={CartImg} 
            alt="장바구니" 
            onClick={()=>navigate("/cart")}
            style={{cursor: "pointer"}}
          />
        </div>
      </div>


    </header>
  );
};

export default ProductHeader;

