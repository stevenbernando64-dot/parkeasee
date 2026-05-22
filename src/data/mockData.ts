import { ParkingArea, ParkingSlot, AnalyticsDataPoint, VehicleLog, GalleryItem } from "../types";

export const MOCK_AREAS: ParkingArea[] = [
  {
    id: "gip",
    name: "Grand Indonesia Plaza Area A",
    location: "Jl. M.H. Thamrin No.1, Jakarta Pusat",
    totalSlots: 24,
    availableSlots: 14,
    distanceKm: 1.2,
    durationMin: 6,
    ratePerHour: 10000,
    busyProgress: 42,
    popularity: "High",
    latOffset: 25,
    lngOffset: 45,
  },
  {
    id: "scbd",
    name: "SCBD Lot 17 Premium Parking",
    location: "Kawasan Niaga Terpadu Sudirman, Jakarta Selatan",
    totalSlots: 16,
    availableSlots: 6,
    distanceKm: 3.5,
    durationMin: 12,
    ratePerHour: 15000,
    busyProgress: 68,
    popularity: "High",
    latOffset: 65,
    lngOffset: 75,
  },
  {
    id: "sh-t3",
    name: "Soekarno-Hatta Airport T3 Domestik",
    location: "Bandara Internasional Soekarno-Hatta, Tangerang",
    totalSlots: 32,
    availableSlots: 20,
    distanceKm: 22.1,
    durationMin: 40,
    ratePerHour: 12000,
    busyProgress: 35,
    popularity: "Medium",
    latOffset: 15,
    lngOffset: 20,
  },
  {
    id: "blokm",
    name: "Blok M Square Smart hub",
    location: "Jl. Melawai 5, Kebayoran Baru, Jakarta Selatan",
    totalSlots: 20,
    availableSlots: 12,
    distanceKm: 4.8,
    durationMin: 15,
    ratePerHour: 8000,
    busyProgress: 40,
    popularity: "Medium",
    latOffset: 80,
    lngOffset: 35,
  }
];

export const INITIAL_SLOTS: ParkingSlot[] = [
  // Grand Indonesia Plaza (gip)
  { id: "A-01", areaId: "gip", zone: "VIP", status: "Occupied", vehiclePlate: "B 1234 SGB" },
  { id: "A-02", areaId: "gip", zone: "VIP", status: "Available" },
  { id: "A-03", areaId: "gip", zone: "VIP", status: "Reserved", vehiclePlate: "B 9876 KLO", reservationTimeLeft: 290 },
  { id: "A-04", areaId: "gip", zone: "EV Charge", status: "Occupied", vehiclePlate: "B 2026 EV" },
  { id: "B-01", areaId: "gip", zone: "Regular", status: "Available" },
  { id: "B-02", areaId: "gip", zone: "Regular", status: "Occupied", vehiclePlate: "D 4488 RFS" },
  { id: "B-03", areaId: "gip", zone: "Regular", status: "Available" },
  { id: "B-04", areaId: "gip", zone: "Regular", status: "Available" },
  { id: "B-05", areaId: "gip", zone: "Disabled", status: "Available" },
  { id: "B-06", areaId: "gip", zone: "Regular", status: "Occupied", vehiclePlate: "F 3333 AD" },
  { id: "C-01", areaId: "gip", zone: "Regular", status: "Available" },
  { id: "C-02", areaId: "gip", zone: "Regular", status: "Available" },
  { id: "C-03", areaId: "gip", zone: "Regular", status: "Available" },
  { id: "C-04", areaId: "gip", zone: "Regular", status: "Available" },
  { id: "C-05", areaId: "gip", zone: "Regular", status: "Occupied", vehiclePlate: "B 700 SEC" },
  { id: "C-06", areaId: "gip", zone: "Regular", status: "Available" },

  // SCBD Premium (scbd)
  { id: "P-01", areaId: "scbd", zone: "VIP", status: "Occupied", vehiclePlate: "B 1 SCBD" },
  { id: "P-02", areaId: "scbd", zone: "VIP", status: "Occupied", vehiclePlate: "B 288 RFS" },
  { id: "P-03", areaId: "scbd", zone: "EV Charge", status: "Reserved", vehiclePlate: "B 888 TS", reservationTimeLeft: 450 },
  { id: "P-04", areaId: "scbd", zone: "EV Charge", status: "Occupied", vehiclePlate: "B 1201 ION" },
  { id: "R-01", areaId: "scbd", zone: "Regular", status: "Occupied", vehiclePlate: "B 1456 KAA" },
  { id: "R-02", areaId: "scbd", zone: "Regular", status: "Available" },
  { id: "R-03", areaId: "scbd", zone: "Regular", status: "Occupied", vehiclePlate: "F 1902 BB" },
  { id: "R-04", areaId: "scbd", zone: "Regular", status: "Occupied", vehiclePlate: "D 808 PP" },
  { id: "R-05", areaId: "scbd", zone: "Regular", status: "Available" },
  { id: "R-06", areaId: "scbd", zone: "Disabled", status: "Occupied", vehiclePlate: "B 2411 DSB" },
  { id: "R-07", areaId: "scbd", zone: "Regular", status: "Available" },
  { id: "R-08", areaId: "scbd", zone: "Regular", status: "Available" },
];

