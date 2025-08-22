import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// 使用环境变量
const service = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => config,
  error => Promise.reject(error)
);

service.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  error => Promise.reject(error)
);

export default service;