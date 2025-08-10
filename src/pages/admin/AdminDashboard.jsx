export default function AdminDashboard(){
  return (
    <>
      <section className="kpis">
        <div className="card">
          <div className="label">오늘 주문</div>
          <div className="value">42건</div>
          <div className="sub">어제보다 +8%</div>
        </div>
        <div className="card">
          <div className="label">오늘 매출</div>
          <div className="value">₩ 1,280,000</div>
          <div className="sub">어제보다 +5%</div>
        </div>
        <div className="card">
          <div className="label">재고 경고</div>
          <div className="value">7개</div>
          <div className="sub">50개 이하</div>
        </div>
        <div className="card">
          <div className="label">신규 리뷰</div>
          <div className="value">18건</div>
          <div className="sub">미응답 5건</div>
        </div>
      </section>
    </>
  );
}
