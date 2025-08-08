// 전역 상태를 제공 (CartItems, addToCart 등)
// 장바구니 상태를 확인, Context로 전역 전달하는 최상단공급자

import { useState, useEffect } from "react";
import { CartContext } from "./CartContext";

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // ✅ 앱 시작 시 localStorage에서 불러오기
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // ✅ cartItems 변경될 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // ✅ 장바구니 추가 (같은 상품이면 수량 증가)
  const addToCart = (product) => {
    setCartItems((prev) => {
        const existingItem = prev.find((item) => item.id === product.id);
        if (existingItem) {
            // 수량 증가
            return prev.map((item) =>
            item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
        } else {
            // 새 상품 추가
            return [...prev, { ...product, quantity: product.quantity || 1 }]; // 외부에서 quantity가 없는 product를 넘겨줄 수도 있으니까?
        }
    });
  };

  // ✅ 수량 변경
  const updateQuantity = (id, newQuantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: newQuantity < 1 ? 1 : newQuantity }
          : item
      )
    );
  };

  // ✅ 삭제
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider 
        value={{ cartItems, addToCart, updateQuantity, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};