import * as SecureStore from 'expo-secure-store';

import type { AuthTokens } from '@/types/user';

// ---------------------------------------------------------------------------
// Storage keys
// ---------------------------------------------------------------------------

const KEYS = {
  ACCESS_TOKEN: 'gla_access_token',
  REFRESH_TOKEN: 'gla_refresh_token',
  TOKEN_EXPIRY: 'gla_token_expiry',
} as const;

// ---------------------------------------------------------------------------
// Token helpers
// ---------------------------------------------------------------------------

export async function saveTokens(tokens: AuthTokens): Promise<void> {
  await Promise.all([
    SecureStore.setItemAsync(KEYS.ACCESS_TOKEN, tokens.accessToken),
    SecureStore.setItemAsync(KEYS.REFRESH_TOKEN, tokens.refreshToken),
    SecureStore.setItemAsync(KEYS.TOKEN_EXPIRY, String(tokens.expiresAt)),
  ]);
}

export async function getAccessToken(): Promise<string | null> {
  return SecureStore.getItemAsync(KEYS.ACCESS_TOKEN);
}

export async function getRefreshToken(): Promise<string | null> {
  return SecureStore.getItemAsync(KEYS.REFRESH_TOKEN);
}

export async function getTokenExpiry(): Promise<number | null> {
  const value = await SecureStore.getItemAsync(KEYS.TOKEN_EXPIRY);
  return value ? Number(value) : null;
}

export async function clearTokens(): Promise<void> {
  await Promise.all([
    SecureStore.deleteItemAsync(KEYS.ACCESS_TOKEN),
    SecureStore.deleteItemAsync(KEYS.REFRESH_TOKEN),
    SecureStore.deleteItemAsync(KEYS.TOKEN_EXPIRY),
  ]);
}

export async function isTokenExpired(): Promise<boolean> {
  const expiry = await getTokenExpiry();
  if (!expiry) return true;
  return Date.now() >= expiry;
}

// ---------------------------------------------------------------------------
// Generic helpers
// ---------------------------------------------------------------------------

export async function setItem(key: string, value: string): Promise<void> {
  await SecureStore.setItemAsync(key, value);
}

export async function getItem(key: string): Promise<string | null> {
  return SecureStore.getItemAsync(key);
}

export async function removeItem(key: string): Promise<void> {
  await SecureStore.deleteItemAsync(key);
}
