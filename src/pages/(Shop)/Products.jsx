import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';

// const products = [ ... ] // REMOVE DUMMY DATA

const categories = ['All', 'International', 'Womens', 'Retro kits', 'Seasonal Clubs'];
const sizes = ['S', 'M', 'L', 'XL'];

const Products = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSize, setSelectedSize] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { backendUrl } = useContext(AppContext);

  // Set category from query string on mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get('category');
    if (cat) setSelectedCategory(cat);
  }, [location.search]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${backendUrl}/api/products`);
        if (res.data.success) {
          setProducts(res.data.data);
        } else {
          setError(res.data.message || 'Failed to fetch products');
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [backendUrl]);

  // Filter products based on selected filters
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || (product.category && product.category.trim().toLowerCase() === selectedCategory.trim().toLowerCase());
    const availableSizes = product.variants ? product.variants.map(v => v.size) : [];
    const matchesSize = !selectedSize || availableSizes.includes(selectedSize);
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSize && matchesSearch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.basePrice - b.basePrice;
    if (sortBy === 'price-high') return b.basePrice - a.basePrice;
    return 0; // featured
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-white text-xl">Loading products...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-red-400 text-xl">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative h-[40vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black z-10"></div>
        <img 
          src="src/assets/3264.webp" 
          alt="Products Hero" 
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <h1 className="text-4xl md:text-6xl font-bold text-white z-20 text-center">
          Our Collection
        </h1>
      </div>
      {/* Filters and Products Container */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex flex-wrap gap-4">
            {/* Categories */}
            <div className="flex gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all
                    ${selectedCategory === category 
                      ? 'bg-[#00FF99] text-black' 
                      : 'bg-white/10 text-white hover:bg-white/20'}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          {/* Sort and Size Filters */}
          <div className="flex gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-black text-white px-4 py-2 rounded-full text-sm focus:outline-none border border-white/20 appearance-none pr-8 relative"
              style={{ minWidth: '170px', backgroundImage: 'url("data:image/svg+xml;utf8,<svg fill=\'white\' height=\'16\' viewBox=\'0 0 20 20\' width=\'16\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7.293 7.293a1 1 0 011.414 0L10 8.586l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z\'/></svg>")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1.25em 1.25em' }}
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="bg-black text-white px-4 py-2 rounded-full text-sm focus:outline-none border border-white/20 appearance-none pr-8 relative"
              style={{ minWidth: '120px', backgroundImage: 'url("data:image/svg+xml;utf8,<svg fill=\'white\' height=\'16\' viewBox=\'0 0 20 20\' width=\'16\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7.293 7.293a1 1 0 011.414 0L10 8.586l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z\'/></svg>")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1.25em 1.25em' }}
            >
              <option value="">All Sizes</option>
              {sizes.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>
        </div>
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map(product => (
            <div 
              key={product._id}
              className="group relative bg-white/5 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300"
            >
              {/* Optionally show isNew if you want, e.g. based on createdAt */}
              <Link to={`/product/${product._id}`} className="block">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={product.images && product.images.length > 0 ? product.images[0] : ''} 
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-white font-semibold mb-2">{product.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-[#00FF99] font-bold">${product.basePrice}</span>
                    <button className="bg-white/10 hover:bg-[#00FF99] text-white hover:text-black px-4 py-2 rounded-full text-sm font-medium transition-all duration-300">
                      View Details
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products; 