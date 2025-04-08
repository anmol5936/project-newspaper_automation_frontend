import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { customerApi } from '../../../api/customer.api';
import { CustomerNavbar } from '../../../components/customer/CustomerNavbar';
import { CustomerFooter } from '../../../components/customer/CustomerFooter';
import { FileText, Calendar, DollarSign, AlertCircle } from 'lucide-react';

interface Bill {
  _id: string;
  billNumber: string;
  amount: number;
  dueDate: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  items: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }>;
}

export const BillDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [bill, setBill] = useState<Bill | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBill = async () => {
      try {
        const response = await customerApi.getBillById(id!);
        setBill(response.data);
      } catch (err) {
        setError('Failed to load bill details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBill();
  }, [id]);

  const statusColors = {
    Paid: 'bg-green-100 text-green-800',
    Pending: 'bg-yellow-100 text-yellow-800',
    Overdue: 'bg-red-100 text-red-800'
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <CustomerNavbar />
        <div className="flex-grow flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
        <CustomerFooter />
      </div>
    );
  }

  if (error || !bill) {
    return (
      <div className="min-h-screen flex flex-col">
        <CustomerNavbar />
        <div className="flex-grow container mx-auto px-4 py-8">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error || 'Bill not found'}
          </div>
          <Link to="/customer/billing" className="mt-4 inline-block text-blue-600 hover:text-blue-800">
            ← Back to Bills
          </Link>
        </div>
        <CustomerFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <CustomerNavbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Bill Details</h1>
              <div className="flex items-center mt-2">
                <FileText className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-gray-600">Bill #{bill.billNumber}</span>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[bill.status]}`}>
              {bill.status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-gray-500 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Due Date</p>
                <p className="font-medium">{new Date(bill.dueDate).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center">
              <DollarSign className="h-5 w-5 text-gray-500 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="font-medium">₹{bill.amount.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Unit Price
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bill.items.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                      {item.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                      ₹{item.unitPrice.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                      ₹{item.total.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-50">
                  <td colSpan={3} className="px-6 py-4 text-right font-medium">
                    Total
                  </td>
                  <td className="px-6 py-4 text-right font-bold">
                    ₹{bill.amount.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {bill.status !== 'Paid' && (
            <div className="mt-8 flex justify-end">
              <Link
                to={`/customer/billing/payment?billId=${bill._id}`}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Pay Now
              </Link>
            </div>
          )}
        </div>
      </main>
      <CustomerFooter />
    </div>
  );
};