import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck, Package, CheckCircle, Box, Search } from 'lucide-react';
import axios from 'axios';
import Navbar from '../../components/(Shop)/Navbar';

const STATUS_STEPS = [
  { key: 'Pending', label: 'Pending', icon: <Box /> },
  { key: 'Processing', label: 'Processing', icon: <Package /> },
  { key: 'Shipped', label: 'Shipped', icon: <Truck /> },
  { key: 'Delivered', label: 'Delivered', icon: <CheckCircle /> },
];

const statusIndex = status => STATUS_STEPS.findIndex(s => s.key === status);

const Order = () => {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [vanPosition, setVanPosition] = useState(0);
  const [reviewInputs, setReviewInputs] = useState({});
  const [editingReview, setEditingReview] = useState({});

  const fetchOrder = async () => {
    setLoading(true);
    setError(null);
    setOrder(null);
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

  const handleReviewInput = (productId, field, value) => {
    setReviewInputs(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [field]: value,
      },
    }));
  };

  const handleSubmitReview = async (productId) => {
    setReviewInputs(prev => ({
      ...prev,
      [productId]: { ...prev[productId], submitting: true, error: null, success: false }
    }));
    try {
      const review = reviewInputs[productId] || {};
      if (!review.name || !review.comment) {
        setReviewInputs(prev => ({
          ...prev,
          [productId]: { ...prev[productId], submitting: false, error: 'Name and comment are required.' }
        }));
        return;
      }
      const payload = {
        comment: review.comment,
        name: review.name,
        orderId: order._id,
      };
      const res = await axios.post(`http://localhost:5001/api/products/${productId}/reviews`, payload);
      if (res.data.success) {
        setReviewInputs(prev => ({
          ...prev,
          [productId]: { ...prev[productId], submitting: false, comment: '', name: '', success: true }
        }));
        // Refetch order to show new review
        fetchOrder();
      } else {
        setReviewInputs(prev => ({
          ...prev,
          [productId]: { ...prev[productId], submitting: false, error: res.data.message || 'Failed to submit review' }
        }));
      }
    } catch (err) {
      setReviewInputs(prev => ({
        ...prev,
        [productId]: { ...prev[productId], submitting: false, error: err.response?.data?.message || err.message }
      }));
    }
  };

  // Handler for editing a review
  const handleEditReview = (productId, reviewIdx) => {
    const review = (order.items.find(i => i.product?._id === productId)?.product?.reviews || [])[reviewIdx];
    setEditingReview({ productId, reviewIdx, comment: review.comment });
  };

  const handleUpdateReview = async (productId, reviewIdx) => {
    setReviewInputs(prev => ({ ...prev, [productId]: { ...prev[productId], submitting: true, error: null, success: false } }));
    try {
      const review = (order.items.find(i => i.product?._id === productId)?.product?.reviews || [])[reviewIdx];
      const payload = {
        comment: editingReview.comment,
        name: review.user?.name || review.user || '',
        reviewIdx,
        orderId: order._id,
        edit: true
      };
      const res = await axios.post(`http://localhost:5001/api/products/${productId}/reviews`, payload);
      if (res.data.success) {
        setEditingReview({});
        fetchOrder();
      } else {
        setReviewInputs(prev => ({ ...prev, [productId]: { ...prev[productId], submitting: false, error: res.data.message || 'Failed to update review' } }));
      }
    } catch (err) {
      setReviewInputs(prev => ({ ...prev, [productId]: { ...prev[productId], submitting: false, error: err.response?.data?.message || err.message } }));
    }
  };

  const handleDeleteReview = async (productId, reviewIdx) => {
    setReviewInputs(prev => ({ ...prev, [productId]: { ...prev[productId], submitting: true, error: null, success: false } }));
    try {
      const review = (order.items.find(i => i.product?._id === productId)?.product?.reviews || [])[reviewIdx];
      const payload = {
        name: review.user?.name || review.user || '',
        reviewIdx,
        orderId: order._id,
        delete: true
      };
      const res = await axios.post(`http://localhost:5001/api/products/${productId}/reviews`, payload);
      if (res.data.success) {
        fetchOrder();
      } else {
        setReviewInputs(prev => ({ ...prev, [productId]: { ...prev[productId], submitting: false, error: res.data.message || 'Failed to delete review' } }));
      }
    } catch (err) {
      setReviewInputs(prev => ({ ...prev, [productId]: { ...prev[productId], submitting: false, error: err.response?.data?.message || err.message } }));
    }
  };

  // Helper to find user's review for this product/order
  const getUserReviewIdx = (product, orderId, name) => {
    return product?.reviews?.findIndex(r => r.orderId === orderId && r.user === name);
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
                <div><span className="font-semibold">Arrival Estimate:</span> {order.estimatedArrival ? (new Date(order.estimatedArrival).toISOString().split('T')[0]) : 'N/A'}</div>
                <div><span className="font-semibold">Shipping:</span> ${order.shippingPrice || 0}</div>
                <div><span className="font-semibold">Total Amount:</span> <span className="text-[#00FF99] font-bold">${(order.totalPrice || 0) + (order.shippingPrice || 0)}</span></div>
              </div>
            </div>
            {/* Product List */}
            <div className="bg-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Products</h3>
              <div className="flex flex-col gap-4">
                {order.items && order.items.length > 0 ? order.items.map((item, idx) => (
                  <div key={idx} className="flex flex-col gap-2 bg-black/30 rounded-lg p-3 mb-4">
                    <div className="flex items-center gap-4">
                      <img src={item.product?.images?.[0] || ''} alt={item.product?.name} className="w-16 h-16 object-cover rounded-lg border border-white/10" />
                      <div className="flex-1">
                        <div className="text-white font-semibold">{item.product?.name}</div>
                        <div className="text-white/70 text-xs">Size: {item.size}</div>
                        <div className="text-white/70 text-xs">Qty: {item.quantity}</div>
                      </div>
                      <div className="text-[#00FF99] font-bold text-lg">${item.price}</div>
                    </div>
                    {/* Reviews Section */}
                    <div className="mt-2 ml-20">
                      <div className="mb-2">
                        <span className="text-white/80 font-semibold">Reviews:</span>
                        <ul className="ml-2 mt-1 space-y-1">
                          {item.product?.reviews && item.product.reviews.length > 0 ? (
                            item.product.reviews.map((review, i) => (
                              <li key={i} className="text-white/70 text-sm border-b border-white/10 pb-1">
                                <span className="font-bold text-white/90">{review.user?.name || review.user || 'Anonymous'}:</span> {review.comment}
                              </li>
                            ))
                          ) : (
                            <li className="text-white/40 text-xs">No reviews yet.</li>
                          )}
                        </ul>
                      </div>
                      {/* Only show review form if user hasn't submitted a review for this product/order */}
                      {order.status === 'Delivered' && getUserReviewIdx(item.product, order._id, reviewInputs[item.product?._id]?.name || '') === -1 && (
                        <form
                          className="flex flex-col gap-2 bg-black/40 p-3 rounded-lg mt-2"
                          onSubmit={e => {
                            e.preventDefault();
                            handleSubmitReview(item.product?._id);
                          }}
                        >
                          <input
                            type="text"
                            placeholder="Your Name"
                            value={reviewInputs[item.product?._id]?.name || ''}
                            onChange={e => handleReviewInput(item.product?._id, 'name', e.target.value)}
                            className="bg-black/20 border border-white/20 rounded px-3 py-2 text-sm text-white focus:outline-none"
                            required
                          />
                          <textarea
                            placeholder="Write your review..."
                            value={reviewInputs[item.product?._id]?.comment || ''}
                            onChange={e => handleReviewInput(item.product?._id, 'comment', e.target.value)}
                            className="bg-black/20 border border-white/20 rounded px-3 py-2 text-sm text-white focus:outline-none"
                            required
                          />
                          <button
                            type="submit"
                            className="bg-[#00FF99] text-black font-semibold rounded-full px-4 py-2 text-sm hover:bg-[#00E589] transition self-end"
                            disabled={reviewInputs[item.product?._id]?.submitting}
                          >
                            {reviewInputs[item.product?._id]?.submitting ? 'Submitting...' : 'Submit Review'}
                          </button>
                          {reviewInputs[item.product?._id]?.error && (
                            <div className="text-red-400 text-xs mt-1">{reviewInputs[item.product?._id]?.error}</div>
                          )}
                          {reviewInputs[item.product?._id]?.success && (
                            <div className="text-green-400 text-xs mt-1">Review submitted!</div>
                          )}
                        </form>
                      )}
                      {/* Show edit/delete for user's review for this order */}
                      {(() => {
                        const idx = getUserReviewIdx(item.product, order._id, reviewInputs[item.product?._id]?.name || '');
                        if (idx === -1) return null;
                        return (
                          <div className="flex gap-2 mt-2">
                            {editingReview.productId === item.product?._id && editingReview.reviewIdx === idx ? (
                              <>
                                <textarea
                                  value={editingReview.comment}
                                  onChange={e => setEditingReview({ ...editingReview, comment: e.target.value })}
                                  className="bg-black/20 border border-white/20 rounded px-3 py-2 text-sm text-white focus:outline-none"
                                />
                                <button onClick={() => handleUpdateReview(item.product?._id, idx)} className="bg-[#00FF99] text-black font-semibold rounded-full px-4 py-2 text-sm hover:bg-[#00E589] transition">Save</button>
                                <button onClick={() => setEditingReview({})} className="bg-gray-500 text-white rounded-full px-4 py-2 text-sm">Cancel</button>
                              </>
                            ) : (
                              <>
                                <button onClick={() => handleEditReview(item.product?._id, idx)} className="bg-blue-500 text-white rounded-full px-4 py-2 text-sm">Edit</button>
                                <button onClick={() => handleDeleteReview(item.product?._id, idx)} className="bg-red-500 text-white rounded-full px-4 py-2 text-sm">Delete</button>
                              </>
                            )}
                          </div>
                        );
                      })()}
                    </div>
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