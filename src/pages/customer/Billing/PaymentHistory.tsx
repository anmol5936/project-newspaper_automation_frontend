import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CustomerNavbar } from '../../../components/customer/CustomerNavbar';
import { CustomerFooter } from '../../../components/customer/CustomerFooter';
import { CheckCircle, Calendar, DollarSign, CreditCard } from 'lucide-react';
import { customerApi } from '../../../api/customer.api';

interface Payment {
  _id: string;
  billId: string;
  billNumber: string;
  amount: number;
  paymentMethod: string;
  referenceNumber?: string;
  timestamp: string;
}

export const PaymentHistory: React.FC = () => {
  const location = useLocation();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await customerApi.getPaymentHistory();
        setPayments(response.data);
      } catch (err) {
        setError('Failed to load payment history. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <CustomerNavbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Payment History</h1>

        {location.state?.success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 flex items-center">
            <CheckCircle className="h-5 w-5 mr-2" />
            Payment successful! Your transaction has been recorded.
          </div>
        )}

        {loading && (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {!loading && !error && payments.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No payment history found.</p>
          </div>
        )}

        <div className="space-y-4">
          {payments.map((payment) => (
            <div
              key={payment._id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium">
                      {new Date(payment.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-gray-500 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Amount</p>
                    <p className="font-medium">₹{payment.amount.toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <CreditCard className="h-5 w-5 text-gray-500 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Payment Method</p>
                    <p className="font-medium">{payment.paymentMethod}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Bill Number</p>
                  <p className="font-medium">#{payment.billNumber}</p>
                  {payment.referenceNumber && (
                    <p className="text-sm text-gray-500 mt-1">
                      Ref: {payment.referenceNumber}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <CustomerFooter />
    </div>
  );
};