import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { Truck, Package, CheckCircle, Box, Search } from 'lucide-react';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import image1 from '../../assets/reltedProducts/image1.jpeg';
import image2 from '../../assets/reltedProducts/image2.jpeg';

const STATUS_STEPS = [
  { key: 'Pending', label: 'Pending', icon: <Box /> },
  { key: 'Processing', label: 'Processing', icon: <Package /> },
  { key: 'Shipped', label: 'Shipped', icon: <Truck /> },
  { key: 'Delivered', label: 'Delivered', icon: <CheckCircle /> },
];

const statusIndex = status => STATUS_STEPS.findIndex(s => s.key === status);

// Dummy order for id '123'
const DUMMY_ORDER = {
  _id: '123',
  status: 'Shipped',
  estimatedArrival: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
  shippingPrice: 10,
  totalPrice: 120,
  items: [
    {
      product: {
        name: 'Barça Home Jersey 23/24',
        images: [image1],
      },
      size: 'M',
      quantity: 1,
      price: 60,
    },
    {
      product: {
        name: 'PSG Third Jersey 23/24',
        images: [image2],
      },
      size: 'L',
      quantity: 1,
      price: 50,
    },
  ],
};

const Order = () => {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [vanPosition, setVanPosition] = useState(0);
  const { backendUrl } = useContext(AppContext);

  const fetchOrder = async () => {
    setLoading(true);
    setError(null);
    setOrder(null);
    try {
      if (orderId === '123') {
        setOrder(DUMMY_ORDER);
        setTimeout(() => {
          setVanPosition(statusIndex(DUMMY_ORDER.status));
        }, 300);
        setLoading(false);
        return;
      }
      // Replace with your backend endpoint
      const res = await axios.get(`${backendUrl}/api/orders/${orderId}`);
      if (res.data.success) {
        setOrder(res.data.data);
        setTimeout(() => {
          setVanPosition(statusIndex(res.data.data.status));
        }, 300); // Animate after load
      } else {
        setError(res.data.message || 'Order not found');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  // Animate van to current status on order load
  React.useEffect(() => {
    if (order) {
      setVanPosition(0);
      const idx = statusIndex(order.status);
      if (idx > 0) {
        let i = 0;
        const interval = setInterval(() => {
          i++;
          setVanPosition(i);
          if (i >= idx) clearInterval(interval);
        }, 700);
        return () => clearInterval(interval);
      }
    }
  }, [order]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-16 px-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg p-8 mb-10 mt-24 border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Track Your Order</h1>
        <div className="flex gap-2 items-center mb-6">
          <input
            type="text"
            value={orderId}
            onChange={e => setOrderId(e.target.value)}
            placeholder="Enter Order ID"
            className="flex-1 px-4 py-3 rounded-l-lg bg-gray-50 border border-gray-300 text-gray-800 focus:outline-none"
          />
          <button
            onClick={fetchOrder}
            className="bg-gray-800 text-white px-5 py-3 rounded-r-lg font-semibold hover:bg-black transition flex items-center gap-2"
            disabled={loading || !orderId}
          >
            <Search className="w-5 h-5" />
            Track
          </button>
        </div>
        {loading && <div className="text-gray-600 text-center">Loading...</div>}
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        {order && (
          <div>
            {/* Progress Bar with Van Animation */}
            <div className="relative flex items-center justify-between mb-10 mt-8">
              <div className="absolute left-0 right-0 top-1/2 h-2 bg-gray-100 rounded-full z-0" style={{ transform: 'translateY(-50%)' }} />
              {STATUS_STEPS.map((step, idx) => (
                <div key={step.key} className="relative z-10 flex flex-col items-center w-1/4">
                  <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${idx <= vanPosition ? 'border-green-500 bg-green-100' : 'border-gray-300 bg-white'} transition-all duration-300`}>{step.icon}</div>
                  <span className={`mt-2 text-xs font-semibold ${idx <= vanPosition ? 'text-green-600' : 'text-gray-400'}`}>{step.label}</span>
                </div>
              ))}
              {/* Van Icon */}
              <motion.div
                className="absolute z-20 -top-8"
                initial={false}
                animate={{ left: `${(vanPosition / (STATUS_STEPS.length - 1)) * 100}%` }}
                transition={{ type: 'spring', stiffness: 120, damping: 15 }}
                style={{ width: 48 }}
              >
                <Truck className="w-12 h-12 text-gray-500 drop-shadow-lg" />
              </motion.div>
            </div>
            {/* Two-column layout for order details and products */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Order Details */}
              <div className="bg-gray-50 rounded-xl p-6 mb-6 border border-gray-200">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Order Details</h2>
                <div className="flex flex-col gap-2 text-gray-700">
                  <div><span className="font-semibold">Order ID:</span> {order._id}</div>
                  <div><span className="font-semibold">Status:</span> <span className="text-green-600 font-bold">{order.status}</span></div>
                  <div><span className="font-semibold">Arrival Estimate:</span> {order.estimatedArrival ? (new Date(order.estimatedArrival).toISOString().split('T')[0]) : 'N/A'}</div>
                  <div><span className="font-semibold">Shipping:</span> ${order.shippingPrice || 0}</div>
                  <div><span className="font-semibold">Total Amount:</span> <span className="text-green-600 font-bold">${(order.totalPrice || 0) + (order.shippingPrice || 0)}</span></div>
                </div>
              </div>
              {/* Product List */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Products</h3>
                <div className="flex flex-col gap-4">
                  {order.items && order.items.length > 0 ? order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 bg-gray-50 rounded-lg p-3 border border-gray-100">
                      <img src={item.product?.images?.[0] || ''} alt={item.product?.name} className="w-16 h-16 object-cover rounded-lg border border-gray-200" />
                      <div className="flex-1">
                        <div className="text-gray-800 font-semibold">{item.product?.name}</div>
                        <div className="text-gray-500 text-xs">Size: {item.size}</div>
                        <div className="text-gray-500 text-xs">Qty: {item.quantity}</div>
                      </div>
                      <div className="text-green-600 font-bold text-lg">${item.price}</div>
                    </div>
                  )) : <div className="text-gray-400">No products found.</div>}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
