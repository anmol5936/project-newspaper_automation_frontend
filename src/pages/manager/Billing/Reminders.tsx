import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ManagerNavbar } from '../../../components/manager/ManagerNavbar';
import { ManagerFooter } from '../../../components/manager/ManagerFooter';
import { ManagerFormSelect } from '../../../components/manager/ManagerFormSelect';
import { managerApi, PaymentReminder } from '../../../api/manager.api';

const reminderTypes = [
  { value: 'First Notice', label: 'First Notice' },
  { value: 'Final Notice', label: 'Final Notice' },
  { value: 'Subscription Suspension Notice', label: 'Subscription Suspension Notice' },
];

const deliveryMethods = [
  { value: 'Email', label: 'Email' },
  { value: 'SMS', label: 'SMS' },
  { value: 'Print', label: 'Print' },
];

export const PaymentRemindersPage: React.FC = () => {
  const navigate = useNavigate();
  const [reminderData, setReminderData] = useState<PaymentReminder>({
    billIds: [],
    reminderType: 'First Notice',
    deliveryMethod: 'Email',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setReminderData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await managerApi.sendPaymentReminders(reminderData);
      navigate('/manager/billing');
    } catch (error) {
      console.error('Failed to send payment reminders:', error);
    }
  };

  return (
    <div className="manager-layout">
      <ManagerNavbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="manager-form">
          <h2 className="newspaper-header">Send Payment Reminders</h2>

          <ManagerFormSelect
            label="Reminder Type"
            name="reminderType"
            value={reminderData.reminderType}
            options={reminderTypes}
            onChange={handleChange}
            error={errors.reminderType}
            required
          />

          <ManagerFormSelect
            label="Delivery Method"
            name="deliveryMethod"
            value={reminderData.deliveryMethod}
            options={deliveryMethods}
            onChange={handleChange}
            error={errors.deliveryMethod}
            required
          />

          {/* TODO: Implement bill selection interface */}
          
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="manager-btn manager-btn-primary"
            >
              Send Reminders
            </button>
          </div>
        </form>
      </main>
      <ManagerFooter />
    </div>
  );
};