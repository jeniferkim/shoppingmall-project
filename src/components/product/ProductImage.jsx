import React from "react";

function ProductImage({ imageUrl }) {
  return (
    <div className="product-image">
      {imageUrl ? (
        <img src={imageUrl} alt="상품 이미지" />
      ) : (
        <div className="image-placeholder">이미지가 없습니다</div>
      )}
    </div>
  );
}

export default ProductImage;
