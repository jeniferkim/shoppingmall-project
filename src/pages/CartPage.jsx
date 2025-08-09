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

  const lineTotal = (item) => item.price * item.quantity;
  const totalPrice = cartItems.reduce((acc, item) => acc + lineTotal(item), 0);

  const handleCheckout = () => {
    alert("결제를 진행합니다!");
  };

  return (
    <>
    <ProductHeader />
    <div className="cart-page">
      <h1 className="cart-title">Shopping Cart</h1>

      <div className="cart-container"> {/* 좌우 2단 레이아웃 -> 목록 / 결제 */}
        {/* Left: Cart Items */}
        <div className="cart-items">
          {/* 헤더 */}
            <div className="cart-grid cart-header">
              <span>Product</span>
              <span>Quantity</span>
              <span>Total Price</span>
            </div>

            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={item.id} className="cart-grid cart-row">
                  {/* Product cell */}
                  <div className="product-cell">
                    <img
                      className="thumb"
                      src={item.imageUrl || item.image}
                      alt={item.name}
                    />
                    <div className="info">
                      <div className="name">{item.name}</div>
                      {item.option && <div className="meta">{item.option}</div>}
                    </div>
                  </div>

                  {/* Quantity cell */}
                  <div className="qty-cell">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, Math.max(1, item.quantity - 1))
                      }
                    >
                      −
                    </button>
                    <span className="qty">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>

                  {/* Price cell */}
                  <div className="price-cell">
                    <span>{lineTotal(item).toLocaleString()}원</span>
                    <button
                      className="remove"
                      aria-label="remove item"
                      onClick={() => removeFromCart(item.id)}
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty">장바구니가 비어 있어요.</div>
            )}
        </div>

        {/*Right: Summary / Payment Info */}
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
