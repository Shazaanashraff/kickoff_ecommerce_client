import React from 'react';
import { useCart } from '../../../context/CartContext';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';

const Sidebar = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, isCartOpen, toggleCart } = useCart();

  const handleQuantityChange = (productId, selectedSize, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity >= 1) {
      updateQuantity(productId, selectedSize, newQuantity);
    }
  };

  const handleRemoveItem = (productId, selectedSize) => {
    removeFromCart(productId, selectedSize);
  };

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={toggleCart}
      />
      
      {/* Cart Dropdown */}
      <div className="fixed top-20 right-4 md:right-12 w-80 md:w-96 bg-white rounded-lg shadow-xl z-50 border border-gray-200 max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-[var(--color-dark-gray)]">Shopping Cart</h2>
          <button
            onClick={toggleCart}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-[var(--color-medium-gray)]" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto max-h-[60vh]">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <ShoppingBag className="w-12 h-12 text-[var(--color-medium-gray)] mb-4" />
              <p className="text-[var(--color-medium-gray)] text-center">Your cart is empty</p>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {cartItems.map((item, index) => (
                <div key={`${item.id}-${item.selectedSize}`} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                  {/* Product Image */}
                  <div className="w-16 h-16 bg-white rounded-md overflow-hidden flex-shrink-0">
                    <img 
                      src={item.image || 'https://via.placeholder.com/64'} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-[var(--color-dark-gray)] truncate">{item.name}</h3>
                        <p className="text-sm text-[var(--color-medium-gray)]">Size: {item.selectedSize}</p>
                        <p className="text-sm font-medium text-[var(--color-dark-gray)]">Rs {item.price?.toLocaleString()}</p>
                      </div>
                      
                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemoveItem(item.id, item.selectedSize)}
                        className="ml-2 p-1 hover:bg-red-100 rounded-full transition-colors"
                      >
                        <X className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.selectedSize, item.quantity, -1)}
                        className="w-6 h-6 flex items-center justify-center bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                      >
                        <Minus className="w-3 h-3 text-[var(--color-dark-gray)]" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium text-[var(--color-dark-gray)]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.selectedSize, item.quantity, 1)}
                        className="w-6 h-6 flex items-center justify-center bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                      >
                        <Plus className="w-3 h-3 text-[var(--color-dark-gray)]" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold text-[var(--color-dark-gray)]">Total:</span>
              <span className="text-lg font-bold text-[var(--color-dark-gray)]">
                Rs {getTotalPrice().toLocaleString()}
              </span>
            </div>
            <button className="w-full bg-[var(--color-dark-gray)] text-white py-3 rounded-lg font-semibold hover:bg-black transition-colors">
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
