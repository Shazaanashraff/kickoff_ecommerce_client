import React, { useState } from 'react';
import Navbar from '../../components/(Shop)/Navbar';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

const Checkout = () => {
  const { cartItems, getTotalPrice, updateQuantity, removeFromCart } = useCart();
  const [shipping, setShipping] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    region: '',
    postal: '',
    country: '',
    phone: '',
  });
  const [payment, setPayment] = useState({ card: '', expiry: '', cvc: '' });
  const [step, setStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleShippingChange = e => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };
  const handlePaymentChange = e => {
    setPayment({ ...payment, [e.target.name]: e.target.value });
  };
  const handlePlaceOrder = e => {
    e.preventDefault();
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <div className="max-w-2xl mx-auto pt-32 pb-16 px-4 text-center">
          <h1 className="text-4xl font-bold text-[#00FF99] mb-4">Thank you for your order!</h1>
          <p className="text-white/80 mb-8">Your order has been placed and is being processed. You will receive a confirmation email soon.</p>
          <Link to="/products" className="bg-[#00FF99] text-black font-semibold rounded-full px-8 py-3 hover:bg-[#00E589] transition">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="max-w-5xl mx-auto pt-28 pb-16 px-4 flex flex-col lg:flex-row gap-12">
        {/* Order Summary */}
        <div className="lg:w-2/5 w-full bg-white/5 rounded-2xl p-8 shadow-lg h-fit">
          <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>
          {cartItems.length === 0 ? (
            <div className="text-white/60">Your cart is empty.</div>
          ) : (
            <div className="space-y-6">
              {cartItems.map(item => (
                <div key={item.id + (item.selectedSize || '')} className="flex gap-4 items-center">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl" />
                  <div className="flex-1">
                    <h3 className="text-white font-semibold">{item.name}</h3>
                    <div className="text-white/70 text-xs mb-1">Size: {item.selectedSize}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#00FF99] font-bold">${item.price}</span>
                      <span className="text-white/60">x</span>
                      <input
                        type="number"
                        min={1}
                        max={10}
                        value={item.quantity}
                        onChange={e => updateQuantity(item.id, item.selectedSize, Number(e.target.value))}
                        className="w-12 bg-transparent border border-white/20 rounded px-2 py-1 text-white text-center focus:outline-none"
                      />
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(item.id, item.selectedSize)} className="text-white/60 hover:text-[#00FF99] text-sm">Remove</button>
                </div>
              ))}
              <div className="flex justify-between items-center border-t border-white/10 pt-6 mt-6">
                <span className="text-lg text-white font-semibold">Total</span>
                <span className="text-2xl font-bold text-[#00FF99]">${getTotalPrice().toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>

        {/* Checkout Form */}
        <form className="flex-1 bg-white/5 rounded-2xl p-8 shadow-lg" onSubmit={handlePlaceOrder}>
          <h2 className="text-2xl font-bold text-white mb-8">Checkout</h2>
          {/* Step 1: Shipping */}
          {step === 1 && (
            <div>
              <div className="mb-6">
                <label className="block text-white mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={shipping.email}
                  onChange={handleShippingChange}
                  required
                  className="w-full bg-black/40 border border-white/20 rounded px-4 py-3 text-white focus:outline-none"
                />
              </div>
              <div className="flex gap-4 mb-6">
                <div className="flex-1">
                  <label className="block text-white mb-2">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={shipping.firstName}
                    onChange={handleShippingChange}
                    required
                    className="w-full bg-black/40 border border-white/20 rounded px-4 py-3 text-white focus:outline-none"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-white mb-2">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={shipping.lastName}
                    onChange={handleShippingChange}
                    required
                    className="w-full bg-black/40 border border-white/20 rounded px-4 py-3 text-white focus:outline-none"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-white mb-2">Address</label>
                <input
                  type="text"
                  name="address"
                  value={shipping.address}
                  onChange={handleShippingChange}
                  required
                  className="w-full bg-black/40 border border-white/20 rounded px-4 py-3 text-white focus:outline-none"
                />
              </div>
              <div className="mb-6">
                <label className="block text-white mb-2">Apartment (optional)</label>
                <input
                  type="text"
                  name="apartment"
                  value={shipping.apartment}
                  onChange={handleShippingChange}
                  className="w-full bg-black/40 border border-white/20 rounded px-4 py-3 text-white focus:outline-none"
                />
              </div>
              <div className="flex gap-4 mb-6">
                <div className="flex-1">
                  <label className="block text-white mb-2">City</label>
                  <input
                    type="text"
                    name="city"
                    value={shipping.city}
                    onChange={handleShippingChange}
                    required
                    className="w-full bg-black/40 border border-white/20 rounded px-4 py-3 text-white focus:outline-none"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-white mb-2">Region</label>
                  <input
                    type="text"
                    name="region"
                    value={shipping.region}
                    onChange={handleShippingChange}
                    required
                    className="w-full bg-black/40 border border-white/20 rounded px-4 py-3 text-white focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex gap-4 mb-6">
                <div className="flex-1">
                  <label className="block text-white mb-2">Postal Code</label>
                  <input
                    type="text"
                    name="postal"
                    value={shipping.postal}
                    onChange={handleShippingChange}
                    required
                    className="w-full bg-black/40 border border-white/20 rounded px-4 py-3 text-white focus:outline-none"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-white mb-2">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={shipping.country}
                    onChange={handleShippingChange}
                    required
                    className="w-full bg-black/40 border border-white/20 rounded px-4 py-3 text-white focus:outline-none"
                  />
                </div>
              </div>
              <div className="mb-8">
                <label className="block text-white mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={shipping.phone}
                  onChange={handleShippingChange}
                  required
                  className="w-full bg-black/40 border border-white/20 rounded px-4 py-3 text-white focus:outline-none"
                />
              </div>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full bg-[#00FF99] text-black font-semibold rounded-full py-3 text-lg hover:bg-[#00E589] transition mb-2"
              >
                Continue to Payment
              </button>
            </div>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <div>
              {/* Payment Gateway Placeholder */}
              <div className="mb-8 p-6 bg-black/30 border border-dashed border-[#00FF99] rounded-xl text-center">
                <span className="text-[#00FF99] font-semibold text-lg">[ Payment Gateway Placeholder ]</span>
                <p className="text-white/60 text-sm mt-2">This is where a real payment gateway (Stripe, PayPal, etc.) would be integrated.</p>
              </div>
              <div className="mb-6">
                <label className="block text-white mb-2">Card Number</label>
                <input
                  type="text"
                  name="card"
                  value={payment.card}
                  onChange={handlePaymentChange}
                  required
                  maxLength={19}
                  placeholder="1234 5678 9012 3456"
                  className="w-full bg-black/40 border border-white/20 rounded px-4 py-3 text-white focus:outline-none"
                />
              </div>
              <div className="flex gap-4 mb-6">
                <div className="flex-1">
                  <label className="block text-white mb-2">Expiry</label>
                  <input
                    type="text"
                    name="expiry"
                    value={payment.expiry}
                    onChange={handlePaymentChange}
                    required
                    maxLength={5}
                    placeholder="MM/YY"
                    className="w-full bg-black/40 border border-white/20 rounded px-4 py-3 text-white focus:outline-none"
                  />
                </div>
                <div className="w-32">
                  <label className="block text-white mb-2">CVC</label>
                  <input
                    type="text"
                    name="cvc"
                    value={payment.cvc}
                    onChange={handlePaymentChange}
                    required
                    maxLength={4}
                    placeholder="123"
                    className="w-full bg-black/40 border border-white/20 rounded px-4 py-3 text-white focus:outline-none"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-[#00FF99] text-black font-semibold rounded-full py-3 text-lg hover:bg-[#00E589] transition mb-2"
              >
                Place Order
              </button>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full text-white/70 hover:text-[#00FF99] text-sm mt-2"
              >
                Back to Shipping
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Checkout; 