import { apiClient } from './api';

import type { ApiResponse, PaginatedResponse, PaginationParams } from '@/types/api';
import type { Sermon, SermonSeries } from '@/types/sermon';

export interface SermonsQueryParams extends PaginationParams {
  speaker?: string;
  series?: string;
  search?: string;
}

// ---------------------------------------------------------------------------
// Sermons API
// ---------------------------------------------------------------------------

export const sermonsService = {
  /** Fetch paginated list of sermons */
  getSermons: async (params?: SermonsQueryParams): Promise<PaginatedResponse<Sermon>> => {
    const response = await apiClient.get<PaginatedResponse<Sermon>>('/sermons', { params });
    return response.data;
  },

  /** Fetch a single sermon by ID */
  getSermon: async (id: string): Promise<Sermon> => {
    const response = await apiClient.get<ApiResponse<Sermon>>(`/sermons/${id}`);
    return response.data.data;
  },

  /** Fetch all sermon series */
  getSeries: async (): Promise<SermonSeries[]> => {
    const response = await apiClient.get<ApiResponse<SermonSeries[]>>('/sermons/series');
    return response.data.data;
  },

  /** Fetch a single sermon series with its sermons */
  getSeriesById: async (id: string): Promise<SermonSeries> => {
    const response = await apiClient.get<ApiResponse<SermonSeries>>(`/sermons/series/${id}`);
    return response.data.data;
  },
};
