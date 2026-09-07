import { apiClient } from './api';

import type { ApiResponse } from '@/types/api';

export interface PushTokenPayload {
  token: string;
  platform: 'ios' | 'android';
}

export interface NotificationPreferences {
  events: boolean;
  sermons: boolean;
  liveStream: boolean;
  prayerRequests: boolean;
  announcements: boolean;
}

// ---------------------------------------------------------------------------
// Notifications API
// ---------------------------------------------------------------------------

export const notificationsService = {
  /** Register a push notification token with the server */
  registerPushToken: async (payload: PushTokenPayload): Promise<void> => {
    await apiClient.post('/notifications/push-token', payload);
  },

  /** Deregister a push notification token */
  deregisterPushToken: async (token: string): Promise<void> => {
    await apiClient.delete('/notifications/push-token', { data: { token } });
  },

  /** Get the user's notification preferences */
  getPreferences: async (): Promise<NotificationPreferences> => {
    const response = await apiClient.get<ApiResponse<NotificationPreferences>>(
      '/notifications/preferences'
    );
    return response.data.data;
  },

  /** Update the user's notification preferences */
  updatePreferences: async (
    preferences: Partial<NotificationPreferences>
  ): Promise<NotificationPreferences> => {
    const response = await apiClient.patch<ApiResponse<NotificationPreferences>>(
      '/notifications/preferences',
      preferences
    );
    return response.data.data;
  },
};
