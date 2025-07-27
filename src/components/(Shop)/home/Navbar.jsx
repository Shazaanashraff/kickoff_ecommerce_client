import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import Sidebar from '../products/Sidebar';

const navLinks = [
  { name: 'Products', href: '/products' },
  { name: 'About', href: '/about' },
  { name: 'Order', href: '/order' },
];

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { getTotalItems, toggleCart } = useCart();
  const cartItemCount = getTotalItems();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      navigate(`/products?search=${encodeURIComponent(searchValue)}`);
      setSearchOpen(false);
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 md:px-12 py-3 bg-transparent" style={{ minHeight: '64px' }}>
        {/* Brand/Logo */}
        <div className="flex items-center min-w-[120px]">
          <Link to="/" className="text-xl md:text-2xl font-bold tracking-wide select-none" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            <span className="text-dark-gray">KICK</span>
            <span className="text-light-gray">OFF</span>
          </Link>
        </div>

        {/* Center Nav Links & Let'sTalk */}
        <div
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-300
            ${scrolled ? 'glass-marble' : 'hover:glass-marble'}
          `}
          style={{ minHeight: '48px', maxWidth: '900px' }}
        >
          <ul className="flex items-center gap-8 md:gap-12">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.href}
                  className={`text-base md:text-lg font-semibold px-2 py-1 rounded-full transition-all duration-200
                    ${location.pathname === link.href ? 'text-dark-gray' : 'text-medium-gray'}
                    hover:bg-white hover:shadow-md hover:scale-105
                  `}
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            {/* Let's Talk Button */}
            <li>
              <a
                href="#calltoaction"
                className={`text-base md:text-lg font-semibold px-2 py-1 rounded-full transition-all duration-200 bg-transparent border-none shadow-none ml-2 text-dark-gray
                  hover:bg-white hover:shadow-md hover:scale-105
                `}
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                Let'sTalk
              </a>
            </li>
          </ul>
        </div>

        {/* Right Side: Search & Cart */}
        <div className="flex items-center gap-4 md:gap-6 ml-8 transition-all duration-300">
          {/* Search Icon */}
          <div
            className={`w-9 h-9 flex items-center justify-center rounded-lg border border-light-gray transition-all duration-200
              ${scrolled ? 'bg-dark-gray/95 shadow-lg' : 'hover:bg-white hover:shadow-md hover:scale-105'}
            `}
          >
            <button
              className="p-0 m-0 bg-transparent text-dark-gray focus:outline-none"
              onClick={() => setSearchOpen((v) => !v)}
              aria-label="Open search"
            >
              <Search className="w-5 h-5 text-dark-gray" />
            </button>
          </div>
          {/* Cart Icon */}
          <div
            className={`w-9 h-9 flex items-center justify-center rounded-lg border border-light-gray transition-all duration-200 relative
              ${scrolled ? 'bg-dark-gray/95 shadow-lg' : 'hover:bg-white hover:shadow-md hover:scale-105'}
            `}
          >
            <button
              className="p-0 m-0 bg-transparent text-dark-gray focus:outline-none"
              onClick={toggleCart}
              aria-label="Open cart"
            >
              <ShoppingBag className="w-5 h-5 text-dark-gray" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-dark-gray text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar Cart Dropdown */}
      <Sidebar />

      {/* Search Panel */}
      {searchOpen && (
        <>
          <div className="fixed left-0 right-0 bottom-0 h-20 z-40" onClick={() => setSearchOpen(false)} />
          <div
            className="fixed left-0 right-0 top-[64px] bottom-30 z-50 bg-white border-t border-light-gray flex flex-col animate-slideDown"
            style={{ animation: 'slideDown 0.4s cubic-bezier(0.4,0,0.2,1)' }}
          >
            <div className="max-w-5xl mx-auto w-full">
              <div className="flex items-center gap-4 py-6 px-0">
                <div className="flex-1 flex items-center gap-4">
                  <Search className="w-6 h-6 text-medium-gray" />
                  <input
                    autoFocus
                    type="text"
                    value={searchValue}
                    onChange={e => setSearchValue(e.target.value)}
                    placeholder="Search products..."
                    className="flex-1 bg-transparent outline-none border-none text-dark-gray placeholder-medium-gray text-base"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    onKeyDown={handleSearchKeyDown}
                  />
                </div>
                <button
                  onClick={() => setSearchOpen(false)}
                  className="text-dark-gray text-2xl px-2 py-1 rounded-full hover:bg-light-gray/30 transition"
                  aria-label="Close search"
                >
                  &#10005;
                </button>
              </div>
              <div className="border-b border-light-gray w-full" />
            </div>
            <div className="flex flex-1 py-8 gap-12 max-w-5xl mx-auto w-full overflow-y-auto">
              <div className="w-1/4 min-w-[140px]">
                <h3 className="text-xs font-semibold text-medium-gray mb-6 tracking-widest">POPULAR</h3>
                <ul className="space-y-4">
                  <li className="text-dark-gray text-sm cursor-pointer hover:underline">Internatioanl</li>
                  <li className="text-dark-gray text-sm cursor-pointer hover:underline">Women</li>
                  <li className="text-dark-gray text-sm cursor-pointer hover:underline">Retro kits</li>
                  <li className="text-dark-gray text-sm cursor-pointer hover:underline">Seasonal</li>
                </ul>
              </div>
              <div className="flex-1">
                <h3 className="text-xs font-semibold text-medium-gray mb-6 tracking-widest">We think you might like</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white border border-light-gray rounded-lg p-3 flex flex-col items-center">
                      <div className="w-24 h-32 bg-light-gray rounded mb-3" />
                      <div className="w-full flex flex-col items-start">
                        <div className="text-xs font-bold text-medium-gray mb-1">SALE</div>
                        <div className="h-3 w-3/4 bg-light-gray rounded mb-1" />
                        <div className="h-2 w-1/2 bg-light-gray rounded mb-1" />
                        <div className="flex gap-2 mt-2">
                          <div className="w-4 h-4 rounded bg-dark-gray" />
                          <div className="w-4 h-4 rounded bg-light-gray" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <style>{`
            @keyframes slideDown {
              0% { transform: translateY(-40px); opacity: 0; }
              100% { transform: translateY(0); opacity: 1; }
            }
          `}</style>
        </>
      )}

      {/* Add marble effect utility class */}
      <style>{`
        .glass-marble {
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-radius: 1rem;
          padding: 0.5rem 1.5rem;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </>
  );
};

export default Navbar;
