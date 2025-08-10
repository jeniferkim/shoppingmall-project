// src/components/product/ProductReviewList.jsx
import { useMemo, useState } from "react";
import ProductReviewItem from "./ProductReviewItem";
import StarRating from "../review/StarRating";
import "../../styles/review/review.css";

function DistBar({ label, value, total, onClick }) {
  const pct = total ? Math.round((value / total) * 100) : 0;
  return (
    <button className="dist" onClick={onClick}>
      <span className="dist__label">{label}</span>
      <span className="dist__bar">
        <span className="dist__bar__fill" style={{ width: `${pct}%` }} />
      </span>
      <span className="dist__pct">{pct}%</span>
    </button>
  );
}

export default function ProductReviewList({ reviews = [] }) {
  const [sort, setSort] = useState("recent");
  const [filter, setFilter] = useState(0);
  const [query, setQuery] = useState("");

  const summary = useMemo(() => {
    if (!reviews.length) return { avg: 0, counts: [0, 0, 0, 0, 0], total: 0 };
    const counts = [0, 0, 0, 0, 0];
    let sum = 0;
    reviews.forEach((r) => {
      const v = Math.round(r.rating ?? 0);
      sum += r.rating ?? 0;
      const idx = Math.max(1, Math.min(5, v));
      counts[5 - idx] += 1;
    });
    return {
      avg: Math.round((sum / reviews.length) * 10) / 10,
      counts,
      total: reviews.length,
    };
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

  return (
    <section className="review">
      <div className="review__summary card">
        <div className="summary__left">
          <div className="summary__avg">
            <span className="summary__num">{summary.avg}</span>
            <span className="summary__total">/ 5</span>
          </div>
          <StarRating value={summary.avg} size={20} />
          <div className="summary__count">{summary.total}개의 후기</div>
        </div>

        <div className="summary__dist">
          {[5, 4, 3, 2, 1].map((score, idx) => (
            <DistBar
              key={score}
              label={`${score}점`}
              value={summary.counts[idx]}
              total={summary.total}
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
