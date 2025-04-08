import React, { useEffect, useState } from 'react';
import { getDeliverers } from '../../api/manager.api';
import { MapPin, Phone, Mail } from 'lucide-react';

interface Deliverer {
  id: string;
  name: string;
  email: string;
  phone: string;
  area: string;
  status: string;
}

export default function DelivererList() {
  const [deliverers, setDeliverers] = useState<Deliverer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDeliverers = async () => {
      try {
        const data = await getDeliverers();
        console.log('Fetched deliverers:', data); // Debug log
        // Ensure data is an array; fallback to empty array if not
        setDeliverers(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching deliverers:', error);
        setError('Failed to load deliverers');
        setDeliverers([]); // Reset to empty array on error
      } finally {
        setLoading(false);
      }
    };
    fetchDeliverers();
  }, []);

  if (loading) {
    return <div className="p-4">Loading deliverers...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  // Additional safety check
  if (!Array.isArray(deliverers)) {
    return <div className="p-4 text-red-500">Invalid deliverers data</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold mb-4">Delivery Staff</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Contact</th>
              <th className="px-4 py-2 text-left">Area</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {deliverers.length > 0 ? (
              deliverers.map((deliverer) => (
                <tr key={deliverer.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium">{deliverer.name}</td>
                  <td className="px-4 py-2">
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-2" />
                        {deliverer.email}
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2" />
                        {deliverer.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      {deliverer.area}
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        deliverer.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {deliverer.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-4 py-2 text-center text-gray-500">
                  No deliverers available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}