import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Package, CheckSquare, Camera, LogOut } from 'lucide-react';

export const DelivererNavbar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/deliverer/items', icon: Package, label: 'Items' },
    { path: '/deliverer/status', icon: CheckSquare, label: 'Update Status' },
    { path: '/deliverer/proof', icon: Camera, label: 'Delivery Proof' },
  ];

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Package className="w-8 h-8 text-blue-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">DeliverEase</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      location.pathname === item.path
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:border-blue-500 hover:text-blue-600'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <button
              type="button"
              className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <LogOut className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

