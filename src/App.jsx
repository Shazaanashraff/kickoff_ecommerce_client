import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/(Shop)/Home";
import Dashboard from "./pages/(Admin)/Dashboard";
import AddProduct from "./pages/(Admin)/AddProduct";
import AdminProducts from "./pages/(Admin)/Products";
import Orders from "./pages/(Admin)/Orders";
import Login from "./pages/(Admin)/Login";
import ProductDetail from "./pages/productDetails/ProductDetails.jsx";
import Navbar from "./components/(Shop)/home/Navbar";
import Footer from "./components/(Shop)/home/Footer.jsx";
import Categories from "./pages/Categories/Categories.jsx";
import ProductComparison from "./pages/Compare/Compare.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import ProductList from "./pages/ProductList/ProductList.jsx";
import Checkout from "./pages/Checkout/Checkout.jsx";
import Order from "./pages/Order/Order.jsx";

const App = () => {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdminRoute && <Navbar />}

      <Routes>
        {/* Shop routes */}
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<Categories />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/product-list" element={<ProductList />} />
        <Route path="/compare" element={<ProductComparison />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order" element={<Order />} />

        {/* Admin routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/add-product" element={<AddProduct />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/orders" element={<Orders />} />
      </Routes>

      {!isAdminRoute && <Footer />}
    </div>
  );
};

export default App;
