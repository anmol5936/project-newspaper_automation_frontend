import React from 'react';

export const CustomerFooter = () => {
  return (
    <footer className="bg-gray-50 mt-auto">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-serif font-semibold text-gray-900 mb-4">Contact Us</h3>
            <p className="text-gray-500">
              1234 Press Avenue<br />
              Newstown, NT 12345<br />
              <a href="tel:+15551234567" className="text-[#1e3a8a] hover:text-blue-700">
                (555) 123-4567
              </a>
            </p>
          </div>
          <div>
            <h3 className="text-lg font-serif font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-gray-500 hover:text-[#1e3a8a]">About Us</a>
              </li>
              <li>
                <a href="/terms" className="text-gray-500 hover:text-[#1e3a8a]">Terms of Service</a>
              </li>
              <li>
                <a href="/privacy" className="text-gray-500 hover:text-[#1e3a8a]">Privacy Policy</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-serif font-semibold text-gray-900 mb-4">Support</h3>
            <p className="text-gray-500 mb-4">
              Need assistance? Our support team is here to help.
            </p>
            <a
              href="mailto:support@dailypress.com"
              className="text-[#1e3a8a] hover:text-blue-700 font-medium"
            >
              support@dailypress.com
            </a>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-500 text-sm">
              <span>Need help? </span>
              <a
                href="mailto:support@dailypress.com"
                className="text-[#1e3a8a] hover:text-blue-700"
              >
                Contact Support
              </a>
            </div>
            <div className="mt-4 md:mt-0 text-gray-400 text-sm">
              © {new Date().getFullYear()} Daily Press. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};