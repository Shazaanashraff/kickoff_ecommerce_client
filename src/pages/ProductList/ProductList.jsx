import React from "react";
import Menubar from "../../components/(Shop)/products/Menubar";
import { useNavigate } from "react-router-dom";
import image1 from '../../assets/reltedProducts/image1.jpeg';
import image2 from '../../assets/reltedProducts/image2.jpeg';
import image3 from '../../assets/reltedProducts/image3.jpeg';
import image4 from '../../assets/reltedProducts/image4.jpeg';
import ProductCard from '../../components/(Shop)/products/ProductCard';

const products = [
  // Related Products
  {
    id: 5,
    name: "Barça Home Jersey 23/24",
    price: "€89.99",
    image: image1,
    badge: null,
    stickers: [],
  },
  {
    id: 6,
    name: "Real Madrid Away Jersey 23/24",
    price: "€89.99",
    image: image2,
    badge: null,
    stickers: [],
  },
  {
    id: 7,
    name: "PSG Third Jersey 23/24",
    price: "€89.99",
    image: image3,
    badge: null,
    stickers: [],
  },
  {
    id: 8,
    name: "Manchester City Special Edition",
    price: "€99.99",
    image: image4,
    badge: null,
    stickers: [],
  },
];

const ProductList = () => {

    const navigate = useNavigate()


  return (
    <div className="px-6 py-8 mt-20">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-600 mb-4">
        <span onClick={()=>navigate('/')} className="hover:text-gray-800 hover:cursor-pointer">HOME</span> <span className="mx-1">/</span> <span onClick={()=>{navigate('/products')}} className="font-semibold hover:cursor-pointer hover:text-gray-800">Products</span> / <span className="font-semibold">Product List</span>
      </div>

      {/* Heading */}
      <h1 className="text-4xl font-light tracking-wide mb-2">SHOP ALL</h1>
      <p className="text-gray-600 text-base mb-8 max-w-3xl">
        Upgrade your Sporting touch from the Kickoff store 
      </p>

      {/* Menu Bar */}
      <Menubar />

      {/* Products */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={parseFloat(product.price.replace('€', '').replace(' EUR', '').replace(',', ''))}
            badge={product.badge}
            image={product.image}
            onClick={() => {}}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
