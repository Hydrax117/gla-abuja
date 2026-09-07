import { useQuery } from '@tanstack/react-query';

import { sermonsService, SermonsQueryParams } from '@/services/sermons';

// ---------------------------------------------------------------------------
// Query keys
// ---------------------------------------------------------------------------

export const sermonKeys = {
  all: ['sermons'] as const,
  lists: () => [...sermonKeys.all, 'list'] as const,
  list: (params: SermonsQueryParams) => [...sermonKeys.lists(), params] as const,
  details: () => [...sermonKeys.all, 'detail'] as const,
  detail: (id: string) => [...sermonKeys.details(), id] as const,
  allSeries: () => [...sermonKeys.all, 'series'] as const,
  series: (id: string) => [...sermonKeys.allSeries(), id] as const,
};

// ---------------------------------------------------------------------------
// Queries
// ---------------------------------------------------------------------------

export function useSermons(params?: SermonsQueryParams) {
  return useQuery({
    queryKey: sermonKeys.list(params ?? {}),
    queryFn: () => sermonsService.getSermons(params),
  });
}

export function useSermon(id: string) {
  return useQuery({
    queryKey: sermonKeys.detail(id),
    queryFn: () => sermonsService.getSermon(id),
    enabled: Boolean(id),
  });
}

export function useSermonSeries() {
  return useQuery({
    queryKey: sermonKeys.allSeries(),
    queryFn: sermonsService.getSeries,
  });
}

export function useSermonSeriesById(id: string) {
  return useQuery({
    queryKey: sermonKeys.series(id),
    queryFn: () => sermonsService.getSeriesById(id),
    enabled: Boolean(id),
  });
}
