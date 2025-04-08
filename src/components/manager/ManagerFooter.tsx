import React from 'react';
import { Mail, Phone } from 'lucide-react';

export const ManagerFooter = () => {
  return (
    <footer className="bg-gray-100 border-t">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Manager Tools</h3>
            <p className="text-gray-600 text-sm">
              Streamline your newspaper delivery operations with our comprehensive management suite.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Contact Support</h3>
            <div className="space-y-2">
              <div className="flex items-center text-gray-600">
                <Mail className="w-4 h-4 mr-2" />
                <span>support@newspaper.com</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Phone className="w-4 h-4 mr-2" />
                <span>1-800-NEWS-HELP</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Quick Links</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <a href="#" className="hover:text-blue-600">Help Center</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">Documentation</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">Report Issues</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Newspaper Manager. All rights reserved.
        </div>
      </div>
    </footer>
  );
}