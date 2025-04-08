import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ManagerNavbar } from '../../../components/manager/ManagerNavbar';
import { ManagerFooter } from '../../../components/manager/ManagerFooter';
import { ManagerFormInput } from '../../../components/manager/ManagerFormInput';
import { ManagerFormSelect } from '../../../components/manager/ManagerFormSelect';
import { managerApi, BillGeneration } from '../../../api/manager.api';

export const GenerateBills: React.FC = () => {
  const navigate = useNavigate();
  const [billData, setBillData] = useState<BillGeneration>({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    dueDate: new Date(),
    areaId: undefined,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBillData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await managerApi.generateBills(billData);
      navigate('/manager/billing');
    } catch (error) {
      console.error('Failed to generate bills:', error);
    }
  };

  return (
    <div className="manager-layout">
      <ManagerNavbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="manager-form">
          <h2 className="newspaper-header">Generate Bills</h2>

          <ManagerFormInput
            label="Month"
            name="month"
            type="number"
            value={billData.month}
            onChange={handleChange}
            error={errors.month}
            required
            min={1}
            max={12}
          />

          <ManagerFormInput
            label="Year"
            name="year"
            type="number"
            value={billData.year}
            onChange={handleChange}
            error={errors.year}
            required
            min={2000}
            max={2100}
          />

          <ManagerFormInput
            label="Due Date"
            name="dueDate"
            type="date"
            value={billData.dueDate.toISOString().split('T')[0]}
            onChange={handleChange}
            error={errors.dueDate}
            required
          />

          <ManagerFormInput
            label="Area ID (Optional)"
            name="areaId"
            value={billData.areaId || ''}
            onChange={handleChange}
            error={errors.areaId}
          />

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="manager-btn manager-btn-primary"
            >
              Generate Bills
            </button>
          </div>
        </form>
      </main>
      <ManagerFooter />
    </div>
  );
};