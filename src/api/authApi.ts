import axiosInstance from './axiosInstance';

export const login = async (user_id: string, password: string) => {
  const response = await axiosInstance.post('/login', { user_id, password });
  return response.data; // { token: "...", ... }
};
