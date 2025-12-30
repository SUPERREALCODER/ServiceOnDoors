
export enum ServiceCategory {
  RO = 'Water Purifier',
  AC = 'Air Conditioner',
  GEYSER = 'Geyser',
  REFRIGERATOR = 'Refrigerator',
  WASHING_MACHINE = 'Washing Machine'
}

export enum BookingStatus {
  DISPATCHING = 'Dispatching Technician...',
  ASSIGNED = 'Technician Assigned',
  EN_ROUTE = 'En Route',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled'
}

export interface Feedback {
  rating: number;
  comment: string;
}

export interface Booking {
  id: string;
  service: ServiceCategory;
  subService: string;
  customerName: string;
  phone: string;
  address: string;
  date: string;
  status: BookingStatus;
  feedback?: Feedback;
  technician?: {
    id: string;
    name: string;
    phone: string;
    rating: number;
    location?: { lat: number; lng: number };
  };
}

export interface User {
  name: string;
  phone: string;
  bookings: Booking[];
}
