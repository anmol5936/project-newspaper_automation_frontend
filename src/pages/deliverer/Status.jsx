import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { updateDeliveryStatus, getDeliveryItems } from '../../api/deliverer.api';
import DelivererFormSelect from '../../components/deliverer/DelivererFormSelect'
import DelivererFormInput from '../../components/deliverer/DelivererFormInput';
import {DelivererNavbar} from '../../components/deliverer/DelivererNavbar';
import {DelivererFooter} from '../../components/deliverer/DelivererFooter';

const Status = () => {
  const [searchParams] = useSearchParams();
  const itemId = searchParams.get('id');
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    itemId: itemId || '',
    status: '',
    deliveryNotes: '',
    deliveryTime: new Date().toISOString().slice(0, 16)
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getDeliveryItems();
        setItems(data);
      } catch (err) {
        setError('Failed to load items');
      }
    };

    fetchItems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await updateDeliveryStatus(formData.itemId, {
        status: formData.status,
        deliveryNotes: formData.deliveryNotes,
        deliveryTime: formData.deliveryTime
      });
      setSuccess(true);
      setFormData({
        itemId: '',
        status: '',
        deliveryNotes: '',
        deliveryTime: new Date().toISOString().slice(0, 16)
      });
    } catch (err) {
      setError('Failed to update delivery status');
    } finally {
      setLoading(false);
    }
  };

  const statusOptions = [
    { value: 'Delivered', label: 'Delivered' },
    { value: 'Failed', label: 'Failed' },
    { value: 'Skipped', label: 'Skipped' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <DelivererNavbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-6">Update Delivery Status</h1>
          
          {success && (
            <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
              Status updated successfully!
            </div>
          )}
          
          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <DelivererFormSelect
              label="Select Item"
              value={formData.itemId}
              onChange={(e) => setFormData({ ...formData, itemId: e.target.value })}
              options={items.map(item => ({
                value: item._id,
                label: `${item.title} - ${item.address}`
              }))}
              required
            />

            <DelivererFormSelect
              label="Status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              options={statusOptions}
              required
            />

            <DelivererFormInput
              label="Delivery Time"
              type="datetime-local"
              value={formData.deliveryTime}
              onChange={(e) => setFormData({ ...formData, deliveryTime: e.target.value })}
            />

            <DelivererFormInput
              label="Delivery Notes"
              type="textarea"
              value={formData.deliveryNotes}
              onChange={(e) => setFormData({ ...formData, deliveryNotes: e.target.value })}
              placeholder="Add any delivery notes here..."
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Update Status'}
            </button>
          </form>
        </div>
      </main>
      <DelivererFooter />
    </div>
  );
};

export default Status;