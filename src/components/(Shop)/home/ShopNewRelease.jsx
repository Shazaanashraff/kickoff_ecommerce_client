import React from 'react';
// Use your own images here
import new1 from '../../../assets/bestSellers/barca.jpeg';
import new2 from '../../../assets/bestSellers/messi.jpeg';
import new3 from '../../../assets/bestSellers/psg.jpeg';
import new4 from '../../../assets/bestSellers/rm.jpeg';
import ProductCard from '../products/ProductCard';

const newReleases = [
  {
    name: 'Barca Away Jersey 24/25',
    price: 'Rs 9,299',
    img: new1,
    isNew: true,
  },
  {
    name: 'Messi Inter Miami Jersey',
    price: 'Rs 10,499',
    img: new2,
    isNew: true,
  },
  {
    name: 'PSG Third Jersey 24/25',
    price: 'Rs 9,799',
    img: new3,
    isNew: true,
  },
  {
    name: 'Real Madrid Away Jersey',
    price: 'Rs 9,199',
    img: new4,
    isNew: true,
  },
];

const ShopNewReleases = () => {
  return (
    <section className="w-full bg-white py-12 px-2 md:px-8 relative z-30">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-dark-gray" style={{ fontFamily: 'var(--font-primary)' }}>
            NEW RELEASES
          </h2>
          <p className="text-sm text-medium-gray mt-1">Just Dropped</p>
        </div>
        <a href="#" className="text-dark-gray text-base font-medium underline underline-offset-4 hover:text-medium-gray transition-colors duration-200">
          SHOP ALL NEW
        </a>
      </div>
      <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-light-gray scrollbar-track-white">
        {newReleases.map((item, idx) => (
          <ProductCard
            key={idx}
            name={item.name}
            price={parseInt(item.price.replace(/[^\d]/g, ''))}
            badge={item.isNew ? 'NEW' : undefined}
            image={item.img}
            onClick={() => {}}
          />
        ))}
      </div>
    </section>
  );
};

export default ShopNewReleases;