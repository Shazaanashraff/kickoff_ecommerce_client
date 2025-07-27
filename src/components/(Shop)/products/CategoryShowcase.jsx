import React from 'react';
import kidsImg from '../../../assets/Categories/kids.jpeg';
import accImg from '../../../assets/Categories/acc.jpg';
import colImg from '../../../assets/Categories/col.jpeg';

const categories = [
  {
    label: 'NEW IN',
    title: 'HOME KIT',
    image: kidsImg,
    accent: true,
  },
  {
    label: '',
    title: 'ACCESSORIES',
    image: accImg,
    accent: false,
  },
  {
    label: '',
    title: 'SPECIAL EDITION',
    image: colImg,
    accent: false,
  },
];

const CategoryShowcase = () => (
  <div className="w-full bg-dark-gray py-12 flex justify-center">
    <div className="grid grid-cols-[30%_30%_40%] gap-[2px] w-full max-w-7xl">
      {categories.map((cat, idx) => (
        <div
          key={idx}
          className="relative overflow-hidden group shadow-lg min-h-[500px] flex items-end"
          style={{ background: '#181633' }}
        >
          <img
            src={cat.image}
            alt={cat.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            style={{ zIndex: 1 }}
          />
          {/* Dark overlay on hover */}
          <div className="absolute inset-0 transition-colors duration-300 group-hover:bg-black/40" style={{ zIndex: 2 }} />
          <div className="relative z-10 p-8 flex flex-col items-start w-full">
            {cat.accent && (
              <span className="text-yellow-400 text-lg font-bold mb-2 uppercase tracking-wide">NEW IN</span>
            )}
            <span className="text-white text-3xl md:text-4xl font-extrabold uppercase tracking-tight leading-tight drop-shadow-lg">
              {cat.title}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default CategoryShowcase; 