import React, { useState, useEffect, useContext } from 'react';
import Sidebar from '../../components/(Admin)/Sidebar';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';

const statusOptions = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Returned'];

const statusColors = {
  Pending: 'text-yellow-400',
  Processing: 'text-blue-400',
  Shipped: 'text-purple-400',
  Delivered: 'text-green-400',
  Cancelled: 'text-red-400',
  Returned: 'text-gray-400',
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMsg, setPopupMsg] = useState('');
  const [editFields, setEditFields] = useState({});
  const [saving, setSaving] = useState({});
  const { backendUrl } = useContext(AppContext);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${backendUrl}/api/orders`);
        if (res.data.success) {
          setOrders(res.data.data);
        } else {
          setError(res.data.message || 'Failed to fetch orders');
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [backendUrl]);

  const handleFieldChange = (id, field, value) => {
    setEditFields(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleStatusChange = async (id, newStatus) => {
    setSaving(prev => ({ ...prev, [id]: true }));
    try {
      const fields = editFields[id] || {};
      const res = await axios.patch(`${backendUrl}/api/orders/${id}/status`, {
        status: newStatus,
        shippingPrice: fields.shippingPrice !== undefined ? Number(fields.shippingPrice) : undefined,
        estimatedArrival: fields.estimatedArrival || undefined,
      });
      if (res.data.success) {
        setOrders(orders => orders.map(order => order._id === id ? res.data.data : order));
        setEditFields(prev => ({ ...prev, [id]: {} }));
      }
    } catch (err) {
      setPopupMsg('Failed to update order status');
      setShowPopup(true);
    } finally {
      setSaving(prev => ({ ...prev, [id]: false }));
    }
  };

  return (
    <div className="min-h-screen bg-black flex">
      <Sidebar />
      <main className="flex-1 ml-0 md:ml-64 px-6 py-10">
        <h1 className="text-2xl font-bold text-white mb-8">Orders</h1>
        {loading ? (
          <div className="text-white">Loading orders...</div>
        ) : error ? (
          <div className="text-red-400">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white/5 rounded-2xl shadow-lg">
              <thead>
                <tr className="text-white text-left">
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Total</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => {
                  const fields = editFields[order._id] || {};
                  return (
                    <tr key={order._id} className="border-t border-white/10">
                      <td className="py-3 px-4 text-white font-mono">#{order._id}</td>
                      <td className="py-3 px-4 text-white">{order.shippingInfo?.name || order.user || 'Guest'}</td>
                      <td className="py-3 px-4 text-[#00FF99] font-semibold">${order.totalPrice?.toFixed(2) || 0}</td>
                      <td className="py-3 px-4 text-white/80">{order.createdAt ? (new Date(order.createdAt).toISOString().split('T')[0]) : ''}</td>
                      <td className="py-3 px-4 min-w-[260px]">
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-col md:flex-row md:items-center gap-2">
                            <label className="text-xs text-white/70 w-24">Status</label>
                            <select
                              value={order.status}
                              onChange={e => handleStatusChange(order._id, e.target.value)}
                              className={`bg-black text-white border-2 rounded px-3 py-2 text-sm font-semibold focus:outline-none appearance-none pr-8 transition-all w-full md:w-auto
                                ${order.status === 'Pending' ? 'border-yellow-400 ring-2 ring-yellow-400/30' : ''}
                                ${order.status === 'Processing' ? 'border-blue-400 ring-2 ring-blue-400/30' : ''}
                                ${order.status === 'Shipped' ? 'border-purple-400 ring-2 ring-purple-400/30' : ''}
                                ${order.status === 'Delivered' ? 'border-green-400 ring-2 ring-green-400/30' : ''}
                                ${order.status === 'Cancelled' ? 'border-red-400 ring-2 ring-red-400/30' : ''}
                                ${order.status === 'Returned' ? 'border-gray-400 ring-2 ring-gray-400/30' : ''}`}
                              style={{
                                minWidth: '120px',
                                backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='white' height='16' viewBox='0 0 20 20' width='16' xmlns='http://www.w3.org/2000/svg'><path d='M7.293 7.293a1 1 0 011.414 0L10 8.586l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z'/></svg>")`,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'right 0.75rem center',
                                backgroundSize: '1.25em 1.25em'
                              }}
                            >
                              {statusOptions.map(status => (
                                <option key={status} value={status}>{status}</option>
                              ))}
                            </select>
                          </div>
                          <div className="flex flex-col md:flex-row md:items-center gap-2">
                            <label className="text-xs text-white/70 w-24">Shipping</label>
                            <input
                              type="number"
                              placeholder="Shipping Price"
                              value={fields.shippingPrice !== undefined ? fields.shippingPrice : (order.shippingPrice || '')}
                              onChange={e => handleFieldChange(order._id, 'shippingPrice', e.target.value)}
                              className="bg-black/40 border border-white/20 rounded px-3 py-2 text-sm text-white focus:outline-none w-full md:w-auto"
                              min={0}
                            />
                          </div>
                          <div className="flex flex-col md:flex-row md:items-center gap-2">
                            <label className="text-xs text-white/70 w-24">Arrival</label>
                            <input
                              type="date"
                              value={fields.estimatedArrival !== undefined ? fields.estimatedArrival : (order.estimatedArrival ? new Date(order.estimatedArrival).toISOString().split('T')[0] : '')}
                              onChange={e => handleFieldChange(order._id, 'estimatedArrival', e.target.value)}
                              className="bg-black/40 border border-white/20 rounded px-3 py-2 text-sm text-white focus:outline-none w-full md:w-auto"
                            />
                          </div>
                          <button
                            onClick={() => handleStatusChange(order._id, order.status)}
                            className={`bg-[#00FF99] text-black font-semibold rounded-full px-4 py-2 text-sm transition mt-1 self-end flex items-center justify-center ${saving[order._id] ? 'opacity-60 cursor-not-allowed' : 'hover:bg-[#00E589]'}`}
                            disabled={!!saving[order._id]}
                          >
                            {saving[order._id] ? (
                              <span className="flex items-center gap-2">
                                <svg className="animate-spin h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path></svg>
                                Saving...
                              </span>
                            ) : 'Save'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        {showPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center">
              <h2 className="text-xl font-bold text-black mb-4">Error</h2>
              <p className="text-black/80 mb-6">{popupMsg}</p>
              <button
                onClick={() => setShowPopup(false)}
                className="bg-[#00FF99] text-black font-semibold rounded-full px-8 py-3 text-lg hover:bg-[#00E589] transition"
              >
                OK
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Orders; 