import React from 'react';
import { DelivererNavbar } from '../../components/deliverer/DelivererNavbar';
import { DelivererFooter } from '../../components/deliverer/DelivererFooter';
import { Schedule } from '../../components/deliverer/Schedule';
import { RouteMap } from '../../components/deliverer/RouteMap';
import { EarningsWidget } from '../../components/deliverer/EarningsWidget';

export const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <DelivererNavbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <EarningsWidget />
            <Schedule />
          </div>
          <div>
            <RouteMap />
          </div>
        </div>
      </main>
      <DelivererFooter />
    </div>
  );
};

export default Dashboard;