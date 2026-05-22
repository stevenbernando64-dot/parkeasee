import { ParkingArea, ParkingSlot, AnalyticsDataPoint, VehicleLog, GalleryItem } from "../types";

export const MOCK_AREAS: ParkingArea[] = [
  {
    id: "gip",
    name: "Taman Kota Sungailiat - Sektor Panggung Utama",
    location: "Jl. Pemuda, Kec. Sungailiat, Kab. Bangka",
    totalSlots: 24,
    availableSlots: 14,
    distanceKm: 0.1,
    durationMin: 1,
    ratePerHour: 3000,
    busyProgress: 42,
    popularity: "High",
    latOffset: 25,
    lngOffset: 45,
  },
  {
    id: "scbd",
    name: "Taman Kota Sungailiat - Pusat Kuliner & UMKM",
    location: "Jl. Jenderal Sudirman, Kec. Sungailiat, Kab. Bangka",
    totalSlots: 16,
    availableSlots: 6,
    distanceKm: 0.3,
    durationMin: 3,
    ratePerHour: 3000,
    busyProgress: 68,
    popularity: "High",
    latOffset: 65,
    lngOffset: 75,
  },
  {
    id: "sh-t3",
    name: "Taman Kota Sungailiat - Sektor Gerbang Selatan",
    location: "Jl. Pemuda (Pintu Selatan), Kec. Sungailiat, Kab. Bangka",
    totalSlots: 32,
    availableSlots: 20,
    distanceKm: 0.5,
    durationMin: 4,
    ratePerHour: 2000,
    busyProgress: 35,
    popularity: "Medium",
    latOffset: 15,
    lngOffset: 20,
  },
  {
    id: "blokm",
    name: "Taman Kota Sungailiat - Area Bermain Anak",
    location: "Jl. Pemuda (Samping Playground), Kec. Sungailiat, Kab. Bangka",
    totalSlots: 20,
    availableSlots: 12,
    distanceKm: 0.2,
    durationMin: 2,
    ratePerHour: 2000,
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
    name: "Hub Standar (Standard Hub)",
    priceMonthly: "Rp 1.499.000",
    description: "Sangat cocok untuk area komersial kecil tunggal, kompleks perkantoran, atau tempat khusus.",
    features: [
      "Hingga 50 tempat parkir pintar",
      "Integrasi API sensor real-time",
      "Sistem reservasi dinamis",
      "Dasbor analitik admin utama",
      "Dukungan notifikasi Email & Slack",
      "Jaminan ketersediaan layanan 99.5%",
    ],
    popular: false,
    cta: "Mulai Uji Coba Gratis 14 Hari",
  },
  {
    name: "Plaza Enterprise (Enterprise Plaza)",
    priceMonthly: "Rp 3.899.000",
    description: "Dirancang untuk struktur multi-zona premium, pusat perbelanjaan besar, dan pusat kota yang padat.",
    features: [
      "Tempat parkir tanpa batas",
      "Kemampuan fusi sensor & AI kamera",
      "Portal web domain khusus lengkap",
      "Akun & izin multi-operator",
      "Metrik prediksi lalu lintas puncak tingkat lanjut",
      "Arsitek teknis khusus 24/7",
      "Aplikasi driver berlabel putih (white-label) untuk iOS & Android",
    ],
    popular: true,
    cta: "Terapkan Cloud Enterprise",
  },
  {
    name: "Infrastruktur Kota Pintar (Smart City)",
    priceMonthly: "Harga Kustom",
    description: "Integrasi jaringan parkir skala pemerintah di berbagai distrik dengan API pemerintah kota.",
    features: [
      "Jaringan terfederasi multi-lokasi",
      "Titik akhir API terbuka untuk sinkronisasi transit publik",
      "Logika pajak kemacetan & tarif lonjakan volume tinggi",
      "Integrasi langsung dengan GPS kota & penyedia peta",
      "Infrastruktur toleransi kesalahan SLA 99,99%",
      "Konsultasi instalasi perangkat keras khusus",
    ],
    popular: false,
    cta: "Hubungi Arsitek Kota",
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    title: "Antarmuka Slot Pintar Dinamis",
    description: "Peta tata letak parkir berbasis vektor kami merespons secara otomatis terhadap perubahan sensor fisik atau reservasi digital pengemudi.",
    imageSrc: "https://images.unsplash.com/photo-1506521788701-1e13a4ea837a?auto=format&fit=crop&w=800&q=80",
    tag: "Umpan Balik Sensor"
  },
  {
    id: "g2",
    title: "Pengenalan Pelat Nomor Kamera AI",
    description: "Node computer vision secara otomatis mencatat pelat nomor di pintu masuk dan keluar, mencocokkannya dengan reservasi cloud untuk membuka gerbang tanpa penundaan.",
    imageSrc: "https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&w=800&q=80",
    tag: "Visi Komputer"
  },
  {
    id: "g3",
    title: "Pusat Analisis SaaS Universal",
    description: "Grafik okupansi real-time, prakiraan pendapatan mingguan, metrik durasi rata-rata, dan prediksi lalu lintas puncak yang siap pakai.",
    imageSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    tag: "AI Prediktif"
  },
  {
    id: "g4",
    title: "Akses Tanpa Kunci Seluler Instan",
    description: "Pengemudi langsung memuat peta dengan panduan panah hijau yang memandu mereka langsung menuju sensor yang dialokasikan setelah melewati gerbang.",
    imageSrc: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
    tag: "Rute Seluler"
  }
];
