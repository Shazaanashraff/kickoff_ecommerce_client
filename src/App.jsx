import React from "react"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/(Shop)/Home"
import Products from "./pages/(Shop)/Products"
import ProductDetails from "./pages/(Shop)/ProductDetails"
import Dashboard from "./pages/(Admin)/Dashboard"
import Checkout from "./pages/(Shop)/Checkout"
import AddProduct from "./pages/(Admin)/AddProduct"
import AdminProducts from "./pages/(Admin)/Products"
import Orders from "./pages/(Admin)/Orders"
import Login from "./pages/(Admin)/Login"
import RequireAdminAuth from "./pages/(Admin)/RequireAdminAuth"
import Order from "./pages/(Shop)/Order"

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/order' element={<Order />} />
        <Route path='/admin/login' element={<Login />} />
        <Route path='/admin' element={<RequireAdminAuth><Dashboard /></RequireAdminAuth>} />
        <Route path='/admin/add-product' element={<RequireAdminAuth><AddProduct /></RequireAdminAuth>} />
        <Route path='/admin/products' element={<RequireAdminAuth><AdminProducts /></RequireAdminAuth>} />
        <Route path='/admin/orders' element={<RequireAdminAuth><Orders /></RequireAdminAuth>} />
      </Routes>
    </div>
  )
}

export default App;
