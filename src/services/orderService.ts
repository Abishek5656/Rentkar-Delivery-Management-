import api from './api';

interface OrderData {
  productName: string;
  deliveryAddress: string;
}

export const createOrder = async (data: OrderData) => {
  const res = await api.post('/api/orders', data);
  return res.data;
};

export const getOrders = async () => {
  const res = await api.get('/api/orders');
  return res.data;
};

export const assignOrder = async (orderId: string, partnerId: string) => {
  const res = await api.put(`/api/orders/${orderId}/assign/${partnerId}`);
  return res.data;
};

export const deleteOrder = async (orderId: string) => {
  const res = await api.delete(`/api/orders/${orderId}`);
  return res.data;
};
