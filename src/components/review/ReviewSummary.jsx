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
      <div className="rvw-summary_left">
        <div className="rvw-summary_avg">
          <span className="rvw-summary_avg-num">{(+stats.avg || 0).toFixed(1)}</span>
          <div className="rvw-summary_stars" aria-label={`평점 ${(+stats.avg || 0).toFixed(1)}`}>
            <StarRating value={((+stats.avg || 0) + 0.5) | 0} readOnly />
          </div>
          <div className="rvw-summary_count">{(stats.total || 0).toLocaleString()}개 리뷰</div>
        </div>

        <div className="rvw-summary_bars">
          {[5, 4, 3, 2, 1].map((r) => {
            const p = percent((stats.dist?.[r] || 0));
            return (
              <div className="rvw-bar" key={r}>
                <span className="rvw-bar_label">{r}</span>
                <div className="rvw-bar_track">
                  <div className="rvw-bar_fill" style={{ width: p + "%" }} />
                </div>
                <span className="rvw-bar_pct">{p}%</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rvw-summary_right">
        <div className="rvw-summary_note">사진 리뷰 {(stats.withPhotos || 0).toLocaleString()}개</div>
      </div>
    </section>
  );
}
