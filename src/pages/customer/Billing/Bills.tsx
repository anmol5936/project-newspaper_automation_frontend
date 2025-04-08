import React, { useEffect, useState } from 'react';
import { customerApi } from '../../../api/customer.api';
import { BillSummary } from '../../../components/customer/BillSummary';
import { CustomerNavbar } from '../../../components/customer/CustomerNavbar';
import { CustomerFooter } from '../../../components/customer/CustomerFooter';

export const Bills: React.FC = () => {
  const [bills, setBills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await customerApi.getBills();
        // Ensure we only set bills if the response data is an array
        if (Array.isArray(response.data)) {
          setBills(response.data);
        } else {
          console.error('Invalid response format:', response.data);
          setError('Received invalid data format from server');
          setBills([]);
        }
      } catch (err) {
        console.error('Error fetching bills:', err);
        setError('Failed to load bills. Please try again later.');
        setBills([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBills();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <CustomerNavbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Bills</h1>
        
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

        {!loading && !error && bills.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No bills found.</p>
          </div>
        )}

        <div className="space-y-4">
          {Array.isArray(bills) && bills.map((bill) => (
            <BillSummary key={bill._id} bill={bill} />
          ))}
        </div>
      </main>
      <CustomerFooter />
    </div>
  );
};