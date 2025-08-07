import { Routes, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

import Login from './pages/Login';
import Signup from './pages/Signup';
import ProductMainPage from './pages/ProductMainPage';
import ProductSearchPage from './pages/ProductSearchPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';

import './styles/colors.css';
import './App.css';
import { CartProvider } from './context/CartProvider';


function App() {


  return (
    <>
    <CartProvider>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<ProductMainPage />} />
          <Route path="/productsearch" element={<ProductSearchPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />

        </Routes>
      </div>
    </CartProvider>
    </>
  );
}

export default App;