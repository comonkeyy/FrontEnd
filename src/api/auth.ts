import api from './axiosInstance';

// 회원가입
export const signUp = (data: {
  email: string;
  password: string;
  name: string;
  role: '복지사' | '소유주' | '관리자';
}) => api.post('/api/auth/signup', data);

// 로그인
export const signIn = (data: { email: string; password: string }) =>
  api.post('/api/auth/login', data);

// 로그아웃
export const signOut = () => api.post('/api/auth/logout');

// 토큰 재발급
export const reissueToken = () => api.post('/api/auth/reissue');

// 비밀번호 변경
export const changePassword = (data: {
  oldPassword: string;
  newPassword: string;
}) => api.patch('/api/auth/password', data);

// 비밀번호 초기화
export const resetPassword = (data: { email: string }) =>
  api.post('/api/auth/password-reset', data);
