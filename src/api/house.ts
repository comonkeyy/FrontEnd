import axiosInstance from './axiosInstance';
import type { VacantHouseData } from '@/@types/vacantHouse';

interface HouseData {
  address: string;
  region: string;
  size: string;
  floor: string;
}

// 빈집 등록
export const createHouse = async (houseData: Partial<VacantHouseData>) => {
  const response = await axiosInstance.post('/houses', houseData);
  return response.data;
};

// 빈집 소유주 홈 정보 조회
export const getOwnerHome = () => axiosInstance.get('/houses/owner-home');

// 내 빈집 목록 조회
export const getMyHouses = () => axiosInstance.get('/houses/my');

// 빈집 정보 수정
export const updateHouse = (houseId: string, data: Partial<VacantHouseData>) =>
  axiosInstance.put(`/houses/${houseId}`, data);

// 빈집 삭제
export const deleteHouse = (houseId: string) =>
  axiosInstance.delete(`/houses/${houseId}`);

/**
 * 새로운 빈집을 등록하는 API
 * @param houseData 등록할 빈집 정보
 * @returns API 응답 데이터
 */
export const registerHouse = async (houseData: HouseData) => {
  try {
    const response = await axiosInstance.post('/houses', houseData);
    return response.data;
  } catch (error) {
    console.error('빈집 등록 실패:', error);
    throw error;
  }
};

/**
 * 집 주인의 홈 화면 데이터(사용자 정보, 등록한 빈집 목록)를 가져오는 API
 * @returns API 응답 데이터 (사용자 정보, 빈집 목록)
 */
export const getOwnerDashboardData = async () => {
  try {
    const response = await axiosInstance.get('/houses/owner-home');
    return response.data;
  } catch (error) {
    console.error('집 주인 홈 데이터 조회 실패:', error);
    throw error;
  }
};
