import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CustomerFormInput } from '../../../components/customer/CustomerFormInput';
import { CustomerFormSelect } from '../../../components/customer/CustomerFormSelect';
import { CustomerNavbar } from '../../../components/customer/CustomerNavbar';
import { CustomerFooter } from '../../../components/customer/CustomerFooter';
import { customerApi } from '../../../api/customer.api';

interface Bill {
  _id: string;
  billNumber: string;
  amount: number;
  status: string;
}

export const MakePayment: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialBillId = searchParams.get('billId') || '';

  const [bills, setBills] = useState<Bill[]>([]);
  const [formData, setFormData] = useState({
    billId: initialBillId,
    amount: '',
    paymentMethod: '',
    referenceNumber: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await customerApi.getBills();
        const unpaidBills = response.data.filter((bill: Bill) => bill.status !== 'Paid');
        setBills(unpaidBills);
      } catch (err) {
        setSubmitError('Failed to load bills. Please try again later.');
      }
    };

    fetchBills();
  }, []);

  const paymentMethods = [
    { value: 'Cash', label: 'Cash' },
    { value: 'Cheque', label: 'Cheque' },
    { value: 'Online', label: 'Online Banking' },
    { value: 'UPI', label: 'UPI' },
    { value: 'Card', label: 'Credit/Debit Card' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.billId) {
      newErrors.billId = 'Please select a bill';
    }

    if (!formData.amount || parseFloat(formData.amount.toString()) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }

    if (!formData.paymentMethod) {
      newErrors.paymentMethod = 'Please select a payment method';
    }

    if (formData.paymentMethod !== 'Cash' && !formData.referenceNumber) {
      newErrors.referenceNumber = 'Reference number is required for non-cash payments';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await customerApi.makePayment({
        ...formData,
        amount: parseFloat(formData.amount.toString())
      });
      navigate('/customer/billing/history', { state: { success: true } });
    } catch (err) {
      setSubmitError('Payment failed. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const selectedBill = bills.find(bill => bill._id === formData.billId);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <CustomerNavbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Make Payment</h1>

          {submitError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {submitError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
            <CustomerFormSelect
              label="Select Bill"
              name="billId"
              options={bills.map(bill => ({
                value: bill._id,
                label: `Bill #${bill.billNumber} - ₹${bill.amount.toFixed(2)}`
              }))}
              value={formData.billId}
              onChange={handleInputChange}
              error={errors.billId}
              required
            />

            <CustomerFormInput
              label="Amount"
              name="amount"
              type="number"
              value={formData.amount || (selectedBill ? selectedBill.amount : '')}
              onChange={handleInputChange}
              error={errors.amount}
              required
            />

            <CustomerFormSelect
              label="Payment Method"
              name="paymentMethod"
              options={paymentMethods}
              value={formData.paymentMethod}
              onChange={handleInputChange}
              error={errors.paymentMethod}
              required
            />

            {formData.paymentMethod && formData.paymentMethod !== 'Cash' && (
              <CustomerFormInput
                label="Reference Number"
                name="referenceNumber"
                value={formData.referenceNumber}
                onChange={handleInputChange}
                error={errors.referenceNumber}
                required
              />
            )}

            <div className="mt-6">
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Processing...' : 'Make Payment'}
              </button>
            </div>
          </form>
        </div>
      </main>
      <CustomerFooter />
    </div>
  );
};