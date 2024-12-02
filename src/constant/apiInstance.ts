import axios, { AxiosRequestHeaders, CreateAxiosDefaults } from "axios";
import { getToken } from "utils";

export const apiInstance = (config?: CreateAxiosDefaults) => {
  const api = axios.create(config);
  api.interceptors.request.use((config) => {
    return {
      ...config,
      headers: {
        Authorization: "Bearer " + getToken(),
      } as unknown as AxiosRequestHeaders,
    };
  });
  return api;
};
//api đc tạo từ apiInstance
//hàm apiInstance sẽ trả về 1 cái api, và cái api đã đi qua interceptors=> tự động config headers
//tạo biến api hứng giá trị trả về từ apiInstance
