import { useNavigate } from "react-router-dom";
import InputField from "../InputField";

import LogoImg from "../../assets/swicy_logo.png";
import LoginImg from "../../assets/login.png";
import CartImg from "../../assets/cart.png";

import '../../styles/product/ProductHeader.css';

  // ProductHeader에서 입력한 검색어를 ProductMainPage의 searchTerm 상태에 반영해야함
const ProductHeader = ({ onSearchChange }) => {
  const navigate = useNavigate();

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

          <img 
            src={LoginImg} 
            alt="로그인"
            onClick={()=>navigate("/login")} 
            style={{cursor: "pointer"}}
          /> 
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

