import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';

// Customer Pages
import CustomerDashboard from './pages/customer/Dashboard';
import SubscriptionsList from './pages/customer/Subscriptions/List';
import EditSubscription from './pages/customer/Subscriptions/Edit';
import PauseSubscription from './pages/customer/Subscriptions/Pause';
import {Bills} from './pages/customer/Billing/Bills';
import {BillDetail} from './pages/customer/Billing/BillDetail';
import {MakePayment} from './pages/customer/Billing/MakePayment';
import CustomerList from './components/manager/CustomerList';
// import PaymentHistory from './pages/customer/Billing/PaymentHistory';

// Manager Pages
import ManagerDashboard from './pages/manager/Dashboard';
import {PublicationsList} from './pages/manager/Publications/List';
import {AddPublication} from './pages/manager/Publications/Add';
// import {EditPublication} from './pages/manager/Publications/Edit';
import {GenerateBills} from './pages/manager/Billing/Generate';
// import PaymentReminders from './pages/manager/Billing/Reminders';

// Deliverer Pages
import DelivererDashboard from './pages/deliverer/Dashboard';
import DeliveryItems from './pages/deliverer/Items'
import DeliveryStatus from './pages/deliverer/Status';
import DeliveryProof from './pages/deliverer/Proof';
import { AddSubscription } from './pages/customer/Subscriptions/Add';
import AreaSelector from './components/manager/AreaSelector';
import DelivererList from './components/manager/DelivererList';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />

        {/* Customer Routes */}
        <Route path="/customer/dashboard" element={<CustomerDashboard />} />
        <Route path="/customer/subscriptions/list" element={<SubscriptionsList />} />
        <Route path="/customer/subscriptions/add" element={<AddSubscription />} />
        {/* <Route path="/customer/subscriptions/edit/:id" element={<EditSubscription />} /> */}
        <Route path="/customer/subscriptions/pause" element={<PauseSubscription />} />
        <Route path="/customer/billing/bills" element={<Bills />} />
        <Route path="/customer/billing/:id" element={<BillDetail />} />
        <Route path="/customer/billing/payment" element={<MakePayment />} />
        {/* <Route path="/customer/billing/history" element={<PaymentHistory />} /> */}
        {/* Added missing top-level routes from your original App.js */}
        <Route path="/customer/subscriptions" element={<SubscriptionsList />} /> {/* Default subscriptions page */}
        <Route path="/customer/billing" element={<Bills />} /> {/* Default billing page */}
        <Route path="/customer/profile" element={<CustomerDashboard />} /> {/* Placeholder, add Profile.js if needed */}

        {/* Manager Routes */}
        <Route path="/manager/dashboard" element={<ManagerDashboard />} />
        <Route path="/manager/publications" element={<PublicationsList />} />
        <Route path="/manager/publications/add" element={<AddPublication />} />
        {/* <Route path="/manager/publications/edit/:id" element={<EditPublication />} /> */}
        <Route path="/manager/billing" element={<GenerateBills />} />
        {/* <Route path="/manager/billing/reminders" element={<PaymentReminders />} /> */}
        {/* Added missing top-level route */}
        <Route path="/manager/publications" element={<PublicationsList />} /> {/* Default publications page */}
        <Route path="/manager/customers" element={<CustomerList/>} /> {/* Default publications page */}
        <Route path="/manager/areas" element={<AreaSelector/>} />
        <Route path="/manager/deliverers" element={<DelivererList/>} />


        {/* Deliverer Routes */}
        <Route path="/deliverer/dashboard" element={<DelivererDashboard />} />
        <Route path="/deliverer/delivery/items" element={<DeliveryItems />} />
        <Route path="/deliverer/delivery/status/:id" element={<DeliveryStatus />} />
        <Route path="/deliverer/delivery/proof" element={<DeliveryProof />} />
        {/* Added missing top-level route */}
        <Route path="/deliverer/delivery" element={<DeliveryItems />} /> {/* Default delivery page */}

        {/* Default and Catch-All Routes */}
        <Route path="/" element={<Navigate to="/auth/login" replace />} />
        <Route path="*" element={<Navigate to="/auth/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;