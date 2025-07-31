import React from 'react';
import barcaImg from '../../../assets/bestSellers/barca.png';
import messiImg from '../../../assets/bestSellers/messi.png';
import psgImg from '../../../assets/bestSellers/psg.png';
import rmImg from '../../../assets/bestSellers/rm.png';
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full">
        {bestSellers.map((item, idx) => (
          <ProductCard
            key={idx}
            name={item.name}
            price={parseInt(item.price.replace(/[^\d]/g, ''))}
            image={item.img}
            onClick={() => {}}
            large
          />
        ))}
      </div>
    </section>
  );
};

export default BestSellers; 