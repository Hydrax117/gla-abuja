import { apiClient } from './api';

import type { ApiResponse, PaginatedResponse, PaginationParams } from '@/types/api';
import type { Event, EventRegistration } from '@/types/event';

export interface EventsQueryParams extends PaginationParams {
  category?: string;
  status?: string;
  search?: string;
}

export interface RegisterForEventPayload {
  eventId: string;
}

// ---------------------------------------------------------------------------
// Events API
// ---------------------------------------------------------------------------

export const eventsService = {
  /** Fetch paginated list of events */
  getEvents: async (params?: EventsQueryParams): Promise<PaginatedResponse<Event>> => {
    const response = await apiClient.get<PaginatedResponse<Event>>('/events', { params });
    return response.data;
  },

  /** Fetch a single event by ID */
  getEvent: async (id: string): Promise<Event> => {
    const response = await apiClient.get<ApiResponse<Event>>(`/events/${id}`);
    return response.data.data;
  },

  /** Register the current user for an event */
  registerForEvent: async (payload: RegisterForEventPayload): Promise<EventRegistration> => {
    const response = await apiClient.post<ApiResponse<EventRegistration>>(
      '/events/register',
      payload
    );
    return response.data.data;
  },

  /** Cancel a registration */
  cancelRegistration: async (registrationId: string): Promise<void> => {
    await apiClient.delete(`/events/registrations/${registrationId}`);
  },

  /** Get registrations for the current user */
  getMyRegistrations: async (): Promise<EventRegistration[]> => {
    const response = await apiClient.get<ApiResponse<EventRegistration[]>>(
      '/events/registrations/me'
    );
    return response.data.data;
  },
};
