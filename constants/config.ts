import Constants from 'expo-constants';

interface AppConfig {
  apiBaseUrl: string;
  apiTimeout: number;
  appEnv: 'development' | 'staging' | 'production';
  appVersion: string;
}

const extra = (Constants.expoConfig?.extra ?? {}) as Record<string, unknown>;

export const CONFIG: AppConfig = {
  apiBaseUrl:
    (process.env.EXPO_PUBLIC_API_BASE_URL as string) ?? 'https://api.glaabuja.org/v1',
  apiTimeout: Number(process.env.EXPO_PUBLIC_API_TIMEOUT ?? 10_000),
  appEnv: (process.env.EXPO_PUBLIC_APP_ENV as AppConfig['appEnv']) ?? 'development',
  appVersion: (extra['appVersion'] as string) ?? '1.0.0',
};

export const isDev = CONFIG.appEnv === 'development';
export const isProd = CONFIG.appEnv === 'production';
