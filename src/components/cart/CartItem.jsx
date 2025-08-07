// 장바구니에 들어있는 "상품 1개"를 화면에 보여주는 ""컴포넌트""
// props로 {item, onQuantityChange, onRemove} 받아서 렌더링
// 받은 item을 어떻게 보여줄지 !!

import React from "react";
import "../../styles/cart/CartItem.css";


const CartItem = ({ item, onQuantityChange, onRemove }) => {
  return (
    <div className="cart-item">
      {/* 이미지 */}
      <div className="cart-item-image">
        <img 
          src={item.imageUrl} // Key 이름 오류 = 완벽하게 재현된 문제
          alt={item.name} 
        />
      </div>

      {/* 상품명 */}
      <div className="cart-item-name">{item.name}</div>

      {/* 수량 */}
      <div className="cart-item-quantity">
        <button onClick={() => onQuantityChange(item.id, item.quantity - 1)}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => onQuantityChange(item.id, item.quantity + 1)}>+</button>
      </div>

      {/* 가격 */}
      <div className="cart-item-price">
        {(item.price * item.quantity).toLocaleString()}원
      </div>

      {/* 삭제 버튼 */}
      <div className="cart-item-remove">
        <button onClick={() => onRemove(item.id)}>×</button>
      </div>
    </div>
  );
};

export default CartItem;
