import axios from 'axios';

const API_BASE_URL = '/api/manager';

export interface Publication {
  id?: string;
  name: string;
  language: string;
  description?: string;
  price: number;
  publicationType: 'Daily' | 'Weekly' | 'Monthly' | 'Quarterly';
  publicationDays?: string[];
  areas: string[];
}

export interface BillGeneration {
  month: number;
  year: number;
  areaId?: string;
  dueDate: Date;
}

export interface PaymentReminder {
  billIds: string[];
  reminderType: 'First Notice' | 'Final Notice' | 'Subscription Suspension Notice';
  deliveryMethod: 'Email' | 'SMS' | 'Print';
}

export const managerApi = {
  // Publications
  createPublication: async (data: Publication) => {
    const response = await axios.post(`${API_BASE_URL}/publications`, data);
    return response.data;
  },

  updatePublication: async (id: string, data: Partial<Publication>) => {
    const response = await axios.put(`${API_BASE_URL}/publications/${id}`, data);
    return response.data;
  },

  // Billing
  generateBills: async (data: BillGeneration) => {
    const response = await axios.post(`${API_BASE_URL}/bills/generate`, data);
    return response.data;
  },

  sendPaymentReminders: async (data: PaymentReminder) => {
    const response = await axios.post(`${API_BASE_URL}/payment-reminders`, data);
    return response.data;
  },
};

export const getAreas = async () => {
  const response = await axios.get(`${API_BASE_URL}/areas`);
  return response.data;
};

export const getCustomers = async () => {
  const response = await axios.get(`${API_BASE_URL}/customers`);
  return response.data;
};

export const getDeliverers = async () => {
  const response = await axios.get(`${API_BASE_URL}/deliverers`);
  return response.data;
};

export const getPublications = async () => {
  const response = await axios.get(`${API_BASE_URL}/publications`);
  return response.data;
};