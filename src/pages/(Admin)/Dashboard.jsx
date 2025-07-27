import React from 'react';
import Sidebar from '../../components/(Admin)/Sidebar';
import IncomeChart from '../../components/(Admin)/IncomeChart';
import OrdersChart from '../../components/(Admin)/OrdersChart';
import UsersChart from '../../components/(Admin)/UsersChart';

const summary = [
  { label: 'Total Income', value: '$12,500', color: 'bg-green-100 text-green-700' },
  { label: 'Orders', value: '1,230', color: 'bg-blue-100 text-blue-700' },
  { label: 'Users', value: '3,400', color: 'bg-purple-100 text-purple-700' },
  { label: 'Refunds', value: '12', color: 'bg-red-100 text-red-700' },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <main className="flex-1 ml-0 md:ml-64 px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>
        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {summary.map((item) => (
            <div key={item.label} className={`rounded-2xl p-6 shadow-lg ${item.color} bg-opacity-80 flex flex-col items-center border border-gray-200`}>
              <span className="text-2xl font-bold mb-2">{item.value}</span>
              <span className="text-gray-700 text-sm">{item.label}</span>
            </div>
          ))}
        </div>
        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Income (Last 6 Months)</h2>
            <IncomeChart />
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Orders (Last 6 Months)</h2>
            <OrdersChart />
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">User Growth</h2>
            <UsersChart />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard; 