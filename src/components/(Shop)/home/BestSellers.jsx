import React from 'react';
import barcaImg from '../../../assets/bestSellers/barca.jpeg';
import messiImg from '../../../assets/bestSellers/messi.jpeg';
import psgImg from '../../../assets/bestSellers/psg.jpeg';
import rmImg from '../../../assets/bestSellers/rm.jpeg';
import mancImg from '../../../assets/bestSellers/manc.jpeg';

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
          <div key={idx} className="min-w-[220px] max-w-[240px] bg-white border border-light-gray rounded-lg flex-shrink-0 flex flex-col items-center p-4">
            <img src={item.img} alt={item.name} className="w-full h-56 object-contain mb-4" />
            <div className="w-full">
              <h3 className="text-base font-semibold text-dark-gray mb-1" style={{ fontFamily: 'var(--font-primary)' }}>{item.name}</h3>
              <p className="text-sm text-medium-gray mb-2">{item.price}</p>
              <div className="flex gap-2">
                {item.colors.map((color, i) => (
                  <span key={i} className="w-6 h-6 border border-light-gray rounded inline-block" style={{ background: color }}></span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BestSellers; 