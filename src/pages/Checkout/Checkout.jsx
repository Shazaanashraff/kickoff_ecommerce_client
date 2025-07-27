import React from 'react';

const Checkout = () => {
  // Example order and shipping cost
  const orderItems = [
    { name: 'Barça Home Jersey 23/24', price: 89.99 },
    { name: 'PSG Third Jersey 23/24', price: 89.99 },
  ];
  const shippingCost = 10.0;
  const subtotal = orderItems.reduce((sum, item) => sum + item.price, 0);
  const total = subtotal + shippingCost;

  return (
    <section className="bg-white min-h-screen pt-28 pb-24">
      {/* Constrain & center horizontally */}
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Checkout Card */}
        <div className="grid md:grid-cols-2 gap-12 rounded-2xl border border-gray-200 shadow-sm bg-white p-8 md:p-12">
          {/* Left: Order Summary */}
          <div>
            <h2 className="text-4xl font-serif font-semibold mb-6">
              ORDER SUMMARY
            </h2>
            <div className="mb-6 space-y-4">
              {/* Order items */}
              {orderItems.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-gray-700">
                  <span>{item.name}</span>
                  <span>€{item.price.toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between items-center text-gray-700">
                <span>Shipping</span>
                <span>€{shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-gray-700 font-semibold border-t pt-4">
                <span>Total</span>
                <span>€{total.toFixed(2)}</span>
              </div>
            </div>
            <div className="text-gray-500 text-sm mt-8">
              Shipping and taxes calculated at checkout.
            </div>
          </div>

          {/* Right: Checkout Form (PayHere required fields) */}
          <form className="space-y-5">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="First Name*"
                className="w-1/2 border border-gray-300 px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-gray-700"
                required
                name="first_name"
              />
              <input
                type="text"
                placeholder="Last Name*"
                className="w-1/2 border border-gray-300 px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-gray-700"
                required
                name="last_name"
              />
            </div>
            <input
              type="email"
              placeholder="Email address*"
              className="w-full border border-gray-300 px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-gray-700"
              required
              name="email"
            />
            <div className="flex gap-2">
              <select
                className="border border-gray-300 rounded px-3 py-3 bg-white text-gray-700"
                defaultValue="+66"
                name="country_code"
              >
                <option value="+66">+66</option>
                <option value="+94">+94</option>
                <option value="+1">+1</option>
                <option value="+44">+44</option>
              </select>
              <input
                type="tel"
                placeholder="Phone number*"
                className="w-full border border-gray-300 px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-gray-700"
                required
                name="phone"
              />
            </div>
            <input
              type="text"
              placeholder="Address*"
              className="w-full border border-gray-300 px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-gray-700"
              required
              name="address"
            />
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="City*"
                className="w-1/2 border border-gray-300 px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-gray-700"
                required
                name="city"
              />
              <input
                type="text"
                placeholder="Country*"
                className="w-1/2 border border-gray-300 px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-gray-700"
                required
                name="country"
              />
            </div>
            <input
              type="text"
              placeholder="Zip/Postal Code*"
              className="w-full border border-gray-300 px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-gray-700"
              required
              name="zip"
            />
            <select
              className="w-full border border-gray-300 px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-gray-700"
              required
              defaultValue=""
              name="payment_method"
            >
              <option value="" disabled>Payment Method*</option>
              <option value="card">Credit/Debit Card</option>
              <option value="paypal">PayPal</option>
              <option value="cod">Cash on Delivery</option>
            </select>
            <button
              type="submit"
              className="w-full bg-gray-800 hover:bg-black text-white py-3 rounded font-medium transition-colors"
            >
              PLACE ORDER
            </button>
          </form>
        </div>

        {/* Secure Payment Section */}
        <div className="mt-20 border border-gray-200 rounded-2xl shadow-sm p-8 md:p-12 text-center bg-gray-50">
          <h3 className="text-2xl font-bold mb-4">Secure Payment</h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Your payment information is processed securely. We do not store credit card details nor have access to your credit card information.
          </p>
          {/* Placeholder icon area */}
          <div className="w-full h-24 bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-500 text-lg">[ Lock Icon ]</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
