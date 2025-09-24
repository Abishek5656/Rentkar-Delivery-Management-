import api from './api';

export const getMyOrders = async () => {
  const res = await api.get('/api/partner/orders');
  return res.data;
};

export const updateOrderStatus = async (orderId: string, status: string) => {
  const res = await api.put(`/api/partner/orders/${orderId}/status`, { status });
  return res.data;
};

export const updateAvailability = async (availability: boolean) => {
  const res = await api.put('/api/partner/availability', { availability });
  return res.data;
};


export const getAllAvailablePartnerList = async () => {
  const res = await api.get('/api/partner/allpartner');
  return res.data;
}
