import axios from 'axios';

const BASE_URL = '/api/deliverer';

export const getDelivererRoutes = async () => {
  const response = await axios.get(`${BASE_URL}/routes`);
  return response.data;
};

export const getDelivererSchedule = async () => {
  const response = await axios.get(`${BASE_URL}/schedule`);
  return response.data;
};

export const getDelivererEarnings = async () => {
  const response = await axios.get(`${BASE_URL}/earnings`);
  return response.data;
};

export const getDeliveryItems = async () => {
  const response = await axios.get(`${BASE_URL}/items`);
  return response.data;
};

export const updateDeliveryStatus = async (itemId, data) => {
  const response = await axios.put(`${BASE_URL}/items/${itemId}`, data);
  return response.data;
};

export const submitDeliveryProof = async (data) => {
  const response = await axios.post(`${BASE_URL}/delivery-proof`, data);
  return response.data;
};