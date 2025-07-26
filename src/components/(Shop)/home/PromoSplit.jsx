import React from 'react';
// Placeholder image, swap as needed
import International from '../../../assets/PromoSelect/International.jpeg';
import Clubs from '../../../assets/PromoSelect/Clubs.jpeg';


const PromoSplit = () => {
  return (
    <>
      <section className="w-full bg-white min-h-[70vh] flex flex-col md:flex-row items-stretch justify-center z-30 relative">
        {/* Left: Image */}
        <div className="md:w-1/2 w-full flex items-center justify-center bg-gray-100">
          <img
            src={International}
            alt="Promo visual"
            className="object-cover w-full h-full max-h-[500px] md:max-h-none md:rounded-none rounded-b-lg shadow-md"
          />
        </div>
        {/* Right: Content */}
        <div className="md:w-1/2 w-full flex flex-col justify-center items-start px-6 md:px-16 py-12 md:py-0 gap-6">
          <span className="uppercase text-xs tracking-widest text-medium-gray font-semibold mb-2">Perfume Minis</span>
          <h2 className="text-3xl md:text-5xl font-bold text-dark-gray leading-tight mb-4">
            Build Your Own Mini Set
          </h2>
          <blockquote className="text-base md:text-lg text-medium-gray font-medium mb-2 border-l-4 border-dark-gray pl-4">
            "You can always layer the spritzes for a fragrant impression that’s entirely personal to you."
          </blockquote>
          <span className="text-sm text-dark-gray mb-6">— Byrdie</span>
          <button className="px-8 py-2 border border-dark-gray text-dark-gray text-sm font-medium rounded-none hover:bg-dark-gray hover:text-white transition-colors">
            DISCOVER
          </button>
        </div>
      </section>
      {/* New Section: Radical Caps */}
      <section className="w-full bg-white min-h-[70vh] flex flex-col md:flex-row items-stretch justify-center border-t border-gray-100 z-30 relative">
        {/* Left: Content */}
        <div className="md:w-1/2 w-full flex flex-col justify-center items-start px-6 md:px-16 py-12 md:py-0 gap-6">
          <span className="uppercase text-xs tracking-widest text-medium-gray font-semibold mb-2">From Bio-Plastic to Biotech</span>
          <h2 className="text-3xl md:text-5xl font-bold text-dark-gray leading-tight mb-4">
            Radical Caps
          </h2>
          <p className="text-base md:text-lg text-medium-gray font-normal mb-6 max-w-xl">
            Introducing our new perfume caps—circular step forward. Made from Vivomer, a biotech non-plastic material that is fully home compostable. The caps enzymatically break down over 20 weeks when returned to nature, leaving no trace.
          </p>
          <button className="px-8 py-2 border border-dark-gray text-dark-gray text-sm font-medium rounded-none hover:bg-dark-gray hover:text-white transition-colors">
            READ MORE
          </button>
        </div>
        {/* Right: Image */}
        <div className="md:w-1/2 w-full flex items-center justify-center bg-gray-100">
          {/* Placeholder image, swap as needed */}
          <img
            src={Clubs}
            alt="Radical Cap visual"
            className="object-cover w-full h-full max-h-[500px] md:max-h-none md:rounded-none rounded-b-lg shadow-md"
          />
        </div>
      </section>
    </>
  );
};

export default PromoSplit; 