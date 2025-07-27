import React, { useRef, useState, useEffect } from 'react';
import internationalImage from '../../assets/PromoSelect/International.jpeg';
import argentinaImg from '../../assets/International/arg.png';
import franceImg from '../../assets/International/france.png';
import ProductCard from '../../components/(Shop)/products/ProductCard';

const internationalProducts = [
  {
    name: 'Argentina 2022 World Cup Home Jersey',
    price: 99.99,
    badge: 'BARÇA EXCLUSIVE',
    image: argentinaImg,
  },
  {
    name: 'France 2022 World Cup Home Jersey',
    price: 99.99,
    badge: 'BARÇA EXCLUSIVE',
    image: franceImg,
  },
  {
    name: 'Brazil 2022 Home Jersey',
    price: 89.99,
    badge: 'BARÇA EXCLUSIVE',
    image: argentinaImg,
  },
  {
    name: 'Germany 2022 Home Jersey',
    price: 89.99,
    badge: 'BARÇA EXCLUSIVE',
    image: franceImg,
  },
  {
    name: 'Spain 2022 Home Jersey',
    price: 89.99,
    badge: 'BARÇA EXCLUSIVE',
    image: argentinaImg,
  },
  {
    name: 'England 2022 Home Jersey',
    price: 89.99,
    badge: 'BARÇA EXCLUSIVE',
    image: franceImg,
  },
  {
    name: 'Portugal 2022 Home Jersey',
    price: 89.99,
    badge: 'BARÇA EXCLUSIVE',
    image: argentinaImg,
  },
  {
    name: 'Netherlands 2022 Home Jersey',
    price: 89.99,
    badge: 'BARÇA EXCLUSIVE',
    image: franceImg,
  },
];

const DOTS_COLOR_ACTIVE = '#2B2B2B';
const DOTS_COLOR_INACTIVE = '#B3B3B3';

const International = () => {
    const scrollRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const products = internationalProducts;
    const visibleCards = 3; // Number of cards visible at once

    const checkScroll = () => {
        const el = scrollRef.current;
        if (!el) return;
        setCanScrollLeft(el.scrollLeft > 0);
        setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
        // Calculate active dot
        const cardWidth = el.firstChild ? el.firstChild.offsetWidth + 16 : 1; // 16px gap
        setActiveIndex(Math.round(el.scrollLeft / cardWidth));
    };

    useEffect(() => {
        checkScroll();
        const el = scrollRef.current;
        if (!el) return;
        el.addEventListener('scroll', checkScroll);
        window.addEventListener('resize', checkScroll);
        return () => {
            el.removeEventListener('scroll', checkScroll);
            window.removeEventListener('resize', checkScroll);
        };
    }, []);

    const scrollByAmount = (amount) => {
        scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    };

    // Hide scrollbar CSS
    const hideScrollbar = {
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
    };

    // Dot count logic
    const dotCount = Math.ceil(products.length / visibleCards);

    return (
        <div className="min-h-screen">
            {/* Top Section - International Hero */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <img
                    src={internationalImage}
                    alt="International"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-dark-gray/40"></div>
                {/* Content */}
                <div className="relative z-10 text-center px-8 max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-wider text-white mb-8 drop-shadow-lg">
                        International
                    </h1>
                    <button className="bg-white text-dark-gray px-8 py-4 rounded-lg font-semibold uppercase tracking-wide hover:bg-light-gray transition-colors duration-300 inline-flex items-center">
                        SHOP NOW
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>
                </div>
            </section>

            {/* Bottom Section - Scrollable Product Cards */}
            <section className="bg-dark-gray py-12 px-4 relative">
                {/* Left Arrow */}
                {canScrollLeft && (
                    <button
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white text-dark-gray rounded-full shadow p-2 hover:bg-light-gray transition"
                        onClick={() => scrollByAmount(-220)}
                        aria-label="Scroll left"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                )}
                {/* Right Arrow */}
                {canScrollRight && (
                    <button
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white text-dark-gray rounded-full shadow p-2 hover:bg-light-gray transition"
                        onClick={() => scrollByAmount(220)}
                        aria-label="Scroll right"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                )}
                <div
                    ref={scrollRef}
                    className="flex overflow-x-auto gap-4 pb-2 scrollbar-hide scroll-smooth"
                    style={{ ...hideScrollbar, scrollBehavior: 'smooth' }}
                >
                    {products.map((product, idx) => (
                        <ProductCard key={idx} {...product} />
                    ))}
                </div>
                {/* Dot Indicator */}
                <div className="flex justify-center mt-6 gap-2">
                    {Array.from({ length: dotCount }).map((_, i) => (
                        <span
                            key={i}
                            style={{
                                width: 12,
                                height: 12,
                                borderRadius: '50%',
                                display: 'inline-block',
                                background: i === activeIndex ? DOTS_COLOR_ACTIVE : DOTS_COLOR_INACTIVE,
                                transition: 'background 0.2s',
                            }}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default International;
