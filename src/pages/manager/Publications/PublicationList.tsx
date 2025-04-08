import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Publication } from '../../../api/manager.api';

interface PublicationListProps {
  publications: Publication[];
  onEdit: (publication: Publication) => void;
  onDelete: (id: string) => void;
}

export const PublicationList: React.FC<PublicationListProps> = ({
  publications,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="publications-grid">
      {publications.map((publication) => (
        <div key={publication.id} className="publication-card">
          <h3 className="text-xl font-bold mb-2">{publication.name}</h3>
          <p className="text-gray-600 mb-2">{publication.language}</p>
          {publication.description && (
            <p className="text-gray-500 mb-2">{publication.description}</p>
          )}
          <div className="flex justify-between items-center mt-4">
            <span className="text-lg font-semibold">${publication.price}</span>
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(publication)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
              >
                <Edit className="h-5 w-5" />
              </button>
              <button
                onClick={() => onDelete(publication.id!)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-full"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="mt-2">
            <span className="inline-block bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
              {publication.publicationType}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};