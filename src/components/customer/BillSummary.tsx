import React from 'react';
import { Link } from 'react-router-dom';
import { Receipt } from 'lucide-react';

interface Bill {
  _id: string;
  billNumber: string;
  amount: number;
  dueDate: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  date: string;
}

interface Props {
  bills: Bill[]; // Changed from 'bill' to 'bills' and made it an array
}

export const BillSummary: React.FC<Props> = ({ bills }) => {
  const statusColors = {
    Paid: 'bg-green-100 text-green-800',
    Pending: 'bg-yellow-100 text-yellow-800',
    Overdue: 'bg-red-100 text-red-800'
  };

  // If bills is not an array or is empty, show a fallback message
  if (!Array.isArray(bills) || bills.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-4 text-gray-600">
        <p className="font-serif">No bills available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {bills.map((bill) => (
        <div
          key={bill._id}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Receipt className="h-8 w-8 text-gray-500 mr-4" />
              <div>
                <h3 className="text-lg font-serif font-semibold text-gray-800">
                  Bill #{bill.billNumber}
                </h3>
                <p className="text-sm text-gray-600">
                  Due: {new Date(bill.dueDate).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-gray-800">
                ₹{bill.amount.toFixed(2)}
              </p>
              <span
                className={`inline-block px-2 py-1 rounded text-sm font-medium ${
                  statusColors[bill.status]
                }`}
              >
                {bill.status}
              </span>
            </div>
          </div>
          <div className="mt-4 flex justify-end space-x-4">
            <Link
              to={`/customer/billing/${bill._id}`}
              className="text-[#1e3a8a] hover:text-blue-700 font-medium"
            >
              View Details
            </Link>
            {bill.status !== 'Paid' && (
              <Link
                to={`/customer/billing/payment?billId=${bill._id}`}
                className="bg-[#1e3a8a] text-white px-4 py-2 rounded hover:bg-blue-900 transition-colors"
              >
                Pay Now
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};