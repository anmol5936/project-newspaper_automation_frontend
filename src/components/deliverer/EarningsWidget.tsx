import React, { useEffect, useState } from 'react';
import { DollarSign, TrendingUp } from 'lucide-react';
import { getDelivererEarnings } from '../../api/deliverer.api';

export const EarningsWidget: React.FC = () => {
  const [earnings, setEarnings] = useState({ total: 0, today: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const data = await getDelivererEarnings();
        setEarnings(data);
      } catch (error) {
        console.error('Failed to fetch earnings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEarnings();
  }, []);

  if (loading) {
    return <div className="animate-pulse h-32 bg-gray-100 rounded-lg"></div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <DollarSign className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-800">Earnings</h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Today's Earnings</p>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-blue-600">${earnings.today}</span>
            <TrendingUp className="w-4 h-4 text-green-500" />
          </div>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Total Earnings</p>
          <span className="text-2xl font-bold text-gray-800">${earnings.total}</span>
        </div>
      </div>
    </div>
  );
};