import { useState, useEffect, useRef } from "react";
import { ParkingArea, ParkingSlot, Reservation, VehicleLog } from "../types";
import { MOCK_AREAS, INITIAL_SLOTS, MOCK_ANALYTICS, INITIAL_LOGS } from "../data/mockData";
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from "recharts";
import { 
  Car, 
  MapPin, 
  Clock, 
  TrendingUp, 
  CreditCard, 
  ShieldAlert, 
  Bell, 
  Activity, 
  CheckCircle, 
  Compass, 
  Play, 
  LogOut, 
  ChevronRight, 
  RefreshCcw, 
  Search,
  Check,
  X,
  Gauge,
  Wallet,
  Zap
} from "lucide-react";

export default function Dashboard() {
  // Navigation / Role Sub-View
  const [role, setRole] = useState<"driver" | "operator">("driver");

  // Core Synced Database in RAM State
  const [areas, setAreas] = useState<ParkingArea[]>(() => {
    const saved = localStorage.getItem("parkease_areas");
    return saved ? JSON.parse(saved) : MOCK_AREAS;
  });

  const [slots, setSlots] = useState<ParkingSlot[]>(() => {
    const saved = localStorage.getItem("parkease_slots");
    return saved ? JSON.parse(saved) : INITIAL_SLOTS;
  });

  const [reservations, setReservations] = useState<Reservation[]>(() => {
    const saved = localStorage.getItem("parkease_reservations");
    return saved ? JSON.parse(saved) : [];
  });

  const [logs, setLogs] = useState<VehicleLog[]>(() => {
    const saved = localStorage.getItem("parkease_logs");
    return saved ? JSON.parse(saved) : INITIAL_LOGS;
  });

  // Central Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem("parkease_areas", JSON.stringify(areas));
  }, [areas]);

  useEffect(() => {
    localStorage.setItem("parkease_slots", JSON.stringify(slots));
  }, [slots]);

  useEffect(() => {
    localStorage.setItem("parkease_reservations", JSON.stringify(reservations));
  }, [reservations]);

  useEffect(() => {
    localStorage.setItem("parkease_logs", JSON.stringify(logs));
  }, [logs]);

  // SELECTED LOCATIONS
  const [selectedAreaId, setSelectedAreaId] = useState<string>("scbd");
  const currentArea = areas.find((a) => a.id === selectedAreaId) || areas[0];
  const areaSlots = slots.filter((s) => s.areaId === selectedAreaId);

  // RESERVATION WIZARD STATE
  const [resSlotId, setResSlotId] = useState<string | null>(null);
  const [resLicensePlate, setResLicensePlate] = useState<string>("");
  const [resDurationBuffer, setResDurationBuffer] = useState<number>(300); // 5 mins in secs
  const [paymentMethod, setPaymentMethod] = useState<string>("qris");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // ACTIVE BOOKING COUNTDOWN LOGIC
  useEffect(() => {
    const interval = setInterval(() => {
      // Countdown active reservations
      setReservations((prev) => {
        let changed = false;
        const updated = prev.map((res) => {
          if (res.status === "Active" && res.timeLeftSeconds > 0) {
            changed = true;
            return { ...res, timeLeftSeconds: res.timeLeftSeconds - 1 };
          } else if (res.status === "Active" && res.timeLeftSeconds === 0) {
            changed = true;
            
            // Release reserved slots dynamically on timeout
            setSlots((prevSlots) => 
              prevSlots.map((s) => s.id === res.slotId && s.areaId === res.areaId ? { ...s, status: "Available", vehiclePlate: undefined } : s)
            );
            
            // Post an audit log expiration
            addEventLog(res.areaId, res.slotId, "EXIT", res.vehiclePlate, "warning");
            
            return { ...res, status: "Cancelled" as const };
          }
          return res;
        });
        return changed ? updated : prev;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Sync available spots counter in areas list
  useEffect(() => {
    setAreas((prev) => 
      prev.map((area) => {
        const areaSlots = slots.filter((s) => s.areaId === area.id);
        const availableCount = areaSlots.filter((s) => s.status === "Available").length;
        const occupiedCount = areaSlots.filter((s) => s.status === "Occupied").length;
        const total = areaSlots.length;
        
        // busy factor
        const busy = total > 0 ? Math.round((occupiedCount / total) * 100) : 0;

        return {
          ...area,
          availableSlots: availableCount,
          totalSlots: total > 0 ? total : area.totalSlots,
          busyProgress: busy
        };
      })
    );
  }, [slots]);

  // Helper method to add dynamic simulation logging
  const addEventLog = (areaId: string, slotId: string, type: "ENTRY" | "EXIT" | "RESERVATION", plate: string, status: "success" | "warning") => {
    const now = new Date();
    const ts = now.toTimeString().split(" ")[0];
    const newLog: VehicleLog = {
      id: "log-" + Math.random().toString(36).substr(2, 9),
      timestamp: ts,
      areaId,
      slotId,
      type,
      vehiclePlate: plate,
      status
    };
    setLogs((prev) => [newLog, ...prev.slice(0, 19)]);
  };

  // HANDLERS
  const handleSlotClick = (slot: ParkingSlot) => {
    if (slot.status === "Available") {
      setResSlotId(slot.id);
      // Pre-populate random plate for convenience but let them edit
      const letters = "B,D,F,L,DK,AD".split(",");
      const rndL = letters[Math.floor(Math.random() * letters.length)];
      const rndNum = Math.floor(Math.random() * 9000) + 1000;
      const rndSuf = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + String.fromCharCode(65 + Math.floor(Math.random() * 26));
      setResLicensePlate(`${rndL} ${rndNum} ${rndSuf}`);
    }
  };

  const verifyAndReserve = () => {
    if (!resSlotId || !resLicensePlate.trim()) return;

    // Check if slot available
    const slot = areaSlots.find((s) => s.id === resSlotId);
    if (!slot || slot.status !== "Available") {
      alert("This spot has just been claims or is currently occupied.");
      return;
    }

    // Perform reservation insert
    const newRes: Reservation = {
      id: "res-" + Math.random().toString(36).substr(2, 9),
      areaId: selectedAreaId,
      slotId: resSlotId,
      vehiclePlate: resLicensePlate.toUpperCase(),
      startTime: new Date().toISOString(),
      timeLeftSeconds: resDurationBuffer,
      status: "Active",
      costEstimate: currentArea.ratePerHour * 1.5,
    };

    // Update specific slot state
    setSlots((prev) => 
      prev.map((s) => s.id === resSlotId && s.areaId === selectedAreaId ? { ...s, status: "Reserved", vehiclePlate: resLicensePlate.toUpperCase(), reservationTimeLeft: resDurationBuffer } : s)
    );

    setReservations((prev) => [newRes, ...prev]);
    addEventLog(selectedAreaId, resSlotId, "RESERVATION", resLicensePlate.toUpperCase(), "success");
    setResSlotId(null);
    setIsSuccessModalOpen(true);
  };

  // Simulating checkin from reserved state
  const handleCheckInClaim = (res: Reservation) => {
    setSlots((prev) => 
      prev.map((s) => s.id === res.slotId && s.areaId === res.areaId ? { ...s, status: "Occupied" } : s)
    );
    setReservations((prev) => 
      prev.map((r) => r.id === res.id ? { ...r, status: "Completed" as const } : r)
    );
    addEventLog(res.areaId, res.slotId, "ENTRY", res.vehiclePlate, "success");
  };

  // Simulating cancelling active reservation
  const handleCancelReservation = (res: Reservation) => {
    setSlots((prev) => 
      prev.map((s) => s.id === res.slotId && s.areaId === res.areaId ? { ...s, status: "Available", vehiclePlate: undefined } : s)
    );
    setReservations((prev) => 
      prev.map((r) => r.id === res.id ? { ...r, status: "Cancelled" as const } : r)
    );
    addEventLog(res.areaId, res.slotId, "EXIT", res.vehiclePlate, "warning");
  };

  // ADMIN TRAFFIC GENERATOR SIMULATORS
  const triggerRandomArrival = () => {
    const vacant = areaSlots.filter((s) => s.status === "Available");
    if (vacant.length === 0) return;

    const target = vacant[Math.floor(Math.random() * vacant.length)];
    const plateList = ["B 1888 TKO", "B 241 SGB", "D 99 EV", "F 323 AA", "DK 888 LO", "AD 4541 JK", "B 7 CC"];
    const plate = plateList[Math.floor(Math.random() * plateList.length)] + " " + String.fromCharCode(65 + Math.floor(Math.random() * 26));

    setSlots((prev) => 
      prev.map((s) => s.id === target.id && s.areaId === selectedAreaId ? { ...s, status: "Occupied", vehiclePlate: plate.toUpperCase() } : s)
    );

    addEventLog(selectedAreaId, target.id, "ENTRY", plate.toUpperCase(), "success");
  };

  const triggerRandomDeparture = () => {
    const filled = areaSlots.filter((s) => s.status === "Occupied");
    if (filled.length === 0) return;

    const target = filled[Math.floor(Math.random() * filled.length)];
    setSlots((prev) => 
      prev.map((s) => s.id === target.id && s.areaId === selectedAreaId ? { ...s, status: "Available", vehiclePlate: undefined } : s)
    );

    addEventLog(selectedAreaId, target.id, "EXIT", target.vehiclePlate || "UNKNOWN", "success");
  };

  const handleManualVacateSlot = (slotId: string) => {
    const targetSlot = areaSlots.find(s => s.id === slotId);
    if (!targetSlot) return;

    setSlots((prev) => 
      prev.map((s) => s.id === slotId && s.areaId === selectedAreaId ? { ...s, status: "Available", vehiclePlate: undefined } : s)
    );

    addEventLog(selectedAreaId, slotId, "EXIT", targetSlot.vehiclePlate || "MANUAL_BYPASS", "warning");
  };

  // Filter area search list
  const filteredAreas = areas.filter((a) => 
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    a.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-slate-50 text-slate-800 min-h-[calc(100vh-4rem)] relative">
      {/* Absolute Header Segment Role Switcher */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <span className="bg-blue-50 text-blue-600 text-[11px] px-2.5 py-1 rounded border border-blue-100 uppercase tracking-widest font-bold shadow-sm">
              RUANG KERJA PLATFORM
            </span>
            <span className="text-sm font-semibold text-slate-600">
              Terpilih: <span className="text-slate-900 font-black">{currentArea.name}</span>
            </span>
          </div>

          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setRole("driver")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                role === "driver" 
                  ? "bg-blue-600 text-white shadow" 
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <Car className="h-4 w-4" />
              <span>Aplikasi Pengemudi</span>
            </button>
            <button
              onClick={() => setRole("operator")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                role === "operator" 
                  ? "bg-blue-600 text-white shadow" 
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <Gauge className="h-4 w-4" />
              <span>Konsol Operator</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT 4-COLUMNS: LOCATIONS SELECTOR GRID */}
          <div className="lg:col-span-4 flex flex-col space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                  <MapPin className="text-blue-600 h-4.5 w-4.5" /> Pusat Hub Pintar
                </h3>
                <span className="text-[10px] font-mono bg-slate-100 border border-slate-200 px-2 py-0.5 rounded text-slate-600">
                  {filteredAreas.length} Aktif
                </span>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Jalan, mal, atau terminal..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-9 pr-4 text-xs font-normal text-slate-800 placeholder-slate-450 focus:outline-none focus:border-blue-600 transition-colors"
                />
              </div>

              {/* Location Cards */}
              <div className="space-y-3 max-h-[360px] overflow-y-auto scrollbar-thin">
                {filteredAreas.map((area) => {
                  const isSelected = area.id === selectedAreaId;
                  return (
                    <button
                      key={area.id}
                      onClick={() => setSelectedAreaId(area.id)}
                      className={`w-full text-left p-4 rounded-xl border transition-all flex flex-col justify-between cursor-pointer ${
                        isSelected 
                          ? "bg-blue-50/70 border-blue-500 shadow-sm" 
                          : "bg-white border-slate-250 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex justify-between items-start w-full">
                        <div>
                          <p className="text-sm font-bold text-slate-850">{area.name}</p>
                          <p className="text-[10px] text-slate-500 mt-0.5 font-normal leading-snug line-clamp-1">{area.location}</p>
                        </div>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                          area.popularity === "High" ? "bg-rose-50 text-rose-600" : "bg-amber-50 text-amber-600"
                        }`}>
                          {area.popularity === "High" ? "Sangat Padat" : "Kepadatan Sedang"}
                        </span>
                      </div>

                      {/* Bar Indicators */}
                      <div className="mt-4 w-full space-y-1.5">
                        <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                          <span>Ketersediaan Slot</span>
                          <span className={`${area.availableSlots > 0 ? "text-emerald-600 font-bold" : "text-rose-600 font-bold"}`}>
                            {area.availableSlots} / {area.totalSlots} Slot
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-500 ${
                              area.busyProgress > 75 
                                ? "bg-rose-500" 
                                : area.busyProgress > 45 
                                ? "bg-amber-500" 
                                : "bg-emerald-500"
                            }`}
                            style={{ width: `${area.busyProgress}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between text-[11px] pt-1">
                          <span className="text-slate-600 font-mono font-semibold">Rp {area.ratePerHour.toLocaleString("id-ID")}/jam</span>
                          <span className="text-slate-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> ~{area.durationMin} menit ({area.distanceKm} km)
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sub-Panel: Active Personal Ticket (Driver Role) */}
            {role === "driver" && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <Bell className="text-blue-600 h-4.5 w-4.5" /> Klaim Aktif Saya
                </h4>
                
                {reservations.filter(r => r.status === "Active" && r.areaId === selectedAreaId).length === 0 ? (
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-150 text-center text-xs text-slate-400 font-normal">
                    Tidak ada pemesanan aktif. Pilih slot "Tersedia" pada petak pencari untuk memesan slot terlebih dahulu.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {reservations.filter(r => r.status === "Active" && r.areaId === selectedAreaId).map((res) => {
                      const mins = Math.floor(res.timeLeftSeconds / 60);
                      const secs = res.timeLeftSeconds % 60;
                      return (
                        <div key={res.id} className="bg-slate-50 p-4 rounded-xl border border-blue-300 space-y-3 shadow-md shadow-blue-50 animate-pulse-subtle">
                          <div className="flex justify-between items-center pb-2.5 border-b border-slate-200">
                            <div className="text-left">
                              <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">ID KLAIM: {res.id.toUpperCase()}</span>
                              <p className="text-base font-extrabold text-blue-600 font-mono">SLOT {res.slotId}</p>
                            </div>
                            <div className="text-right">
                              <span className="text-[10px] font-mono text-rose-500 block uppercase font-bold">SISA WAKTU RESERVASI</span>
                              <span className="text-sm font-black font-mono text-slate-800">{mins.toString().padStart(2, "0")}:{secs.toString().padStart(2, "0")}</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="bg-white border border-slate-150 p-2 rounded shadow-sm">
                              <span className="text-[9px] text-slate-400 block uppercase font-mono font-bold">PLAT NOMOR</span>
                              <span className="font-extrabold text-slate-800 font-mono">{res.vehiclePlate}</span>
                            </div>
                            <div className="bg-white border border-slate-150 p-2 rounded shadow-sm">
                              <span className="text-[9px] text-slate-400 block uppercase font-mono font-bold">EST. BIAYA</span>
                              <span className="font-extrabold text-slate-800 font-mono">Rp {res.costEstimate.toLocaleString("id-ID")}</span>
                            </div>
                          </div>

                          {/* Navigation route */}
                          <div className="bg-[#f0f7ff] p-3 rounded-lg border border-blue-100 text-[11px] font-mono text-slate-700 space-y-1">
                            <div className="text-blue-700 font-bold uppercase tracking-wider text-[10px] flex items-center gap-1">
                              <Compass className="h-3 w-3 animate-spin-slow text-blue-600" /> Rute Navigasi Internal:
                            </div>
                            <p className="font-medium">➤ Masuk Pintu 2 ➜ Ke Lantai 2 Sektor Blok B ➜ Posisi {res.slotId} di sebelah kanan.</p>
                          </div>

                          <div className="flex items-center gap-2 pt-1.5">
                            <button
                              onClick={() => handleCheckInClaim(res)}
                              className="flex-1 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer shadow-md"
                            >
                              Tiba - Klaim Tempat
                            </button>
                            <button
                              onClick={() => handleCancelReservation(res)}
                              className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-rose-600 rounded-lg transition-colors cursor-pointer border border-slate-200"
                              title="Batalkan Pemesanan"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Sub-Panel: Dynamic Device Logs (Operator Role) */}
            {role === "operator" && (
              <div className="bg-white p-6 rounded-2xl border border-slate-250 shadow-sm space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <Activity className="text-blue-600 h-4.5 w-4.5" /> Log Peristiwa
                  </h4>
                  <button 
                    onClick={() => setLogs(INITIAL_LOGS)}
                    className="text-[10px] text-slate-500 font-mono hover:text-blue-600 flex items-center gap-1 font-bold cursor-pointer"
                  >
                    <RefreshCcw className="h-3 w-3" /> Reset Log
                  </button>
                </div>

                <div className="space-y-2 max-h-[290px] overflow-y-auto scrollbar-thin">
                  {logs.filter(l => l.areaId === selectedAreaId).length === 0 ? (
                    <p className="text-xs text-slate-500 text-center font-light py-4">Belum ada peristiwa yang tercatat.</p>
                  ) : (
                    logs.filter(l => l.areaId === selectedAreaId).map((log) => (
                      <div key={log.id} className="bg-slate-50 p-2.5 rounded-lg border border-slate-150 text-[11px] font-mono flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full ${log.status === "success" ? "bg-emerald-500" : "bg-amber-500"}`} />
                          <div>
                            <span className="text-slate-500 font-bold uppercase">{log.type}: </span>
                            <span className="text-slate-800 font-black">{log.slotId}</span>
                            <span className="text-slate-500 block text-[9px] font-normal">Kendaraan: {log.vehiclePlate}</span>
                          </div>
                        </div>
                        <span className="text-[10px] text-slate-400 font-medium">{log.timestamp}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

          </div>

          {/* MAIN 8-COLUMNS APP FRAME */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* DRIVER MODE INTERACTION SCREEN */}
            {role === "driver" && (
              <div className="space-y-8 animate-fadeIn">
                
                {/* Real-Time Locator map / Visual SVGs of target grids */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                  
                  {/* Grid Headers */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-150">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <Compass className="text-emerald-500 h-5 w-5 animate-pulse" /> Pemantauan Alokasi Slot Real-Time
                      </h3>
                      <p className="text-xs text-slate-500 font-normal mt-0.5">
                        Ketuk atau klik <span className="text-emerald-600 font-bold">🟢 Slot Kosong</span> untuk membuka kunci pemesanan.
                      </p>
                    </div>

                    {/* Color indicators */}
                    <div className="flex items-center gap-3.5 flex-wrap text-[10px] font-mono text-slate-500 bg-slate-50 px-3.5 py-1.5 rounded-lg border border-slate-200">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded bg-emerald-500/20 border border-emerald-500" />
                        <span>Tersedia</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded bg-amber-500/20 border border-amber-500" />
                        <span>Dipesan</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded bg-rose-500/20 border border-rose-500" />
                        <span>Terisi</span>
                      </div>
                    </div>
                  </div>

                  {/* Operational Interactive Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3.5">
                    {areaSlots.map((slot) => {
                      const isAvailable = slot.status === "Available";
                      const isReserved = slot.status === "Reserved";
                      const isOccupied = slot.status === "Occupied";

                      return (
                        <button
                          key={slot.id}
                          onClick={() => handleSlotClick(slot)}
                          disabled={!isAvailable}
                          className={`relative h-20 rounded-xl p-3 border transition-all text-left flex flex-col justify-between group cursor-pointer ${
                            isAvailable 
                              ? "bg-slate-50 border-emerald-500/30 hover:border-emerald-600 hover:bg-emerald-50/40 hover:shadow-md hover:shadow-emerald-50" 
                              : isReserved 
                              ? "bg-amber-50 border-amber-300 cursor-not-allowed" 
                              : "bg-rose-50 border-rose-250 cursor-not-allowed"
                          }`}
                        >
                          <div className="flex justify-between items-start w-full">
                            <span className="font-mono text-xs font-black text-slate-500 group-hover:text-slate-850 transition-colors">
                              {slot.id}
                            </span>
                            <span className={`text-[8px] font-mono uppercase px-1.5 py-0.5 rounded font-bold ${
                              slot.zone === "VIP" 
                                ? "bg-amber-100 text-amber-700" 
                                : slot.zone === "EV Charge" 
                                ? "bg-blue-100 text-blue-700" 
                                : "bg-slate-200 text-slate-600"
                            }`}>
                              {slot.zone}
                            </span>
                          </div>

                          <div className="flex items-end justify-between w-full">
                            {isAvailable && (
                              <span className="text-[10px] text-emerald-600 font-extrabold font-mono tracking-wider">KOSONG</span>
                            )}
                            {isReserved && (
                              <div className="text-left leading-none font-semibold">
                                <span className="text-[9px] text-amber-600 font-bold block leading-none">PESAN</span>
                                <span className="text-[8px] font-mono text-slate-500 font-medium">{slot.vehiclePlate}</span>
                              </div>
                            )}
                            {isOccupied && (
                              <div className="text-left leading-none font-semibold">
                                <span className="text-[9px] text-rose-600 font-bold block leading-none">PARKIR</span>
                                <span className="text-[8px] font-mono text-slate-500 font-medium">{slot.vehiclePlate}</span>
                              </div>
                            )}

                            {/* Small decorative vehicle/icon indicator */}
                            <Car className={`h-4 w-4 shrink-0 opacity-80 ${
                              isAvailable ? "text-emerald-500/40 group-hover:text-emerald-600 group-hover:scale-110" : isReserved ? "text-amber-500" : "text-rose-500"
                            } transition-all`} />
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Bottom Guideline alert */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 leading-relaxed font-normal flex items-center gap-3 shadow-inner">
                    <ShieldAlert className="text-blue-600 h-5 w-5 shrink-0" />
                    <p>
                      Sistem ParkEase menjamin kunci pesanan Anda berlaku hingga batas durasi yang dipilih. Kamera Pemindai Plat Nomor akan otomatis mencocokkan plat nomor Anda di pintu masuk untuk membuka palang pintu secara lancar.
                    </p>
                  </div>
                </div>

                {/* SLOT RESERVATION WIZARD DRAWER PANEL */}
                {resSlotId && (
                  <div className="bg-white border border-blue-200 rounded-3xl p-6 sm:p-8 shadow-xl relative animate-slideUp">
                    <button
                      onClick={() => setResSlotId(null)}
                      className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 rounded-full border border-slate-200 cursor-pointer"
                      title="Batalkan Pemesanan"
                    >
                      <X className="h-4 w-4" />
                    </button>

                    <div className="max-w-xl">
                      <span className="text-[9px] font-mono text-blue-600 uppercase tracking-widest bg-blue-50 px-2.5 py-1 rounded border border-blue-100 font-bold">
                        RUANG PESANAN SLOT
                      </span>
                      <h4 className="text-xl font-bold text-slate-900 mt-3 flex items-center gap-2">
                        Ambil Slot <span className="text-blue-600 font-mono font-black">{resSlotId}</span> di {currentArea.name}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 font-normal">
                        Masukkan nomor plat kendaraan Anda di bawah ini untuk mengamankan slot.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                        {/* INPUT 1: LICENSE PLATE */}
                        <div className="space-y-2">
                          <label className="block text-[11px] font-bold text-slate-600 font-mono uppercase">Nomor Plat Kendaraan</label>
                          <input 
                            type="text"
                            value={resLicensePlate}
                            onChange={(e) => setResLicensePlate(e.target.value)}
                            placeholder="Contoh: B 2026 EV"
                            className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm font-extrabold uppercase tracking-wider w-full focus:outline-none focus:bg-white focus:border-blue-600 transition-all"
                          />
                          <p className="text-[10px] text-slate-400 font-medium">Nomor plat kendaraan harus sesuai untuk pemindaian di pintu masuk.</p>
                        </div>

                        {/* INPUT 2: HOLD TIMEOUT BUFFER */}
                        <div className="space-y-2">
                          <label className="block text-[11px] font-bold text-slate-600 font-mono uppercase">Batas Waktu Tunggu</label>
                          <select
                            value={resDurationBuffer}
                            onChange={(e) => setResDurationBuffer(parseInt(e.target.value))}
                            className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-850 text-sm font-semibold focus:outline-none focus:bg-white focus:border-blue-600 transition-all w-full cursor-pointer"
                          >
                            <option value={300}>Batas 5 Menit (Direkomendasikan)</option>
                            <option value={600}>Batas 10 Menit</option>
                            <option value={900}>Batas 15 Menit</option>
                            <option value={1800}>Batas Perpanjangan 30 Menit</option>
                          </select>
                          <p className="text-[10px] text-slate-400 font-normal">Reservasi Anda akan otomatis dibatalkan jika melebihi batas waktu ini.</p>
                        </div>
                      </div>

                      {/* PAYMENT SETTING */}
                      <div className="mt-6 p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                        <label className="block text-xs font-semibold text-slate-600 font-mono uppercase">Integrasi Gerbang Pembayaran SaaS Nontunai</label>
                        <div className="grid grid-cols-3 gap-2.5">
                          {[
                            { id: "qris", label: "QRIS Semua Bank" },
                            { id: "wallet", label: "Dompet Digital" },
                            { id: "gate", label: "Bayar di Exit" }
                          ].map((pm) => (
                            <button
                              key={pm.id}
                              onClick={() => setPaymentMethod(pm.id)}
                              className={`py-2 px-3 rounded-lg border text-xs font-bold font-mono transition-all uppercase cursor-pointer ${
                                paymentMethod === pm.id 
                                  ? "bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-100" 
                                  : "bg-white border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                              }`}
                            >
                              {pm.label}
                            </button>
                          ))}
                        </div>
                        <div className="flex items-center justify-between text-xs pt-2 font-mono text-slate-500 border-t border-slate-200">
                          <span>Biaya Tambahan Pemesanan Slot</span>
                          <span className="font-extrabold text-slate-900">Rp {(currentArea.ratePerHour * 1.5).toLocaleString("id-ID")}</span>
                        </div>
                      </div>

                      {/* SUBMIT BUTTON */}
                      <div className="mt-8 flex items-center gap-3">
                        <button
                          onClick={verifyAndReserve}
                          className="flex-1 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm tracking-wider uppercase rounded-xl transition-all cursor-pointer shadow-md"
                        >
                          Konfirmasi & Amankan Slot
                        </button>
                        <button
                          onClick={() => setResSlotId(null)}
                          className="py-3.5 px-6 bg-slate-100 text-slate-500 hover:text-slate-800 font-bold text-sm uppercase rounded-xl transition-all cursor-pointer border border-slate-200 hover:bg-slate-200"
                        >
                          Batal
                        </button>
                      </div>

                    </div>
                  </div>
                )}

              </div>
            )}

            {/* OPERATOR/ADMIN CONTROL DASHBOARD */}
            {role === "operator" && (
              <div className="space-y-8 animate-fadeIn">
                
                {/* Operator live stats */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col justify-between shadow-sm">
                    <span className="text-[10px] font-mono uppercase text-slate-500 tracking-wider font-bold">Rata-rata Okupansi</span>
                    <p className="text-2xl font-black text-slate-900 mt-1.5 font-mono">{currentArea.busyProgress}%</p>
                    <span className="text-[9px] text-emerald-600 mt-1 uppercase font-mono block font-bold">✔ Aliran Stabil</span>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col justify-between shadow-sm">
                    <span className="text-[10px] font-mono uppercase text-slate-500 tracking-wider font-bold">Slot Kosong Tersedia</span>
                    <p className="text-2xl font-black text-emerald-600 mt-1.5 font-mono">{currentArea.availableSlots}</p>
                    <span className="text-[9px] text-slate-500 mt-1 uppercase font-mono block font-medium">dari {currentArea.totalSlots} slot</span>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col justify-between shadow-sm">
                    <span className="text-[10px] font-mono uppercase text-slate-500 tracking-wider font-bold">Total Keuangan Terbayar</span>
                    <p className="text-2xl font-black text-blue-600 mt-1.5 font-mono">
                      Rp {((currentArea.totalSlots - currentArea.availableSlots) * currentArea.ratePerHour).toLocaleString("id-ID")}
                    </p>
                    <span className="text-[9px] text-slate-500 mt-1 uppercase font-mono block font-medium">akumulasi biaya/jam</span>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col justify-between shadow-sm">
                    <span className="text-[10px] font-mono uppercase text-slate-500 tracking-wider font-bold">Total Slot Dipesan</span>
                    <p className="text-2xl font-black text-amber-600 mt-1.5 font-mono">
                      {slots.filter(s => s.areaId === selectedAreaId && s.status === "Reserved").length}
                    </p>
                    <span className="text-[9px] text-slate-500 mt-1 uppercase font-mono block font-medium">klaim pesanan aktif</span>
                  </div>
                </div>

                {/* Operator Gate & Traffic Simulation Area */}
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                  <div>
                    <span className="text-[9px] font-mono text-blue-600 uppercase bg-blue-50 px-2 py-0.5 rounded border border-blue-100 font-bold">
                      KOTAK SIMULASI SISTEM REAL-TIME
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mt-3">Kontroler Gateway Lalu Lintas Interaktif</h3>
                    <p className="text-xs text-slate-500 font-normal mt-0.5">
                      Simulasikan kedatangan atau keberangkatan mobil nyata untuk menguji kecepatan sinkronisasi sistem ParkEase secara instan.
                    </p>
                  </div>

                  {/* Core simulation control buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      onClick={triggerRandomArrival}
                      disabled={currentArea.availableSlots === 0}
                      className="py-4 px-6 bg-slate-50 border border-slate-200 hover:bg-slate-100 hover:border-slate-300 rounded-xl transition-all flex items-center justify-between group cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
                    >
                      <div className="text-left">
                        <span className="text-[10px] uppercase font-mono text-emerald-600 tracking-wider block font-bold">1. Simulasikan Mobil Masuk</span>
                        <span className="text-xs text-slate-500 font-normal mt-0.5 block">Simulasikan sensor mencatat kendaraan yang baru parkir.</span>
                      </div>
                      <Play className="h-5 w-5 text-emerald-600 shrink-0 group-hover:translate-x-1.5 transition-transform" />
                    </button>

                    <button
                      onClick={triggerRandomDeparture}
                      disabled={currentArea.availableSlots === currentArea.totalSlots}
                      className="py-4 px-6 bg-slate-50 border border-slate-200 hover:bg-slate-100 hover:border-slate-300 rounded-xl transition-all flex items-center justify-between group cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
                    >
                      <div className="text-left">
                        <span className="text-[10px] uppercase font-mono text-rose-600 tracking-wider block font-bold">2. Simulasikan Mobil Keluar</span>
                        <span className="text-xs text-slate-500 font-normal mt-0.5 block">Simulasikan pembersihan database status sensor saat mobil keluar.</span>
                      </div>
                      <LogOut className="h-5 w-5 text-rose-600 shrink-0 group-hover:translate-x-1.5 transition-transform" />
                    </button>
                  </div>

                  {/* Manual Bypass control list of slotted units */}
                  <div className="pt-4 border-t border-slate-200">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-3 font-bold">Konsol Pengosongan Slot Manual</span>
                    <div className="flex flex-wrap gap-2 max-h-[140px] overflow-y-auto p-1 scrollbar-thin">
                      {areaSlots.map((slot) => {
                        const canVacate = slot.status !== "Available";
                        return (
                          <div 
                            key={slot.id} 
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-mono font-bold transition-all ${
                              slot.status === "Occupied" 
                                ? "bg-rose-50 border-rose-200 text-rose-600" 
                                : slot.status === "Reserved"
                                ? "bg-amber-50 border-amber-200 text-amber-600"
                                : "bg-white border-slate-200 text-slate-500"
                            }`}
                          >
                            <span>{slot.id}</span>
                            {canVacate && (
                              <button 
                                onClick={() => handleManualVacateSlot(slot.id)}
                                className="text-rose-600 hover:text-white bg-slate-100 hover:bg-rose-600 p-0.5 rounded transition-colors cursor-pointer border border-slate-250 font-bold font-mono"
                                title="Paksa pengosongan slot"
                              >
                                ✕
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Analytics Chart Block */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                        <TrendingUp className="text-blue-600 h-4.5 w-4.5" /> Laporan Analitik SaaS
                      </h4>
                      <p className="text-xs text-slate-500 font-normal mt-0.5">
                        Proyeksi real-time berdasarkan data historis.
                      </p>
                    </div>
                    <span className="text-[10px] font-mono bg-blue-50 text-blue-600 px-2 py-0.5 rounded border border-blue-150 font-bold uppercase shadow-sm">
                      AUTO FRESH: v2.4
                    </span>
                  </div>

                  {/* Recharts chart render responsive wrapper */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    
                    {/* CHART 1: TIME OCCUPANCY AREA CHART */}
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-4 font-bold">Faktor Puncak Okupansi per Jam</span>
                      <div className="h-60 w-full text-xs font-sans">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={MOCK_ANALYTICS[selectedAreaId] || MOCK_ANALYTICS.scbd}>
                            <defs>
                              <linearGradient id="colorOcc" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4}/>
                                <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis dataKey="time" stroke="#64748b" />
                            <YAxis domain={[0, 100]} stroke="#64748b" unit="%" />
                            <Tooltip contentStyle={{ backgroundColor: "#ffffff", borderColor: "#cbd5e1", borderRadius: "12px", color: "#1e293b" }} />
                            <Area type="monotone" dataKey="occupancyRate" name="Okupansi %" stroke="#2563eb" fillOpacity={1} fill="url(#colorOcc)" strokeWidth={2.5} />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* CHART 2: REVENUE FLOW */}
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-4 font-bold">Prediksi Pendapatan per Jam (IDR)</span>
                      <div className="h-60 w-full text-xs font-sans">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={MOCK_ANALYTICS[selectedAreaId] || MOCK_ANALYTICS.scbd}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis dataKey="time" stroke="#64748b" />
                            <YAxis stroke="#64748b" />
                            <Tooltip formatter={(v) => `Rp ${Number(v).toLocaleString("id-ID")}`} contentStyle={{ backgroundColor: "#ffffff", borderColor: "#cbd5e1", borderRadius: "12px", color: "#1e293b" }} />
                            <Bar dataKey="revenue" name="Aliran Pendapatan" fill="#1e40af" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            )}

          </div>

        </div>
      </div>

      {/* CONFIRMATION SUCCESS MODAL MODAL */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl max-w-sm w-full text-center space-y-4 shadow-2xl relative animate-fadeIn">
            <div className="h-12 w-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
              <Check className="h-6 w-6" />
            </div>

            <h4 className="text-lg font-black text-slate-900">Klaim Penguncian Pintar Berhasil!</h4>
            <p className="text-xs text-slate-500 font-normal leading-relaxed">
              Tempat parkir Anda sekarang telah berhasil dipesan pada SaaS Cloud. Kamera pembatas pintu masuk telah disinkronkan dengan plat nomor Anda. Harap diperhatikan waktu hitung mundur pemesanan Anda!
            </p>

            <button
              onClick={() => setIsSuccessModalOpen(false)}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs uppercase rounded-xl tracking-wider cursor-pointer shadow-md"
            >
              Selesai - Kembali ke Peta
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
