// useContext(CartContext)를 쓰기 위한 커스텀 훅

import { useContext } from "react";
import { CartContext } from "./CartContext.jsx";

export const useCart = () =>  useContext(CartContext);
