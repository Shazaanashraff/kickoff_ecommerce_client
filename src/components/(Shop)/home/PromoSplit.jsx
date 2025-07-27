import React from 'react';
import { useNavigate } from 'react-router-dom';
import OwnJersey from '../../../assets/PromoSelect/OwnJersey.jpeg';
import Clubs from '../../../assets/PromoSelect/Clubs.jpeg';

const PromoSplit = () => {
  const navigate = useNavigate();

  const handleContactUs = () => {
    navigate('/about');
  };

  const handleShopNow = () => {
    navigate('/products');
  };

  const handleLearnMore = () => {
    navigate('/compare');
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
      {/* Player Version Experience Section */}
      <section className="w-full bg-white min-h-[70vh] flex flex-col md:flex-row items-stretch justify-center border-t border-gray-100 z-30 relative">
        {/* Left: Content */}
        <div className="md:w-1/2 w-full flex flex-col justify-center items-start px-6 md:px-16 py-12 md:py-0 gap-6">
          <span className="uppercase text-xs tracking-widest text-[var(--color-medium-gray)] font-semibold mb-2">Feel the Difference</span>
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-dark-gray)] leading-tight mb-4">
            Experience Player Version Jersey
          </h2>
          <p className="text-base md:text-lg text-[var(--color-medium-gray)] font-normal mb-2 max-w-xl">
            Step onto the pitch—or into the stands—with the same advanced technology, fit, and lightweight comfort as the pros. The Player Version Jersey is engineered for performance, featuring moisture-wicking fabric, precision fit, and authentic details. Discover what it feels like to wear the real thing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleLearnMore}
              className="px-6 py-2 border border-[var(--color-dark-gray)] text-[var(--color-dark-gray)] text-sm font-medium rounded-none hover:bg-[var(--color-dark-gray)] hover:text-[var(--color-white)] transition-all duration-300 hover:scale-105"
            >
              Learn More about Fan vs Player Version
            </button>
            <button 
              onClick={handleShopNow}
              className="px-8 py-2 border border-[var(--color-dark-gray)] text-[var(--color-dark-gray)] text-sm font-medium rounded-none hover:bg-[var(--color-dark-gray)] hover:text-[var(--color-white)] transition-all duration-300 hover:scale-105"
            >
              SHOP NOW
            </button>
          </div>
        </div>
        {/* Right: Image */}
        <div className="md:w-1/2 w-full flex items-center justify-center bg-gray-100">
          <img
            src={Clubs}
            alt="Player Version Jersey"
            className="object-cover w-full h-full max-h-[500px] md:max-h-none md:rounded-none rounded-b-lg shadow-md"
          />
        </div>
      </section>
    </>
  );
};

export default PromoSplit; 