import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

const CartDropdown = () => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    getTotalPrice, 
    isCartOpen,
    toggleCart 
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 z-50" onClick={toggleCart}>
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          transition={{ type: "spring", damping: 20 }}
          className="absolute right-0 top-0 h-full w-full max-w-md bg-black border-l border-white/10 p-6 overflow-y-auto"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Your Cart</h2>
            <button
              onClick={toggleCart}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="text-white w-6 h-6" />
            </button>
          </div>

          {/* Cart Items */}
          {cartItems.length === 0 ? (
            <div className="text-center text-white/60 py-12">
              Your cart is empty
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-8">
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex gap-4 bg-white/5 rounded-2xl p-4"
                  >
                    {/* Product Image */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-xl"
                    />

                    {/* Product Details */}
                    <div className="flex-1">
                      <h3 className="text-white font-semibold mb-1">{item.name}</h3>
                      <p className="text-[#00FF99] font-bold">${item.price}</p>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center bg-white/10 rounded-full">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-white hover:text-[#00FF99] transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center text-white">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-white hover:text-[#00FF99] transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        
                        {/* Remove Button */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-white/60 hover:text-[#00FF99] text-sm transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Cart Footer */}
              <div className="border-t border-white/10 pt-4 space-y-4">
                <div className="flex justify-between items-center text-white">
                  <span className="text-lg">Total:</span>
                  <span className="text-2xl font-bold text-[#00FF99]">
                    ${getTotalPrice().toFixed(2)}
                  </span>
                </div>
                
                <Link
                  to="/checkout"
                  className="block w-full bg-[#00FF99] text-black font-semibold rounded-full py-3 text-center hover:bg-[#00E589] transition-colors"
                  onClick={toggleCart}
                >
                  Proceed to Checkout
                </Link>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CartDropdown; 