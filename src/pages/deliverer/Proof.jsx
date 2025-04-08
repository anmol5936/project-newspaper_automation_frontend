import React, { useState, useEffect } from 'react';
import { getDeliveryItems, submitDeliveryProof } from '../../api/deliverer.api';
import DelivererFormSelect from '../../components/deliverer/DelivererFormSelect';
import {DelivererNavbar} from '../../components/deliverer/DelivererNavbar';
import {DelivererFooter} from '../../components/deliverer/DelivererFooter';

const Proof = () => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    deliveryItemId: '',
    photoProof: ''
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photoProof: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await submitDeliveryProof(formData);
      setSuccess(true);
      setFormData({
        deliveryItemId: '',
        photoProof: ''
      });
    } catch (err) {
      setError('Failed to submit delivery proof');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <DelivererNavbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-6">Submit Delivery Proof</h1>
          
          {success && (
            <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
              Delivery proof submitted successfully!
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
              value={formData.deliveryItemId}
              onChange={(e) => setFormData({ ...formData, deliveryItemId: e.target.value })}
              options={items.map(item => ({
                value: item._id,
                label: `${item.title} - ${item.address}`
              }))}
              required
            />

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Photo Proof
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full"
                required
              />
              {formData.photoProof && (
                <div className="mt-2">
                  <img
                    src={formData.photoProof}
                    alt="Delivery Proof Preview"
                    className="max-w-full h-auto rounded"
                  />
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit Proof'}
            </button>
          </form>
        </div>
      </main>
      <DelivererFooter />
    </div>
  );
};

export default Proof;