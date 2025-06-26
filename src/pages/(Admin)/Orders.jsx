import React, { useState } from 'react';
import Sidebar from '../../components/(Admin)/Sidebar';

const statusOptions = ['Accept', 'Packing', 'Shipping', 'Delivered'];

const statusColors = {
  Accept: 'text-yellow-400',
  Packing: 'text-blue-400',
  Shipping: 'text-purple-400',
  Delivered: 'text-green-400',
};

const initialOrders = [
  { id: 1001, customer: 'John Doe', total: 199.98, date: '2024-06-01', status: 'Accept' },
  { id: 1002, customer: 'Jane Smith', total: 89.99, date: '2024-06-02', status: 'Packing' },
  { id: 1003, customer: 'Alice Johnson', total: 49.99, date: '2024-06-03', status: 'Shipping' },
  { id: 1004, customer: 'Bob Lee', total: 129.99, date: '2024-06-04', status: 'Delivered' },
];

const Orders = () => {
  const [orders, setOrders] = useState(initialOrders);

  const handleStatusChange = (id, newStatus) => {
    setOrders(orders =>
      orders.map(order =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div className="min-h-screen bg-black flex">
      <Sidebar />
      <main className="flex-1 ml-0 md:ml-64 px-6 py-10">
        <h1 className="text-2xl font-bold text-white mb-8">Orders</h1>
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
              {orders.map(order => (
                <tr key={order.id} className="border-t border-white/10">
                  <td className="py-3 px-4 text-white font-mono">#{order.id}</td>
                  <td className="py-3 px-4 text-white">{order.customer}</td>
                  <td className="py-3 px-4 text-[#00FF99] font-semibold">${order.total.toFixed(2)}</td>
                  <td className="py-3 px-4 text-white/80">{order.date}</td>
                  <td className="py-3 px-4">
                    <select
                      value={order.status}
                      onChange={e => handleStatusChange(order.id, e.target.value)}
                      className={`bg-black/40 border border-white/20 rounded px-3 py-2 text-sm font-semibold focus:outline-none ${statusColors[order.status]}`}
                    >
                      {statusOptions.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Orders; 