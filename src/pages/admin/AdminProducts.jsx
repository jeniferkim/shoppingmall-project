import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { sampleProducts } from "../../data/products";

export default function AdminProducts(){
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const fetchList = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/admin/products");
      setRows(data);
    } catch (e) {
      // 폴백: 샘플 데이터
      setRows(
        (sampleProducts ?? []).map(p => ({
          id: p.id, name: p.name, price: p.price, stock: p.stock ?? 0,
          thumbnailUrl: p.imageUrl ?? p.thumbnailUrl, description: p.description ?? ""
        }))
      );
    } finally {
      setLoading(false);
      setPage(1);
    }
  };

  useEffect(()=>{ fetchList(); }, []);

  const filtered = useMemo(()=> {
    const s = q.trim().toLowerCase();
    if (!s) return rows;
    return rows.filter(p =>
      String(p.id).includes(s) ||
      (p.name ?? "").toLowerCase().includes(s)
    );
  }, [rows, q]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageRows = filtered.slice((page-1)*pageSize, page*pageSize);

  const handleDelete = async (id) => {
    if (!window.confirm("이 상품을 삭제할까요?")) return;
    try {
      await axios.delete(`/api/admin/products/${id}`);
      fetchList();
    } catch {
      alert("삭제 API 호출에 실패했습니다.");
    }
  };

  return (
    <>
      <div className="toolbar">
        <div style={{display:"flex", gap:10, alignItems:"center"}}>
          <input className="input" placeholder="상품명/ID 검색" value={q} onChange={e=>{setQ(e.target.value); setPage(1);}} />
        </div>
        <div style={{display:"flex", gap:8}}>
          <a className="btn" href="/admin/products/new">상품 등록</a>
          <button className="btn-outline" onClick={fetchList}>새로고침</button>
        </div>
      </div>

      <div className="table-wrap">
        {loading ? (
          <div style={{padding:20, display:"grid", gap:8}}>
            <div className="skeleton"></div>
            <div className="skeleton"></div>
            <div className="skeleton"></div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="empty">
            <div style={{fontSize:"1.1rem"}}>표시할 상품이 없습니다.</div>
            <div>검색어를 바꾸거나 상품을 등록해 보세요.</div>
            <a className="btn" href="/admin/products/new">상품 등록</a>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th style={{width:80}}>ID</th>
                <th style={{width:72}}>이미지</th>
                <th>상품명</th>
                <th style={{width:140}}>가격</th>
                <th style={{width:100}}>재고</th>
                <th style={{width:160}}>작업</th>
              </tr>
            </thead>
            <tbody>
              {pageRows.map(p=>(
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>
                    {p.thumbnailUrl ? (
                      <img src={p.thumbnailUrl} alt="" style={{width:48,height:48,objectFit:"cover",borderRadius:8,border:"1px solid #eee"}} />
                    ) : <div style={{width:48,height:48,background:"#f3f3f3",borderRadius:8}}/>}
                  </td>
                  <td>
                    <div style={{fontWeight:700}}>{p.name}</div>
                    {p.description ? <div style={{color:"#777",fontSize:12, marginTop:2}}>{p.description.slice(0,60)}</div> : null}
                  </td>
                  <td>{Number(p.price ?? 0).toLocaleString()}원</td>
                  <td><span className="badge">{p.stock ?? 0}</span></td>
                  <td className="actions">
                    <a className="btn btn-outline" href={`/admin/products/${p.id}/edit`}>수정</a>
                    <button className="btn btn-outline" onClick={()=>handleDelete(p.id)}>삭제</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* 페이지네이션 */}
      {!loading && filtered.length > 0 && (
        <div className="pager">
          <button className="btn-outline" disabled={page<=1} onClick={()=>setPage(p=>Math.max(1,p-1))}>이전</button>
          <div style={{color:"#666"}}>{page} / {pageCount}</div>
          <button className="btn-outline" disabled={page>=pageCount} onClick={()=>setPage(p=>Math.min(pageCount,p+1))}>다음</button>
        </div>
      )}
    </>
  );
}
