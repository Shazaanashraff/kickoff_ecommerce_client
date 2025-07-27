import React, { useRef, useState, useEffect } from 'react';
import ProductCard from '../../components/(Shop)/products/ProductCard';
import CategoryShowcase from '../../components/(Shop)/products/CategoryShowcase';
import womCatImg from '../../assets/Categories/womCat.webp';

const womensProducts = [
  { name: "USWNT 2023 Home Jersey", price: 94.99, badge: "WOMEN'S EXCLUSIVE", image: womCatImg },
  { name: "England Lionesses 2023 Home Jersey", price: 94.99, badge: "WOMEN'S EXCLUSIVE", image: womCatImg },
  { name: "France Women 2023 Home Jersey", price: 89.99, badge: "WOMEN'S EXCLUSIVE", image: womCatImg },
  { name: "Spain Women 2023 Home Jersey", price: 89.99, badge: "WOMEN'S EXCLUSIVE", image: womCatImg },
  { name: "Germany Women 2023 Home Jersey", price: 89.99, badge: "WOMEN'S EXCLUSIVE", image: womCatImg },
  { name: "Brazil Women 2023 Home Jersey", price: 89.99, badge: "WOMEN'S EXCLUSIVE", image: womCatImg },
  { name: "Italy Women 2023 Home Jersey", price: 89.99, badge: "WOMEN'S EXCLUSIVE", image: womCatImg },
  { name: "Netherlands Women 2023 Home Jersey", price: 89.99, badge: "WOMEN'S EXCLUSIVE", image: womCatImg },
];

const Womens = () => {
  const [isHovered, setIsHovered] = useState(false);
  const leftColRef = useRef(null);
  const rightImgRef = useRef(null);

  // Dynamically set the right image height to match the left column
  useEffect(() => {
    if (leftColRef.current && rightImgRef.current) {
      const leftHeight = leftColRef.current.offsetHeight;
      rightImgRef.current.style.height = leftHeight + 'px';
    }
    // Also update on window resize
    const handleResize = () => {
      if (leftColRef.current && rightImgRef.current) {
        const leftHeight = leftColRef.current.offsetHeight;
        rightImgRef.current.style.height = leftHeight + 'px';
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Hide vertical scrollbar CSS
  const hideScrollbar = {
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
  };

  return (
    <>
      <div className="min-h-screen flex flex-col md:flex-row items-stretch justify-between bg-white py-12 px-4 md:px-16 gap-8">
        {/* Left: Product Cards */}
        <div ref={leftColRef} className="flex-1 flex flex-col items-start justify-center">
          <h2 className="text-3xl md:text-4xl font-bold text-dark-gray mb-4">Women's Football Jerseys</h2>
          <p className="text-medium-gray mb-6 max-w-lg">
            Celebrate the spirit of women's football with our exclusive collection of national and club jerseys, designed for performance and style. Show your support.
          </p>
          <button
            className="px-8 py-3 font-semibold uppercase tracking-wide mb-6 transition-colors duration-300"
            style={{
              backgroundColor: isHovered ? 'var(--color-medium-gray)' : 'var(--color-dark-gray)',
              color: 'white',
              cursor: 'pointer',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Shop Now
          </button>
          <div className="relative w-full" style={{ maxWidth: 420 }}>
            <div className="grid grid-cols-2 gap-4 w-full overflow-y-auto" style={{ maxHeight: 440, ...hideScrollbar }}>
              {womensProducts.map((product, idx) => (
                <ProductCard key={idx} {...product} />
              ))}
            </div>
          </div>
          <div className="text-xs text-medium-gray mt-2">Scroll to see more &darr;</div>
        </div>
        {/* Right: Hero Image */}
        <div className="flex-1 flex items-stretch justify-center">
          <img
            ref={rightImgRef}
            src={womCatImg}
            alt="Women's Football Jerseys"
            className="w-full object-cover shadow-lg"
            style={{ borderRadius: 0, width: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>
      <CategoryShowcase />
    </>
  );
};

export default Womens;
