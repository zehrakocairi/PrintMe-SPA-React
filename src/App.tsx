import React from "react";
import SiteHeader from "./components/SiteHeader";
import Footer from "./shared/Footer/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FilterProvider } from "./contexts/FilterContext";
import { ApplicationProvider } from "./contexts/ApplicationContext";
import { CartProvider } from "./contexts/CartContext";
import CommonClient from "./pages/CommonClient";
import { AppInsightsContext } from "@microsoft/applicationinsights-react-js";
import { reactPlugin } from "./services/applicationInsightService";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n/i18n";
import { Suspense, lazy } from "react";

// Lazy load route components
const Home = lazy(() => import('./pages/Home'));
const PageAbout = lazy(() => import("./pages/about/page"));
const CartPage = lazy(() => import('./pages/cart/page'));
const CheckoutPage = lazy(() => import('./pages/checkout/page'));
const PageSearch = lazy(() => import('./pages/search/page'));
const ProductDetailPage = lazy(() => import('./pages/product-detail/page'));
const PageContact = lazy(() => import('./pages/contact/page'));
const PageOurServices = lazy(() => import('./pages/our-services/page'));
const PageLogin = lazy(() => import('./pages/login/page'));

function App() {
  return (
    <AppInsightsContext.Provider value={reactPlugin}>
      <ApplicationProvider>
        <CartProvider>
          <I18nextProvider i18n={i18n}>
            <Router>
              <SiteHeader />
              <FilterProvider>
                <Suspense fallback={<div>Loading...</div>}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<PageAbout />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/search" element={<PageSearch />} />
                    <Route path="/product-detail/:id" element={<ProductDetailPage />} />
                    <Route path="/contact" element={<PageContact />} />
                    <Route path="/our-services" element={<PageOurServices />} />
                    <Route path="/login" element={<PageLogin />} />
                  </Routes>
                </Suspense>
                <CommonClient />
                <Footer />
              </FilterProvider>
            </Router>
          </I18nextProvider>
        </CartProvider>
      </ApplicationProvider>
    </AppInsightsContext.Provider>
  );
}

export default App;