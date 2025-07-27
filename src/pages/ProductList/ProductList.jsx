import React from "react";
import Menubar from "../../components/(Shop)/products/Menubar";
import { useNavigate } from "react-router-dom";
import image1 from '../../assets/reltedProducts/image1.jpeg';
import image2 from '../../assets/reltedProducts/image2.jpeg';
import image3 from '../../assets/reltedProducts/image3.jpeg';
import image4 from '../../assets/reltedProducts/image4.jpeg';

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
          <div key={product.id} className="text-center">
            <div className="relative bg-white p-4">
              {product.badge && (
                <span className="absolute top-2 left-2 bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded uppercase font-semibold">
                  {product.badge}
                </span>
              )}
              <div className="flex justify-center mb-2">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-auto object-contain"
                  />
                  {/* Optional stickers (e.g. award badges) */}
                  <div className="absolute top-0 right-0 flex flex-col gap-1">
                    {product.stickers.map((src, i) => (
                      <img
                        key={i}
                        src={`/images/${src}`}
                        alt="badge"
                        className="w-12 h-12 object-contain"
                      />
                    ))}
                  </div>
                </div>
              </div>
              <h3 className="text-sm font-semibold mt-2">{product.name}</h3>
              <p className="text-sm mt-1">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
