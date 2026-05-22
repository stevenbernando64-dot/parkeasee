import React, { useState, useEffect } from "react";
import { ParkingArea, ParkingSlot, VehicleLog } from "../types";
import { 
  Users, MapPin, Search, Plane, Clock, Compass, Bell, Shield, Phone, MessageSquare, Car, 
  Map, Activity, RefreshCw, Star, CheckCircle2, ChevronRight, UserCheck, Play, Send 
} from "lucide-react";

interface PassengerDashboardProps {
  userEmail: string;
  areas: ParkingArea[];
  slots: ParkingSlot[];
  logs: VehicleLog[];
  onLogout: () => void;
}

interface PickupRequest {
  id: string;
  zoneId: string;
  passengerName: string;
  vehicleType: "motor" | "bentor" | "mobil";
  status: "searching" | "driver_assigned" | "driving" | "arrived";
  assignedDriver?: {
    name: string;
    plate: string;
    phone: string;
    slotId?: string;
  };
}

export default function PassengerDashboard({ userEmail, areas, slots, logs, onLogout }: PassengerDashboardProps) {
  const [selectedAreaId, setSelectedAreaId] = useState<string>("scbd");
  const [searchQuery, setSearchQuery] = useState("");
  const [passengerName, setPassengerName] = useState("");
  const [selectedVehicleType, setSelectedVehicleType] = useState<"motor" | "bentor" | "mobil">("mobil");
  
  // Passenger Pickup request simulation state
  const [activeRequest, setActiveRequest] = useState<PickupRequest | null>(() => {
    const saved = localStorage.getItem("parkease_passenger_request");
    return saved ? JSON.parse(saved) : null;
  });

  // Persist request state
  useEffect(() => {
    if (activeRequest) {
      localStorage.setItem("parkease_passenger_request", JSON.stringify(activeRequest));
    } else {
      localStorage.removeItem("parkease_passenger_request");
    }
  }, [activeRequest]);

  const currentArea = areas.find((a) => a.id === selectedAreaId) || areas[0];
  const areaSlots = slots.filter((s) => s.areaId === selectedAreaId);

  // Simulation timer for request progress
  useEffect(() => {
    if (!activeRequest) return;

    let timer: NodeJS.Timeout;
    if (activeRequest.status === "searching") {
      timer = setTimeout(() => {
        // Randomly assign a vehicle plate
        const plates = ["BN 8234 CO", "BN 1205 TY", "BN 992 KL", "BN 4410 SD", "BN 3302 AA"];
        const drivers = ["Rian", "Akbar", "Hendra", "Budi", "Yayan"];
        const phoneNumbers = ["0812-7341-2290", "0819-2451-9982", "0813-8874-1205", "0877-2291-7764", "0852-9012-3345"];
        const randomIdx = Math.floor(Math.random() * plates.length);
        
        // Find an occupied space to mock pickup point or use a random one
        const occupiedSlots = areaSlots.filter(s => s.status === "Occupied");
        const recommendedSlot = occupiedSlots.length > 0 ? occupiedSlots[0].id : "A-03";

        setActiveRequest(prev => {
          if (!prev) return null;
          return {
            ...prev,
            status: "driver_assigned",
            assignedDriver: {
              name: drivers[randomIdx],
              plate: plates[randomIdx],
              phone: phoneNumbers[randomIdx],
              slotId: recommendedSlot
            }
          };
        });
      }, 5000); // 5 seconds to find a driver
    } else if (activeRequest.status === "driver_assigned") {
      timer = setTimeout(() => {
        setActiveRequest(prev => {
          if (!prev) return null;
          return { ...prev, status: "driving" };
        });
      }, 7000); // 7s transit
    } else if (activeRequest.status === "driving") {
      timer = setTimeout(() => {
        setActiveRequest(prev => {
          if (!prev) return null;
          return { ...prev, status: "arrived" };
        });
      }, 8000); // 8s wait to arrive
    }

    return () => clearTimeout(timer);
  }, [activeRequest, areaSlots]);

  // Request Pickup Action
  const handleRequestPickup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passengerName.trim()) {
      alert("Silakan masukkan nama penjemput terlebih dahulu!");
      return;
    }

    const newRequest: PickupRequest = {
      id: "req-" + Math.random().toString(36).substr(2, 6),
      zoneId: selectedAreaId,
      passengerName: passengerName,
      vehicleType: selectedVehicleType,
      status: "searching"
    };

    setActiveRequest(newRequest);
  };

  const handleCancelRequest = () => {
    setActiveRequest(null);
  };

  // Filter area search list
  const filteredAreas = areas.filter((a) => 
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    a.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-slate-50 text-slate-800 min-h-[calc(100vh-5rem)]">
      {/* Top Banner / User Context Segment */}
      <div className="bg-slate-900 text-white border-b border-slate-800 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-mono tracking-widest font-black text-blue-400 bg-blue-900/40 px-3 py-1 rounded inline-block">
              PORTAL PENUMPANG • TAMAN KOTA SUNGAILIAT
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Pusat Koordinasi Penjemputan Penumpang
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-light max-w-2xl">
              Selamat datang, <span className="text-white font-bold">{userEmail}</span>. Gunakan menu ini untuk mengoordinasikan penjemputan Anda di berbagai titik strategis Taman Kota Sungailiat secara aman dan efisien.
            </p>
          </div>

          <button
            onClick={onLogout}
            className="px-4.5 py-2.5 bg-slate-800 hover:bg-red-950/40 hover:text-red-300 hover:border-red-900/50 text-xs font-bold text-slate-300 rounded-xl border border-slate-700 uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2 pr-5"
          >
            <Car className="h-4 w-4 bg-red-600/30 p-0.5 rounded text-red-400" />
            <span>Keluar Akun</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT 4-COLUMNS: PICKUP ZONE TARGETS */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Sektor Selector */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                  <MapPin className="text-blue-600 h-4.5 w-4.5" /> Pilih Titik Lokasi Anda
                </h3>
                <span className="text-[10px] font-mono bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded text-blue-700 font-bold">
                  {filteredAreas.length} Sektor
                </span>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-450" />
                <input
                  type="text"
                  placeholder="Cari sektor di taman..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-9 pr-4 text-xs font-normal text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 transition-colors"
                />
              </div>

              <div className="space-y-2 max-h-[340px] overflow-y-auto scrollbar-thin">
                {filteredAreas.map((area) => {
                  const isSelected = area.id === selectedAreaId;
                  return (
                    <div
                      key={area.id}
                      onClick={() => setSelectedAreaId(area.id)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer text-left block w-full relative overflow-hidden ${
                        isSelected 
                          ? "bg-slate-900 text-white border-slate-800 shadow-md transform hover:scale-[1.01]" 
                          : "bg-slate-50 text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-white"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <h4 className={`text-xs font-bold leading-tight ${isSelected ? "text-white" : "text-slate-800"}`}>
                          {area.name}
                        </h4>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                          area.busyProgress > 60 
                            ? "bg-rose-500/20 text-rose-400" 
                            : "bg-emerald-500/20 text-emerald-400"
                        }`}>
                          {area.busyProgress > 60 ? "Sangat Padat" : "Senggang"}
                        </span>
                      </div>

                      <p className={`text-[10px] mt-1 line-clamp-1 font-normal ${isSelected ? "text-slate-400" : "text-slate-500"}`}>
                        {area.location}
                      </p>

                      <div className="mt-4 flex items-center justify-between text-[11px] pt-1.5 border-t border-slate-700/20">
                        <span className="font-mono font-bold text-emerald-500">
                          {area.availableSlots} Slot Kosong
                        </span>
                        <span className="font-medium flex items-center gap-1 font-mono">
                          <Users className="w-3.5 h-3.5 opacity-60" /> ~{area.distanceKm} km ({area.durationMin} mnt)
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick stats of selected checkpoint */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-left">
              <h4 className="text-xs uppercase tracking-wider font-bold text-slate-400 font-mono mb-2.5">
                Kondisi Lapangan Sektor Terpilih
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-1 border-b border-slate-100">
                  <span className="text-xs text-slate-500">Kepadatan Parkir</span>
                  <span className="text-xs font-extrabold font-mono text-slate-800">{currentArea.busyProgress}%</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-100">
                  <span className="text-xs text-slate-500">Tarif Parkir Jam Pertama</span>
                  <span className="text-xs font-extrabold font-mono text-slate-800">Rp {currentArea.ratePerHour.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-xs text-slate-500">Slot Kosong Termonitor</span>
                  <span className="text-xs font-extrabold font-mono text-slate-800">{currentArea.availableSlots} / {currentArea.totalSlots}</span>
                </div>
              </div>
            </div>

          </div>

          {/* MAIN 8-COLUMNS: COORDINATION WORKSPACE & REQUEST COMPONENT */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Dynamic Simulated request status banner */}
            {activeRequest ? (
              <div className="bg-white border border-blue-200 rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden animate-slideUp">
                
                {/* Background decorative stripes */}
                <div className="absolute top-0 right-0 h-2 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500" />
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-100">
                  <div>
                    <span className="text-[9px] font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded border border-blue-100 uppercase tracking-widest inline-block">
                      SIMULASI KOORDINASI PENJEMPUTAN
                    </span>
                    <h3 className="text-lg font-black text-slate-900 mt-2.5">
                      Menghubungkan dengan Pengemudi Terdekat
                    </h3>
                  </div>
                  <button
                    onClick={handleCancelRequest}
                    className="py-1.5 px-3 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800 uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Batalkan Pesanan
                  </button>
                </div>

                {/* Progress Indicators */}
                <div className="grid grid-cols-4 gap-2 py-6">
                  {[
                    { id: "searching", title: "Mencari Armada" },
                    { id: "driver_assigned", title: "Sopir Ditunjuk" },
                    { id: "driving", title: "Sedang Menuju" },
                    { id: "arrived", title: "Tiba di Titik" }
                  ].map((step, i) => {
                    const statuses = ["searching", "driver_assigned", "driving", "arrived"];
                    const currentIdx = statuses.indexOf(activeRequest.status);
                    const stepIdx = statuses.indexOf(step.id);
                    const isCompleted = stepIdx < currentIdx;
                    const isActive = stepIdx === currentIdx;

                    return (
                      <div key={step.id} className="text-center space-y-2">
                        <div className={`h-2.5 rounded-full transition-all ${
                          isCompleted ? "bg-emerald-500" : isActive ? "bg-blue-600 animate-pulse" : "bg-slate-200"
                        }`} />
                        <span className={`text-[9px] sm:text-[10px] font-mono block leading-tight ${
                          isCompleted ? "text-emerald-600 font-bold" : isActive ? "text-blue-600 font-black" : "text-slate-400"
                        }`}>
                          {step.title}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Phase specific interactive cards */}
                {activeRequest.status === "searching" && (
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/60 flex flex-col items-center justify-center text-center py-10">
                    <div className="h-10 w-10 rounded-full border border-blue-400 border-t-transparent animate-spin flex items-center justify-center mb-4 text-blue-600" />
                    <h4 className="text-sm font-bold text-slate-800">Menghubungkan dengan armada terdekat...</h4>
                    <p className="text-[11px] text-slate-500 mt-1 max-w-sm font-normal">
                      Sistem sedang mencocokkan titik lokasi Anda di <span className="font-bold text-slate-700">{currentArea.name}</span> dengan GPS pengemudi/bentor yang terdaftar.
                    </p>
                  </div>
                )}

                {activeRequest.status !== "searching" && activeRequest.assignedDriver && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 text-left">
                    
                    {/* Driver details */}
                    <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 shadow space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="h-11 w-11 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-slate-200 uppercase font-mono">
                          {activeRequest.assignedDriver.name.substr(0, 2)}
                        </div>
                        <div>
                          <span className="text-[9px] font-mono text-emerald-400 font-bold block uppercase tracking-wide">PENGEMUDI DITEMUKAN</span>
                          <h4 className="text-base font-black">{activeRequest.assignedDriver.name}</h4>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3.5 text-xs font-mono">
                        <div className="p-3.5 bg-slate-850 rounded-xl border border-slate-800">
                          <span className="text-[9px] text-slate-400 uppercase font-bold block">PLAT NOMOR</span>
                          <span className="text-sm font-extrabold text-blue-400">{activeRequest.assignedDriver.plate}</span>
                        </div>

                        <div className="p-3.5 bg-slate-850 rounded-xl border border-slate-800">
                          <span className="text-[9px] text-slate-400 uppercase font-bold block">TITIK TUNGGU</span>
                          <span className="text-sm font-extrabold text-indigo-400">SLOT {activeRequest.assignedDriver.slotId}</span>
                        </div>
                      </div>

                      <div className="flex gap-2.5 pt-1">
                        <a 
                          href={`tel:${activeRequest.assignedDriver.phone}`} 
                          className="flex-1 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                        >
                          <Phone className="h-3.5 w-3.5" /> Telepon
                        </a>
                        <button 
                          onClick={() => alert(`Obrolan dengan ${activeRequest.assignedDriver?.name} berhasil dibuka (Simulasi)`)}
                          className="flex-1 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                        >
                          <MessageSquare className="h-3.5 w-3.5 text-blue-500" /> Chat
                        </button>
                      </div>
                    </div>

                    {/* Status descriptions */}
                    <div className="flex flex-col justify-between py-1 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                      <div className="space-y-2">
                        <h5 className="text-sm font-bold text-slate-800">Estimasi Penjemputan</h5>
                        {activeRequest.status === "driver_assigned" && (
                          <p className="text-xs text-slate-600 font-normal leading-relaxed">
                            Pengemudi telah menerima permintaan Anda! Pengemudi bersiap menuju area titik jemput <span className="font-semibold text-slate-800">{currentArea.name}</span>.
                          </p>
                        )}
                        {activeRequest.status === "driving" && (
                          <div className="space-y-2">
                            <span className="text-[9px] font-mono text-blue-600 font-bold bg-blue-50 border border-blue-100 px-2 py-0.5 rounded inline-block animate-pulse">ARMADA DI PERJALANAN</span>
                            <p className="text-xs text-slate-600 font-normal leading-relaxed">
                              Sopir sedang memutar di jalan lingkar luar semenanjung pantai Sungailiat menuju gerbang parkir. Tetap perhatikan plat kendaraan Anda.
                            </p>
                          </div>
                        )}
                        {activeRequest.status === "arrived" && (
                          <div className="space-y-1.5 p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                            <span className="text-[10px] font-mono text-emerald-700 font-bold block uppercase tracking-wide">SOPIR TELAH TIBA DI LOKASI!</span>
                            <p className="text-xs text-emerald-800 font-normal leading-relaxed">
                              Silakan temui pengemudi Anda di <span className="font-bold">{currentArea.name}</span> dekat <span className="underline">Slot {activeRequest.assignedDriver.slotId}</span>. Terimakasih telah menggunakan layanan terintegrasi ParkEase!
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="p-3 bg-white rounded-xl border border-slate-150 text-[11px] text-slate-500 mt-4 flex items-center gap-2">
                        <Shield className="h-4 w-4 text-emerald-600" />
                        <span>Keamanan perjalanan Anda dijamin oleh UU PDP 2022.</span>
                      </div>
                    </div>

                  </div>
                )}

              </div>
            ) : (
              /* Request ride form when no active request is made */
              <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm text-left space-y-6">
                <div>
                  <span className="text-[9px] font-mono text-indigo-700 font-bold uppercase tracking-widest bg-indigo-50 px-2.5 py-1 rounded border border-indigo-100">
                    WIZARD PENJEMPUTAN PENUMPANG
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mt-3">
                    Pesan Koordinasi Penjemputan Instan
                  </h3>
                  <p className="text-xs text-slate-500 font-normal mt-0.5 leading-relaxed">
                    Ajukan pemesanan koordinasi penjemputan dari pengemudi atau layanan sewa/angkutan di sekitar <span className="font-semibold text-slate-700">{currentArea.name}</span>.
                  </p>
                </div>

                <form onSubmit={handleRequestPickup} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-650 font-mono uppercase">
                        Nama Penumpang / Penjemput
                      </label>
                      <input 
                        type="text"
                        required
                        value={passengerName}
                        onChange={(e) => setPassengerName(e.target.value)}
                        placeholder="Contoh: Pak Herman Sungailiat"
                        className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm font-semibold tracking-wide w-full focus:outline-none focus:bg-white focus:border-blue-600 transition-all placeholder-slate-400"
                      />
                      <p className="text-[9px] text-slate-400">Identitas penting agar pengemudi tidak salah memanggil nama Anda.</p>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-650 font-mono uppercase font-sans">
                        Jenis Transportasi Penjemput
                      </label>
                      <select
                        value={selectedVehicleType}
                        onChange={(e: any) => setSelectedVehicleType(e.target.value)}
                        className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 text-xs sm:text-xs font-mono font-bold w-full focus:outline-none focus:bg-white focus:border-blue-600 transition-all cursor-pointer"
                      >
                        <option value="mobil">Sewa / Mobil Pribadi (Roda 4)</option>
                        <option value="bentor">Bentor Sungailiat (Beca Bermotor)</option>
                        <option value="motor">Ojek Motor Lokal (Roda 2)</option>
                      </select>
                      <p className="text-[9px] text-slate-400">Membantu memperhitungkan kapasitas parkir pintu jemput.</p>
                    </div>
                  </div>

                  <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-150 text-xs text-slate-600 leading-relaxed font-normal flex items-start gap-3">
                    <Compass className="text-indigo-600 h-5 w-5 shrink-0 mt-0.5 animate-spin-slow" />
                    <div>
                      <p className="font-semibold text-indigo-900">Sistem Panduan Titik Kumpul Terintegrasi</p>
                      <p className="text-[11px] text-indigo-755 mt-0.5">
                        Anda akan secara otomatis dialokasikan ke slot parkir kosong terdekat di sektor <span className="font-bold">{currentArea.name}</span> agar pengemudi tidak perlu berputar-putar mencari Anda di keramaian Taman Kota.
                      </p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm tracking-wider uppercase rounded-xl transition-all cursor-pointer shadow-md shadow-blue-50 flex items-center justify-center gap-2"
                  >
                    <Send className="h-4 w-4" />
                    <span>Luncurkan Koordinasi Penjemputan</span>
                  </button>
                </form>

              </div>
            )}

            {/* Live Visual map representation of Sungailiat City Park Slots */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-150">
                <div>
                  <h3 className="text-lg font-bold text-slate-950 flex items-center gap-2">
                    <Map className="text-emerald-500 h-5 w-5" /> Denah Alokasi Tempat Parkir Live Sektor Terpilih
                  </h3>
                  <p className="text-xs text-slate-500 font-normal mt-0.5">
                    Informasi ketersediaan langsung di <span className="font-bold text-slate-700">{currentArea.name}</span>. Penumpang dipersilakan mencocokkan titik tunggu parkir jemputan.
                  </p>
                </div>

                <div className="flex items-center gap-3.5 flex-wrap text-[10px] font-mono text-slate-500 bg-slate-50 px-3.5 py-1.5 rounded-lg border border-slate-200">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-emerald-500/20 border border-emerald-500" />
                    <span>Kosong</span>
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

              {/* Slots rendering layout */}
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 pt-2">
                {areaSlots.length === 0 ? (
                  <div className="col-span-full py-8 text-center text-xs text-slate-400 italic">
                    Belum ada slot data termonitor di area ini.
                  </div>
                ) : (
                  areaSlots.map((slot) => {
                    const isAvailable = slot.status === "Available";
                    const isReserved = slot.status === "Reserved";
                    const isOccupied = slot.status === "Occupied";

                    return (
                      <div
                        key={slot.id}
                        className={`p-3.5 rounded-2xl border text-center flex flex-col justify-between items-center h-24 transition-all relative overflow-hidden ${
                          isAvailable 
                            ? "bg-emerald-50/30 border-emerald-250 text-emerald-800" 
                            : isReserved 
                            ? "bg-amber-50/40 border-amber-300 text-amber-800" 
                            : "bg-rose-50/20 border-rose-250 text-rose-800 font-medium"
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="text-[10px] font-mono font-black">{slot.id}</span>
                          <span className="text-[8px] uppercase tracking-wider font-bold bg-slate-100 px-1 py-0.5 rounded border border-slate-200 text-slate-500">
                            {slot.zone}
                          </span>
                        </div>

                        <div className="flex items-end justify-between w-full pt-2">
                          {isAvailable ? (
                            <span className="text-[9px] text-emerald-600 font-extrabold font-mono tracking-wider">KOSONG</span>
                          ) : isReserved ? (
                            <div className="text-left leading-none font-semibold">
                              <span className="text-[8px] text-amber-600 font-bold block leading-none">PESANAN</span>
                              <span className="text-[8px] font-mono text-slate-550 font-normal">{slot.vehiclePlate}</span>
                            </div>
                          ) : (
                            <div className="text-left leading-none font-semibold">
                              <span className="text-[8px] text-rose-600 font-bold block leading-none">TERISI</span>
                              <span className="text-[8px] font-mono text-slate-500 font-normal">{slot.vehiclePlate}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Event logs specifically for coordinate status verification */}
            <div className="bg-white p-6 rounded-3xl border border-slate-250 shadow-sm space-y-4 text-left">
              <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Activity className="text-blue-600 h-4.5 w-4.5" /> Aktivitas Gerbang Sektor Terkini
              </h4>
              <p className="text-xs text-slate-500 font-normal leading-relaxed">
                Log pergerakan real-time kendaraan masuk dan keluar di <span className="font-bold text-slate-700">{currentArea.name}</span>.
              </p>

              <div className="space-y-2 mt-2 max-h-[160px] overflow-y-auto scrollbar-thin">
                {logs.filter(l => l.areaId === selectedAreaId).length === 0 ? (
                  <p className="text-xs text-slate-400 italic text-center py-4">Belum ada aktivitas tercatat hari ini.</p>
                ) : (
                  logs.filter(l => l.areaId === selectedAreaId).map((log) => (
                    <div key={log.id} className="bg-slate-50 p-2.5 rounded-lg border border-slate-150 text-[11px] font-mono flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className={`h-1.5 w-1.5 rounded-full ${log.type === "ENTRY" ? "bg-emerald-500" : log.type === "EXIT" ? "bg-rose-500" : "bg-amber-500"}`} />
                        <div>
                          <span className="text-slate-550 font-bold uppercase">{log.type === "ENTRY" ? "Masuk" : log.type === "EXIT" ? "Keluar" : "Pesan"}: </span>
                          <span className="text-slate-800 font-black">Slot {log.slotId}</span>
                          <span className="text-slate-400 block text-[9px] font-normal mt-0.5">Kendaraan: {log.vehiclePlate}</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium">{log.timestamp}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
