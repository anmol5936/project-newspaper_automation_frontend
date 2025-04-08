import React, { useState, useEffect } from 'react';
import { getDeliveryItems } from '../../api/deliverer.api';
import DeliveryItemList from '../../components/deliverer/DeliveryItemList';
import {DelivererNavbar} from '../../components/deliverer/DelivererNavbar';
import {DelivererFooter} from '../../components/deliverer/DelivererFooter';

const Items = () => {

  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getDeliveryItems();
        setItems(data);
      } catch (err) {
        setError('Failed to load delivery items');
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleSelectItem = (item) => {
    navigate(`/deliverer/delivery/status/${item._id}`);
  };
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <DelivererNavbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Delivery Items</h1>
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : error ? (
          <div className="text-red-500 text-center py-8">{error}</div>
        ) : (
          <DeliveryItemList items={items} onSelectItem={handleSelectItem} />
        )}
      </main>
      <DelivererFooter />
    </div>
  );
};

export default Items;