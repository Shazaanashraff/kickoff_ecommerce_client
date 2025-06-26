import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ShoppingBag } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import CartDropdown from './CartDropdown'

const navLinks = [
  { name: 'Products', href: '/products' },
  { name: 'About', href: '/about' },
  { name: 'Order', href: '/order' },

]

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const location = useLocation()
  const { getTotalItems, toggleCart } = useCart()
  const cartItemCount = getTotalItems()

  return (
    <>
      {/* Main Navbar */}
      <nav
        className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[96vw] max-w-4xl flex items-center justify-between px-4 py-1.5 rounded-full shadow-lg border border-white/20 bg-black/70 backdrop-blur-md"
        style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '13px' }}
      >
        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/"
            className="text-lg font-semibold tracking-wide text-white select-none"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            <span className="text-white">KICK</span>
            <span className="text-[#00FF99]">OFF</span>
          </Link>
        </motion.div>

        {/* Nav Links & CTA (hide when search is open) */}
        <AnimatePresence initial={false}>
          {!searchOpen && (
            <motion.div
              key="navlinks"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex items-center"
            >
              <ul className="hidden md:flex items-center justify-center flex-row flex-nowrap gap-[26px] h-[44px] w-min text-white text-sm font-semibold font-sans p-0 overflow-visible">
                {navLinks.map((link) => (
                  <li key={link.name} className="group relative flex items-center">
                    <Link
                      to={link.href}
                      className={`relative block text-sm font-semibold font-sans px-3 py-1 rounded-full transition-all duration-200 group-hover:text-[#00FF99] ${
                        location.pathname === link.href ? 'text-[#00FF99]' : 'text-white'
                      }`}
                      style={{ WebkitFontSmoothing: 'inherit', boxSizing: 'border-box', height: 'auto', width: 'auto', opacity: 1 }}
                    >
                      {link.name}
                      <span className={`absolute left-1/2 -translate-x-1/2 bottom-0 h-[2px] w-4/5 origin-center transform bg-[#00FF99] opacity-80 transition-transform duration-300 rounded-full ${
                        location.pathname === link.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}></span>
                    </Link>
                  </li>
                ))}
              </ul>
              
              {/* Cart Icon */}
              <div className="relative ml-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleCart}
                  className="relative p-2 text-white hover:text-[#00FF99] transition-colors"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <AnimatePresence>
                    {cartItemCount > 0 && (
                      <motion.div
                        key="badge"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute -top-1 -right-1 w-4 h-4 bg-[#00FF99] text-black text-xs font-bold rounded-full flex items-center justify-center"
                      >
                        {cartItemCount}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>

              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                className="bg-white text-black rounded-full px-4 py-1 text-xs font-semibold shadow transition hover:bg-gray-100 ml-2"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                Let's Talk
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Search Icon in its own glassy div, fixed to the right of the navbar */}
      <motion.div
        className="fixed top-3 right-[2vw] z-50 flex items-center justify-center"
        initial={false}
        animate={searchOpen ? { width: '96vw', left: '50%', right: 'auto', x: '-50%', borderRadius: '2.5rem', backgroundColor: 'rgba(0,0,0,0.8)' } : { width: '3.5rem', left: 'auto', x: 0, borderRadius: '9999px', backgroundColor: 'rgba(0,0,0,0.4)' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{ height: '56px', maxWidth: '64rem', boxShadow: '0 4px 24px rgba(0,0,0,0.15)', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(16px)' }}
      >
        <AnimatePresence initial={false}>
          {!searchOpen && (
            <motion.button
              key="searchicon"
              onClick={() => setSearchOpen(true)}
              className="flex items-center justify-center w-14 h-14 rounded-full focus:outline-none"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Search className="text-white w-6 h-6" />
            </motion.button>
          )}
        </AnimatePresence>
        <AnimatePresence initial={false}>
          {searchOpen && (
            <motion.div
              key="searchbar"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: '100%' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center w-full px-6"
            >
              <Search className="text-white w-5 h-5 mr-2" />
              <input
                autoFocus
                type="text"
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                placeholder="Search..."
                className="flex-1 bg-transparent outline-none border-none text-white placeholder-gray-300 text-sm font-sans"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="ml-2 text-white text-xs px-2 py-1 rounded-full hover:bg-white/10 transition"
              >
                Close
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Cart Dropdown */}
      <CartDropdown />
    </>
  )
}

export default Navbar
