import { useState } from "react";
import { SAAS_TIERS } from "../data/mockData";
import { 
  Building2, 
  Map, 
  Activity, 
  Layers, 
  Smartphone, 
  AlertTriangle, 
  TrendingUp, 
  Check, 
  ChevronRight, 
  HelpCircle,
  Database,
  Cloud,
  Globe2,
  GitMerge,
  BadgeAlert
} from "lucide-react";

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState<"Market" | "TechStack" | "Pricing">("Market");

  const problems = [
    { title: "Waktu Terbuang Mencari Parkir", desc: "Pengemudi menghabiskan rata-rata 15-20 menit berputar-putar untuk mencari tempat parkir, meningkatkan kemacetan kota." },
    { title: "Tidak Ada Visibilitas Real-Time", desc: "Papan tanda pintu masuk yang statis mencerminkan tingkat okupansi masa lalu, bukan kekosongan sebenarnya di slot masing-masing." },
    { title: "Prosedur Gerbang Manual", desc: "Operator mengandalkan tiket kertas warisan atau kartu fisik, yang menyebabkan antrean panjang di pintu keluar-masuk." },
    { title: "Minim Umpan Balik Analitik", desc: "Pemerintah daerah dan operator swasta tidak dapat melihat pola puncak jam sibuk atau menetapkan harga berdasarkan kepadatan parkir." }
  ];

  const targetMarkets = [
    { name: "Mal & Plaza Perbelanjaan", icon: Building2, desc: "Meningkatkan kepuasan pengunjung dan mengurangi kemacetan struktural di pintu masuk." },
    { name: "Gedung Komersial Premium", icon: Globe2, desc: "Mengalokasikan slot VIP eksekutif reguler dan klaster pengunjung secara lancar." },
    { name: "Pusat Transit (Bandara & Stasiun)", icon: Map, desc: "Pemantauan volume tinggi dengan sinkronisasi langsung jadwal penerbangan." },
    { name: "Kampus Pendidikan", icon: Layers, desc: "Memberikan pilihan tempat parkir kosong yang jelas bagi mahasiswa selama jam pergantian kelas yang padat." }
  ];

  const techStack = [
    { component: "Portal Frontend", tech: "React.js / Tailwind CSS", desc: "Sepenuhnya responsif, memuat rute navigasi pengemudi dalam hitungan detik." },
    { component: "Mikrolayanan Backend", tech: "Node.js / Express.js", desc: "Server telemetri berbasis peristiwa yang memproses data sensor." },
    { component: "DB Cloud SaaS", tech: "PostgreSQL Engine", desc: "Pelacakan slot relasional dengan keamanan transaksi untuk reservasi." },
    { component: "Infrastruktur Hosting", tech: "Google Cloud Run / AWS", desc: "Virtualisasi kontainer terdistribusi geografis ketersediaan tinggi dengan optimasi cold-start." },
    { component: "Integrasi Sensor", tech: "MQTT / REST Protocols", desc: "Tautan gateway perangkat keras langsung yang mentransmisikan status geomagnetik." }
  ];

  return (
    <section className="bg-white py-20 px-4 border-t border-slate-250" id="about">
      <div className="max-w-7xl mx-auto">
        
        {/* Navigation Section Sub-Header Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-slate-200">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-sans">
              Presentasi Enterprise Park<span className="text-blue-600">Ease</span>
            </h2>
            <p className="mt-2 text-slate-500 font-normal text-sm sm:text-base max-w-xl">
              Pahami kerangka bisnis kami, target demografis, desain arsitektur perangkat lunak, dan modul langganan yang dapat disesuaikan.
            </p>
          </div>

          <div className="flex space-x-1 mt-6 md:mt-0 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
            {(["Market", "TechStack", "Pricing"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
                  activeTab === tab 
                    ? "bg-blue-600 text-white shadow-md shadow-blue-100" 
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {tab === "Market" ? "Pasar & Permasalahan" : tab === "TechStack" ? "Alur Arsitektur" : "Harga Layanan SaaS"}
              </button>
            ))}
          </div>
        </div>

        {/* Tab 1: Market & Problems */}
        {activeTab === "Market" && (
          <div className="space-y-16 animate-fadeIn">
            {/* The Problem Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-6">
                <span className="text-[10px] uppercase font-sans tracking-wider font-extrabold text-[#c53030] bg-red-50 border border-red-200 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5">
                  <BadgeAlert className="h-4 w-4 text-[#e53e3e]" /> Masalah Utama Pasar
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 leading-snug">
                  Kendala Parkir Umum Tradisional
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Jutaan jam dan berton-ton emisi karbon terbuang sia-sia setiap hari oleh para komuter yang mencari tempat parkir kosong di area perkotaan. Ketiadaan pemetaan digital terintegrasi menghambat pengelolaan slot yang efisien.
                </p>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3">
                  <TrendingUp className="text-blue-600 h-6 w-6 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-600">
                    <span className="font-bold text-slate-800">Pertumbuhan Kota Pintar:</span> Sistem yang mengintegrasikan ketersediaan real-time dapat mengurangi kemacetan hingga 30%, mempercepat aktivitas ekonomi di pusat kota.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {problems.map((prob, i) => (
                  <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-slate-300 hover:bg-white hover:shadow-md transition-all">
                    <div>
                      <div className="h-8 w-8 rounded-lg bg-red-50 text-red-600 border border-red-200 flex items-center justify-center font-bold mb-4 font-mono text-lg">
                        !
                      </div>
                      <h4 className="text-base font-bold text-slate-800">{prob.title}</h4>
                      <p className="text-xs text-slate-500 mt-2 font-normal leading-relaxed">{prob.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Target Markets */}
            <div className="pt-8 border-t border-slate-200">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <h4 className="text-xl font-bold text-slate-900">Target Bisnis Utama Kami</h4>
                <p className="text-sm text-slate-500 mt-2">ParkEase dapat ditingkatkan skalanya dengan mudah untuk melayani real estat komersial maupun sektor publik.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {targetMarkets.map((market, idx) => {
                  const Icon = market.icon;
                  return (
                    <div key={idx} className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex items-start gap-4 hover:border-blue-300 hover:bg-white hover:shadow-md transition-all duration-300 cursor-default">
                      <div className="p-2.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-100 shadow-sm">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h5 className="font-bold text-slate-800 text-sm leading-tight">{market.name}</h5>
                        <p className="text-xs text-slate-500 mt-1.5 font-normal leading-relaxed">{market.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: System Architecture Flow */}
        {activeTab === "TechStack" && (
          <div className="space-y-12 animate-fadeIn">
            {/* System Flow Diagram */}
            <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
              <div className="text-center mb-10">
                <span className="text-[10px] font-sans text-blue-700 font-bold uppercase tracking-widest bg-blue-50 px-2.5 py-1 rounded border border-blue-100 inline-block shadow-sm">
                  ALUR DATA TELEMETRI SISTEM
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-3">Dari Aspal ke Layar</h3>
              </div>

              {/* Vector flow chart */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-2 items-center text-center">
                
                {/* Node 1 */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-sm animate-fadeIn">
                  <div className="bg-blue-50 text-blue-700 border border-blue-100 h-10 w-10 mx-auto rounded-full flex items-center justify-center font-bold text-xs mb-3">
                    01
                  </div>
                  <h5 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Sensor IoT</h5>
                  <p className="text-[11px] text-slate-500 mt-1.5 font-normal">Node geomagnetik di aspal mencatat kedatangan kendaraan.</p>
                </div>

                <div className="hidden md:block text-slate-300 text-lg">➔</div>

                {/* Node 2 */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="bg-blue-50 text-blue-700 border border-blue-100 h-10 w-10 mx-auto rounded-full flex items-center justify-center font-bold text-xs mb-3">
                    02
                  </div>
                  <h5 className="text-sm font-bold text-slate-800 uppercase tracking-wide">API REST/MQTT</h5>
                  <p className="text-[11px] text-slate-500 mt-1.5 font-normal">Gateway menggabungkan dan menandai pengidentifikasi perangkat.</p>
                </div>

                <div className="hidden md:block text-slate-600 text-lg">➔</div>

                {/* Node 3 */}
                <div className="bg-blue-50 border-2 border-blue-400 p-5 rounded-2xl shadow-md shadow-blue-50 flex flex-col justify-center">
                  <div className="bg-blue-600 p-2.5 h-10 w-10 mx-auto rounded-full flex items-center justify-center text-white font-bold text-sm mb-3 shadow-md shadow-blue-100">
                    ✔
                  </div>
                  <h5 className="text-sm font-bold text-blue-700 uppercase tracking-wide">ParkEase Cloud</h5>
                  <p className="text-[11px] text-slate-700 mt-1.5 font-semibold">Server Node.js menyimpan status slot ke indeks database yang aman.</p>
                </div>

                <div className="hidden md:block text-slate-300 text-lg">➔</div>

                {/* Node 4 */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-sm animate-fadeIn">
                  <div className="bg-blue-50 text-blue-700 border border-blue-100 h-10 w-10 mx-auto rounded-full flex items-center justify-center font-bold text-xs mb-3">
                    03
                  </div>
                  <h5 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Frontend Web</h5>
                  <p className="text-[11px] text-slate-500 mt-1.5 font-normal">Klien React menerjemahkan lapisan peta slot kosong secara instan.</p>
                </div>

                <div className="hidden md:block text-slate-300 text-lg">➔</div>

                {/* Node 5 */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-sm animate-fadeIn">
                  <div className="bg-blue-50 text-blue-700 border border-blue-100 h-10 w-10 mx-auto rounded-full flex items-center justify-center font-bold text-xs mb-3">
                    04
                  </div>
                  <h5 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Pengemudi / Pengelola</h5>
                  <p className="text-[11px] text-slate-500 mt-1.5 font-normal">Konfirmasi detail reservasi dan navigasi langsung ke lokasi.</p>
                </div>

              </div>
            </div>

            {/* Structured Tech grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch pt-4">
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <Layers className="text-blue-600 h-5 w-5" /> Detail Arsitektur Teknologi
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  Ekosistem modern dan andal yang menggunakan elemen standar industri demi menjamin ketersediaan tinggi, persistensi data, dan keamanan akses klien.
                </p>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-850 text-[11px] font-mono leading-relaxed text-slate-300">
                  <span className="text-blue-400 font-bold">// DATA SENSOR API ENDPOINT:</span><br/>
                  <span className="text-slate-400">POST /api/v2/telemetry/puck-status</span><br/>
                  <span className="text-emerald-400">{"{ \"nodeId\": \"P-03\", \"areaId\": \"scbd\", \"occupied\": true, \"plate\": \"B 888 TS\" }"}</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-600">
                    <thead className="bg-slate-50 text-slate-500 font-bold text-[10px] uppercase border-b border-slate-250">
                      <tr>
                        <th className="px-5 py-4">Lapisan Layanan SaaS</th>
                        <th className="px-5 py-4">Pilihan Teknologi</th>
                        <th className="px-5 py-4 text-right">Fungsi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {techStack.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 transition-all text-slate-700">
                          <td className="px-5 py-3.5 font-bold">{item.component}</td>
                          <td className="px-5 py-3.5 font-mono text-blue-600 font-bold">{item.tech}</td>
                          <td className="px-5 py-3.5 text-right font-normal text-slate-500 text-[11px]">{item.desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: SaaS Pricing */}
        {activeTab === "Pricing" && (
          <div className="space-y-10 animate-fadeIn">
            {/* The pricing cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-4">
              {SAAS_TIERS.map((tier, idx) => (
                <div 
                  key={idx} 
                  className={`bg-slate-50 rounded-3xl p-8 border hover:scale-[1.01] transition-all flex flex-col justify-between relative ${
                    tier.popular ? "border-blue-500 bg-white shadow-xl shadow-blue-100" : "border-slate-200"
                  }`}
                >
                  {tier.popular && (
                    <span className="absolute top-4 right-4 bg-blue-600 text-white font-sans text-[10px] px-3.5 py-1 rounded-full font-bold uppercase tracking-wider shadow-md">
                      SOLUSI TI POPULER
                    </span>
                  )}
                  
                  <div>
                    <h4 className="text-xl font-bold text-slate-900">{tier.name}</h4>
                    <p className="text-xs text-slate-500 mt-2 font-normal leading-relaxed">{tier.description}</p>
                    
                    <div className="mt-6 pb-6 border-b border-slate-200">
                      <span className="text-3xl font-extrabold text-slate-900">{tier.priceMonthly}</span>
                      {tier.priceMonthly !== "Harga Kustom" && <span className="text-xs text-slate-400"> / bulan</span>}
                    </div>

                    <ul className="mt-6 space-y-3">
                      {tier.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-600 font-medium">
                          <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="font-normal">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8">
                    <button className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm tracking-wider uppercase transition-all cursor-pointer ${
                      tier.popular 
                        ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-100" 
                        : "bg-white hover:bg-slate-100 text-slate-800 hover:text-slate-950 border border-slate-250 shadow-sm"
                    }`}>
                      {tier.cta}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
