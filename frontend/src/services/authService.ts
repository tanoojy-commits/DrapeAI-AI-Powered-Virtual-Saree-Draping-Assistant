import { apiClient } from "@/services/apiClient";
import type { AuthResponse, AuthUser, LoginPayload, RegisterPayload } from "@/types/auth";

export async function registerUser(payload: RegisterPayload): Promise<AuthUser> {
  const response = await apiClient.post<AuthUser>("/auth/register", payload);
  return response.data;
}

export async function loginUser(payload: LoginPayload): Promise<AuthResponse> {
  const response = await apiClient.post<AuthResponse>("/auth/login", payload);
  return response.data;
}

export async function getCurrentUser(): Promise<AuthUser> {
  const response = await apiClient.get<AuthUser>("/auth/me");
  return response.data;
}

