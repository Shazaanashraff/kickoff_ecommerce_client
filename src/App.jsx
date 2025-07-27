import React from "react"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/(Shop)/Home"
import Products from "./pages/(Shop)/Products"
import Dashboard from "./pages/(Admin)/Dashboard"
import Checkout from "./pages/(Shop)/Checkout"
import AddProduct from "./pages/(Admin)/AddProduct"
import AdminProducts from "./pages/(Admin)/Products"
import Orders from "./pages/(Admin)/Orders"
import Login from "./pages/(Admin)/Login"
import RequireAdminAuth from "./pages/(Admin)/RequireAdminAuth"
import Order from "./pages/(Shop)/Order"
import ProductDetail from "./pages/productDetails/ProductDetails.jsx"
import Navbar from "./components/(Shop)/home/Navbar";
import Footer from "./components/(Shop)/home/Footer.jsx"
import AllProducts from "./pages/AllProducts/AllProducts.jsx"
import ProductComparison from "./pages/(Shop)/Compare.jsx"
import Contact from "./pages/(Shop)/Contact/Contact.jsx"

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<AllProducts />} />
        <Route path='/product/:id' element={<ProductDetail />} />
        <Route path='/compare' element={<ProductComparison />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/admin/login' element={<Login />} />
        <Route path='/admin' element={<RequireAdminAuth><Dashboard /></RequireAdminAuth>} />
        <Route path='/admin/add-product' element={<RequireAdminAuth><AddProduct /></RequireAdminAuth>} />
        <Route path='/admin/products' element={<RequireAdminAuth><AdminProducts /></RequireAdminAuth>} />
        <Route path='/admin/orders' element={<RequireAdminAuth><Orders /></RequireAdminAuth>} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App;
