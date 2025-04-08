import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  MapPin, 
  Users, 
  Truck, 
  Newspaper, 
  LogOut,
  Bell,
  FileText 
} from 'lucide-react';

export const ManagerNavbar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-blue-700' : '';
  };

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link to="/manager" className="flex items-center space-x-2">
              <Newspaper className="h-8 w-8" />
              <span className="font-bold text-xl">Manager Portal</span>
            </Link>
            <div className="hidden md:flex space-x-2">
              <Link
                to="/manager/areas"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors ${isActive('/manager/areas')}`}
              >
                <MapPin className="w-4 h-4 mr-2" />
                Areas
              </Link>
              <Link
                to="/manager/customers"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors ${isActive('/manager/customers')}`}
              >
                <Users className="w-4 h-4 mr-2" />
                Customers
              </Link>
              <Link
                to="/manager/deliverers"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors ${isActive('/manager/deliverers')}`}
              >
                <Truck className="w-4 h-4 mr-2" />
                Deliverers
              </Link>
              <Link
                to="/manager/publications"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors ${isActive('/manager/publications')}`}
              >
                <FileText className="w-4 h-4 mr-2" />
                Publications
              </Link>
              <Link
                to="/manager/billing"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors ${isActive('/manager/billing')}`}
              >
                <Bell className="w-4 h-4 mr-2" />
                Billing
              </Link>
            </div>
          </div>
          <button
            onClick={() => {/* Handle logout */}}
            className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-red-600 transition-colors"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};