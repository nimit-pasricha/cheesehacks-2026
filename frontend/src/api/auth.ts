import { apiClient } from "./core";
import type { LoginRequest, LoginResponse } from "./types";

export const authApi = {
  login: (data: LoginRequest) =>
    apiClient.post<LoginResponse>("/auth/login", data),

  logout: () => apiClient.post<void>("/auth/logout", {}),

  me: () => apiClient.get<LoginResponse>("/auth/me"),
};
