import React from 'react';
import AdminSidebar from '../../components/(Admin)/Sidebar';
import { SidebarProvider } from '../../context/SidebarContext';
import { useSidebarContext } from '../../context/SidebarContext';
import { motion } from 'framer-motion';
import IncomeChart from '../../components/(Admin)/IncomeChart';
import OrdersChart from '../../components/(Admin)/OrdersChart';
import UsersChart from '../../components/(Admin)/UsersChart';

const summary = [
  { label: 'Total Income', value: '$12,500', color: 'bg-green-100 text-green-700' },
  { label: 'Orders', value: '1,230', color: 'bg-blue-100 text-blue-700' },
  { label: 'Users', value: '3,400', color: 'bg-purple-100 text-purple-700' },
  { label: 'Refunds', value: '12', color: 'bg-red-100 text-red-700' },
];

const DashboardContent = () => {
  const { isOpen } = useSidebarContext();

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
          <div className="px-6 py-10 bg-white rounded-tl-3xl min-h-screen">
            <h1 className="text-3xl font-bold text-dark-gray mb-8">Admin Dashboard</h1>
          {/* Summary Cards */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
              {summary.map((item) => (
                <div key={item.label} className="rounded-2xl p-6 shadow-lg bg-light-gray flex flex-col items-center border border-medium-gray">
                  <span className="text-2xl font-bold mb-2 text-dark-gray">{item.value}</span>
                  <span className="text-medium-gray text-sm">{item.label}</span>
                </div>
              ))}
            </div>
          {/* Charts */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-light-gray rounded-2xl p-6 shadow-lg border border-medium-gray">
                <h2 className="text-lg font-semibold text-dark-gray mb-4">Income (Last 6 Months)</h2>
                <IncomeChart />
              </div>
              <div className="bg-light-gray rounded-2xl p-6 shadow-lg border border-medium-gray">
                <h2 className="text-lg font-semibold text-dark-gray mb-4">Orders (Last 6 Months)</h2>
                <OrdersChart />
              </div>
              <div className="bg-light-gray rounded-2xl p-6 shadow-lg border border-medium-gray">
                <h2 className="text-lg font-semibold text-dark-gray mb-4">User Growth</h2>
                <UsersChart />
              </div>
            </div>
        </div>
      </motion.main>
    </div>
  );
};

const Dashboard = () => {
  return (
    <SidebarProvider>
      <DashboardContent />
    </SidebarProvider>
  );
};

export default Dashboard; 