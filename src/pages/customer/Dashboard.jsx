import React, { useState, useEffect } from 'react';
import { customerApi } from '../../api/customer.api.ts'; // This now works
import {CustomerNavbar} from '../../components/customer/CustomerNavbar';
import {CustomerFooter} from '../../components/customer/CustomerFooter';
import SubscriptionCard from '../../components/customer/SubscriptionCard';
import {BillSummary} from '../../components/customer/BillSummary';

import DeliveryStatusWidget from '../../components/customer/DeliveryStatusWidget';

export default function Dashboard() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [bills, setBills] = useState([]);
  const [deliveryStatus, setDeliveryStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [subsData, billsData, statusData] = await Promise.all([
          customerApi.getSubscriptions(),
          customerApi.getBills(),
          customerApi.getDeliveryStatus(),
        ]);

        // Log responses for debugging
        console.log('subsData:', subsData);
        console.log('billsData:', billsData);
        console.log('statusData:', statusData);

        // Ensure subscriptions is always an array
        setSubscriptions(
          Array.isArray(subsData?.data) 
            ? subsData.data 
            : Array.isArray(subsData) 
              ? subsData 
              : []
        );
        // Ensure bills is always an array
        setBills(
          Array.isArray(billsData?.data) 
            ? billsData.data 
            : Array.isArray(billsData) 
              ? billsData 
              : []
        );
        // Handle deliveryStatus (object or nested)
        setDeliveryStatus(statusData?.data || statusData || null);
      } catch (err) {
        setError('Failed to load dashboard data. Please try again later.');
        console.error('Dashboard data fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <CustomerNavbar />
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1e3a8a]"></div>
        </div>
        <CustomerFooter />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <CustomerNavbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-600">
            {error}
          </div>
        </div>
        <CustomerFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <CustomerNavbar />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8">
            Welcome Back
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {deliveryStatus && (
              <div className="lg:col-span-1">
                <DeliveryStatusWidget status={deliveryStatus} />
              </div>
            )}
            
            <div className="lg:col-span-2">
              <h2 className="text-xl font-serif font-semibold text-gray-900 mb-4">
                Your Subscriptions
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {subscriptions.map((subscription) => (
                  <SubscriptionCard
                    key={subscription.id}
                    subscription={subscription}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-serif font-semibold text-gray-900 mb-4">
              Recent Bills
            </h2>
            <BillSummary bills={bills} />
          </div>
        </div>
      </main>

      <CustomerFooter />
    </div>
  );
}