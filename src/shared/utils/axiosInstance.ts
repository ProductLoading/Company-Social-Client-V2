import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_REST_API_URL || 'http://localhost:3000',
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // 401 vs. hatalarda gerekli işlemler
    return Promise.reject(error);
  }
);

export default axiosInstance;