export const MOCK_ANALYTICS: Record<string, AnalyticsDataPoint[]> = {
  gip: [
    { time: "08:00", occupancyRate: 35, revenue: 120000, reservations: 4 },
    { time: "10:00", occupancyRate: 55, revenue: 240000, reservations: 8 },
    { time: "12:00", occupancyRate: 85, revenue: 450000, reservations: 15 },
    { time: "14:00", occupancyRate: 90, revenue: 510000, reservations: 18 },
    { time: "16:00", occupancyRate: 70, revenue: 380000, reservations: 12 },
    { time: "18:00", occupancyRate: 95, revenue: 620000, reservations: 22 },
    { time: "20:00", occupancyRate: 75, revenue: 490000, reservations: 14 },
    { time: "22:00", occupancyRate: 40, revenue: 180000, reservations: 5 },
  ],
  scbd: [
    { time: "08:00", occupancyRate: 60, revenue: 250000, reservations: 8 },
    { time: "10:00", occupancyRate: 85, revenue: 480000, reservations: 14 },
    { time: "12:00", occupancyRate: 90, revenue: 600000, reservations: 16 },
    { time: "14:00", occupancyRate: 95, revenue: 650000, reservations: 19 },
    { time: "16:00", occupancyRate: 88, revenue: 580000, reservations: 15 },
    { time: "18:00", occupancyRate: 80, revenue: 520000, reservations: 12 },
    { time: "20:00", occupancyRate: 50, revenue: 300000, reservations: 6 },
    { time: "22:00", occupancyRate: 30, revenue: 150000, reservations: 3 },
  ],
  "sh-t3": [
    { time: "08:00", occupancyRate: 45, revenue: 300000, reservations: 11 },
    { time: "10:00", occupancyRate: 50, revenue: 360000, reservations: 13 },
    { time: "12:00", occupancyRate: 65, revenue: 420000, reservations: 18 },
    { time: "14:00", occupancyRate: 70, revenue: 480000, reservations: 21 },
    { time: "16:00", occupancyRate: 80, revenue: 560000, reservations: 25 },
    { time: "18:00", occupancyRate: 85, revenue: 610000, reservations: 28 },
    { time: "20:00", occupancyRate: 75, revenue: 540000, reservations: 22 },
    { time: "22:00", occupancyRate: 60, revenue: 400000, reservations: 14 },
  ],
  blokm: [
    { time: "08:00", occupancyRate: 20, revenue: 50000, reservations: 2 },
    { time: "10:00", occupancyRate: 40, revenue: 120000, reservations: 5 },
    { time: "12:00", occupancyRate: 75, revenue: 280000, reservations: 10 },
    { time: "14:00", occupancyRate: 60, revenue: 220000, reservations: 8 },
    { time: "16:00", occupancyRate: 55, revenue: 200000, reservations: 7 },
    { time: "18:00", occupancyRate: 80, revenue: 340000, reservations: 13 },
    { time: "20:00", occupancyRate: 70, revenue: 290000, reservations: 11 },
    { time: "22:00", occupancyRate: 35, revenue: 100000, reservations: 4 },
  ],
};

