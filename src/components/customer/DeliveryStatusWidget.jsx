import React from 'react';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

export default function DeliveryStatusWidget({ status }) {
  const getStatusIcon = (deliveryStatus) => {
    // Return null if deliveryStatus is undefined or not a string
    if (!deliveryStatus || typeof deliveryStatus !== 'string') {
      return null;
    }

    switch (deliveryStatus.toLowerCase()) {
      case 'delivered':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'pending':
        return <Clock className="h-6 w-6 text-yellow-500" />;
      case 'failed':
        return <XCircle className="h-6 w-6 text-red-500" />;
      default:
        return null;
    }
  };

  // If status or status.status is missing, show a fallback message
  if (!status || !status.status) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-serif font-semibold text-gray-900 mb-4">
          Today's Delivery Status
        </h3>
        <p className="text-gray-500">No delivery status available</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-serif font-semibold text-gray-900 mb-4">
        Today's Delivery Status
      </h3>
      <div className="flex items-center space-x-3">
        {getStatusIcon(status.status)}
        <div>
          <p className="text-gray-900 font-medium">{status.status}</p>
          <p className="text-sm text-gray-500">{status.message}</p>
          {status.estimatedTime && (
            <p className="text-sm text-gray-500">
              Estimated delivery: {status.estimatedTime}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}