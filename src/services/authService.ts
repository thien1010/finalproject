import { apiInstance } from "constant";
import { LoginSchemaType, RegisterSchemaType } from "schema";
import { UserLogin } from "types";

const api = apiInstance({
  baseURL: import.meta.env.VITE_AUTH_SERVICES_API,
});

export const authService = {
  register: (data: RegisterSchemaType) => api.post("/register", data),
  // giữ thông tin login khi f5 mà ko mất => lưu xuống localStorage
  login: (data: LoginSchemaType) =>
    api.post<ApiResponse<UserLogin>>("/login", data),

};
