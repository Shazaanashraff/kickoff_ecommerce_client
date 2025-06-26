import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../../components/(Shop)/Navbar';
import { useCart } from '../../context/CartContext';

// This would come from your API/database in a real application
const getProductById = (id) => {
  return {
    id: parseInt(id),
    name: 'Arsenal Home Kit 23/24',
    price: 89.99,
    images: [
      'src/assets/Arsenal.jpg',
      'src/assets/Arsenal.jpg',
      'src/assets/Arsenal.jpg'
    ],
    description: 'The Arsenal Home Kit for the 2023/24 season combines traditional style with modern performance features. Made with lightweight, breathable fabric featuring sweat-wicking technology to keep you cool and comfortable.',
    details: [
      'Regular fit',
      'Ribbed crewneck',
      'Short sleeves',
      'Arsenal crest embroidered on chest',
      '100% recycled polyester',
      'Moisture-absorbing AEROREADY'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Premier League'
  };
};

// Sample related products
const relatedProducts = [
  {
    id: 2,
    name: 'Real Madrid Home Kit 23/24',
    price: 94.99,
    image: 'src/assets/realMadrid.jpg',
    category: 'LaLiga'
  },
  {
    id: 3,
    name: "Women's National Team Kit",
    price: 79.99,
    image: 'src/assets/womens.jpg',
    category: 'International'
  },
  {
    id: 4,
    name: 'Arsenal Away Kit 23/24',
    price: 89.99,
    image: 'src/assets/Arsenal.jpg',
    category: 'Premier League'
  }
];

const ProductDetails = () => {
  const { id } = useParams();
  const product = getProductById(id);
  const [selectedSize, setSelectedSize] = useState('');
  const [mainImage, setMainImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }

    setIsAdding(true);
    
    // Add to cart with size information
    addToCart({
      ...product,
      selectedSize,
    }, quantity);

    // Reset after animation
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pt-24 pb-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column - Product Images */}
          <div className="flex-1 order-1">
            <div className="sticky top-24">
              {/* Main Image */}
              <motion.div 
                className="aspect-square rounded-2xl overflow-hidden bg-white/5 mb-4"
                animate={isAdding ? {
                  scale: [1, 0.9, 1],
                  rotate: [0, -5, 5, 0],
                } : {}}
                transition={{ duration: 0.5 }}
              >
                <img 
                  src={mainImage} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              {/* Thumbnail Images */}
              <div className="grid grid-cols-3 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setMainImage(image)}
                    className={`aspect-square rounded-xl overflow-hidden bg-white/5 transition-all
                      ${mainImage === image ? 'ring-2 ring-[#00FF99]' : 'hover:opacity-80'}`}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="flex-1 order-2">
            <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
              <Link to="/">Home</Link>
              <span>/</span>
              <Link to="/products">{product.category}</Link>
              <span>/</span>
              <span className="text-white">{product.name}</span>
            </nav>

            <h1 className="text-4xl font-bold text-white mb-4">{product.name}</h1>
            <div className="text-2xl font-bold text-[#00FF99] mb-6">${product.price}</div>

            <p className="text-white/80 mb-8">{product.description}</p>

            {/* Size Selection */}
            <div className="mb-8">
              <h3 className="text-white font-semibold mb-3">Select Size</h3>
              <div className="flex gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium transition-all
                      ${selectedSize === size 
                        ? 'bg-[#00FF99] text-black' 
                        : 'bg-white/10 text-white hover:bg-white/20'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selection */}
            <div className="mb-8">
              <h3 className="text-white font-semibold mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-white/10 rounded-full">
                  <button 
                    onClick={() => handleQuantityChange(-1)}
                    className="w-10 h-10 flex items-center justify-center text-white hover:text-[#00FF99] transition-colors"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-white">{quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(1)}
                    className="w-10 h-10 flex items-center justify-center text-white hover:text-[#00FF99] transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <motion.button
              onClick={handleAddToCart}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              animate={isAdding ? {
                scale: [1, 1.2, 1],
                transition: { duration: 0.5 }
              } : {}}
              className="w-full md:w-auto px-8 py-3 bg-[#00FF99] text-black font-semibold rounded-full hover:bg-[#00E589] transition-colors mb-8"
            >
              {isAdding ? 'Added to Cart!' : 'Add to Cart'}
            </motion.button>

            {/* Product Details */}
            <div className="border-t border-white/10 pt-8">
              <h3 className="text-white font-semibold mb-4">Product Details</h3>
              <ul className="list-disc list-inside text-white/80 space-y-2">
                {product.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-white mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map(product => (
              <Link 
                key={product.id}
                to={`/product/${product.id}`}
                className="group relative bg-white/5 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300"
              >
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-white font-semibold mb-2">{product.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-[#00FF99] font-bold">${product.price}</span>
                    <span className="bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium group-hover:bg-[#00FF99] group-hover:text-black transition-all duration-300">
                      View Details
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails; 