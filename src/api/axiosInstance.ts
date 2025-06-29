import axios from 'axios';

// .env 파일에서 API 기본 URL을 가져오거나 기본값 설정
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  timeout: 10000, // 10초 타임아웃
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 (예: 인증 토큰 추가)
axiosInstance.interceptors.request.use(
  (config) => {
    // 로컬 스토리지에서 토큰을 가져옵니다. 'accessToken'은 실제 사용하는 키 이름으로 변경해야 합니다.
    const token = localStorage.getItem('accessToken');
    if (token) {
      // 토큰이 있으면 Authorization 헤더에 추가합니다.
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터 (예: 에러 처리, 토큰 만료 시 리다이렉트)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('Unauthorized: Redirect to login or refresh token');
      // window.location.href = '/login'; // 예시: 로그인 페이지로 리다이렉트
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
