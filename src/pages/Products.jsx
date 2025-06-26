import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

// Sample products data - in a real app, this would come from an API
const products = [
  {
    id: 1,
    name: 'Arsenal Home Kit 23/24',
    price: 89.99,
    image: 'src/assets/Arsenal.jpg',
    category: 'Premier League',
    size: ['S', 'M', 'L', 'XL'],
    isNew: true,
  },
  {
    id: 2,
    name: 'Real Madrid Home Kit 23/24',
    price: 94.99,
    image: 'src/assets/realMadrid.jpg',
    category: 'LaLiga',
    size: ['S', 'M', 'L', 'XL'],
    isNew: true,
  },
  {
    id: 3,
    name: "Women's National Team Kit",
    price: 79.99,
    image: 'src/assets/womens.jpg',
    category: 'International',
    size: ['S', 'M', 'L'],
    isNew: false,
  },
  // Add more products as needed
];

const categories = ['All', 'Premier League', 'LaLiga', 'International', 'Retro'];
const sizes = ['S', 'M', 'L', 'XL'];

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSize, setSelectedSize] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter products based on selected filters
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSize = !selectedSize || product.size.includes(selectedSize);
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSize && matchesSearch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return 0; // featured
  });

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
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
              className="bg-white/10 text-white px-4 py-2 rounded-full text-sm focus:outline-none hover:bg-white/20 transition-all"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>

            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="bg-white/10 text-white px-4 py-2 rounded-full text-sm focus:outline-none hover:bg-white/20 transition-all"
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
              key={product.id}
              className="group relative bg-white/5 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300"
            >
              {product.isNew && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-[#00FF99] text-black text-xs font-bold px-3 py-1 rounded-full">
                    New
                  </span>
                </div>
              )}
              <Link to={`/product/${product.id}`} className="block">
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