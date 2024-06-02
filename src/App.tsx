import React from "react";
import SiteHeader from "./components/SiteHeader";
import Footer from "./shared/Footer/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <SiteHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Home />} />
      </Routes>
      <Footer />

    </Router>
  );
}

export default App;
