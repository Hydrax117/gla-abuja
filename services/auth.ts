import { apiClient } from './api';

import type { ApiResponse } from '@/types/api';
import type { AuthTokens, LoginCredentials, RegisterPayload, User } from '@/types/user';
import { saveTokens, clearTokens } from '@/utils/storage';

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}

// ---------------------------------------------------------------------------
// Auth API
// ---------------------------------------------------------------------------

export const authService = {
  /** Log in with email + password */
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/login', credentials);
    const { user, tokens } = response.data.data;
    await saveTokens(tokens);
    return { user, tokens };
  },

  /** Register a new account */
  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/register', payload);
    const { user, tokens } = response.data.data;
    await saveTokens(tokens);
    return { user, tokens };
  },

  /** Log out and clear local tokens */
  logout: async (): Promise<void> => {
    try {
      await apiClient.post('/auth/logout');
    } finally {
      await clearTokens();
    }
  },

  /** Fetch the authenticated user's profile */
  getMe: async (): Promise<User> => {
    const response = await apiClient.get<ApiResponse<User>>('/auth/me');
    return response.data.data;
  },

  /** Update the authenticated user's profile */
  updateProfile: async (payload: Partial<Pick<User, 'firstName' | 'lastName' | 'phone'>>): Promise<User> => {
    const response = await apiClient.patch<ApiResponse<User>>('/auth/me', payload);
    return response.data.data;
  },
};
