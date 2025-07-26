import React from 'react';
import img1 from '../../assets/int.jpeg'; // Events
import img2 from '../../assets/int.jpeg'; // Animation
import img3 from '../../assets/int.jpeg'; // Fashion
import img4 from '../../assets/int.jpeg'; // Commercial
import { useNavigate } from 'react-router-dom';

const categories = [
  {
    name: 'International',
    desc: 'Shop the latest national team jerseys from around the world.',
    image: img1,
    gridClass: 'col-span-3 row-span-2',
  },
  {
    name: 'Retro kits',
    desc: 'Classic throwback jerseys for true collectors.',
    image: img2,
    gridClass: 'col-span-2 row-span-2',
  },
  {
    name: 'Seasonal Clubs',
    desc: 'Get the newest 24/25 season kits of European top 5 leagues.',
    image: img3,
    gridClass: 'col-span-2 row-span-2',
  },
  {
    name: 'Womens Kits',
    desc: 'Top picks for women\'s football fans',
    image: img4,
    gridClass: 'col-span-3 row-span-2',
  }
];

const CategoriesBento = () => {
  const navigate = useNavigate();
  const handleCategoryClick = (categoryName) => {
    navigate(`/products?category=${encodeURIComponent(categoryName)}`);
  };
  return (
    <section className="max-w-7xl mx-auto py-28 px-4">
      <h2 className="text-4xl md:text-5xl text-white mb-12 text-center font-sans tracking-tight" style={{ fontFamily: 'var(--font-primary)' }}>
        Shop by Category
      </h2>

      <div className="grid grid-cols-5 auto-rows-[240px] gap-4">
        {categories.map((category, i) => (
          <div
            key={i}
            className={`group relative overflow-hidden rounded-3xl border border-white/20 backdrop-blur-sm ${category.gridClass} cursor-pointer transition-shadow duration-500 hover:shadow-2xl`}
            onClick={() => handleCategoryClick(category.name)}
            tabIndex={0}
            role="button"
            aria-label={`View ${category.name} products`}
            onKeyDown={e => { if (e.key === 'Enter') handleCategoryClick(category.name); }}
          >
            {/* Background Image */}
            <img
              src={category.image}
              alt={category.name}
              className="absolute inset-0 w-full opacity-70 h-full object-cover rounded-3xl transition-transform duration-700 ease-in-out group-hover:scale-110 group-hover:opacity-30"
            />

            {/* Shine Animation */}
            <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
              <div className="shine-effect"></div>
            </div>

            {/* Striped Glass Overlay - only on hover */}
            <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/70">
              <div className="w-full h-full bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.07)_0px,rgba(255,255,255,0.07)_1px,transparent_1px,transparent_50px)] rounded-3xl border border-white/30 mask-stripe-fade"></div>
            </div>

            {/* Text Content */}
            <div className="relative z-30 h-full w-full p-6 flex flex-col justify-end">
              <div className="transition-all duration-500 ease-in-out transform group-hover:-translate-y-2">
                <h3 className="text-2xl text-white font-bold drop-shadow-md" style={{ fontFamily: 'var(--font-primary)' }}>
                  {category.name}
                </h3>
                <p className="text-white/80 text-sm mt-2 drop-shadow-md transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0" style={{ fontFamily: 'var(--font-primary)' }}>
                  {category.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .shine-effect {
          position: absolute;
          top: 0;
          left: -75%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            120deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.3) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: skewX(-20deg);
          opacity: 0;
        }

        .group:hover .shine-effect {
          animation: shine-sweep 1.2s ease-in-out forwards;
          opacity: 1;
        }

        @keyframes shine-sweep {
          0% { left: -75%; }
          100% { left: 150%; }
        }

        /* Custom fade effect for stripes */
        .mask-stripe-fade {
          -webkit-mask-image: linear-gradient(to bottom, transparent 0%, white 20%, white 80%, transparent 100%);
          mask-image: linear-gradient(to bottom, transparent 0%, white 20%, white 80%, transparent 100%);
        }
      `}</style>
    </section>
  );
};

export default CategoriesBento;