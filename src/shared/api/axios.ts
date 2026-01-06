/**
 * Axios 인스턴스 설정
 */
import axios from 'axios';

export const apiClient = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);
