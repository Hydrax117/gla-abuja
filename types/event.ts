export type EventStatus = 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
export type EventCategory = 'sunday-service' | 'midweek' | 'conference' | 'outreach' | 'other';

export interface Event {
  id: string;
  title: string;
  description: string;
  category: EventCategory;
  status: EventStatus;
  startDate: string; // ISO 8601
  endDate: string; // ISO 8601
  location: EventLocation;
  imageUrl?: string;
  registrationRequired: boolean;
  registrationDeadline?: string; // ISO 8601
  capacity?: number;
  registeredCount?: number;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface EventLocation {
  name: string;
  address: string;
  city: string;
  state?: string;
  country: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface EventRegistration {
  id: string;
  eventId: string;
  userId: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  qrCode?: string;
  registeredAt: string;
}
