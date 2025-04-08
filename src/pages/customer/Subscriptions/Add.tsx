import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {CustomerNavbar} from '../../../components/customer/CustomerNavbar';
import {CustomerFooter} from '../../../components/customer/CustomerFooter';
import CustomerFormInput from '../../../components/customer/CustomerFormInput';
import {CustomerFormSelect} from '../../../components/customer/CustomerFormSelect';
import { customerApi } from '../../../api/customer.api';


export const AddSubscription = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    publicationId: '',
    quantity: 1,
    startDate: '',
    endDate: '',
    addressId: '',
    deliveryPreferences: {
      placement: '',
      additionalInstructions: ''
    }
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Mock data for dropdowns - replace with actual data from your customerApi
  const publications = [
    { value: '1', label: 'Daily News' },
    { value: '2', label: 'Weekend Edition' },
    { value: '3', label: 'Sunday Special' }
  ];

  const addresses = [
    { value: '1', label: '123 Main St, City, State 12345' },
    { value: '2', label: '456 Oak Ave, Town, State 67890' }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('deliveryPreferences.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        deliveryPreferences: {
          ...prev.deliveryPreferences,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.publicationId) newErrors.publicationId = 'Publication is required';
    if (formData.quantity < 1) newErrors.quantity = 'Quantity must be at least 1';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.addressId) newErrors.addressId = 'Delivery address is required';
    
    if (formData.endDate && new Date(formData.endDate) <= new Date(formData.startDate)) {
      newErrors.endDate = 'End date must be after start date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    try {
      await customerApi.createSubscription(formData);
      navigate('/customer/subscriptions');
    } catch (err) {
      setErrors({ submit: 'Failed to create subscription' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <CustomerNavbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-serif font-bold mb-8">Start New Subscription</h1>
          
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
            <CustomerFormSelect
              label="Publication"
              name="publicationId"
              value={formData.publicationId}
              options={publications}
              onChange={handleChange}
              error={errors.publicationId}
              required
            />
            
            <CustomerFormInput
              label="Quantity"
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min={1}
              error={errors.quantity}
              required
            />
            
            <CustomerFormInput
              label="Start Date"
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              error={errors.startDate}
              required
            />
            
            <CustomerFormInput
              label="End Date (Optional)"
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              min={formData.startDate}
              error={errors.endDate}
            />
            
            <CustomerFormSelect
              label="Delivery Address"
              name="addressId"
              value={formData.addressId}
              options={addresses}
              onChange={handleChange}
              error={errors.addressId}
              required
            />
            
            <div className="mt-6 border-t pt-6">
              <h3 className="text-lg font-serif font-semibold mb-4">Delivery Preferences</h3>
              
              <CustomerFormInput
                label="Placement"
                type="text"
                name="deliveryPreferences.placement"
                value={formData.deliveryPreferences.placement}
                onChange={handleChange}
                placeholder="e.g., Front door, Side entrance"
              />
              
              <CustomerFormInput
                label="Additional Instructions"
                type="text"
                name="deliveryPreferences.additionalInstructions"
                value={formData.deliveryPreferences.additionalInstructions}
                onChange={handleChange}
                placeholder="e.g., Please ring doorbell"
              />
            </div>
            
            {errors.submit && (
              <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {errors.submit}
              </div>
            )}
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => navigate('/customer/subscriptions')}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-serif"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-serif"
              >
                Create Subscription
              </button>
            </div>
          </form>
        </div>
      </main>
      
      <CustomerFooter />
    </div>
  );
};

