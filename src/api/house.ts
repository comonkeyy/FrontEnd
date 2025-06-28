import api from './axiosInstance';

// 1. 빈집 목록 조회 (내가 등록한 빈집 전체 목록)
export const getMyHouses = () => api.get('/api/houses');

// 2. 빈집 등록 (신규 등록)
export const createHouse = (data: any) => api.post('/api/houses', data);

// 3. 빈집 상세 조회
export const getHouseDetail = (houseId: string) =>
  api.get(`/api/houses/${houseId}`);

// 4. 빈집 정보 수정
export const updateHouse = (houseId: string, data: any) =>
  api.patch(`/api/houses/${houseId}`, data);

// 5. 빈집 정보 삭제
export const deleteHouse = (houseId: string) =>
  api.delete(`/api/houses/${houseId}`);

// 6. 매칭 완료 빈집 상세
export const getMatchedHouseDetail = (houseId: string) =>
  api.get(`/api/houses/${houseId}/matched`);

// 7. 빈집 등록 음성 안내 (Gemini 음성 안내 챗봇 요청)
export const requestVoiceAssist = (data: any) =>
  api.post('/api/voice-assist/house-register', data);
