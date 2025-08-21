import StarRating from "./StarRating";

export default function ReviewSummary({ stats }) {
  const percent = (n) => {
    const total = stats.total | 0;
    const nn = n | 0;
    if (!total) return 0;
    // floor((n*100 + total/2) / total)  == 반올림
    return ((nn * 100 + (total >> 1)) / total) | 0;
  };

  return (
    <section className="rvw-summary">
      <div className="rvw-summary__left">
        <div className="rvw-summary__avg">
          <span className="rvw-summary__avg-num">{(+stats.avg || 0).toFixed(1)}</span>
          <div className="rvw-summary__stars" aria-label={`평점 ${(+stats.avg || 0).toFixed(1)}`}>
            <StarRating value={((+stats.avg || 0) + 0.5) | 0} readOnly />
          </div>
          <div className="rvw-summary__count">{(stats.total || 0).toLocaleString()}개 리뷰</div>
        </div>

        <div className="rvw-summary__bars">
          {[5, 4, 3, 2, 1].map((r) => {
            const p = percent((stats.dist?.[r] || 0));
            return (
              <div className="rvw-bar" key={r}>
                <span className="rvw-bar__label">{r}</span>
                <div className="rvw-bar__track">
                  <div className="rvw-bar__fill" style={{ width: p + "%" }} />
                </div>
                <span className="rvw-bar__pct">{p}%</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rvw-summary__right">
        <div className="rvw-summary__note">사진 리뷰 {(stats.withPhotos || 0).toLocaleString()}개</div>
      </div>
    </section>
  );
}
