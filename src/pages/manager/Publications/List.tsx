import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { ManagerNavbar } from '../../../components/manager/ManagerNavbar';
import { ManagerFooter } from '../../../components/manager/ManagerFooter';
import { PublicationList } from './PublicationList';
import { Publication } from '../../../api/manager.api';

export const PublicationsList: React.FC = () => {
  const [publications, setPublications] = useState<Publication[]>([]);

  // TODO: Implement actual API calls
  useEffect(() => {
    // Fetch publications
  }, []);

  const handleDelete = async (id: string) => {
    // Implement delete functionality
  };

  return (
    <div className="manager-layout">
      <ManagerNavbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold newspaper-header">Publications</h1>
          <Link
            to="/manager/publications/add"
            className="manager-btn manager-btn-primary"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Publication
          </Link>
        </div>
        <PublicationList
          publications={publications}
          onEdit={(pub) => window.location.href = `/manager/publications/edit/${pub.id}`}
          onDelete={handleDelete}
        />
      </main>
      <ManagerFooter />
    </div>
  );
};