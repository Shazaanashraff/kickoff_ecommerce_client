import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart2, PlusCircle, Edit, ShoppingBag } from 'lucide-react';

const links = [
  { label: 'Dashboard', to: '/admin', icon: <BarChart2 size={20} /> },
  { label: 'Add Product', to: '/admin/add-product', icon: <PlusCircle size={20} /> },
  { label: 'Update/Delete Product', to: '/admin/products', icon: <Edit size={20} /> },
  { label: 'Orders', to: '/admin/orders', icon: <ShoppingBag size={20} /> },
];

const Sidebar = () => {
  const location = useLocation();
  return (
    <aside className="h-screen w-64 bg-black border-r border-white/10 flex flex-col py-8 px-4 fixed top-0 left-0 z-40">
      <div className="mb-10 text-2xl font-bold text-[#00FF99] tracking-wide text-center select-none">ADMIN</div>
      <nav className="flex flex-col gap-2">
        {links.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-white transition-all hover:bg-[#00FF99]/10 hover:text-[#00FF99] ${location.pathname === link.to ? 'bg-[#00FF99]/20 text-[#00FF99]' : ''}`}
          >
            {link.icon}
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar; 