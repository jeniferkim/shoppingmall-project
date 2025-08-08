// 장바구니 페이지 전체 UI
// CartItem을 여러 개 렌더링 + 합계 금액 + 결제 버튼 표시
// cartItems.map() 으로 CartUtem 여러 개 렌더링


import React from "react";
import CartItem from "../components/cart/CartItem";
import ProductHeader from "../components/product/ProductHeader";
import "../styles/cart/CartPage.css";
import { useCart } from "../context/useCart";

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    alert("결제를 진행합니다!");
  };

  return (
    <>
    <ProductHeader />
    <div className="cart-page">

      <h1 className="cart-title">Shopping Cart</h1>
      <div className="cart-container">
        {/* Left: Cart Items */}
        <div className="cart-items">
          {cartItems.length > 0 ? (
            <>
            {/* 테이블 헤더 */}
            <div className="cart-header">
              <span className="header-product">Product</span>
              <span className="header-quantity">Quantity</span>
              <span className="header-total">Total Price</span>
            </div>
            {/* 장바구니 아이템 */}
            {cartItems.map(item => (
              <CartItem
                key={item.id}
                item={item}
                onQuantityChange={updateQuantity} // Context 함수 사용
                onRemove={removeFromCart} // Context 함수 사용
            />
            ))}
          </>
          ) : (
            <p className="empty-text">장바구니가 비어 있습니다.</p>
          )}
        </div>

        {/* Right: Summary / Payment Info */}
        <div className="cart-summary">
          <h2>결제 수단</h2>
          <div className="payment-method">
            <label>
              <input type="radio" name="payment" defaultChecked /> 신용/체크카드
            </label>
            <label>
              <input type="radio" name="payment" /> 토스페이
            </label>
            <label>
              <input type="radio" name="payment" /> 카카오페이
            </label>
          </div>

          <div className="payment-detail">
            <input type="text" placeholder="Name on Card" />
            <input type="text" placeholder="Card Number" />
            <div className="card-row">
              <input type="text" placeholder="MM/YY" />
              <input type="text" placeholder="CVV" />
            </div>
          </div>

          <div className="summary-total">
            <p>상품 금액: <span>{totalPrice.toLocaleString()}원</span></p>
            <p>배송비: <span>Free</span></p>
            <h3>결제 금액: {totalPrice.toLocaleString()}원</h3>
          </div>

          <button className="checkout-btn" onClick={handleCheckout}>
            결제하기
          </button>
        </div>
      </div>
    </div>
  </>
  );
};

export default CartPage;
