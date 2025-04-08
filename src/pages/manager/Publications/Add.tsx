import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ManagerNavbar } from '../../../components/manager/ManagerNavbar';
import { ManagerFooter } from '../../../components/manager/ManagerFooter';
import { ManagerFormInput } from '../../../components/manager/ManagerFormInput';
import { ManagerFormSelect } from '../../../components/manager/ManagerFormSelect';
import { managerApi, Publication } from '../../../api/manager.api';

const publicationTypes = [
  { value: 'Daily', label: 'Daily' },
  { value: 'Weekly', label: 'Weekly' },
  { value: 'Monthly', label: 'Monthly' },
  { value: 'Quarterly', label: 'Quarterly' },
];

const weekdays = [
  { value: 'Monday', label: 'Monday' },
  { value: 'Tuesday', label: 'Tuesday' },
  { value: 'Wednesday', label: 'Wednesday' },
  { value: 'Thursday', label: 'Thursday' },
  { value: 'Friday', label: 'Friday' },
  { value: 'Saturday', label: 'Saturday' },
  { value: 'Sunday', label: 'Sunday' },
];

export const AddPublication: React.FC = () => {
  const navigate = useNavigate();
  const [publication, setPublication] = useState<Partial<Publication>>({
    name: '',
    language: '',
    description: '',
    price: 0,
    publicationType: 'Daily',
    publicationDays: [],
    areas: [],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPublication((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await managerApi.createPublication(publication as Publication);
      navigate('/manager/publications');
    } catch (error) {
      // Handle errors
      console.error('Failed to create publication:', error);
    }
  };

  return (
    <div className="manager-layout">
      <ManagerNavbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="manager-form">
          <h2 className="newspaper-header">Add New Publication</h2>
          
          <ManagerFormInput
            label="Name"
            name="name"
            value={publication.name || ''}
            onChange={handleChange}
            error={errors.name}
            required
          />

          <ManagerFormInput
            label="Language"
            name="language"
            value={publication.language || ''}
            onChange={handleChange}
            error={errors.language}
            required
          />

          <ManagerFormInput
            label="Description"
            name="description"
            value={publication.description || ''}
            onChange={handleChange}
            error={errors.description}
          />

          <ManagerFormInput
            label="Price"
            name="price"
            type="number"
            value={publication.price || ''}
            onChange={handleChange}
            error={errors.price}
            required
            min={0}
          />

          <ManagerFormSelect
            label="Publication Type"
            name="publicationType"
            value={publication.publicationType || ''}
            options={publicationTypes}
            onChange={handleChange}
            error={errors.publicationType}
            required
          />

          {publication.publicationType === 'Weekly' && (
            <ManagerFormSelect
              label="Publication Days"
              name="publicationDays"
              value={publication.publicationDays?.[0] || ''}
              options={weekdays}
              onChange={handleChange}
              error={errors.publicationDays}
              required
            />
          )}

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="manager-btn manager-btn-primary"
            >
              Create Publication
            </button>
          </div>
        </form>
      </main>
      <ManagerFooter />
    </div>
  );
};