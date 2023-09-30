import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// 创建一个 Axios 实例
const instance = axios.create({
  baseURL: 'https://www.baidu.com', // 设置基础 URL
  timeout: 20000, // 设置请求超时时间
});

// 请求拦截器
instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 在发送请求之前做一些处理，例如添加认证信息等
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
    // 对响应数据进行处理
    return response.data;
  },
  (error: any) => {
    // 处理响应错误
    return Promise.reject(error);
  }
);

export default instance;