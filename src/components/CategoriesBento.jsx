import React from 'react';
import img1 from '../assets/images.jpg';
import img2 from '../assets/428df5dc.webp';
import img3 from '../assets/Arsenal.jpg';
import img4 from '../assets/realMadrid.jpg';
import img5 from '../assets/womens.jpg';

const categories = [
  {
    name: 'messi Kits',
    desc: 'Shop the latest national team jerseys from around the world.',
    image: img1,
    gridClass: 'md:col-span-2 md:row-span-2',
  },
  {
    name: 'Retro Kits',
    desc: 'Classic throwback jerseys for true collectors.',
    image: img2,
    gridClass: 'md:col-span-1 md:row-span-1',
  },
  {
    name: 'Premier League 24/25',
    desc: 'Get the newest Premier League season kits.',
    image: img3,
    gridClass: 'md:col-span-1 md:row-span-2',
  },
  {
    name: "Women's Kits",
    desc: 'Top picks for women\'s football fans.',
    image: img5,
    gridClass: 'md:col-span-1 md:row-span-1',
  },
  {
    name: 'LaLiga Kits',
    desc: 'Official jerseys from Spain\'s top clubs.',
    image: img4,
    gridClass: 'md:col-span-2 md:row-span-1',
  },
];

const CategoriesBento = () => {
  return (
    <section className="max-w-7xl mx-auto py-20 px-4">
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center font-sans tracking-tight">
        Shop by Category
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[200px] md:auto-rows-[200px] gap-6">
        {categories.map((category, i) => (
          <div
            key={i}
            className={`group relative overflow-hidden rounded-3xl ${category.gridClass} cursor-pointer transition-shadow duration-500 hover:shadow-2xl`}
          >
            {/* Background Image */}
            <img
              src={category.image}
              alt={category.name}
              className="absolute inset-0 w-full h-full object-cover rounded-3xl transition-transform duration-700 ease-in-out group-hover:scale-110"
            />

            {/* Shiny sweep animation */}
            <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
              <div className="shine-effect"></div>
            </div>

            {/* Striped Glass Overlay */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.06)_0px,rgba(255,255,255,0.06)_2px,transparent_2px,transparent_6px)] opacity-0 group-hover:opacity-100 transition-all duration-500 z-10" />

            {/* Text Content */}
            <div className="relative z-30 h-full w-full p-6 flex flex-col justify-end">
              <div className="transition-all duration-500 transform group-hover:-translate-y-2">
                <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                  {category.name}
                </h3>
                <p className="text-white/80 text-sm mt-2 drop-shadow-lg transition-all duration-500 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0">
                  {category.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add shine effect styles */}
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
            rgba(255, 255, 255, 0.4) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: skewX(-20deg);
          animation: shine 1s ease-in-out forwards;
          opacity: 0;
        }

        .group:hover .shine-effect {
          opacity: 1;
          animation: shine 1.2s ease-in-out forwards;
        }

        @keyframes shine {
          0% {
            left: -75%;
          }
          100% {
            left: 150%;
          }
        }
      `}</style>
    </section>
  );
};

export default CategoriesBento;
