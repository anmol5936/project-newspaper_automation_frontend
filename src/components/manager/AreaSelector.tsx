import React, { useEffect, useState } from 'react';
import { getAreas } from '../../api/manager.api';
import { ChevronDown } from 'lucide-react';

interface Area {
  id: string;
  name: string;
  code: string;
}

export default function AreaSelector() {
  const [areas, setAreas] = useState<Area[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const data = await getAreas();
        console.log('Fetched areas:', data); // Debug log
        // Ensure data is an array; fallback to empty array if not
        setAreas(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching areas:', error);
        setError('Failed to load areas');
        setAreas([]); // Reset to empty array on error
      } finally {
        setLoading(false);
      }
    };
    fetchAreas();
  }, []);

  if (loading) {
    return <div className="p-4">Loading areas...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  // Additional check to ensure areas is an array (redundant but safe)
  if (!Array.isArray(areas)) {
    return <div className="p-4 text-red-500">Invalid areas data</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold mb-4">Delivery Areas</h2>
      <div className="relative">
        <select
          className="w-full p-2 border border-gray-300 rounded-md appearance-none bg-white pr-8"
          defaultValue=""
        >
          <option value="" disabled>Select an area</option>
          {areas.map((area) => (
            <option key={area.id} value={area.id}>
              {area.name} ({area.code})
            </option>
          ))}
        </select>
        <ChevronDown
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
          size={20}
        />
      </div>
      <div className="mt-4">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-left">Area Code</th>
              <th className="px-4 py-2 text-left">Name</th>
            </tr>
          </thead>
          <tbody>
            {areas.length > 0 ? (
              areas.map((area) => (
                <tr key={area.id} className="border-t">
                  <td className="px-4 py-2">{area.code}</td>
                  <td className="px-4 py-2">{area.name}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="px-4 py-2 text-center text-gray-500">
                  No areas available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}