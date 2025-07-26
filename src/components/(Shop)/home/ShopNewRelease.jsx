import React from 'react';
// Use your own images here
import new1 from '../../../assets/bestSellers/barca.jpeg';
import new2 from '../../../assets/bestSellers/messi.jpeg';
import new3 from '../../../assets/bestSellers/psg.jpeg';
import new4 from '../../../assets/bestSellers/rm.jpeg';

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
          <div key={idx} className="min-w-[220px] max-w-[240px] bg-white border border-light-gray rounded-lg flex-shrink-0 flex flex-col items-center p-4 relative">
            {item.isNew && (
              <span className="absolute top-3 left-3 bg-[#00FF99] text-black text-xs font-bold px-2 py-1 rounded-full z-10">
                NEW
              </span>
            )}
            <img src={item.img} alt={item.name} className="w-full h-56 object-contain mb-4" />
            <div className="w-full">
              <h3 className="text-base font-semibold text-dark-gray mb-1" style={{ fontFamily: 'var(--font-primary)' }}>{item.name}</h3>
              <p className="text-sm text-medium-gray mb-2">{item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShopNewReleases;