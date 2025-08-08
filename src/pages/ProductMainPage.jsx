import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";

import ProductList from "../components/product/ProductList";
import ProductHeader from "../components/product/ProductHeader";

import { sampleProducts } from "../data/products";

import '../styles/product/ProductMainPage.css';

// 백엔드 연결 시 주석 풀기
// const API_BASE_URL = "https://port-8080-shoppingmall-mdsn9zf153ba9c89.sel5.cloudtype.app";

function ProductMainPage() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  );

  useEffect(() => {

    // 1. 프론트만
    setProducts(sampleProducts);
    setLoading(false);

    // 2. 백엔드 연동 시 주석 풀기
    /*
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products");

        // 백엔드에서 데이터가 안 오면 샘플 데이터로 대체
        if (response.data && response.data.length > 0) {
          setProducts(response.data);
        } else {
          setProducts(sampleProducts);
        }
      } catch (error) {
        console.error("상품 목록 불러오기 실패, 샘플 데이터 사용:", error);
        setProducts(sampleProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts(); */
  }, []);

  if (loading) return <div>상품을 불러오는 중...</div>;


  return (
    <div className="product-main-page">
      <ProductHeader onSearchChange={setSearchTerm} />

      <div className="product-grid">
        {filteredProducts.length === 0 ? (
          <div className="no-results-message">검색 결과가 없습니다.</div>
        ) : (
          filteredProducts.map(p => (
            <div className="product-card" 
              key={p.id}
              onClick={() => navigate(`/product/${p.id}`)}
              style={{cursor: "pointer"}}
            >
              <div className="product-image-wrapper">
                <img className="product-image" src={p.imageUrl} alt={p.name} />
              </div>
              <div className="product-brand">{p.brand}</div>
              <div className="product-name">{p.name}</div>
              <div className="product-price">
                ₩{p.price.toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProductMainPage;