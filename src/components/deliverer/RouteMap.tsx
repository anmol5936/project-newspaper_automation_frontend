import React, { useEffect, useState } from 'react';
import { Map } from 'lucide-react';
import { getDelivererRoutes } from '../../api/deliverer.api';

export const RouteMap: React.FC = () => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const data = await getDelivererRoutes();
        setRoutes(data);
      } catch (error) {
        console.error('Failed to fetch routes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoutes();
  }, []);

  if (loading) {
    return <div className="animate-pulse h-96 bg-gray-100 rounded-lg"></div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <Map className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-800">Route Map</h2>
      </div>
      <div className="border-2 border-dashed border-gray-200 rounded-lg h-80 flex items-center justify-center">
        <p className="text-gray-500">Map visualization will be integrated here</p>
      </div>
    </div>
  );
};