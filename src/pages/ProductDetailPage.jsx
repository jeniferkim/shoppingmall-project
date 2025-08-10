import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import ProductHeader from "../components/product/ProductHeader";
import ProductInfo from "../components/product/ProductInfo.jsx"; 
import ProductDescription from "../components/product/ProductDescription";
import ProductReviewList from "../components/product/ProductReviewList";
import "../styles/product/ProductDetail.css";

import { sampleProducts } from "../data/products";
import { sampleReviews } from "../data/reviews";

// import { useCart } from "../context/CartContext.jsx";


export default function ProductDetailPage() {
  const { id } = useParams();
  const location = useLocation();

  const [product, setProduct] = useState(location.state?.product || null);
  const [activeTab, setActiveTab] = useState("info"); // info | review

  const [reviews, setReviews] = useState([]);
  const [loadingReview, setLoadingReview] = useState(false); // 리뷰 로딩

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // 상품 로딩
  // const { addToCart } = useCart();

  
  useEffect(() => {
    // 1️⃣ state에 상품 정보가 있으면 그대로 사용
    if (product) {
      setLoading(false);
      return;
    }

    // 2️⃣ state가 없으면 임시 데이터에서 찾기
    const localProduct = sampleProducts.find(p => p.id === Number(id));
    if (localProduct) {
      setProduct(localProduct);
      setLoading(false);
      return;
    }

    // 3️⃣ (백엔드 연동 후) API로 상품 정보 가져오기
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("상품 정보를 불러오는 데 실패했습니다:", error);
        setError("해당 상품을 찾을 수 없습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, product]); /* 나중에 확인. Prduct 의존성을 없애야 된다나 뭐라나 */
  // 리뷰 로드 (탭 전환 시)
  useEffect(() => {
    if (activeTab !== "review") return;

    setLoadingReview(true);


    // ✅ 샘플 리뷰에서 현재 상품에 맞는 리뷰만 필터링
    setReviews(sampleReviews.filter(
      (r) => String(r.productId) === String(id)
    ));

    // 임시 데이터 먼저 세팅
    setReviews(sampleReviews);
    setLoadingReview(false);

    // 나중에 백엔드 연결 (나중에 주석 풀기)
    // const fetchReviews = async () => {
    //   try {
    //     const response = await axios.get(`/api/products/${id}/reviews`);
    //     if (response.data && response.data.length > 0) {
    //       setReviews(response.data);
    //     }
    //   } catch (error) {
    //     console.error("리뷰 불러오기 실패:", error);
    //   } finally {
    //     setLoadingReview(false);
    //   }
    // };

    // 리뷰 API 요청 (백엔드 연결 시 활성화)
    // fetchReviews();
  }, [activeTab, id]);


  // 로딩 처리
  if (loading) return <div>상품 정보를 불러오는 중...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>상품이 존재하지 않습니다.</div>;


  return (
    // <div className="container">
    <div className="product-detail-page">
      <ProductHeader />

      <div className="product-detail-container">
        <img className="product-image" src={product.imageUrl} alt={product.name} />
        <ProductInfo product={product} />
      </div>


      <div className="product-tabs">
        <div
          className={`tab-item ${activeTab === "info" ? "active" : ""}`}
          onClick={() => setActiveTab("info")}
        >
          상세정보
        </div>
        <div
          className={`tab-item ${activeTab === "review" ? "active" : ""}`}
          onClick={() => setActiveTab("review")}
        >
          리뷰
        </div>
      </div>

      <div className="tab-content">
        {activeTab === "info" && <ProductDescription description={product.description || "상품 설명 없음"}/>}
        {activeTab === "review" && (
          loadingReview ? (
            <div>리뷰 불러오는 중...</div>
          ) : (
            <ProductReviewList productId={product.id} reviews={reviews} />
          )
        )}
      {/* </div> */}
    </div>
    </div>
  );
}
