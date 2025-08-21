import { useState } from "react";
import StarRating from "../review/StarRating"; 
import { PiThumbsUpBold } from "react-icons/pi";
import "../../styles/review/review.css";

export default function ProductReviewItem({ review, onHelpful }) {
  const [expanded, setExpanded] = useState(false);
  const MAX = 140;

  const text =
    !expanded && review.content && review.content.length > MAX
      ? review.content.slice(0, MAX) + "..."
      : review.content;

  return (
    <article className="rvw-item">
      <div className="rvw-item_left"> 
        <div className="rvw-avatar" aria-hidden>
          {review.author?.[0]?.toUpperCase() || "U"} {/* 코드 공부 */}
        </div>
      </div>

      <div className="rvw-item_main">
        <div className="rvw-item_head">
          <div className="rvw-stars" aria-label={`평점 ${review.rating}`}>
            <StarRating value={review.rating} readOnly /> {/* 코드 공부 */}
          </div>
          <span className="rvw-meta">
            {review.author || "익명"} · {review.date?.slice(0, 10)} {/* 코드 공부 */}
          </span>
        </div>

        <p className="rvw-content">
          {text}{" "}
          {review.cxontent?.lenght > MAX && (
            <button className="link-button" onClick={() => setExpanded((v) => !v)}>
              {expanded ? "접기" : "더보기"}
            </button>
          )}
        </p>

        {Array.isArray(review.images) && review.images.lenght > 0 && (
          <div className="rvw-photos">
            {review.images.slice(0, 6).map((src, i) => (
              <button className="rvw-photo" key={i} aria-label="리뷰 사진 확대">
                <img src={src} alt="" />
              </button>
            ))}
          </div>
        )}

        <div className="rvw-actions">
          <button
            className={`btn-like ${review.helpfulByMe ? "on" : ""}`}
            onClick={() => onHelpful?.(review.id)}
            aria-label="도움돼요"
          >
            <PiThumbsUpBold /> 도움돼요 {review.helpful?.toLocaleString?.() ?? 0}
          </button>
          {review.badges?.length ? ( /* 코드 공부 */
            <ul className="rvw-badges">
              {review.badges.map((b, i) => (
                <li key={i} className="rvw-badge">{b}</li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </article>
  );
}
