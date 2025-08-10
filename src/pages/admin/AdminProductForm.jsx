import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { sampleProducts } from "../../data/products"; // 백엔드 실패 시 폴백

export default function AdminProductForm() {
  const navigate = useNavigate();
  const { id } = useParams();           // 있으면 수정, 없으면 등록
  const isEdit = useMemo(() => !!id, [id]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    imageUrl: "",
    description: "",
    // 필요하면 categoryId, brand 등 추가
  });
  const [error, setError] = useState("");

  // 상세 불러오기(수정 모드)
  useEffect(() => {
    const run = async () => {
      if (!isEdit) { setLoading(false); return; }
      try {
        const { data } = await axios.get(`/api/admin/products/${id}`);
        setForm({
          name: data.name ?? "",
          price: data.price ?? "",
          stock: data.stock ?? "",
          imageUrl: data.thumbnailUrl ?? data.imageUrl ?? "",
          description: data.description ?? "",
        });
      } catch (e) {
        // 폴백: 로컬 샘플에서 찾아보기
        const found = (sampleProducts || []).find(p => String(p.id) === String(id));
        if (found) {
          setForm({
            name: found.name ?? "",
            price: found.price ?? "",
            stock: found.stock ?? "",
            imageUrl: found.imageUrl ?? found.thumbnailUrl ?? "",
            description: found.description ?? "",
          });
        } else {
          setError("상품을 불러오지 못했습니다.");
        }
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [id, isEdit]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!form.name.trim()) return "상품명을 입력하세요.";
    const priceNum = Number(form.price);
    if (Number.isNaN(priceNum) || priceNum < 0) return "가격을 숫자로 입력하세요.";
    const stockNum = Number(form.stock);
    if (Number.isNaN(stockNum) || stockNum < 0) return "재고를 숫자로 입력하세요.";
    return "";
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const msg = validate();
    if (msg) { setError(msg); return; }
    setSaving(true);
    setError("");

    const payload = {
      name: form.name.trim(),
      price: Number(form.price),
      stock: Number(form.stock),
      thumbnailUrl: form.imageUrl || null,
      description: form.description,
    };

    try {
      if (isEdit) {
        await axios.put(`/api/admin/products/${id}`, payload);
        alert("수정되었습니다.");
      } else {
        await axios.post(`/api/admin/products`, payload);
        alert("등록되었습니다.");
      }
      navigate("/admin/products");
    } catch (e) {
      setError(e?.response?.data?.message || "저장에 실패했습니다.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>불러오는 중…</div>;

  return (
    <div style={{ maxWidth: 720 }}>
      <h1 style={{ marginBottom: "1rem" }}>{isEdit ? "상품 수정" : "상품 등록"}</h1>
      {error && <div style={{ color: "crimson", marginBottom: 12 }}>{error}</div>}

      <form onSubmit={onSubmit} style={{ display: "grid", gap: "12px" }}>
        <label className="field">
          <span>상품명</span>
          <input name="name" value={form.name} onChange={onChange} placeholder="예) SWICY 러닝 슈즈" />
        </label>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <label className="field">
            <span>가격</span>
            <input name="price" value={form.price} onChange={onChange} inputMode="numeric" />
          </label>
          <label className="field">
            <span>재고</span>
            <input name="stock" value={form.stock} onChange={onChange} inputMode="numeric" />
          </label>
        </div>

        <label className="field">
          <span>이미지 URL</span>
          <input name="imageUrl" value={form.imageUrl} onChange={onChange} placeholder="https://..." />
        </label>

        <label className="field">
          <span>설명</span>
          <textarea name="description" value={form.description} onChange={onChange} rows={5} />
        </label>

        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          <button type="submit" className="btn" disabled={saving}>
            {saving ? "저장 중…" : (isEdit ? "수정 저장" : "등록")}
          </button>
          <button type="button" className="btn btn-outline" onClick={() => navigate(-1)} disabled={saving}>
            취소
          </button>
        </div>
      </form>

      {/* 미리보기(선택) */}
      {form.imageUrl ? (
        <div style={{ marginTop: 16 }}>
          <div style={{ fontSize: 12, color: "#666", marginBottom: 6 }}>이미지 미리보기</div>
          <img src={form.imageUrl} alt="" style={{ width: 180, height: 180, objectFit: "cover", borderRadius: 8, border: "1px solid #eee" }} />
        </div>
      ) : null}

      <style>{`
        .field { display: grid; gap: 6px; }
        .field > span { font-size: 0.9rem; color: #444; }
        input, textarea {
          border: 1px solid #ddd; border-radius: 8px; padding: 10px;
          outline: none;
        }
        input:focus, textarea:focus { border-color: #111; }
        .btn { padding: 10px 16px; border-radius: 999px; background:#111; color:#fff; border:1px solid #111; font-weight:600; }
        .btn.btn-outline { background:#fff; color:#111; }
        .btn.btn-outline:hover { background:#111; color:#fff; }
      `}</style>
    </div>
  );
}
