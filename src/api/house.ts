import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  },
});

// 빈집 등록 API
export const registerHouse = (data: {
  address: string;
  region: string;
  size: string;
  floor: string;
}) => api.post('/houses', data);

// 빈집 소유주 홈 정보 조회
export const getOwnerHome = () => api.get('/houses/owner-home');

// 내 빈집 목록 조회
export const getMyHouses = () => api.get('/houses/my');

// 빈집 정보 수정
export const updateHouse = (
  houseId: number,
  data: {
    address: string;
    region: string;
    size: string;
    floor: string;
    status: string;
  },
) => api.put(`/houses/${houseId}`, data);

// 빈집 삭제
export const deleteHouse = (houseId: number) =>
  api.delete(`/houses/${houseId}`);
