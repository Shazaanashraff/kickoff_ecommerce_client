import React from 'react';
import img1 from '../../assets/images.jpg'; // Events
import img2 from '../../assets/428df5dc.webp'; // Animation
import img3 from '../../assets/Arsenal.jpg'; // Fashion
import img4 from '../../assets/realMadrid.jpg'; // Commercial

const categories = [
  {
    name: 'International',
    desc: 'Shop the latest national team jerseys from around the world.',
    image: img1,
    gridClass: 'col-span-3 row-span-2',
    headingColor: 'text-teal-300'
  },
  {
    name: 'Retro kits',
    desc: 'Classic throwback jerseys for true collectors.',
    image: img2,
    gridClass: 'col-span-2 row-span-2',
    headingColor: 'text-purple-300'
  },
  {
    name: 'Seasonal Clubs',
    desc: 'Get the newest 24/25 season kits of European top 5 leagues.',
    image: img3,
    gridClass: 'col-span-2 row-span-2',
    headingColor: 'text-pink-300'
  },
  {
    name: 'Womens Kits',
    desc: 'Top picks for women\'s football fans',
    image: img4,
    gridClass: 'col-span-3 row-span-2',
    headingColor: 'text-yellow-300'
  }
];

const CategoriesBento = () => {
  return (
    <section className="max-w-7xl mx-auto py-20 px-4">
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center font-sans tracking-tight">
        Shop by Category
      </h2>

      <div className="grid grid-cols-5 auto-rows-[160px] gap-5">
        {categories.map((category, i) => (
          <div
            key={i}
            className={`group relative overflow-hidden rounded-3xl border border-white/20 backdrop-blur-sm ${category.gridClass} cursor-pointer transition-shadow duration-500 hover:shadow-2xl`}
          >
            {/* Background Image */}
            <img
              src={category.image}
              alt={category.name}
              className="absolute inset-0 w-full h-full object-cover rounded-3xl transition-transform duration-700 ease-in-out group-hover:scale-110 group-hover:opacity-30"
            />

            {/* Shine Animation */}
            <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
              <div className="shine-effect"></div>
            </div>

            {/* Striped Glass Overlay - only on hover */}
            <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/70">
              <div className="w-full h-full bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.07)_0px,rgba(255,255,255,0.07)_2px,transparent_2px,transparent_48px)] rounded-3xl border border-white/30 mask-stripe-fade"></div>
            </div>

            {/* Text Content */}
            <div className="relative z-30 h-full w-full p-6 flex flex-col justify-end">
              <div className="transition-all duration-500 ease-in-out transform group-hover:-translate-y-2">
                <h3 className={`text-2xl font-bold drop-shadow-md ${category.headingColor}`}>
                  {category.name}
                </h3>
                <p className="text-white/80 text-sm mt-2 drop-shadow-md transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0">
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