export const INITIAL_LOGS: VehicleLog[] = [
  { id: "log-1", timestamp: "12:44:10", areaId: "gip", slotId: "B-02", type: "ENTRY", vehiclePlate: "D 4488 RFS", status: "success" },
  { id: "log-2", timestamp: "12:43:01", areaId: "gip", slotId: "A-03", type: "RESERVATION", vehiclePlate: "B 9876 KLO", status: "success" },
  { id: "log-3", timestamp: "12:38:52", areaId: "gip", slotId: "C-05", type: "ENTRY", vehiclePlate: "B 700 SEC", status: "success" },
  { id: "log-4", timestamp: "12:35:14", areaId: "gip", slotId: "A-01", type: "ENTRY", vehiclePlate: "B 1234 SGB", status: "success" },
  { id: "log-5", timestamp: "12:30:20", areaId: "gip", slotId: "B-04", type: "EXIT", vehiclePlate: "B 5322 TFC", status: "success" },
];

export const SAAS_TIERS = [
  {
    name: "Standard Hub",
    priceMonthly: "Rp 1.499.000",
    description: "Perfect for single smaller commercial lots, office compounds, or specialized venues.",
    features: [
      "Up to 50 smart parking spots",
      "Real-time sensor API integration",
      "Dynamic reservation system",
      "Core admin analytics dashboard",
      "Email & Slack notifications support",
      "99.5% service uptime guarantee",
    ],
    popular: false,
    cta: "Start 14-Day Free Trial",
  },
  {
    name: "Enterprise Plaza",
    priceMonthly: "Rp 3.899.000",
    description: "Designed for premium multi-zone structures, large shopping malls, and heavy civic hubs.",
    features: [
      "Unlimited parking spots",
      "Camera AI & sensor fusion capability",
      "Complete custom domain web portal",
      "Multi-operator accounts & permissions",
      "Advanced predictive peak traffic metrics",
      "Dedicated 24/7 technical architect",
      "White-labeled driver iOS & Android wrappers",
    ],
    popular: true,
    cta: "Deploy Enterprise Cloud",
  },
  {
    name: "Smart City Infrastructure",
    priceMonthly: "Custom Pricing",
    description: "Government-scale parking network integration across multiple districts with municipal APIs.",
    features: [
      "Multi-location federated network",
      "Open API endpoints for public transit synchronization",
      "Congestion tax & high-volume surge rate logic",
      "Direct municipal GPS & maps provider integration",
      "SLA 99.99% fault-tolerant infrastructure",
      "Hardware custom installation consultancy",
    ],
    popular: false,
    cta: "Contact City Architects",
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    title: "Dynamic Smart Lot Interface",
    description: "Our pristine vector-drawn parking layout map responds automatically to physical sensor changes or digital driver reservations.",
    imageSrc: "https://images.unsplash.com/photo-1506521788701-1e13a4ea837a?auto=format&fit=crop&w=800&q=80",
    tag: "Sensor Feedback"
  },
  {
    id: "g2",
    title: "AI Camera License Recognition",
    description: "Computer vision nodes automatically index plates at entries and exits, cross-referencing cloud reserves to lift gates without delay.",
    imageSrc: "https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&w=800&q=80",
    tag: "Computer Vision"
  },
  {
    id: "g3",
    title: "Universal SaaS Analytics Hub",
    description: "Real-time occupancy charts, weekly revenue forecasts, average dwell metrics, and peak traffic predictions out of the box.",
    imageSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    tag: "Predictive AI"
  },
  {
    id: "g4",
    title: "Sub-Second Mobile Keyless Passes",
    description: "Drivers load instantly compiled maps with green arrow trails leading direct to pre-allocated sensors upon gate clearance.",
    imageSrc: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
    tag: "Mobile Routing"
  }
];
