import React from 'react';
import { useNavigate } from 'react-router-dom';
// Update the import to use OwnJersey.jpeg
import OwnJersey from '../../../assets/PromoSelect/OwnJersey.jpeg';
import Clubs from '../../../assets/PromoSelect/Clubs.jpeg';

const PromoSplit = () => {
  const navigate = useNavigate();

  const handleContactUs = () => {
    navigate('/about'); // Navigate to the about page which likely has contact info
  };

  const handleShopNow = () => {
    navigate('/products'); // Navigate to products page
  };

  return (
    <>
      <section className="w-full bg-white min-h-[70vh] flex flex-col md:flex-row items-stretch justify-center z-30 relative">
        {/* Left: Image */}
        <div className="md:w-1/2 w-full flex items-center justify-center bg-gray-100">
          <img
            src={OwnJersey}
            alt="Custom Jersey Design"
            className="object-cover w-full h-full max-h-[500px] md:max-h-none md:rounded-none rounded-b-lg shadow-md"
          />
        </div>
        {/* Right: Content */}
        <div className="md:w-1/2 w-full flex flex-col justify-center items-start px-6 md:px-16 py-12 md:py-0 gap-6">
          <span className="uppercase text-xs tracking-widest text-[var(--color-medium-gray)] font-semibold mb-2">Custom Design</span>
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-dark-gray)] leading-tight mb-4">
            Create Your Own Custom Jersey
          </h2>
          <blockquote className="text-base md:text-lg text-[var(--color-medium-gray)] font-medium mb-2 border-l-4 border-[var(--color-dark-gray)] pl-4">
            "Design your dream jersey with personalized colors, logos, and team names. Make it uniquely yours."
          </blockquote>
          <span className="text-sm text-[var(--color-dark-gray)] mb-6">— Kickoff Store</span>
          <button 
            onClick={handleContactUs}
            className="px-8 py-3 border border-[var(--color-dark-gray)] text-[var(--color-dark-gray)] text-sm font-medium rounded-none hover:bg-[var(--color-dark-gray)] hover:text-[var(--color-white)] transition-all duration-300 hover:scale-105"
          >
            CONTACT US
          </button>
        </div>
      </section>
      {/* New Section: Sports & Accessories */}
      <section className="w-full bg-white min-h-[70vh] flex flex-col md:flex-row items-stretch justify-center border-t border-gray-100 z-30 relative">
        {/* Left: Content */}
        <div className="md:w-1/2 w-full flex flex-col justify-center items-start px-6 md:px-16 py-12 md:py-0 gap-6">
          <span className="uppercase text-xs tracking-widest text-[var(--color-medium-gray)] font-semibold mb-2">Complete Your Look</span>
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-dark-gray)] leading-tight mb-4">
            Sports & Accessories
          </h2>
          <p className="text-base md:text-lg text-[var(--color-medium-gray)] font-normal mb-6 max-w-xl">
            Complete your sports ensemble with our premium collection of accessories. From training gear to match day essentials, we have everything you need to perform at your best. Quality materials and expert craftsmanship in every piece.
          </p>
          <button 
            onClick={handleShopNow}
            className="px-8 py-3 border border-[var(--color-dark-gray)] text-[var(--color-dark-gray)] text-sm font-medium rounded-none hover:bg-[var(--color-dark-gray)] hover:text-[var(--color-white)] transition-all duration-300 hover:scale-105"
          >
            SHOP NOW
          </button>
        </div>
        {/* Right: Image */}
        <div className="md:w-1/2 w-full flex items-center justify-center bg-gray-100">
          <img
            src={Clubs}
            alt="Sports and Accessories"
            className="object-cover w-full h-full max-h-[500px] md:max-h-none md:rounded-none rounded-b-lg shadow-md"
          />
        </div>
      </section>
    </>
  );
};

export default PromoSplit; 