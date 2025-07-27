import React, { useRef, useState, useEffect } from 'react';
import ProductCard from '../../components/(Shop)/products/ProductCard';
import retImg from '../../assets/Categories/ret.jpeg';
import retro1Img from '../../assets/Categories/retro1.png';
import retro2Img from '../../assets/Categories/retro2.png';

const retroProducts = [
  { name: 'FC Barcelona 1998/99 Retro Jersey', price: 129.99, badge: 'RETRO CLASSIC', image: retro1Img },
  { name: 'AC Milan 1988/89 Retro Jersey', price: 119.99, badge: 'RETRO CLASSIC', image: retro2Img },
];

const Retro = () => {
  const [isHovered, setIsHovered] = useState(false);
  const rightColRef = useRef(null);
  const leftImgRef = useRef(null);

  // Dynamically set the left image height to match the right column
  useEffect(() => {
    if (rightColRef.current && leftImgRef.current) {
      const rightHeight = rightColRef.current.offsetHeight;
      leftImgRef.current.style.height = rightHeight + 'px';
    }
    // Also update on window resize
    const handleResize = () => {
      if (rightColRef.current && leftImgRef.current) {
        const rightHeight = rightColRef.current.offsetHeight;
        leftImgRef.current.style.height = rightHeight + 'px';
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-stretch justify-between bg-white py-12 px-4 md:px-16 gap-8">
      {/* Left: Hero Image */}
      <div className="flex-1 flex items-stretch justify-center">
        <img
          ref={leftImgRef}
          src={retImg}
          alt="Retro Football Kits"
          className="w-full object-cover shadow-lg"
          style={{ borderRadius: 0, width: '100%', objectFit: 'cover' }}
        />
      </div>
      {/* Right: Product Cards and Info */}
      <div ref={rightColRef} className="flex-1 flex flex-col items-start justify-center">
        <div className="grid grid-cols-2 gap-4 w-full mb-6" style={{ maxWidth: 420 }}>
          {retroProducts.map((product, idx) => (
            <ProductCard key={idx} {...product} />
          ))}
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-dark-gray mb-2">Retro Kits</h2>
        <p className="text-medium-gray mb-4 max-w-md">
          Relive football history with our authentic retro kits, crafted for fans who cherish the legends and moments of the beautiful game.
        </p>
        <button
          className="px-8 py-3 font-semibold uppercase tracking-wide transition-colors duration-300 rounded-none bg-dark-gray text-white"
          style={{ cursor: 'pointer', backgroundColor: isHovered ? 'var(--color-medium-gray)' : 'var(--color-dark-gray)' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default Retro; 