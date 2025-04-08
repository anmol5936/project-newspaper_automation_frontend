import React, { useEffect, useState } from 'react';
import {CustomerNavbar} from '../../../components/customer/CustomerNavbar';
import {CustomerFooter} from '../../..//components/customer/CustomerFooter'
import SubscriptionCard from '../../../components/customer/SubscriptionCard';
import { customerApi } from '../../../api/customer.api';

const List = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadSubscriptions();
  }, []);

  const loadSubscriptions = async () => {
    try {
      const response = await customerApi.getSubscriptions();
      setSubscriptions(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load subscriptions');
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to cancel this subscription?')) {
      try {
        await customerApi.deleteSubscription(id);
        setSubscriptions(subscriptions.filter((sub: any) => sub.id !== id));
      } catch (err) {
        setError('Failed to cancel subscription');
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <CustomerNavbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-serif font-bold mb-8">My Subscriptions</h1>
        
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        ) : subscriptions.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 font-serif mb-4">You don't have any active subscriptions.</p>
            <a
              href="/customer/subscriptions/add"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-serif"
            >
              Start a New Subscription
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {subscriptions.map((subscription: any) => (
              <SubscriptionCard
                key={subscription.id}
                subscription={subscription}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>
      
      <CustomerFooter />
    </div>
  );
};

export default List;