import React from "react";
import { useCart } from "../../context/useCart";

export default function ProductInfo({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="product-info">
      <h2 className="product-name">{product.name || "상품명"}</h2>
      <p className="product-price">{product.price ? `${product.price.toLocaleString()}원` : "가격 정보 없음"}</p>
      <p className="product-desciption">{product.description}</p>
      <div className="product-button-wrapper">
        <button 
          className="add-to-cart-button"
          onClick={() => addToCart(product)} // ✅ 같은 상품 클릭하면 수량 증가
        >장바구니 담기</button>
        <button className="buy-now-button">바로 구매하기</button>
      </div>
    </div>
  );
}
