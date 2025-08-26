import { Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Signup from './pages/Signup';
import ProductMainPage from './pages/ProductMainPage';
import ProductSearchPage from './pages/ProductSearchPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';

import './styles/colors.css';
import './App.css';

import { CartProvider } from './context/CartProvider';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';

// 관리자 기능 추후 디벨롭
// import AdminRoute from "./routes/AdminRoute";
// import AdminLayout from "./pages/admin/AdminLayout";
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import AdminProducts from "./pages/admin/AdminProducts";
// import AdminProductForm from './pages/admin/AdminProductForm';

function App() {

  return (
    <>
    <AuthProvider>
      <CartProvider>
        {/* CartProvider로 감싸서 상태가 전역으로 공유되도록 설정 */}
        <div className="App">
          <Routes>
            <Route path="/" element={<ProductMainPage />} />
            <Route path="/login" element={<Login />} />

            <Route path="/signup" element={<Signup />} />
            <Route path="/productsearch" element={<ProductSearchPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />

            {/* 로그인 필요. 보호 라우터 여기다가 넣어야됨*/}
            <Route element={<ProtectedRoute />}>
              <Route path="/cart" element={<CartPage />} />
            </Route>

            {/* 관리자(Admin). 추후 확장 */}
            {/* <Route path="/admin" element={<AdminRoute />}>
              <Route element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="products/new" element={<AdminProductForm />} />
                <Route path="products/:id/edit" element={<AdminProductForm />} />
                {/* 추후 orders, users 등 확장 
              </Route>
            </Route> */}
          </Routes>
        </div>
      </CartProvider>
    </AuthProvider>
    </>
  );
}

export default App;