import React from "react";
import "../../styles/cart/CartSummary.css";

const CartSummary = ({ totalPrice, onCheckout }) => {
  return (
    <div className="cart-summary">
      <h2>결제 요약</h2>
      <p>총 금액: <strong>{totalPrice.toLocaleString()}원</strong></p>
      <button className="checkout-btn" onClick={onCheckout}>결제하기</button>
    </div>
  );
};

export default CartSummary;
