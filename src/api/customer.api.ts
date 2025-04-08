import axios from 'axios';
import Joi from 'joi';

// Schema Definitions
const objectIdSchema = Joi.string().pattern(/^[0-9a-fA-F]{24}$/);
const paymentMethodSchema = Joi.string().valid('Cash', 'Cheque', 'Online', 'UPI', 'Card');

export const paymentSchema = Joi.object({
  billId: objectIdSchema.required(),
  amount: Joi.number().positive().required(),
  paymentMethod: paymentMethodSchema.required(),
  referenceNumber: Joi.when('paymentMethod', {
    is: 'Cash',
    then: Joi.string().optional(),
    otherwise: Joi.string().required()
  })
});

// Interfaces
interface DeliveryPreferences {
  placement?: string;
  additionalInstructions?: string;
}

interface SubscriptionCreate {
  publicationId: string;
  quantity: number;
  startDate: Date;
  endDate?: Date;
  addressId: string;
  deliveryPreferences?: DeliveryPreferences;
}

interface SubscriptionUpdate {
  quantity?: number;
  endDate?: Date;
  addressId?: string;
  status?: 'Active' | 'Paused' | 'Cancelled';
  deliveryPreferences?: DeliveryPreferences;
}

interface PauseSubscription {
  subscriptionId: string;
  startDate: Date;
  endDate: Date;
  reason?: string;
}

// API instance with base configuration
const api = axios.create({
  baseURL: '/api'
});

// Request interceptor to add authorization header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Export all API methods as a single object
export const customerApi = {
  getSubscriptions: () => api.get('/customer/subscriptions'),
  createSubscription: (data: SubscriptionCreate) => api.post('/customer/subscriptions', data),
  updateSubscription: (id: string, data: SubscriptionUpdate) => api.put(`/customer/subscriptions/${id}`, data),
  deleteSubscription: (id: string) => api.delete(`/customer/subscriptions/${id}`),
  pauseSubscription: (data: PauseSubscription) => api.post('/customer/pause', data),
  getBills: () => api.get('/customer/bills'),
  getBillById: (id: string) => {
    Joi.assert(id, objectIdSchema);
    return api.get(`/customer/bills/${id}`);
  },
  makePayment: (data: any) => {
    const { error, value } = paymentSchema.validate(data);
    if (error) throw error;
    return api.post('/customer/payments', value);
  },
  getPaymentHistory: () => api.get('/customer/payment-history'),
  getDeliveryStatus: () => api.get('/customer/delivery-status')
};