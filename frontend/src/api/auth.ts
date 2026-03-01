import { apiClient } from "./core";
import type { LoginRequest, LoginResponse } from "./types";

export const authApi = {
  signup: (data: { username: string; email: string; password: string }) => {
    return apiClient
      .post<{
        access_token: string;
        token_type: string;
      }>("auth/signup", {
        username: data.username,
        email: data.email,
        password: data.password,
      })
      .then((resp) => {
        localStorage.setItem("auth_token", resp.access_token);
        localStorage.setItem("auth_token_type", resp.token_type);
        return true;
      });
  },

  login: (data: { username: string; password: string }) => {
    return apiClient
      .post<{
        access_token: string;
        token_type: string;
      }>("/auth/login", {
        username: data.username,
        password: data.password,
      })
      .then((resp) => {
        localStorage.setItem("auth_token", resp.access_token);
        localStorage.setItem("auth_token_type", resp.token_type);
        return true;
      });
  },

  logout: () => apiClient.post<void>("/auth/logout", {}),

  me: () =>
    apiClient.request(
      "/auth/me",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          ...(localStorage.getItem("auth_token") && {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          }),
        },
      },
    ),
};
