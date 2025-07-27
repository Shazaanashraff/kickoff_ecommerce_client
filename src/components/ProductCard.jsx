import React from 'react';

const ProductCard = ({ name, price, badge, image, onClick }) => (
  <button
    className="flex-shrink-0 w-48 flex flex-col items-center card-clickable bg-transparent border-none p-0 m-0"
    style={{ background: 'none' }}
    onClick={onClick}
  >
    {/* Product Card (Image + Badge) */}
    <div className="w-full bg-extra-light-gray overflow-hidden mb-2" style={{ minHeight: '180px' }}>
      <div className="relative aspect-[3/4] flex items-center justify-center">
        {image && (
          <img src={image} alt={name} className="object-contain max-h-full max-w-full" />
        )}
        {badge && (
          <div className="absolute bottom-2 left-2">
            <span className="text-dark-gray px-2 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide bg-white/80">
              {badge}
            </span>
          </div>
        )}
      </div>
    </div>
    {/* Product Details (on section background) */}
    <div className="w-full px-1 text-left">
      <h3 className="text-light-gray font-semibold text-sm mb-1 line-clamp-2">{name}</h3>
      <div className="flex justify-between items-center mb-1">
        <span className="text-light-gray font-bold text-base">
          €{price.toLocaleString()} EUR
        </span>
      </div>
    </div>
  </button>
);

export default ProductCard; 