import ProductCard from "./ProductCard";

function ProductList({ products = [] }) {
  return (
    <div className="product-list">
      {products.map((item) => (
        <ProductCard key={item.id} product={item} /> // key는 보통 id 같은 고유값을 사용
      ))}
    </div>
  );
}

export default ProductList;