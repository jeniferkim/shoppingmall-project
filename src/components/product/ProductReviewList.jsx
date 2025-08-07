import {useEffect} from "react";

function ProductReviewList({ productId }) {
  // 샘플 리뷰
  const reviews = [
    { id: 1, author: "홍길동", content: "정말 좋은 상품이에요!" },
    { id: 2, author: "김철수", content: "가격 대비 만족스럽습니다." },
  ];

  useEffect(() => {
    console.log("현재 상품 ID:", productId);
    // 나중에 axios로 이 productId에 맞는 리뷰 API 요청 가능
  }, [productId]);

  return (
    <div className="product-review-list">
      {reviews.map((review) => (
        <div key={review.id} className="review-item">
          <strong>{review.author}</strong>
          <p>{review.content}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductReviewList;