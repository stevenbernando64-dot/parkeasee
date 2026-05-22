import { Compass, Sparkles, MapPin, CheckCircle2, ChevronRight, Activity, Cpu } from "lucide-react";
// @ts-ignore
import heroBg from "../assets/images/parkease_hero_bg_1779425244877.png";

interface HeroProps {
  onLaunchDemo: () => void;
  onExploreGallery: () => void;
}

export default function Hero({ onLaunchDemo, onExploreGallery }: HeroProps) {
  return (
    <div className="relative min-h-[calc(100vh-5rem)] flex flex-col justify-center bg-slate-50 text-slate-900 overflow-hidden py-12 lg:py-24">
      {/* Background radial dots and blue glow */}
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(#1e40af 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 left-10 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Copy Column */}
          <div className="lg:col-span-7 flex flex-col space-y-8 text-center lg:text-left">
            {/* Tagline */}
            <div className="inline-flex items-center self-center lg:self-start bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full border border-blue-100 gap-2 shadow-sm">
              <Sparkles className="h-4 w-4 text-blue-600 animate-pulse" />
              <span>Platform SaaS Kota Pintar</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
                Temukan <span className="text-blue-600">Tempat</span> <br />Sempurna Anda dalam Hitungan Detik.
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                ParkEase menggunakan sensor real-time dan kecerdasan cloud untuk menghubungkan pengemudi dengan tempat parkir yang tersedia secara instan. Berhenti berputar-putar, mulailah memarkir. Jaga operasional parkir multi-zona Anda tetap optimal.
              </p>
            </div>

            {/* Multi-Value props */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left max-w-2xl mx-auto lg:mx-0">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Sinkronisasi Instan</h4>
                  <p className="text-xs text-slate-500">Pembaruan telemetri sensor IoT cepat</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Navigasi Rute Pintar</h4>
                  <p className="text-xs text-slate-500">Navigasi langsung dalam aplikasi</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">9x Lebih Cepat</h4>
                  <p className="text-xs text-slate-500">Sangat mengurangi waktu tunggu</p>
                </div>
              </div>
            </div>

            {/* Call To Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onLaunchDemo}
                className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-100 hover:bg-blue-700 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 group cursor-pointer text-lg"
              >
                <span>Cari Parkir Sekarang</span>
                <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreGallery}
                className="w-full sm:w-auto px-8 py-4 bg-white border-2 border-slate-200 text-slate-800 font-bold rounded-xl hover:bg-slate-50 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer text-lg"
              >
                <span>Pelajari Lebih Lanjut</span>
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center justify-center lg:justify-start space-x-8 pt-6 border-t border-slate-200">
              <div>
                <span className="block text-3xl font-extrabold text-slate-900">99.8%</span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Akurasi</span>
              </div>
              <div className="h-8 w-[1px] bg-slate-200" />
              <div>
                <span className="block text-3xl font-extrabold text-slate-900">1.2k+</span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Pusat Parkir</span>
              </div>
              <div className="h-8 w-[1px] bg-slate-200" />
              <div>
                <span className="block text-3xl font-extrabold text-slate-900">50k+</span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Pengguna Harian</span>
              </div>
            </div>
          </div>

          {/* Interactive Mockup/Design Column */}
          <div className="lg:col-span-5 relative group px-4">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-indigo-500/10 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500" />
            <div className="relative w-full bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden transform group-hover:rotate-0 transition-transform duration-500">
              
              {/* Outer App Frame Controls */}
              <div className="bg-slate-900 h-10 flex items-center px-4 space-x-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <div className="flex-1 text-center text-[10px] text-slate-400 font-mono tracking-widest">SYSTEM_ACTIVE_PARKING_MAP_V2</div>
              </div>

              {/* The generated high-quality background image */}
              <div className="relative overflow-hidden h-[340px] sm:h-[420px] bg-slate-100 flex items-center justify-center">
                <img
                  src={heroBg}
                  alt="ParkEase Smart City Connected Parking System"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700"
                />
                
                {/* Embedded Glassmorphic HUD overlay to show digital integration */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-xl p-4 border border-slate-200 shadow-lg">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <Cpu className="text-blue-600 h-4 w-4" />
                      <span className="text-xs font-bold text-slate-800 font-mono">Terminal Node GI-42</span>
                    </div>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-mono font-bold">AKTIF</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-left">
                    <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Ruang Aktif</p>
                      <p className="text-sm font-bold text-slate-900 font-mono">92/100 slot</p>
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Sensor Aktif</p>
                      <span className="text-sm font-bold text-slate-900 font-mono">99.85%</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
