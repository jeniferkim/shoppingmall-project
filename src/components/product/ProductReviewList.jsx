// src/components/product/ProductReviewList.jsx
import { useMemo, useState } from "react";
import ProductReviewItem from "./ProductReviewItem";
import StarRating from "../review/StarRating";
import "../../styles/review/review.css";

function DistBar({ label, value, total, onClick, active }) {
  const pct = total ? Math.round((value / total) * 100) : 0;
  return (
    <button className={`dist ${active ? "active" : ""}`} onClick={onClick}>
      <span className="dist__label">{label}</span>
      <span className="dist__bar">
        <span className="dist__bar__fill" style={{ width: `${pct}%` }} />
      </span>
      <span className="dist__pct">{pct}%</span>
    </button>
  );
}

/** 상단 사진 스트립 */
function ReviewPhotoStrip({ photos, onOpen }) {
  if (!photos.length) return null;

  const top = photos.slice(0, 5);
  const rest = photos.length - top.length;

  return (
    <div className="photo-strip card">
      <div className="photo-strip__title">리뷰 사진</div>
      <div className="photo-strip__row">
        {top.map((p, i) => {
          const isLast = i === top.length - 1 && rest > 0;
          return (
            <button
              key={`${p.rid}-${p.idx}`}
              className={`photo-tile ${isLast ? "more" : ""}`}
              onClick={() => onOpen(i)}
              aria-label="리뷰 사진 보기"
            >
              <img src={p.src} alt={`리뷰 사진 ${i + 1}`} loading="lazy" />
              {isLast && (
                <span className="photo-tile__more">
                  더보기<br />+{rest}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** 아주 심플한 라이트박스(모달) */
function Lightbox({ open, photos, index, onClose, onPrev, onNext }) {
  if (!open) return null;
  const cur = photos[index];
  return (
    <div className="lightbox" onClick={onClose}>
      <div className="lightbox__inner" onClick={(e) => e.stopPropagation()}>
        <img src={cur?.src} alt="리뷰 큰 이미지" />
        <div className="lightbox__ctrl">
          <button onClick={onPrev} aria-label="이전">‹</button>
          <span>{index + 1}/{photos.length}</span>
          <button onClick={onNext} aria-label="다음">›</button>
        </div>
        <button className="lightbox__close" onClick={onClose} aria-label="닫기">✕</button>
      </div>
    </div>
  );
}

export default function ProductReviewList({ reviews = [] }) {
  const [sort, setSort] = useState("recent");
  const [filter, setFilter] = useState(0);
  const [query, setQuery] = useState("");

  // 사진 모달 상태
  const [lbOpen, setLbOpen] = useState(false);
  const [lbIndex, setLbIndex] = useState(0);

  const summary = useMemo(() => {
    if (!reviews.length) return { avg: 0, counts: [0, 0, 0, 0, 0], total: 0 };
    const counts = [0, 0, 0, 0, 0];
    let sum = 0;
    reviews.forEach((r) => {
      const rating = Number(r.rating ?? 0);
      sum += rating;
      const v = Math.max(1, Math.min(5, Math.round(rating)));
      counts[5 - v] += 1;
    });
    return {
      avg: Math.round((sum / reviews.length) * 10) / 10,
      counts,
      total: reviews.length,
    };
  }, [reviews]);

  // 상단 사진 스트립용 사진 풀(flat)
  const photos = useMemo(() => {
    const arr = [];
    reviews.forEach((r) => {
      (r.images || []).forEach((src, idx) => {
        arr.push({ src, rid: r.id, idx });
      });
    });
    return arr;
  }, [reviews]);

  const filtered = useMemo(() => {
    let arr = [...reviews];
    if (filter > 0) arr = arr.filter((r) => Math.round(r.rating) === filter);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      arr = arr.filter(
        (r) =>
          (r.content || "").toLowerCase().includes(q) ||
          (r.author || "").toLowerCase().includes(q)
      );
    }
    if (sort === "high") arr.sort((a, b) => b.rating - a.rating);
    else if (sort === "low") arr.sort((a, b) => a.rating - b.rating);
    else arr.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
    return arr;
  }, [reviews, sort, filter, query]);

  const openLightbox = (i) => {
    setLbIndex(i);
    setLbOpen(true);
  };

  return (
    <section className="review">
      {/* 1. 사진 스트립 */}
      <ReviewPhotoStrip photos={photos} onOpen={openLightbox} />
      <Lightbox
        open={lbOpen}
        photos={photos}
        index={lbIndex}
        onClose={() => setLbOpen(false)}
        onPrev={() => setLbIndex((i) => (i - 1 + photos.length) % photos.length)}
        onNext={() => setLbIndex((i) => (i + 1) % photos.length)}
      />

      {/* 2. 요약/분포 */}
      <div className="review__summary card">
        <div className="summary__left">
          <div className="summary__avg">
            <span className="summary__num">{summary.avg}</span>
            <span className="summary__total">/ 5</span>
          </div>
          <StarRating value={summary.avg} size={20} />
          <div className="summary__count">리뷰 {summary.total}개</div>
        </div>

        <div className="summary__dist">
          {[5, 4, 3, 2, 1].map((score, idx) => (
            <DistBar
              key={score}
              label={`${score}점`}
              value={summary.counts[idx]}
              total={summary.total}
              active={filter === score}
              onClick={() => setFilter(score === filter ? 0 : score)}
            />
          ))}
        </div>

        <div className="summary__actions">
          <div className="field">
            <input
              className="input"
              placeholder="후기 검색 (키워드, 작성자)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="segmented">
            <button
              className={`seg ${sort === "recent" ? "active" : ""}`}
              onClick={() => setSort("recent")}
            >
              최신순
            </button>
            <button
              className={`seg ${sort === "high" ? "active" : ""}`}
              onClick={() => setSort("high")}
            >
              별점 높은순
            </button>
            <button
              className={`seg ${sort === "low" ? "active" : ""}`}
              onClick={() => setSort("low")}
            >
              별점 낮은순
            </button>
          </div>
        </div>
      </div>

      {/* 3. 리스트 */}
      <div className="review__list">
        {filtered.length === 0 ? (
          <div className="empty card">조건에 맞는 후기가 없습니다.</div>
        ) : (
          filtered.map((r) => <ProductReviewItem key={r.id} review={r} />)
        )}
      </div>
    </section>
  );

}
