import axiosInstance from './axiosInstance';

interface User {
  id: number;
  name: string;
  email: string;
}

export const getUsers = async (): Promise<User[]> => {
  const response = await axiosInstance.get<User[]>('/users');
  return response.data;
};
