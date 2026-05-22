export interface ParkingArea {
  id: string;
  name: string;
  location: string;
  totalSlots: number;
  availableSlots: number;
  distanceKm: number;
  durationMin: number;
  ratePerHour: number; // in IDR
  busyProgress: number; // percentage (0-100)
  popularity: "Low" | "Medium" | "High";
  latOffset: number; // for mock placement
  lngOffset: number; // for mock placement
}

export interface ParkingSlot {
  id: string; // e.g. "A-01", "A-02", "B-01"
  areaId: string;
  zone: "VIP" | "Regular" | "Disabled" | "EV Charge";
  status: "Available" | "Occupied" | "Reserved";
  vehiclePlate?: string;
  reservationTimeLeft?: number; // in seconds
}

export interface Reservation {
  id: string;
  areaId: string;
  slotId: string;
  vehiclePlate: string;
  startTime: string; // ISO String
  timeLeftSeconds: number;
  status: "Active" | "Completed" | "Cancelled";
  costEstimate: number;
}

export interface VehicleLog {
  id: string;
  timestamp: string;
  areaId: string;
  slotId: string;
  type: "ENTRY" | "EXIT" | "RESERVATION";
  vehiclePlate: string;
  status: "success" | "warning";
}

export interface AnalyticsDataPoint {
  time: string;
  occupancyRate: number;
  revenue: number;
  reservations: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  tag: string;
}

declare global {
  interface Window {
    // any window additions
  }
}

