import axios, { AxiosResponse } from 'axios';
import { emitter } from '@/mitt/mitt.ts';
const baseURL = 'https://localhost:7111/api';

const instance = axios.create({
  baseURL: baseURL, // 设置基础 URL
  timeout: 20000,   // 设置请求超时时间
});

// 请求拦截器
instance.interceptors.request.use(
  (config: any) => {
    config.headers['Content-Type'] = 'application/json;charset=UTF-8';
    const token = localStorage.getItem('token');
    if (token !== null)
      config.headers['Authorization'] = 'bearer ' + token;
    return config;
  },
  (error: any) => {
    // 处理请求错误
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const { headers } = response;
    if (headers['authorizationtoken'] !== undefined) {
      localStorage.setItem('token', headers['authorizationtoken']);
      emitter.emit('login', true)
    }
    return response;
  },
  (error: any) => {

    const { response } = error;
    if (!response)
      return Promise.reject(error);

    // 无网络连接
    if (!window.navigator.onLine) {
      return;
    }

    switch (response.status) {
      case 401:
        // Token 过期或者未认证
        emitter.emit('login', false)
        break;
    }
    return Promise.reject(error);
  }
);

export default instance;
export const baseUrl = baseURL