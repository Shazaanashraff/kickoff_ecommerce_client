import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { Truck, Package, CheckCircle, Box, Search, Phone, MapPin, CreditCard, User } from 'lucide-react';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import image1 from '../../assets/reltedProducts/image1.jpeg';
import image2 from '../../assets/reltedProducts/image2.jpeg';

const STATUS_STEPS = [
  { 
    key: 'Packed', 
    label: 'Packed', 
    icon: <CheckCircle className="w-5 h-5" />,
    date: '04 Mar',
    description: 'Consectetur amet in excepteur mollit velit tempor pariatur fugiat culpa sit tempor'
  },
  { 
    key: 'Transit', 
    label: 'At the transit center', 
    icon: <MapPin className="w-5 h-5" />,
    date: '05 Mar',
    description: 'Exercitation voluptate eiusmod qui irure dolore pariatur'
  },
  { 
    key: 'Delivering', 
    label: 'Being delivered', 
    icon: <Truck className="w-5 h-5" />,
    date: '05 Mar',
    description: 'Nulla exercitation sit excepteur veniam ad irure ut id voluptate'
  },
  { 
    key: 'Delivered', 
    label: 'Deliver to you', 
    icon: <Box className="w-5 h-5" />,
    date: '06 Mar',
    description: 'Fugiat aliqua et aute consequat quis ea adipisicing'
  },
];

const statusIndex = status => STATUS_STEPS.findIndex(s => s.key === status);

// Dummy order for demo purposes
const DUMMY_ORDER = {
  _id: '0000',
  status: 'Delivering',
  estimatedArrival: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
  shippingPrice: 10,
  totalPrice: 269,
  customer: {
    name: 'Austin Foley',
    phone: '(458) 632-8404',
    address: '27 Mongolia, Phoenix, AZ'
  },
  paymentMethod: {
    type: 'VISA',
    lastDigits: '64'
  },
  items: [
    {
      product: {
        name: 'Product name',
        images: [image1],
      },
      size: 'M',
      quantity: 1,
      price: 173,
    },
    {
      product: {
        name: 'Product name',
        images: [image2],
      },
      size: 'L',
      quantity: 1,
      price: 23,
    },
    {
      product: {
        name: 'Product name',
        images: [image1],
      },
      size: 'S',
      quantity: 1,
      price: 73,
    },
  ],
};

const Order = () => {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { backendUrl } = useContext(AppContext);

  const fetchOrder = async () => {
    setLoading(true);
    setError(null);
    setOrder(null);
    
    try {
      // Handle demo orders first
      if (orderId === '586789963' || orderId === '123') {
        setOrder(DUMMY_ORDER);
        setLoading(false);
        return;
      }

      // For real orders, try to fetch from backend
      if (backendUrl) {
        try {
          const res = await axios.get(`${backendUrl}/api/orders/${orderId}`);
          if (res.data.success) {
            setOrder(res.data.data);
          } else {
            setError(res.data.message || 'Order not found');
          }
        } catch (err) {
          // If backend fails, show demo order for any valid-looking ID
          if (orderId.length > 3) {
            setOrder(DUMMY_ORDER);
          } else {
            setError('Order not found. Please check your order ID.');
          }
        }
      } else {
        // If no backend URL, show demo order for any valid-looking ID
        if (orderId.length > 3) {
          setOrder(DUMMY_ORDER);
        } else {
          setError('Please enter a valid order ID.');
        }
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 mt-16">
        {/* Search Section */}
        <div className="mb-8">
          <div className="flex flex-col items-center mb-6">
            <div className="flex-1 max-w-md w-full">
              <div className="flex">
                <input
                  type="text"
                  value={orderId}
                  onChange={e => setOrderId(e.target.value)}
                  placeholder="Enter Order ID"
                  className="flex-1 px-4 py-3 border-l border-t border-b border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={fetchOrder}
                  className="bg-gray-800 text-white px-6 py-3 border border-gray-800 font-semibold hover:bg-gray-700 transition flex items-center gap-2"
                  disabled={loading || !orderId}
                >
                  <Search className="w-5 h-5" />
                  Track
                </button>
              </div>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">Order tracking</h1>
          
          {order && (
            <div className="flex justify-center items-center space-x-4 mb-6">
              <span className="text-gray-600">Order number #{order._id}</span>
              <button className="text-blue-600 hover:text-blue-700 font-medium">View invoice</button>
            </div>
          )}
          
          {loading && <div className="text-gray-600 mt-2 text-center">Loading...</div>}
          {error && <div className="text-red-500 mt-2 text-center">{error}</div>}
        </div>

        {order && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Section - Order Details */}
            <div className="space-y-6">
              {/* Products Section */}
              <div className="bg-white border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Product</h2>
                <div className="space-y-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-4 p-4 bg-gray-50 border border-gray-200">
                      <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                        <img 
                          src={item.product?.images?.[0] || ''} 
                          alt={item.product?.name} 
                          className="w-12 h-12 object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-800">{item.product?.name}</div>
                        <div className="text-gray-600 text-sm">Quantity: {item.quantity}</div>
                      </div>
                      <div className="text-lg font-bold text-gray-800">${item.price}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Details Section */}
              <div className="bg-white border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Order Details</h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Order ID:</span>
                    <span className="font-semibold text-gray-800">#{order._id}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Status:</span>
                    <span className="text-gray-800 font-bold">{order.status}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Estimated Arrival:</span>
                    <span className="font-semibold text-gray-800">
                      {order.estimatedArrival ? new Date(order.estimatedArrival).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-semibold text-gray-800">${order.totalPrice || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Shipping:</span>
                    <span className="font-semibold text-gray-800">${order.shippingPrice || 0}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-800">Total Amount:</span>
                      <span className="text-lg font-bold text-gray-800">
                        ${(order.totalPrice || 0) + (order.shippingPrice || 0)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Payment method</h2>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-8 bg-gray-800 flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">Visa ****{order.paymentMethod?.lastDigits}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section - Package Tracking */}
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Track your package</h2>
                
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                  
                  <div className="space-y-6">
                    {STATUS_STEPS.map((step, idx) => {
                      const isCompleted = idx <= statusIndex(order.status);
                      const isCurrent = idx === statusIndex(order.status);
                      
                      return (
                        <div key={step.key} className="relative flex items-start space-x-4">
                          {/* Timeline Node */}
                          <div className={`w-12 h-12 border-2 flex items-center justify-center z-10 ${
                            isCompleted 
                              ? 'border-gray-800 bg-gray-200 text-gray-800' 
                              : 'border-gray-300 bg-white text-gray-400'
                          }`}>
                            {step.icon}
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1 pt-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="text-sm font-medium text-gray-600">{step.date}</span>
                              <span className="text-sm font-semibold text-gray-800">- {step.label}</span>
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Delivery Address - Moved below tracking */}
              <div className="bg-white border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Deliver to</h2>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-300 flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800">{order.customer?.name}</div>
                    <div className="flex items-center space-x-2 text-gray-600 text-sm mt-1">
                      <Phone className="w-4 h-4" />
                      <span>{order.customer?.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600 text-sm mt-1">
                      <MapPin className="w-4 h-4" />
                      <span>{order.customer?.address}</span>
                    </div>
                  </div>
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
