import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Menu, X, Plus, Minus } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import Sidebar from '../products/Sidebar';

const navLinks = [
  { name: 'Products', href: '/products' },
  { name: 'Contact', href: '/contact' },
  { name: 'Order', href: '/order' },
];

const productCategories = [
  { name: 'International', href: '/categories/international' },
  { name: 'Retro', href: '/categories/retro' },
  { name: 'Seasonal', href: '/categories/seasonal' },
  { name: 'Women', href: '/categories/womens' },
  { name: 'Kids', href: '/categories/kids' },
];

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [productsAccordionOpen, setProductsAccordionOpen] = useState(false);
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
          <Link
            to="/"
            className="text-xl md:text-2xl font-bold tracking-wide select-none"
            style={{ fontFamily: "'Crospor', sans-serif" }}
          >
            <span className="text-dark-gray">KICK</span>
            <span className="text-light-gray">OFF</span>
          </Link>
        </div>


        {/* Center Nav Links & Let'sTalk (hidden on mobile) */}
        <div
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:flex items-center justify-center transition-all duration-300 hidden md:block
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
          {/* Hamburger for mobile (moved here) */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg border border-light-gray bg-transparent hover:bg-white transition z-50"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6 text-dark-gray" />
          </button>
        </div>
      </nav>

      {/* Sidebar for mobile nav */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <aside
            className="fixed top-0 right-0 h-full w-72 max-w-full bg-white z-50 shadow-lg flex flex-col p-6 animate-slideIn"
            style={{ animation: 'slideIn 0.3s cubic-bezier(0.4,0,0.2,1)' }}
          >
            <button
              className="self-end mb-6 text-dark-gray text-2xl px-2 py-1 rounded-full hover:bg-light-gray/30 transition"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
            <ul className="flex flex-col gap-4">
              {/* Products Accordion */}
              <li>
                <button
                  className="w-full flex items-center justify-between text-base font-semibold text-dark-gray py-2 px-2 rounded hover:bg-light-gray/30 transition"
                  onClick={() => setProductsAccordionOpen((v) => !v)}
                  aria-expanded={productsAccordionOpen}
                  aria-controls="products-accordion"
                >
                  Products
                  {/* Plus/Minus icon for accordion */}
                  <span className="ml-2 transition-transform">
                    {productsAccordionOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </span>
                </button>
                {productsAccordionOpen && (
                  <ul id="products-accordion" className="pl-4 mt-2 flex flex-col gap-2">
                    {productCategories.map((cat) => (
                      <li key={cat.name}>
                        <Link
                          to={cat.href}
                          className="block text-medium-gray py-1 px-2 rounded hover:bg-light-gray/30 transition"
                          onClick={() => setSidebarOpen(false)}
                        >
                          {cat.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              {/* Other nav links */}
              {navLinks.filter(l => l.name !== 'Products').map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="block text-base font-semibold text-dark-gray py-2 px-2 rounded hover:bg-light-gray/30 transition"
                    onClick={() => setSidebarOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              {/* Let's Talk Button */}
              <li>
                <a
                  href="#calltoaction"
                  className="block text-base font-semibold text-dark-gray py-2 px-2 rounded hover:bg-light-gray/30 transition"
                  onClick={() => setSidebarOpen(false)}
                >
                  Let'sTalk
                </a>
              </li>
            </ul>
          </aside>
          <style>{`
            @keyframes slideIn {
              0% { transform: translateX(100%); opacity: 0; }
              100% { transform: translateX(0); opacity: 1; }
            }
          `}</style>
        </>
      )}

      {/* Sidebar Cart Dropdown */}
      <Sidebar />

      {/* Search Panel */}
      {searchOpen && (
        <>
          <div className="fixed left-0 right-0 bottom-0 h-20 z-40" onClick={() => setSearchOpen(false)} />
          <div
            className="fixed left-0 right-0 top-[64px] bottom-80 z-50 bg-white border-t border-light-gray flex flex-col animate-slideDown max-h-[100vh] overflow-y-auto"
            style={{ animation: 'slideDown 0.4s cubic-bezier(0.4,0,0.2,1)' }}
          >
            <div className="max-w-5xl mx-auto w-full px-2 sm:px-4">
              <div className="flex items-center gap-4 py-4 sm:py-6 px-0">
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
              <div className="border-b border-light-gray w-full mb-6" />
            </div>
            {/* Main content: links left, images right, always side by side */}
            <div className="flex flex-1 mx-auto w-full px-2 sm:px-4 gap-4 sm:gap-8 overflow-y-auto">
              {/* Links section */}
              <div className="w-2/5 sm:w-1/4 min-w-[120px] flex-shrink-0">
                <h3 className="text-xs font-semibold text-medium-gray mb-4 sm:mb-6 tracking-widest">POPULAR</h3>
                <ul className="flex flex-col gap-2 sm:gap-4">
                  <li className="text-dark-gray text-sm cursor-pointer hover:underline whitespace-nowrap">International</li>
                  <li className="text-dark-gray text-sm cursor-pointer hover:underline whitespace-nowrap">Women</li>
                  <li className="text-dark-gray text-sm cursor-pointer hover:underline whitespace-nowrap">Retro kits</li>
                  <li className="text-dark-gray text-sm cursor-pointer hover:underline whitespace-nowrap">Seasonal</li>
                </ul>
              </div>
              {/* Images section */}
              <div className="flex-1 flex flex-col">
                <h3 className="text-xs font-semibold text-medium-gray mb-4 sm:mb-6 tracking-widest">We think you might like</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white border border-light-gray rounded-lg p-2 sm:p-4 flex flex-col items-center">
                      <div className="w-20 h-20 sm:w-32 sm:h-40 bg-light-gray rounded mb-2 sm:mb-3" />
                      <div className="w-full flex flex-col items-start">
                        <div className="text-xs font-bold text-medium-gray mb-1">SALE</div>
                        <div className="h-2 w-3/4 bg-light-gray rounded mb-1" />
                        <div className="h-1 w-1/2 bg-light-gray rounded mb-1" />
                        <div className="flex gap-1 mt-2">
                          <div className="w-3 h-3 rounded bg-dark-gray" />
                          <div className="w-3 h-3 rounded bg-light-gray" />
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
