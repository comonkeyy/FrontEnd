import axios from 'axios';

export interface SignupPayload {
  user_id: string;
  password: string;
  role: string;
  email: string;
  name: string;
  phone: string;
}

export async function signup(payload: SignupPayload) {
  const response = await axios.post('/api/auth/signup', payload);
  return response.data;
}
