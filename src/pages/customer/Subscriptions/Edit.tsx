import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {CustomerNavbar} from '../../../components/customer/CustomerNavbar';
import {CustomerFooter} from '../../../components/customer/CustomerFooter';
import CustomerFormInput from '../../../components/customer/CustomerFormInput';
import CustomerFormSelect from '../../../components/customer/CustomerFormSelect';
import api from '../../../api/customer.api';

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    quantity: 1,
    endDate: '',
    addressId: '',
    status: 'Active',
    deliveryPreferences: {
      placement: '',
      additionalInstructions: ''
    }
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Mock data for dropdowns - replace with actual data from your API
  const addresses = [
    { value: '1', label: '123 Main St, City, State 12345' },
    { value: '2', label: '456 Oak Ave, Town, State 67890' }
  ];

  const statusOptions = [
    { value: 'Active', label: 'Active' },
    { value: 'Paused', label: 'Paused' },
    { value: 'Cancelled', label: 'Cancelled' }
  ];

  useEffect(() => {
    loadSubscription();
  }, [id]);

  const loadSubscription = async () => {
    try {
      // Replace with actual API call to get subscription details
      const response = await api.getSubscriptions();
      const subscription = response.data.find((sub: any) => sub.id === id);
      if (subscription) {
        setFormData({
          quantity: subscription.quantity,
          endDate: subscription.endDate || '',
          addressId: subscription.addressId,
          status: subscription.status,
          deliveryPreferences: subscription.deliveryPreferences || {
            placement: '',
            additionalInstructions: ''
          }
        });
      }
      setLoading(false);
    } catch (err) {
      setErrors({ submit: 'Failed to load subscription' });
      setLoading(false);
    }
  };

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
    
    if (formData.quantity < 1) newErrors.quantity = 'Quantity must be at least 1';
    if (formData.endDate && new Date(formData.endDate) <= new Date()) {
      newErrors.endDate = 'End date must be in the future';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    try {
      await api.updateSubscription(id!, formData);
      navigate('/customer/subscriptions');
    } catch (err) {
      setErrors({ submit: 'Failed to update subscription' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <CustomerNavbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          </div>
        </main>
        <CustomerFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <CustomerNavbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-serif font-bold mb-8">Edit Subscription</h1>
          
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
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
              label="End Date"
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
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
            
            <CustomerFormSelect
              label="Status"
              name="status"
              value={formData.status}
              options={statusOptions}
              onChange={handleChange}
              error={errors.status}
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
                Update Subscription
              </button>
            </div>
          </form>
        </div>
      </main>
      
      <CustomerFooter />
    </div>
  );
};

export default Edit;