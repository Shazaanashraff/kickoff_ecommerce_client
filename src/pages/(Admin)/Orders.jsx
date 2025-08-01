import React, { useState, useEffect, useContext } from 'react';
import AdminSidebar from '../../components/(Admin)/Sidebar';
import { SidebarProvider } from '../../context/SidebarContext';
import { useSidebarContext } from '../../context/SidebarContext';
import { motion } from 'framer-motion';
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

const OrdersContent = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMsg, setPopupMsg] = useState('');
  const [editFields, setEditFields] = useState({});
  const [saving, setSaving] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const { backendUrl } = useContext(AppContext);
  const { isOpen } = useSidebarContext();

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

  const handleStatusChange = (id, newStatus) => {
    setEditFields(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        status: newStatus,
      },
    }));
  };

  const handleSaveChanges = async (id) => {
    setSaving(prev => ({ ...prev, [id]: true }));
    try {
      const fields = editFields[id] || {};
      const res = await axios.patch(`${backendUrl}/api/orders/${id}/status`, {
        status: fields.status || orders.find(o => o._id === id)?.status,
        shippingPrice: fields.shippingPrice !== undefined ? Number(fields.shippingPrice) : undefined,
        estimatedArrival: fields.estimatedArrival || undefined,
      });
      if (res.data.success) {
        setOrders(orders => orders.map(order => order._id === id ? res.data.data : order));
        setEditFields(prev => ({ ...prev, [id]: {} }));
        setPopupMsg('Order updated successfully!');
        setShowPopup(true);
      }
    } catch (err) {
      setPopupMsg('Failed to update order status');
      setShowPopup(true);
    } finally {
      setSaving(prev => ({ ...prev, [id]: false }));
    }
  };

  const handleDeleteOrder = (orderId) => {
    setOrderToDelete(orderId);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (!orderToDelete) return;
    
    try {
      const res = await axios.delete(`${backendUrl}/api/orders/${orderToDelete}`);
      if (res.data.success) {
        setOrders(orders => orders.filter(order => order._id !== orderToDelete));
        setPopupMsg('Order deleted successfully!');
        setShowPopup(true);
      }
    } catch (err) {
      setPopupMsg('Failed to delete order');
      setShowPopup(true);
    } finally {
      setShowDeleteConfirm(false);
      setOrderToDelete(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#d4d4d4]">
        <AdminSidebar />
        <motion.main
          className="transition-all duration-150 ease-out"
          animate={{
            marginLeft: isOpen ? "280px" : "70px"
          }}
          style={{
            marginLeft: isOpen ? "280px" : "70px"
          }}
        >
          <div className="px-6 py-10 bg-white rounded-tl-3xl min-h-screen flex items-center justify-center">
            <div className="text-dark-gray text-xl">Loading orders...</div>
          </div>
        </motion.main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <AdminSidebar />
        <motion.main
          className="transition-all duration-150 ease-out"
          animate={{
            marginLeft: isOpen ? "280px" : "70px"
          }}
          style={{
            marginLeft: isOpen ? "280px" : "70px"
          }}
        >
          <div className="px-6 py-10 bg-white rounded-tl-3xl min-h-screen flex items-center justify-center">
            <div className="text-red-600 text-xl">{error}</div>
          </div>
        </motion.main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#d4d4d4]">
      <AdminSidebar />
      <motion.main
        className="transition-all duration-150 ease-out"
        animate={{
          marginLeft: isOpen ? "280px" : "70px"
        }}
        style={{
          marginLeft: isOpen ? "280px" : "70px"
        }}
      >
        <div className="px-6 py-10 bg-white rounded-tl-3xl min-h-screen shadow-lg">
          {/* Header Section */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold text-dark-gray mb-2">Orders</h1>
              <div className="flex items-center gap-2 text-medium-gray">
                <span>Jan 1 - Jan 30, 2024</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="bg-white text-dark-gray px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 border border-gray-200">
                Export
              </button>
              <button className="bg-white text-dark-gray px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 border border-gray-200 flex items-center gap-2">
                More actions
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex justify-center mb-6">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-medium-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search orders by ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg leading-5 bg-white text-dark-gray placeholder-medium-gray focus:outline-none focus:border-[#2B2B2B] focus:ring-1 focus:ring-[#2B2B2B]"
              />
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-medium-gray text-sm mb-1">Total Orders</p>
                  <p className="text-2xl font-bold text-dark-gray">{orders.length}</p>
                  <p className="text-green-500 text-sm mt-1">▲ 25.2% last week</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-medium-gray text-sm mb-1">Processing</p>
                  <p className="text-2xl font-bold text-dark-gray">{orders.filter(o => o.status === 'Processing').length}</p>
                  <p className="text-green-500 text-sm mt-1">▲ 18.2% last week</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-medium-gray text-sm mb-1">Shipped</p>
                  <p className="text-2xl font-bold text-dark-gray">{orders.filter(o => o.status === 'Shipped').length}</p>
                  <p className="text-red-500 text-sm mt-1">▼ -1.2% last week</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-medium-gray text-sm mb-1">Delivered</p>
                  <p className="text-2xl font-bold text-dark-gray">{orders.filter(o => o.status === 'Delivered').length}</p>
                  <p className="text-green-500 text-sm mt-1">▲ 12.2% last week</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
              {['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Returned'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedFilter === filter 
                      ? 'bg-white text-dark-gray shadow-sm' 
                      : 'text-medium-gray hover:text-dark-gray'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
            <button className="bg-[#2B2B2B] text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-800 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add
            </button>
          </div>

          {/* Orders Table */}
        {loading ? (
            <div className="text-dark-gray text-center py-8">Loading orders...</div>
        ) : error ? (
            <div className="text-red-600 text-center py-8">{error}</div>
        ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-medium-gray uppercase tracking-wider">
                        <input type="checkbox" className="rounded border-gray-300 text-[#2B2B2B] focus:ring-[#2B2B2B]" />
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-medium-gray uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-medium-gray uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-medium-gray uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-medium-gray uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-medium-gray uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-medium-gray uppercase tracking-wider">
                        Shipping
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-medium-gray uppercase tracking-wider">
                        Arrival
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-medium-gray uppercase tracking-wider">
                        Actions
                      </th>
                </tr>
              </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {orders
                      .filter(order => {
                        // Filter by search term
                        const orderId = order._id.slice(-4);
                        const matchesSearch = searchTerm === '' || orderId.includes(searchTerm);
                        
                        // Filter by status
                        const matchesFilter = selectedFilter === 'All' || order.status === selectedFilter;
                        
                        return matchesSearch && matchesFilter;
                      })
                      .map(order => {
                  const fields = editFields[order._id] || {};
                  return (
                          <tr key={order._id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 whitespace-nowrap">
                              <input type="checkbox" className="rounded border-gray-300 text-[#2B2B2B] focus:ring-[#2B2B2B]" />
                            </td>
                            <td className="px-3 py-3 whitespace-nowrap text-sm font-medium text-dark-gray">
                              #{order._id.slice(-4)}
                            </td>
                            <td className="px-3 py-3 whitespace-nowrap text-sm text-medium-gray">
                              {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
                            </td>
                            <td className="px-3 py-3 whitespace-nowrap text-sm text-dark-gray">
                              {order.shippingInfo?.name || order.user || 'Guest'}
                            </td>
                            <td className="px-3 py-3 whitespace-nowrap text-sm font-semibold text-dark-gray">
                              ${order.totalPrice?.toFixed(2) || 0}
                            </td>
                            <td className="px-3 py-3 whitespace-nowrap">
                            <select
                                value={editFields[order._id]?.status !== undefined ? editFields[order._id].status : order.status}
                              onChange={e => handleStatusChange(order._id, e.target.value)}
                                className="bg-gray-100 border border-gray-200 rounded px-2 py-1 text-xs text-dark-gray focus:outline-none focus:border-[#2B2B2B] w-24"
                            >
                              {statusOptions.map(status => (
                                <option key={status} value={status}>{status}</option>
                              ))}
                            </select>
                            </td>
                            <td className="px-3 py-3 whitespace-nowrap">
                            <input
                              type="number"
                                placeholder="Price"
                              value={fields.shippingPrice !== undefined ? fields.shippingPrice : (order.shippingPrice || '')}
                              onChange={e => handleFieldChange(order._id, 'shippingPrice', e.target.value)}
                                className="bg-gray-100 border border-gray-200 rounded px-2 py-1 text-xs text-dark-gray focus:outline-none focus:border-[#2B2B2B] w-16"
                              min={0}
                            />
                            </td>
                            <td className="px-3 py-3 whitespace-nowrap">
                            <input
                              type="date"
                              value={fields.estimatedArrival !== undefined ? fields.estimatedArrival : (order.estimatedArrival ? new Date(order.estimatedArrival).toISOString().split('T')[0] : '')}
                              onChange={e => handleFieldChange(order._id, 'estimatedArrival', e.target.value)}
                                className="bg-gray-100 border border-gray-200 rounded px-2 py-1 text-xs text-dark-gray focus:outline-none focus:border-[#2B2B2B] w-28"
                            />
                            </td>
                            <td className="px-3 py-3 whitespace-nowrap text-sm">
                              <div className="flex gap-1">
                          <button
                                  onClick={() => handleSaveChanges(order._id)}
                                  className={`bg-[#2B2B2B] text-white px-2 py-1 rounded text-xs font-medium transition ${saving[order._id] ? 'opacity-60 cursor-not-allowed' : 'hover:bg-gray-800'}`}
                            disabled={!!saving[order._id]}
                          >
                                  {saving[order._id] ? 'Saving...' : 'Save'}
                                </button>
                                <button 
                                  onClick={() => handleDeleteOrder(order._id)}
                                  className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium hover:bg-red-600 transition"
                                >
                                  Remove
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
              </div>
          </div>
        )}
        {showPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center">
                <h2 className="text-xl font-bold text-dark-gray mb-4">Notification</h2>
                <p className="text-medium-gray mb-6">{popupMsg}</p>
              <button
                onClick={() => setShowPopup(false)}
                  className="bg-light-gray text-dark-gray font-semibold rounded-full px-8 py-3 text-lg hover:bg-medium-gray transition"
              >
                OK
              </button>
            </div>
          </div>
        )}

          {showDeleteConfirm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
              <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center">
                <h2 className="text-xl font-bold text-dark-gray mb-4">Confirm Delete</h2>
                <p className="text-medium-gray mb-6">Are you sure you want to delete this order? This action cannot be undone.</p>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="bg-gray-200 text-dark-gray font-semibold rounded-full px-6 py-2 text-sm hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="bg-red-500 text-white font-semibold rounded-full px-6 py-2 text-sm hover:bg-red-600 transition"
                  >
                    Yes, Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.main>
    </div>
  );
};

const Orders = () => {
  return (
    <SidebarProvider>
      <OrdersContent />
    </SidebarProvider>
  );
};

export default Orders; 