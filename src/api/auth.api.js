import api from './axios';

export const authApi = {
  login: async (credentials) => {
    const response = await api.post('/api/auth/login', credentials);
    if (response.data.data?.token) {
      console.log('Token stored:', response.data.data.token);
      localStorage.setItem('token', response.data.data.token);
    } else {
      console.error('No token in response:', response.data);
    }
    return response.data.data; // { user, token }
  },
  
  getCurrentUser: async () => {
    const token = localStorage.getItem('token');
    const response = await api.get('/api/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data.user;
  },

  register: async (userData) => {
    const response = await api.post('/api/auth/register', userData);
    return response.data;
  },

  logout: async () => {
    await api.post('/api/auth/logout');
    localStorage.removeItem('token');
  },

  getCurrentUser: async () => {
    const token = localStorage.getItem('token');
    const response = await api.get('/api/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data.user; // Matches backend { success, data: { user } }
  },

  resetPassword: async (passwordData) => {
    const response = await api.put('/api/auth/password', passwordData);
    return response.data;
  },
};