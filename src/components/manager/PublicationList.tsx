import React, { useEffect, useState } from 'react';
import { getPublications } from '../../api/manager.api';
import { Calendar, Clock } from 'lucide-react';

interface Publication {
  id: string;
  title: string;
  description: string;
  frequency: string;
  price: number;
  coverImage: string;
}

export default function PublicationList() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const data = await getPublications();
        setPublications(data);
      } catch (error) {
        console.error('Error fetching publications:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPublications();
  }, []);

  if (loading) {
    return <div className="p-4">Loading publications...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold mb-4">Publications Catalog</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {publications.map((publication) => (
          <div key={publication.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <img
              src={publication.coverImage}
              alt={publication.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{publication.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{publication.description}</p>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{publication.frequency}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-lg">
                  ${publication.price.toFixed(2)}
                </span>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}