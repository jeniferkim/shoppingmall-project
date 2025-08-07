// 25.08.03 기준 개발 stop
// 추후 디벨롭 예정

import { useSearchParams } from "react-router-dom";
import ProductList from "../components/product/ProductList";
import ProductHeader from "../components/product/ProductHeader";

function ProductSearchPage() {
  const [params] = useSearchParams();
  const query = params.get("query");

  // 임시 검색 결과 mock
  const results = []; // 빈 배열로 가정

  return (
    <>
      <ProductHeader showSearch={true} />
      {results.length > 0 ? (
        <ProductList products={results} />
      ) : (
        <NoResult message={`"${query}"에 대한 검색 결과가 없습니다.`} />
      )}
    </>
  );
}

export default ProductSearchPage;
