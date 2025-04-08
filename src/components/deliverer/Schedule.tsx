import React, { useEffect, useState } from 'react';
import { Calendar } from 'lucide-react';
import { getDelivererSchedule } from '../../api/deliverer.api';

export const Schedule: React.FC = () => {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const data = await getDelivererSchedule();
        setSchedule(data);
      } catch (error) {
        console.error('Failed to fetch schedule:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  if (loading) {
    return <div className="animate-pulse h-64 bg-gray-100 rounded-lg"></div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-800">Delivery Schedule</h2>
      </div>
      <div className="space-y-3">
        {/* Placeholder schedule items */}
        <div className="p-3 border border-gray-100 rounded-md hover:bg-gray-50">
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-700">Morning Route</span>
            <span className="text-sm text-gray-500">8:00 AM - 12:00 PM</span>
          </div>
        </div>
        <div className="p-3 border border-gray-100 rounded-md hover:bg-gray-50">
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-700">Afternoon Route</span>
            <span className="text-sm text-gray-500">1:00 PM - 5:00 PM</span>
          </div>
        </div>
      </div>
    </div>
  );
};