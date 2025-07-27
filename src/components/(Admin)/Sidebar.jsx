import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const links = [
  { label: 'Dashboard', to: '/admin' },
  { label: 'Products', to: '/admin/products' },
  { label: 'Orders', to: '/admin/orders' },
  { label: 'Add Product', to: '/admin/add-product' },
];

const Sidebar = () => {
  const location = useLocation();
  return (
    <aside className="hidden md:block fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 shadow-lg z-40">
      <div className="flex flex-col h-full p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-10">Admin</h2>
        <nav className="flex-1">
          <ul className="space-y-4">
            {links.map(link => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`block px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    location.pathname === link.to
                      ? 'bg-gray-100 text-gray-900 font-semibold border-l-4 border-gray-800'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto pt-8 border-t border-gray-100 text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Kickoff Admin
        </div>
      </div>
    </aside>
  );
};

export default Sidebar; 