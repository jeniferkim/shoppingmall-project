// /components/product/ProductList.jsx 에서 쓰임
// 상품 카드 컴포넌트

import '../../styles/product/ProductCard.css';

export default function ProductCard({ product }) {
  const { imageUrl, name, price, discountRate } = product; // id 잠깐 지움

  // 할인 가격 계산
  const discountedPrice = discountRate
    ? Math.floor(price * (1 - discountRate / 100))
    : price;

  return (
    <div className="product-card">
      <img src={imageUrl} alt={name} className="product-image" />

      <div className="product-info">
        <h3 className="product-name">{name}</h3>

        {discountRate ? (
          <div className="product-price">
            <span className="original-price">{price.toLocaleString()}원</span>
            <span className="discounted-price">
              {discountedPrice.toLocaleString()}원
            </span>
            <span className="discount-rate">{discountRate}%</span>
          </div>
        ) : (
          <div className="product-price">
            <span className="discounted-price">{price.toLocaleString()}원</span>
          </div>
        )}
      </div>
    </div>
  );
}
