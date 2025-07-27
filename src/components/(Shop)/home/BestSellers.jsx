import React from 'react';
import barcaImg from '../../../assets/bestSellers/barca.jpeg';
import messiImg from '../../../assets/bestSellers/messi.jpeg';
import psgImg from '../../../assets/bestSellers/psg.jpeg';
import rmImg from '../../../assets/bestSellers/rm.jpeg';
import mancImg from '../../../assets/bestSellers/manc.jpeg';
import ProductCard from '../products/ProductCard';

const bestSellers = [
  {
    name: 'Barca Home Jersey',
    price: 'Rs 8,999',
    img: barcaImg,
    colors: ['#1A237E', '#B71C1C'],
  },
  {
    name: 'Messi PSG Jersey',
    price: 'Rs 9,499',
    img: messiImg,
    colors: ['#0D1333', '#E53935'],
  },
  {
    name: 'PSG Away Jersey',
    price: 'Rs 8,499',
    img: psgImg,
    colors: ['#FFFFFF', '#0D1333'],
  },
  {
    name: 'Real Madrid Home Jersey',
    price: 'Rs 8,999',
    img: rmImg,
    colors: ['#FFFFFF', '#FFD600'],
  },
  {
    name: 'Man City Home Jersey',
    price: 'Rs 8,499',
    img: mancImg,
    colors: ['#98C1D9', '#FFFFFF'],
  },
];

const BestSellers = () => {
  return (
    <section className="w-full bg-white py-12 px-2 md:px-8 relative z-30" style={{ background: '#fff' }}>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-dark-gray" style={{ fontFamily: 'var(--font-primary)' }}>
          BEST SELLERS
        </h2>
        <a href="#" className="text-dark-gray text-base font-medium underline underline-offset-4 hover:text-medium-gray transition-colors duration-200">
          SHOP ALL
        </a>
      </div>
      <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-light-gray scrollbar-track-white">
        {bestSellers.map((item, idx) => (
          <ProductCard
            key={idx}
            name={item.name}
            price={parseInt(item.price.replace(/[^\d]/g, ''))}
            image={item.img}
            onClick={() => {}}
          />
        ))}
      </div>
    </section>
  );
};

export default BestSellers; 