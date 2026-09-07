import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { eventsService, EventsQueryParams, RegisterForEventPayload } from '@/services/events';

// ---------------------------------------------------------------------------
// Query keys
// ---------------------------------------------------------------------------

export const eventKeys = {
  all: ['events'] as const,
  lists: () => [...eventKeys.all, 'list'] as const,
  list: (params: EventsQueryParams) => [...eventKeys.lists(), params] as const,
  details: () => [...eventKeys.all, 'detail'] as const,
  detail: (id: string) => [...eventKeys.details(), id] as const,
  myRegistrations: () => [...eventKeys.all, 'my-registrations'] as const,
};

// ---------------------------------------------------------------------------
// Queries
// ---------------------------------------------------------------------------

export function useEvents(params?: EventsQueryParams) {
  return useQuery({
    queryKey: eventKeys.list(params ?? {}),
    queryFn: () => eventsService.getEvents(params),
  });
}

export function useEvent(id: string) {
  return useQuery({
    queryKey: eventKeys.detail(id),
    queryFn: () => eventsService.getEvent(id),
    enabled: Boolean(id),
  });
}

export function useMyRegistrations() {
  return useQuery({
    queryKey: eventKeys.myRegistrations(),
    queryFn: eventsService.getMyRegistrations,
  });
}

// ---------------------------------------------------------------------------
// Mutations
// ---------------------------------------------------------------------------

export function useRegisterForEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: RegisterForEventPayload) => eventsService.registerForEvent(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: eventKeys.myRegistrations() });
    },
  });
}

export function useCancelRegistration() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (registrationId: string) => eventsService.cancelRegistration(registrationId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: eventKeys.myRegistrations() });
    },
  });
}
