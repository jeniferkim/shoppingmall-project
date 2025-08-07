// ProductDetailPage에서 장바구니 버튼 눌러도 CartPage에서 그걸 바로 알 수 있는 방법 X
// -> 두 컴포넌트가 서로 다른 state 쓰고 있어서 !
// --> 상품 상세 -> 장바구니 페이지 간 상태 공유

import { createContext } from "react";

export const CartContext = createContext();

