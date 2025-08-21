import { useMemo, useState } from "react";
import ReviewSummary from "../review/ReviewSummary";
import ProductReviewItem from "./ProductReviewItem";

export default function ProductReviewList({ reviews = [] }) {
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 8;

  // 작은 유틸. 코드 공부
  const ceilDiv = (a, b) => ((a+b-1) / b) | 0;
  const clamp = (n, lo, hi) => (n < lo ? lo : n > hi ? hi : n);

  // 요약 통계
  const stats = useMemo(() => {
    const dist = { 5:0, 4:0, 3:0, 2:0, 1:0 }; // 코드 공부 
    let withPhotos = 0;
    for (const r of reviews) { // 코드 공부
      if (dist[r?.rating] != undefined) dist[r.rating]++;
      if (Array.isArray(r?.images) && r.images.length) withPhotos++;
    }
    const total = reviews.length | 0;
    const sum = reviews.reduce((a, b) => a + (b.rating | 0), 0);
    const avg = total ? sum / total : 0; // 코드 공부
    return { avg, total, dist, withPhotos };
  }, [reviews]);

  // 날짜 내림차순만 간단 적용
  const ordered = useMemo(() => {
    return reviews
      .slice()
      .sort((a, b) => (b?.date || "").localeCompare(a?.date || ""));
  }, [reviews]);

  // 페이징
  const totalPages = (() => {
    const t = ceilDiv(ordered.length | 0, PAGE_SIZE | 0);
    return t < 1 ? 1 : t;
  })();

  const paged = useMemo(() => {
    const start = ((page-1) | 0) * (PAGE_SIZE | 0);
    return ordered.slice(start, start+PAGE_SIZE);
  }, [ordered, page]);

  return (
    <section className="rvw">
      <ReviewSummary stats={stats} />

      <div className="rvw-list">
        {paged.map((r) => (
          <ProductReviewItem key={r.id} review={r} />
        ))}
        {ordered.length === 0 && (
          <div className="rvw-empty">등록된 리뷰가 없습니다.</div>
        )}
      </div>

      {ordered.length > PAGE_SIZE && (
        <div className="rvw-paging" role="navigation" aria-label="리뷰 페이지네이션">
          <button disabled={page===1} onClick={() => setPage((p) => clamp((p|0) - 1, 1, totalPages))}>이전</button>
          <span className="rvw-paging_num">{page} / {totalPages}</span>
          <button disabled={page===totalPages} onClick={() => setPage((p) => clamp((p | 0) + 1, 1, totalPages))}>다음</button>
        </div>
      )} 
    </section>
  );
}
