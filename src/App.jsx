import { BrowserRouter, Routes, Route } from 'react-router-dom';

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
            <Route 
              path="/cart" 
              element={
                <ProtectedRoute>
                  <CartPage />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </CartProvider>
    </AuthProvider>
    </>
  );
}

export default App;