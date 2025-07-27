import React from 'react';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import image1 from '../../../assets/reltedProducts/image1.jpeg';
import image2 from '../../../assets/reltedProducts/image2.jpeg';
import { useNavigate } from 'react-router-dom';

// Dummy cart data with images from assets
const dummyCartItems = [
  {
    id: 1,
    name: 'Dummy Product 1',
    image: image1,
    price: 2999,
    selectedSize: 'M',
    quantity: 1,
  },
  {
    id: 2,
    name: 'Dummy Product 2',
    image: image2,
    price: 3999,
    selectedSize: 'L',
    quantity: 2,
  },
];

const Sidebar = ({ open, onClose }) => {
  const cartItems = dummyCartItems;
  const getTotalPrice = () => cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleQuantityChange = (productId, selectedSize, currentQuantity, change) => {};
  const handleRemoveItem = (productId, selectedSize) => {};

  const navigate = useNavigate()


  if (!open) return null;

  return (


    <>
      {/* Backdrop (like hamburger menu) */}
      <div
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Sidebar */}
      <aside
        className="fixed top-0 right-0 h-full w-96 max-w-full bg-white z-50 shadow-lg flex flex-col p-6 animate-slideInCart rounded-l-2xl"
        style={{ animation: 'slideInCart 0.3s cubic-bezier(0.4,0,0.2,1)' }}
      >
        <button
          className="self-end mb-6 text-dark-gray text-2xl px-2 py-1 rounded-full hover:bg-light-gray/30 transition"
          onClick={onClose}
          aria-label="Close cart"
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold mb-6 text-[var(--color-dark-gray)]">Shopping Cart</h2>
        <div className="flex-1 overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <ShoppingBag className="w-12 h-12 text-[var(--color-medium-gray)] mb-4" />
              <p className="text-[var(--color-medium-gray)] text-center">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <div key={`${item.id}-${item.selectedSize}`} className="flex gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200 shadow-sm">
                  {/* Product Image */}
                  <div className="w-20 h-20 bg-white rounded-md overflow-hidden flex-shrink-0 border border-gray-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Product Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-[var(--color-dark-gray)] truncate">{item.name}</h3>
                        <p className="text-xs text-[var(--color-medium-gray)]">Size: {item.selectedSize}</p>
                        <p className="text-sm font-medium text-[var(--color-dark-gray)]">Rs {item.price?.toLocaleString()}</p>
                      </div>
                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemoveItem(item.id, item.selectedSize)}
                        className="ml-2 p-1 hover:bg-red-100 rounded-full transition-colors"
                        title="Remove item"
                      >
                        <X className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.selectedSize, item.quantity, -1)}
                        className="w-6 h-6 flex items-center justify-center bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3 text-[var(--color-dark-gray)]" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium text-[var(--color-dark-gray)]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.selectedSize, item.quantity, 1)}
                        className="w-6 h-6 flex items-center justify-center bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                        aria-label="Increase quantity"
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
          <div className="border-t border-gray-200 pt-4 mt-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold text-[var(--color-dark-gray)]">Total:</span>
              <span className="text-lg font-bold text-[var(--color-dark-gray)]">
                Rs {getTotalPrice().toLocaleString()}
              </span>
            </div>
            <button onClick={()=> navigate('/checkout')} className="w-full bg-[var(--color-dark-gray)] text-white py-3 rounded-lg font-semibold hover:bg-black transition-colors">
              Checkout
            </button>
          </div>
        )}
      </aside>
      <style>{`
        @keyframes slideInCart {
          0% { transform: translateX(100%); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </>
  );
};

export default Sidebar;
