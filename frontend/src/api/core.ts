export interface ApiError {
  message: string;
  status: number;
}

const BASE_URL = "http://localhost:8080"; // replace later

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const message = await response.text();
    throw {
      message: message || "API Error",
      status: response.status,
    } as ApiError;
  }

  return response.json() as Promise<T>;
}

export const apiClient = {
  get: <T>(endpoint: string, body?: unknown) =>
    request<T>(endpoint, {
      method: "GET",
      body: JSON.stringify(body),
    }),

  post: <T>(endpoint: string, body?: unknown) =>
    request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
    }),

  put: <T>(endpoint: string, body?: unknown) =>
    request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(body),
    }),

  delete: <T>(endpoint: string, body?: unknown) =>
    request<T>(endpoint, {
      method: "DELETE",
      body: JSON.stringify(body),
    }),
};
