import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const login = (email: string, password: string) =>
  api.post('/users/login', { email, password });

export const register = (name: string, email: string, password: string) =>
  api.post('/users/register', { name, email, password });

export const getProfile = () => api.get('/users/profile');

// Products API
export const getProducts = (category?: string) =>
  api.get('/products', { params: { category } });

export const getProduct = (id: string) => api.get(`/products/${id}`);

export const createProduct = (productData: any) =>
  api.post('/products', productData);

export const updateProduct = (id: string, productData: any) =>
  api.put(`/products/${id}`, productData);

export const deleteProduct = (id: string) => api.delete(`/products/${id}`);

// Orders API
export const createOrder = (orderData: any) => api.post('/orders', orderData);

export const getMyOrders = () => api.get('/orders/my-orders');

export const getAllOrders = () => api.get('/orders');

export const updateOrderStatus = (id: string, status: string) =>
  api.put(`/orders/${id}/status`, { status });

// Admin Users API
export const getAllUsers = () => api.get('/users');

export default api;
