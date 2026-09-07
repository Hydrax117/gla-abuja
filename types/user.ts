export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  role: UserRole;
  membershipStatus: MembershipStatus;
  createdAt: string;
  updatedAt: string;
}

export type UserRole = 'guest' | 'member' | 'volunteer' | 'admin';
export type MembershipStatus = 'active' | 'inactive' | 'pending';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number; // Unix timestamp (ms)
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
}
