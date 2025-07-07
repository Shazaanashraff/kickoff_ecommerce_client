import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../../components/(Shop)/Navbar';
import { useCart } from '../../context/CartContext';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [mainImage, setMainImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();
  const [showSizePopup, setShowSizePopup] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const { backendUrl } = useContext(AppContext);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${backendUrl}/api/products/${id}`);
        if (res.data.success) {
          setProduct(res.data.data);
          setMainImage(res.data.data.images && res.data.data.images.length > 0 ? res.data.data.images[0] : '');
        } else {
          setError(res.data.message || 'Failed to fetch product');
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, backendUrl]);

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= maxStock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      setShowSizePopup(true);
      return;
    }
    setIsAdding(true);
    let itemPrice = product.basePrice;
    if (selectedSize && product.variants) {
      const variant = product.variants.find(v => v.size === selectedSize);
      if (variant && typeof variant.price !== 'undefined') {
        itemPrice = variant.price;
      }
    }
    addToCart({
      ...product,
      product: product._id,
      selectedSize,
      price: itemPrice,
    }, quantity);
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-white text-xl">Loading product...</div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-black flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-red-400 text-xl">{error || 'Product not found'}</div>
        </div>
      </div>
    );
  }

  // Prepare sizes and details
  const sizes = product.variants ? product.variants.map(v => v.size) : [];
  let price = product.basePrice;
  let maxStock = 10;
  if (selectedSize && product.variants) {
    const variant = product.variants.find(v => v.size === selectedSize);
    if (variant) {
      if (typeof variant.price !== 'undefined') {
        price = variant.price;
      }
      if (typeof variant.stock !== 'undefined') {
        maxStock = variant.stock;
      }
    }
  }
  const images = product.images && product.images.length > 0 ? product.images : [''];
  const details = product.details || [];

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      {/* Size selection popup */}
      {showSizePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center">
            <h2 className="text-xl font-bold text-black mb-4">Please select a size</h2>
            <p className="text-black/80 mb-6">You must choose a size before adding to cart.</p>
            <button
              onClick={() => setShowSizePopup(false)}
              className="bg-[#00FF99] text-black font-semibold rounded-full px-8 py-3 text-lg hover:bg-[#00E589] transition"
            >
              OK
            </button>
          </div>
        </div>
      )}
      
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
                {images.map((image, index) => (
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
            <div className="text-2xl font-bold text-[#00FF99] mb-6">${price}</div>

            <div className="text-white/80 mb-8">
              {product.description
                ? product.description.split(/\n|\\n/).map((line, idx) => (
                    <p key={idx} style={{ margin: 0 }}>
                      {line}
                    </p>
                  ))
                : null}
            </div>

            {/* Size Selection */}
            <div className="mb-8">
              <h3 className="text-white font-semibold mb-3">Select Size</h3>
              <div className="flex gap-3">
                {sizes.map((size) => (
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
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-white">{quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(1)}
                    className="w-10 h-10 flex items-center justify-center text-white hover:text-[#00FF99] transition-colors"
                    disabled={quantity >= maxStock}
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

            {/* Show Reviews Button and Reviews List */}
            <div className="border-t border-white/10 pt-8">
              <button
                onClick={() => setShowReviews(v => !v)}
                className="bg-white/10 hover:bg-[#00FF99] hover:text-black text-white font-semibold rounded-full px-6 py-2 mb-4 transition"
              >
                {showReviews ? 'Hide Reviews' : 'Show Reviews'}
              </button>
              {showReviews && (
                <div className="mt-4">
                  <h3 className="text-white font-semibold mb-2">Product Reviews</h3>
                  <ul className="space-y-3">
                    {product.reviews && product.reviews.length > 0 ? (
                      product.reviews.map((review, idx) => (
                        <li key={idx} className="bg-black/30 rounded-lg p-4 border border-white/10">
                          <div className="text-[#00FF99] font-bold mb-1">{review.user?.name || review.user || 'Anonymous'}</div>
                          <div className="text-white/90">{review.comment}</div>
                        </li>
                      ))
                    ) : (
                      <li className="text-white/60">No reviews yet.</li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails; 