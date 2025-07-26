import React, { useState } from 'react';
import mainImg from '../../assets/ProductDetails/details main.webp';
import gallery1 from '../../assets/ProductDetails/Galler1.webp';
import gallery2 from '../../assets/ProductDetails/Gallery2.webp';
import gallery3 from '../../assets/ProductDetails/Gallery3.webp';
import RelatedProducts from '../../components/(Shop)/products/RelatedProducts';

const product = {
  name: 'Elephant Block Mandarin Collar Polo Shirt',
  brand: 'ELEPHANT BLOCK',
  price: 36438,
  sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  availability: 'IN STOCK',
  details: 'A premium mandarin collar polo shirt with a modern fit and soft hand-feel.',
  material: '100% Cotton',
  shipping: 'Free shipping & 30-day returns on all orders.',
  images: [
    mainImg,
    gallery1,
    gallery2,
    gallery3,
  ],
};

const ProductDetail = () => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [expanded, setExpanded] = useState({ details: false, material: false, shipping: false });
  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  const handleExpand = (section) => {
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <>
      <div className="min-h-screen bg-[var(--color-white)] flex flex-col pt-20">
        <div className="flex flex-row justify-center items-start gap-12 w-full">
          {/* Main Image + Thumbnails */}
          <div className="flex flex-row items-center pt-20">
            {/* Thumbnails */}
            <div className="flex flex-col gap-3 mr-4 mt-12">
              {product.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className={`w-16 h-16 object-cover rounded cursor-pointer border-2 ${selectedImage === img ? 'border-[var(--color-dark-gray)]' : 'border-transparent'}`}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
            {/* Main Image */}
            <div className="bg-[var(--color-white)] rounded-2xl shadow-lg flex items-center justify-center w-[420px] h-[520px]">
              <img
                src={selectedImage}
                alt="Main"
                className="w-full h-full object-contain rounded-2xl"
              />
            </div>
          </div>
          {/* Product Details */}
          <div className="flex-1 flex flex-col justify-center px-8 py-12 max-w-xl">
            <div className="uppercase text-xs tracking-widest text-[var(--color-medium-gray)] mb-2">{product.brand}</div>
            <h1 className="text-2xl md:text-3xl font-semibold text-[var(--color-dark-gray)] mb-2 leading-tight">{product.name}</h1>
            <div className="text-lg text-[var(--color-dark-gray)] mb-6">Rs {product.price.toLocaleString()}</div>
            <hr className="border-[var(--color-light-gray)] mb-6" />
            {/* Size */}
            <div className="mb-6">
              <div className="text-xs text-[var(--color-medium-gray)] mb-1">SIZE: {selectedSize}</div>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded transition-all text-[var(--color-dark-gray)] ${selectedSize === size ? 'bg-[var(--color-dark-gray)] text-[var(--color-white)]' : 'bg-[var(--color-white)] border-[var(--color-light-gray)]'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            {/* Add to Cart */}
            <div className="flex gap-2 mb-4">
              <button className="flex-1 bg-[var(--color-dark-gray)] text-[var(--color-white)] py-3 rounded text-sm font-semibold tracking-wide hover:bg-black transition">ADD TO CART</button>
            </div>
            {/* Availability */}
            <div className="text-xs text-[var(--color-medium-gray)] mb-8">AVAILABILITY: {product.availability}</div>
            {/* Expandable Sections */}
            <div className="border-t border-[var(--color-light-gray)] divide-y divide-[var(--color-light-gray)]">
              <div>
                <button className="w-full flex justify-between items-center py-4 text-left" onClick={() => handleExpand('details')}>
                  <span className="font-semibold text-[var(--color-dark-gray)]">DETAILS</span>
                  <span className="text-xl">{expanded.details ? '-' : '+'}</span>
                </button>
                {expanded.details && <div className="pb-4 text-[var(--color-medium-gray)] text-sm">{product.details}</div>}
              </div>
              <div>
                <button className="w-full flex justify-between items-center py-4 text-left" onClick={() => handleExpand('material')}>
                  <span className="font-semibold text-[var(--color-dark-gray)]">MATERIAL</span>
                  <span className="text-xl">{expanded.material ? '-' : '+'}</span>
                </button>
                {expanded.material && <div className="pb-4 text-[var(--color-medium-gray)] text-sm">{product.material}</div>}
              </div>
              <div>
                <button className="w-full flex justify-between items-center py-4 text-left" onClick={() => handleExpand('shipping')}>
                  <span className="font-semibold text-[var(--color-dark-gray)]">SHIPPING & RETURNS</span>
                  <span className="text-xl">{expanded.shipping ? '-' : '+'}</span>
                </button>
                {expanded.shipping && <div className="pb-4 text-[var(--color-medium-gray)] text-sm">{product.shipping}</div>}
              </div>
            </div>
          </div>
        </div>
        <RelatedProducts />
      </div>
    </>
  );
};

export default ProductDetail; 