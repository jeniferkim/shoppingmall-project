// src/components/product/ProductReviewItem.jsx
import { useState } from "react";
import StarRating from "../review/StarRating"; // 네가 만든 아이콘별 컴포넌트
import "../../styles/review/review.css";

export default function ProductReviewItem({ review }) {
  const [expanded, setExpanded] = useState(false);
  const MAX = 140;

  const text =
    !expanded && review.content && review.content.length > MAX
      ? review.content.slice(0, MAX) + "..."
      : review.content;

  return (
    <article className="review-item card">
      <header className="review-item__header">
        <StarRating value={review.rating} />
        <span className="review-item__meta">
          {review.author || "익명"} · {review.date?.slice(0, 10)}
        </span>
        {review.option && <span className="review-item__tag">{review.option}</span>}
      </header>

      <p className="review-item__content">
        {text}
        {review.content?.length > MAX && (
          <button className="link-button" onClick={() => setExpanded((v) => !v)}>
            {expanded ? "접기" : "더보기"}
          </button>
        )}
      </p>

      {review.images?.length > 0 && (
        <div className="review-item__images">
          {review.images.map((src, i) => (
            <img key={i} src={src} alt={`리뷰 이미지 ${i + 1}`} loading="lazy" />
          ))}
        </div>
      )}
    </article>
  );
}
