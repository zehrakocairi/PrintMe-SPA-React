import React from "react";
import SiteHeader from "./components/SiteHeader";
import Footer from "./shared/Footer/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PageAbout from "./pages/about/page";
import CartPage from "./pages/cart/page";
import CheckoutPage from "./pages/checkout/page";
import PageSearch from "./pages/search/page";
import ProductDetailPage from "./pages/product-detail/page";
import PageContact from "./pages/contact/page";
import PageLogin from "./pages/login/page";
import { FilterProvider } from "./contexts/FilterContext";
import { CartProvider } from "./contexts/CartContext";

function App() {
  return (
    <CartProvider>
      <Router>
        <SiteHeader />
        <FilterProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<PageAbout />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/search" element={<PageSearch />} />
            <Route path="/product-detail" element={<ProductDetailPage />} />
            <Route path="/contact" element={<PageContact />} />
            <Route path="/login" element={<PageLogin />} />
          </Routes>
          <Footer />
        </FilterProvider>

      </Router>
    </CartProvider>

  );
}

export default App;
