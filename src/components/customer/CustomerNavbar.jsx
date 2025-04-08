import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Newspaper, CreditCard, User, LogOut } from 'lucide-react';

export const CustomerNavbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: '/customer/billing', label: 'Bills', icon: CreditCard },
    { path: '/customer/billing/payment', label: 'Make Payment', icon: CreditCard },
    { path: '/customer/billing/history', label: 'Payment History', icon: LogOut }
  ];

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Newspaper className="h-8 w-8 text-[#1e3a8a]" />
              <span className="ml-2 text-xl font-serif font-semibold text-gray-900">
                Daily Press
              </span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      isActive(item.path)
                        ? 'border-[#1e3a8a] text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-1" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};