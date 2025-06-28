import axios from 'axios';

export interface SignupPayload {
  user_id: string;
  password: string;
  email: string;
  name: string;
  phone: string;
  role?: string; // 복지사만 'CW', 집 소유자는 undefined
}

export async function signup(payload: SignupPayload) {
  // role이 undefined면 아예 필드에서 제거
  const data = { ...payload };
  if (data.role === undefined) {
    delete data.role;
  }
  return axios.post('/api/auth/signup', data).then((res) => res.data);
}
