import React from 'react';
import { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';

const categories = [
  'Shop All',
  'International',
  'Seasonal',
  'Collab Event',
  'Retro',
  'Player Version',
  'Womens',
  'Kids',
  'Accessories',
];

export default function Menubar() {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="border-t border-b border-gray-200 w-full bg-white relative">
      <div className="max-w-7xl px-3 sm:px-4 lg:px-6 flex items-center justify-between overflow-x-auto">
        <div className="flex space-x-6 py-4">
          {categories.map((cat, index) => (
            <button
              key={index}
              className="relative text-sm whitespace-nowrap text-black hover:text-gray-700 transition cursor-pointer group"
            >
              {cat}
              <span className="absolute left-0 -bottom-1 h-[1.5px] w-0 bg-black transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </div>

        <div
          onClick={() => setShowFilters(!showFilters)}
          className="flex m- items-center space-x-1 text-sm text-black hover:text-gray-700 cursor-pointer select-none"
        >
          <span>FILTER</span>
          <SlidersHorizontal className="w-4 h-4" />
        </div>
      </div>

      {showFilters && (
        <div className="absolute top-full left-0 w-full bg-white border-t border-gray-200 shadow-md z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Size Filter */}
            <div>
              <h4 className="font-semibold mb-2">Size</h4>
              <div className="flex flex-wrap gap-2">
                {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                  <button key={size} className="border px-3 py-1 text-sm hover:bg-black hover:text-white transition rounded">
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <h4 className="font-semibold mb-2">Price</h4>
              <div className="flex flex-col gap-2 text-sm">
                <label><input type="radio" name="price" /> Under Rs. 5,000</label>
                <label><input type="radio" name="price" /> Rs. 5,000 – Rs. 10,000</label>
                <label><input type="radio" name="price" /> Over Rs. 10,000</label>
              </div>
            </div>

            {/* Availability */}
            <div>
              <h4 className="font-semibold mb-2">Availability</h4>
              <div className="flex flex-col gap-2 text-sm">
                <label><input type="checkbox" /> In Stock</label>
                <label><input type="checkbox" /> Out of Stock</label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
