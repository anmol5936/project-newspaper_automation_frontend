import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {ManagerNavbar} from '../../components/manager/ManagerNavbar';
import {ManagerFooter} from '../../components/manager/ManagerFooter';
import AreaSelector from '../../components/manager/AreaSelector';
import CustomerList from '../../components/manager/CustomerList';
import DelivererList from '../../components/manager/DelivererList';
import PublicationList from '../../components/manager/PublicationList';

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <ManagerNavbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/areas" element={<AreaSelector />} />
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/deliverers" element={<DelivererList />} />
          <Route path="/publications" element={<PublicationList />} />
          <Route path="/" element={
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
                {/* Add statistics components here */}
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                {/* Add activity feed here */}
              </div>
            </div>
          } />
        </Routes>
      </main>

      <ManagerFooter />
    </div>
  );
}