import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {CustomerNavbar} from '../../../components/customer/CustomerNavbar';
import {CustomerFooter} from '../../../components/customer/CustomerFooter';
import CustomerFormInput from '../../../components/customer/CustomerFormInput';
import CustomerFormSelect from '../../../components/customer/CustomerFormSelect';
import { customerApi } from '../../../api/customer.api';

const Pause = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    subscriptionId: id || '',
    startDate: '',
    endDate: '',
    reason: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.endDate) newErrors.endDate = 'End date is required';
    
    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);
    const today = new Date();
    
    if (startDate < today) {
      newErrors.startDate = 'Start date must be today or later';
    }
    
    if (endDate <= startDate) {
      newErrors.endDate = 'End date must be after start date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    try {
      await customerApi.pauseSubscription(formData);
      navigate('/customer/subscriptions');
    } catch (err) {
      setErrors({ submit: 'Failed to pause subscription' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <CustomerNavbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-serif font-bold mb-8">Pause Subscription</h1>
          
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
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
              label="End Date"
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              min={formData.startDate || new Date().toISOString().split('T')[0]}
              error={errors.endDate}
              required
            />
            
            <CustomerFormInput
              label="Reason (Optional)"
              type="text"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              placeholder="e.g., Vacation, Temporary relocation"
              error={errors.reason}
            />
            
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
                className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 font-serif"
              >
                Pause Subscription
              </button>
            </div>
          </form>
        </div>
      </main>
      
      <CustomerFooter />
    </div>
  );
};

export default Pause;