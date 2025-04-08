import React from 'react';
import { Package, CheckCircle, XCircle, SkipForward } from 'lucide-react';

const statusIcons = {
  Delivered: <CheckCircle className="text-green-500" />,
  Failed: <XCircle className="text-red-500" />,
  Skipped: <SkipForward className="text-yellow-500" />,
  Pending: <Package className="text-blue-500" />
};

const DeliveryItemList = ({ items, onSelectItem }) => {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={item._id}
          className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => onSelectItem(item)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {statusIcons[item.status] || statusIcons.Pending}
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.address}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm font-medium text-gray-700">
                {item.status || 'Pending'}
              </span>
              {item.deliveryTime && (
                <p className="text-xs text-gray-500">
                  {new Date(item.deliveryTime).toLocaleString()}
                </p>
              )}
            </div>
          </div>
          {item.deliveryNotes && (
            <p className="mt-2 text-sm text-gray-600">{item.deliveryNotes}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default DeliveryItemList;