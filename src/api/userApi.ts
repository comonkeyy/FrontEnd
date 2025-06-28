import axiosInstance from './axiosInstance';
import { User, UserRole } from '../@types/apiTypes';

export async function signUpUser(data: {
  user_id: string;
  email: string;
  password: string;
  role: UserRole;
  name: string;
  phone: string;
}) {
  const res = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json(); // { message, userId }
}
export async function loginUser(data: { user_id: string; password: string }) {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data), // data 객체 자체가 {user_id, password}
  });
  return res.json();
}

export const getUsers = async (): Promise<User[]> => {
  const response = await axiosInstance.get<User[]>('/users');
  return response.data;
};

export async function getUserInfo(userId: number): Promise<User> {
  const res = await fetch(`/api/users/${userId}`);
  return res.json();
}
