import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck, Package, CheckCircle, Box, Search } from 'lucide-react';
import axios from 'axios';
import Navbar from '../../components/(Shop)/Navbar';

const STATUS_STEPS = [
  { key: 'accepting', label: 'Accepting', icon: <Box /> },
  { key: 'packing', label: 'Packing', icon: <Package /> },
  { key: 'shipping', label: 'Shipping', icon: <Truck /> },
  { key: 'delivered', label: 'Delivered', icon: <CheckCircle /> },
];

const statusIndex = status => STATUS_STEPS.findIndex(s => s.key === status);

// Dummy order for orderId '123'
const DUMMY_ORDER = {
  _id: '123',
  status: 'delivered',
  estimatedArrival: 'July 25, 2024',
  shipping: 10,
  total: 110,
  items: [
    {
      product: {
        name: 'Arsenal Home Kit 23/24',
        images: ['../../assets/Arsenal.jpg'],
      },
      size: 'M',
      quantity: 1,
      price: 100,
    },
  ],
};

const Order = () => {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [vanPosition, setVanPosition] = useState(0);

  const fetchOrder = async () => {
    setLoading(true);
    setError(null);
    setOrder(null);
    if (orderId === '123') {
      setTimeout(() => {
        setOrder(DUMMY_ORDER);
        setVanPosition(statusIndex(DUMMY_ORDER.status));
        setLoading(false);
      }, 500);
      return;
    }
    try {
      // Replace with your backend endpoint
      const res = await axios.get(`http://localhost:5001/api/orders/${orderId}`);
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
    <div className="min-h-screen bg-black flex flex-col items-center py-16 px-4">
      <Navbar />
      <div className="max-w-xl w-full bg-white/5 rounded-2xl shadow-lg p-8 mb-10 mt-24">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Track Your Order</h1>
        <div className="flex gap-2 items-center mb-6">
          <input
            type="text"
            value={orderId}
            onChange={e => setOrderId(e.target.value)}
            placeholder="Enter Order ID"
            className="flex-1 px-4 py-3 rounded-l-lg bg-black/40 border border-white/20 text-white focus:outline-none"
          />
          <button
            onClick={fetchOrder}
            className="bg-[#00FF99] text-black px-5 py-3 rounded-r-lg font-semibold hover:bg-[#00E589] transition flex items-center gap-2"
            disabled={loading || !orderId}
          >
            <Search className="w-5 h-5" />
            Track
          </button>
        </div>
        {loading && <div className="text-white text-center">Loading...</div>}
        {error && <div className="text-red-400 text-center mb-4">{error}</div>}
        {order && (
          <div>
            {/* Progress Bar with Van Animation */}
            <div className="relative flex items-center justify-between mb-10 mt-8">
              <div className="absolute left-0 right-0 top-1/2 h-2 bg-white/10 rounded-full z-0" style={{ transform: 'translateY(-50%)' }} />
              {STATUS_STEPS.map((step, idx) => (
                <div key={step.key} className="relative z-10 flex flex-col items-center w-1/4">
                  <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${idx <= vanPosition ? 'border-[#00FF99] bg-[#00FF99]/20' : 'border-white/30 bg-black/40'} transition-all duration-300`}>{step.icon}</div>
                  <span className={`mt-2 text-xs font-semibold ${idx <= vanPosition ? 'text-[#00FF99]' : 'text-white/60'}`}>{step.label}</span>
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
                <Truck className="w-12 h-12 text-[#00FF99] drop-shadow-lg" />
              </motion.div>
            </div>
            {/* Order Details */}
            <div className="bg-black/60 rounded-xl p-6 mb-6">
              <h2 className="text-xl font-bold text-white mb-4">Order Details</h2>
              <div className="flex flex-col gap-2 text-white/90">
                <div><span className="font-semibold">Order ID:</span> {order._id}</div>
                <div><span className="font-semibold">Status:</span> <span className="text-[#00FF99] font-bold">{order.status}</span></div>
                <div><span className="font-semibold">Arrival Estimate:</span> {order.estimatedArrival || '2-5 days'}</div>
                <div><span className="font-semibold">Shipping:</span> ${order.shipping || 0}</div>
                <div><span className="font-semibold">Total Price:</span> <span className="text-[#00FF99] font-bold">${order.total || 0}</span></div>
              </div>
            </div>
            {/* Product List */}
            <div className="bg-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Products</h3>
              <div className="flex flex-col gap-4">
                {order.items && order.items.length > 0 ? order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 bg-black/30 rounded-lg p-3">
                    <img src={item.product?.images?.[0] || ''} alt={item.product?.name} className="w-16 h-16 object-cover rounded-lg border border-white/10" />
                    <div className="flex-1">
                      <div className="text-white font-semibold">{item.product?.name}</div>
                      <div className="text-white/70 text-xs">Size: {item.size}</div>
                      <div className="text-white/70 text-xs">Qty: {item.quantity}</div>
                    </div>
                    <div className="text-[#00FF99] font-bold text-lg">${item.price}</div>
                  </div>
                )) : <div className="text-white/60">No products found.</div>}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;