import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Package, Newspaper } from 'lucide-react';

// Define the Subscription interface based on the second version
interface DeliveryPreferences {
  placement?: string;
  additionalInstructions?: string;
}

interface Subscription {
  id: string;
  publicationName: string; // Changed from 'name' to match second version
  quantity: number;        // Added from second version
  startDate: string;       // Added from second version
  endDate?: string;        // Added from second version
  status: 'Active' | 'Paused' | 'Cancelled'; // Updated to match second version
  address: string;         // Added from second version
  deliveryPreferences?: DeliveryPreferences; // Added from second version
  plan?: string;           // From first version
  nextDelivery?: string;   // From first version
  frequency?: string;      // From first version
}

interface Props {
  subscription: Subscription;
  onDelete: (id: string) => void; // From second version
}

const SubscriptionCard: React.FC<Props> = ({ subscription, onDelete }) => {
  // Status colors from second version
  const statusColors = {
    Active: 'bg-green-100 text-green-800',
    Paused: 'bg-yellow-100 text-yellow-800',
    Cancelled: 'bg-red-100 text-red-800'
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 mb-4">
      {/* Header: Icon, Name, and Status */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Newspaper className="h-8 w-8 text-[#1e3a8a] mr-3" /> {/* From first version */}
          <h3 className="text-xl font-serif font-semibold text-gray-900">
            {subscription.publicationName}
          </h3>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-serif ${
            statusColors[subscription.status]
          }`}
        >
          {subscription.status}
        </span>
      </div>

      {/* Subscription Details */}
      <div className="space-y-3 text-gray-600">
        {/* Quantity */}
        <div className="flex items-center">
          <Package className="h-5 w-5 mr-2" />
          <span className="font-serif">Quantity: {subscription.quantity}</span>
        </div>

        {/* Date Range */}
        <div className="flex items-center">
          <Calendar className="h-5 w-5 mr-2" />
          <span className="font-serif">
            From: {new Date(subscription.startDate).toLocaleDateString()}
            {subscription.endDate &&
              ` to ${new Date(subscription.endDate).toLocaleDateString()}`}
          </span>
        </div>

        {/* Address */}
        <div className="flex items-center">
          <MapPin className="h-5 w-5 mr-2" />
          <span className="font-serif">{subscription.address}</span>
        </div>

        {/* Additional Details from First Version */}
        {subscription.plan && (
          <p className="font-serif">Plan: {subscription.plan}</p>
        )}
        {subscription.nextDelivery && (
          <p className="font-serif">Next Delivery: {subscription.nextDelivery}</p>
        )}
        {subscription.frequency && (
          <p className="font-serif">Frequency: {subscription.frequency}</p>
        )}

        {/* Delivery Preferences */}
        {subscription.deliveryPreferences && (
          <div className="mt-4 bg-gray-50 p-3 rounded-lg">
            <h4 className="font-serif font-semibold mb-2">Delivery Preferences</h4>
            {subscription.deliveryPreferences.placement && (
              <p className="font-serif">
                Placement: {subscription.deliveryPreferences.placement}
              </p>
            )}
            {subscription.deliveryPreferences.additionalInstructions && (
              <p className="font-serif">
                Instructions: {subscription.deliveryPreferences.additionalInstructions}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex justify-end space-x-3 border-t border-gray-100 pt-4">
        <Link
          to={`/customer/subscriptions/edit/${subscription.id}`}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-serif"
        >
          Edit
        </Link>
        {subscription.status === 'Active' && (
          <Link
            to={`/customer/subscriptions/pause/${subscription.id}`}
            className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 font-serif"
          >
            Pause
          </Link>
        )}
        <button
          onClick={() => onDelete(subscription.id)}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-serif"
        >
          Cancel
        </button>
        {/* Optional: Add Manage Subscription link from first version */}
        <button className="text-[#1e3a8a] hover:text-blue-700 font-medium font-serif">
          Manage Subscription
        </button>
      </div>
    </div>
  );
};

export default SubscriptionCard;