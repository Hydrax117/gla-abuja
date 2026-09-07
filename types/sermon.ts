export type SermonFormat = 'audio' | 'video' | 'text';

export interface Sermon {
  id: string;
  title: string;
  description?: string;
  speaker: string;
  series?: string;
  format: SermonFormat;
  audioUrl?: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  duration?: number; // seconds
  scripture?: string;
  tags?: string[];
  publishedAt: string; // ISO 8601
  createdAt: string;
  updatedAt: string;
}

export interface SermonSeries {
  id: string;
  title: string;
  description?: string;
  thumbnailUrl?: string;
  sermonCount: number;
  startDate: string;
  endDate?: string;
}
