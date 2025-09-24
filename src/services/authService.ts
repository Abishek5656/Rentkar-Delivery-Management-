import api from './api';

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'partner';
}


export const login = async (data: LoginData) => {
  const res = await api.post('/api/auth/login', data);
  return res.data;
};

export const register = async (data: RegisterData) => {
  const res = await api.post('/api/auth/register', data);
  return res.data;
};
