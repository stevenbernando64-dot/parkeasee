import React, { useState } from "react";
import { 
  AlertTriangle, 
  Target, 
  BarChart3, 
  TrendingUp, 
  Sparkles, 
  ShieldAlert, 
  Users, 
  MapPin, 
  HelpCircle, 
  Coins, 
  GitCompare, 
  Check, 
  Info, 
  Flame, 
  ChevronRight, 
  Calculator,
  ArrowRight
} from "lucide-react";

export default function AboutSection() {
  const [activeChapter, setActiveChapter] = useState<number>(1);

  // Interactive Sizing simulation state
  const [hourlyRate, setHourlyRate] = useState<number>(2500);
  const [dailyOccupancyHours, setDailyOccupancyHours] = useState<number>(6); // average hours occupied per slot/day
  const [activeCoverageSlots, setActiveCoverageSlots] = useState<number>(92); // number of slots under ParkEase in Sungailiat

  // Calculation formulas
  const somDailyRevenue = activeCoverageSlots * dailyOccupancyHours * hourlyRate;
  const somAnnualRevenue = somDailyRevenue * 365;

  const chapters = [
    { id: 1, title: "1. Masalah & Pain Points", label: "Masalah & Pain Points" },
    { id: 2, title: "2. Segmentasi Pasar", label: "Segmentasi Pasar" },
    { id: 3, title: "3. Analisis Kompetitor", label: "Analisis Kompetitor" },
    { id: 4, title: "4. Ukuran Pasar (Sizing)", label: "Ukuran Pasar" },
    { id: 5, title: "5. Tren & Validasi Eksternal", label: "Tren & Validasi" }
  ];

  return (
    <section className="bg-slate-955 py-16 sm:py-24 px-4 border-t border-slate-900 relative overflow-hidden text-left" id="about">
      {/* Background radial effects */}
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-500/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Headline Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-[10px] font-mono uppercase tracking-widest font-extrabold text-blue-400 bg-blue-950/40 px-3.5 py-1.5 rounded-full border border-blue-900/30 inline-flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-blue-400 animate-pulse" /> ANALISIS STRATEGIS Enterprise
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white mt-4 tracking-tight leading-tight">
            Kerangka Bisnis & Analisis Pasar <br className="hidden sm:inline" />
            Park<span className="text-blue-500">Ease</span> Sungailiat
          </h2>
          <p className="mt-4 text-slate-400 font-normal text-sm sm:text-base leading-relaxed">
            Studi kelayakan komprehensif, segmen pasar tepercaya, lanskap persaingan produk terintegrasi, dan proyeksi nilai ekonomi digital untuk kawasan <span className="text-emerald-400 font-semibold font-mono">Taman Kota Sungailiat</span>.
          </p>
        </div>

        {/* Tab Selection Row (Horizontal on desktop / dropdown/list style on mobile) */}
        <div className="flex flex-wrap items-center justify-center gap-2 bg-slate-900/60 p-2 rounded-2xl border border-slate-800/80 mb-10 max-w-5xl mx-auto">
          {chapters.map((ch) => (
            <button
              key={ch.id}
              onClick={() => setActiveChapter(ch.id)}
              className={`flex-1 min-w-[140px] text-center py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold tracking-wide uppercase transition-all duration-300 cursor-pointer ${
                activeChapter === ch.id
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-950/50 scale-[1.02]"
                  : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/50"
              }`}
            >
              {ch.label}
            </button>
          ))}
        </div>

        {/* Core Presentation Content Container */}
        <div className="bg-slate-900 p-6 sm:p-10 rounded-3xl border border-slate-800/60 shadow-2xl relative overflow-hidden transition-all">
          <div className="absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500" />

          {/* CHAPTER 1: IDENTIFIKASI MASALAH & PAIN POINTS */}
          {activeChapter === 1 && (
            <div className="space-y-10 animate-fadeIn">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800/60">
                <div>
                  <span className="text-[10px] font-mono text-rose-400 font-bold bg-rose-950/40 px-3 py-1 rounded inline-block border border-rose-900/30 uppercase tracking-wide">
                    BAB 01 • RUMUSAN MASALAH
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white mt-3 font-sans">
                    Identifikasi Masalah & Titik Sakit (Pain Points)
                  </h3>
                </div>
                <div className="flex items-center gap-2 cursor-pointer text-slate-400 hover:text-white text-xs font-bold uppercase transition" onClick={() => setActiveChapter(2)}>
                  <span>Menuju Sektor Pasar</span> <ArrowRight className="h-4 w-4 text-blue-500" />
                </div>
              </div>

              {/* Grid 4 Pain Points */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {[
                  {
                    num: "01",
                    title: "Kemacetan Kronis Sektor Utama",
                    desc: "Sektor Panggung Utama dan Pusat Kuliner di Jl. Pemuda kerap lumpuh akibat penumpukan parkir liar di bahu jalan. Tidak adanya rambu digital pencarian slot memaksa pengemudi berhenti mendadak demi mencari ruang kosong.",
                  },
                  {
                    num: "02",
                    title: "Kebocoran Pendapatan Pemerintah Daerah (Retribusi)",
                    desc: "Pengelolaan retribusi karcis manual sangat rawan terhadap pungli (pungutan liar) dan sengketa nominal. Ketiadaan pencatatan telemetri memicu tingginya selisih antara kendaraan yang masuk asli dan setoran pendapatan kas daerah.",
                  },
                  {
                    num: "03",
                    title: "Inefisiensi Penjemputan Angkutan & Bentor Lokal",
                    desc: "Penumpang kesulitan mendeteksi posisi pasti pengemudi becak motor (bentor) atau ojek daring yang menjemput mereka. Ketidakteraturan ini menimbulkan sengketa komunikasi visual dan memicu konflik ruang kumpul.",
                  },
                  {
                    num: "04",
                    title: "Pemborosan Bahan Bakar & Polusi Udara",
                    desc: "Pengunjung menghabiskan rata-rata 12-15 menit sekadar berputar-putar dalam mode putar balik untuk mengamankan slot kosong di akhir pekan. Ini memperkeruh kesehatan ekologis dari pepohonan hijau asri Taman Kota.",
                  }
                ].map((p, i) => (
                  <div key={i} className="bg-slate-850/40 p-6 rounded-2xl border border-slate-850 flex items-start gap-4 hover:border-slate-700 hover:bg-slate-850/60 transition duration-300">
                    <div className="h-10 w-10 shrink-0 rounded-xl bg-rose-600/10 border border-rose-500/20 flex items-center justify-center font-mono font-black text-rose-400">
                      {p.num}
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-extrabold text-white">{p.title}</h4>
                      <p className="text-xs sm:text-sm text-slate-400 mt-2 font-normal leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Local Highlight Warning Banner */}
              <div className="bg-amber-955/20 border border-amber-900/40 p-5 rounded-2xl flex items-start gap-4">
                <ShieldAlert className="text-amber-500 h-6 w-6 shrink-0 mt-0.5 animate-pulse" />
                <div>
                  <h4 className="text-sm font-extrabold text-amber-300">Dilema Ruang Publik Taman Kota Sungailiat</h4>
                  <p className="text-xs text-slate-350 leading-relaxed font-normal mt-1">
                    Sebagai episentrum rekreasi perkotaan utama di Kabupaten Bangka, kepadatan lalin Taman Kota Sungailiat menyentuh indeks puncak setiap hari Jumat hingga Minggu pukul 16.00 - 21.00 WIB. Solusi penataan parkir taktis dan asisten penjemputan cerdas bukan lagi sekadar opsi kemewahan, tetapi kebutuhan mutlak yang mendesak.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* CHAPTER 2: SEGMENTASI PASAR */}
          {activeChapter === 2 && (
            <div className="space-y-10 animate-fadeIn">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800/60">
                <div>
                  <span className="text-[10px] font-mono text-blue-400 font-bold bg-blue-950/40 px-3 py-1 rounded inline-block border border-blue-900/30 uppercase tracking-wide">
                    BAB 02 • TARGET DEKSTRIPSI PASAR
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white mt-3 font-sans">
                    Segmentasi Pasar (Target Audience)
                  </h3>
                </div>
                <div className="flex items-center gap-2 cursor-pointer text-slate-400 hover:text-white text-xs font-bold uppercase transition" onClick={() => setActiveChapter(3)}>
                  <span>Beralih ke Kompetitor</span> <ArrowRight className="h-4 w-4 text-blue-500" />
                </div>
              </div>

              {/* Segmentation Grid representing Target Audiences */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
                {[
                  {
                    title: "Pengemudi Pribadi (Mobil & Motor)",
                    icon: MapPin,
                    color: "border-blue-500/30 bg-blue-500/5",
                    textIcon: "text-blue-400 bg-blue-950/50",
                    demograph: "Komuter lokal, wisatawan Pangkalpinang, dan keluarga rekreasi akhir pekan.",
                    needs: "Menemukan slot parkir kosong secara cepat tanpa berputar gila-gilaan, membayar lewat e-payment (QRIS), dan mendapatkan keamanan transaksi pemesanan."
                  },
                  {
                    title: "Mitra Angkutan Lokal (Bentor & Ojek)",
                    icon: Users,
                    color: "border-amber-500/30 bg-amber-500/5",
                    textIcon: "text-amber-400 bg-amber-950/50",
                    demograph: "Komunitas becak motor (bentor) tradisional dan pengemudi ojek wilayah Sungailiat.",
                    needs: "Sistem koordinasi titik kumpul (pickup slot) yang melarang desak-desakan, integrasi instan dengan panggilan penumpang, serta efisiensi transit."
                  },
                  {
                    title: "Instansi Otoritas & Pemda (Dishub)",
                    icon: Target,
                    color: "border-emerald-500/30 bg-emerald-500/5",
                    textIcon: "text-emerald-400 bg-emerald-950/50",
                    demograph: "Dinas Perhubungan dan Dinas Lingkungan Hidup Kab. Bangka.",
                    needs: "Dashboard analitika telemetri IoT terpercaya untuk pelacakan okupansi, pengawasan kepadatan lalin, serta transparansi pelaporan keuangan retribusi parkir digital bebas pungli."
                  },
                  {
                    title: "Pelaku UMKM Sektoral (Pusat Kuliner)",
                    icon: Coins,
                    color: "border-indigo-500/30 bg-indigo-500/5",
                    textIcon: "text-indigo-400 bg-indigo-950/50",
                    demograph: "Ratusan pedagang makanan khas Bangka, kopi, kerajinan di area kuliner.",
                    needs: "Pelanggan mendapatkan kenyamanan parkir mumpuni, meminimalisir pembatalan kunjungan warga akibat kapok dengan kemacetan di area panggung utama."
                  }
                ].map((seg, i) => {
                  const Icon = seg.icon;
                  return (
                    <div key={i} className={`p-6 rounded-2xl border ${seg.color} flex flex-col justify-between text-left space-y-4 hover:scale-[1.02] transition-transform duration-300`}>
                      <div className="space-y-3">
                        <div className={`p-2 w-10 h-10 rounded-xl flex items-center justify-center ${seg.textIcon}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <h4 className="text-sm sm:text-base font-extrabold text-white leading-snug">{seg.title}</h4>
                        <div className="space-y-2 pt-2 text-xs">
                          <p className="text-slate-350"><strong className="text-white">Demografi:</strong> {seg.demograph}</p>
                          <p className="text-slate-400"><strong className="text-white">Kebutuhan Utama:</strong> {seg.needs}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Informative visual summary of market alignment */}
              <div className="bg-slate-850 p-6 rounded-2xl border border-slate-800 text-xs sm:text-sm text-slate-300 font-normal leading-relaxed text-left flex items-start gap-4">
                <Info className="text-blue-500 h-5 w-5 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white mb-1">Pilar Kemitraan Ekosistem ParkEase</p>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    ParkEase mempertemukan kebutuhan keempat entitas ini ke dalam satu platform tunggal. Tidak seperti sistem parkir perkotaan konvensional yang mementingkan kendaraan mewah semata, kami menyediakan fungsionalitas hibrida yang menyeimbangkan aksesibilitas ekonomi lokal (bentor) dengan kenyamanan rekreasi modern keluarga urban.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* CHAPTER 3: ANALISIS KOMPETITOR */}
          {activeChapter === 3 && (
            <div className="space-y-10 animate-fadeIn">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800/60">
                <div>
                  <span className="text-[10px] font-mono text-amber-400 font-bold bg-amber-950/40 px-3 py-1 rounded inline-block border border-amber-900/30 uppercase tracking-wide">
                    BAB 03 • LANDSKAP PERSAINGAN
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white mt-3 font-sans">
                    Analisis Kompetitor (Lanskap Persaingan)
                  </h3>
                </div>
                <div className="flex items-center gap-2 cursor-pointer text-slate-400 hover:text-white text-xs font-bold uppercase transition" onClick={() => setActiveChapter(4)}>
                  <span>Lihat Ukuran Pasar</span> <ArrowRight className="h-4 w-4 text-blue-500" />
                </div>
              </div>

              {/* Interactive comparative analysis deck */}
              <div className="bg-slate-850/40 p-1 rounded-2xl border border-slate-850 overflow-x-auto text-left">
                <table className="w-full text-left text-xs text-slate-400 min-w-[700px]">
                  <thead className="bg-slate-900 text-slate-350 font-bold uppercase border-b border-slate-800 text-[10px] font-mono">
                    <tr>
                      <th className="px-6 py-4.5">Metrik Pembanding</th>
                      <th className="px-6 py-4.5">Parkir Manual Tradisional</th>
                      <th className="px-6 py-4.5">Sistem Komersil Tertutup (Mall)</th>
                      <th className="px-6 py-4.5 text-blue-400 font-bold bg-blue-950/30">PARKEASE SUNGAILIAT</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 bg-slate-900/30 text-slate-300 font-medium">
                    {[
                      {
                        metric: "Biaya Capex Perangkat Keras",
                        manual: "Sangat Rendah (Nihil)",
                        mall: "Sangat Tinggi (Ratusan Juta Rupiah untuk Barrier Lock)",
                        target: "Rendah-Modular (Sensor Berdaya Rendah & Gateway QR)"
                      },
                      {
                        metric: "Sistem Pemantauan Per Slot",
                        manual: "Tidak Ada (Hanya estimasi visual juru parkir)",
                        mall: "Hanya Gate Level (Tidak memantau spesifik slot aspal)",
                        target: "Sensor Telemetri IoT Real-Time Per Sektor"
                      },
                      {
                        metric: "Modul Koordinasi Penumpang-Bentor",
                        manual: "Kacau (Tengkar mulut & berebut area lobi)",
                        mall: "Diberlakukan Pemblokiran Bentor (Anti Transportasi Tradisional)",
                        target: "Disediakan Sektor Khusus & GPS Penjemputan Cerdas"
                      },
                      {
                        metric: "Integrasi Pelaporan Keuangan Pemda",
                        manual: "Rawan Pungli & Tidak Tercatat Resmi",
                        mall: "Sistem Eksternal Swasta (Dana parkir tidak langsung ke daerah)",
                        target: "SaaS Dashboard Dasarian Dinas Perhubungan Terbuka"
                      },
                      {
                        metric: "Kemudahan Akses Klien",
                        manual: "Tanpa Aplikasi (Harus bawa fisik tunai pas)",
                        mall: "Wajib Mengunduh App Berat / Kartu Isi Ulang",
                        target: "PWA Web App Instan (Akses cepat via QR Code rute)"
                      }
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-850/50 transition">
                        <td className="px-6 py-4 font-bold text-white text-xs sm:text-sm">{row.metric}</td>
                        <td className="px-6 py-4 text-xs font-normal text-slate-405">{row.manual}</td>
                        <td className="px-6 py-4 text-xs font-normal text-slate-405">{row.mall}</td>
                        <td className="px-6 py-4 text-xs font-black bg-blue-950/15 border-l border-r border-blue-950/30 text-blue-300">{row.target}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Edge of competetive advantage */}
              <div className="bg-gradient-to-r from-blue-950/30 via-slate-900 to-indigo-950/30 p-6 rounded-2xl border border-blue-900/30 flex items-start gap-4">
                <Flame className="text-amber-500 h-6 w-6 shrink-0 mt-0.5 animate-bounce-slow" />
                <div>
                  <h4 className="text-sm font-extrabold text-[#90cdf4]">Keunggulan Taktis: "Community-First & Low Barrier Sizing"</h4>
                  <p className="text-xs text-slate-350 leading-relaxed font-normal mt-1">
                    Kompetitor utama kami di area terbuka hanyalah budaya "juru parkir liar" yang merugikan pendapatan daerah dan kenyamanan warga. ParkEase hadir bukan untuk menyingkirkan juru parkir lokal, melainkan memperdayakan mereka sebagai <span className="text-emerald-400 font-bold underline">Penjaga Sektor Fisik (Operator Sandbox)</span> yang memicu sensor kedatangan via asisten seluler mereka, menciptakan sinergi kolaborasi sosial yang harmonis di kawasan Sungailiat.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* CHAPTER 4: UKURAN PASAR (MARKET SIZING) */}
          {activeChapter === 4 && (
            <div className="space-y-10 animate-fadeIn">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800/60">
                <div>
                  <span className="text-[10px] font-mono text-indigo-400 font-bold bg-indigo-950/40 px-3 py-1 rounded inline-block border border-indigo-900/30 uppercase tracking-wide">
                    BAB 04 • EVALUASI UKURAN PASAR
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white mt-3 font-sans">
                    Ukuran Pasar (Market Sizing)
                  </h3>
                </div>
                <div className="flex items-center gap-2 cursor-pointer text-slate-400 hover:text-white text-xs font-bold uppercase transition" onClick={() => setActiveChapter(5)}>
                  <span>Uji Validasi Tren</span> <ArrowRight className="h-4 w-4 text-blue-500" />
                </div>
              </div>

              {/* Classical Pyramidal View of TAM, SAM, SOM in custom visual cards */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
                
                {/* TAM */}
                <div className="bg-slate-850/40 p-6 rounded-2xl border border-slate-850 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-mono uppercase bg-slate-800 text-slate-300 font-black px-2 py-0.5 rounded border border-slate-700">
                      ESTIMASI MAKSIMUM (TAM)
                    </span>
                    <Coins className="text-slate-400 h-4.5 w-4.5" />
                  </div>
                  <h4 className="text-lg font-extrabold text-white">Total Addressable Market</h4>
                  <p className="text-2xl font-black font-mono text-slate-300">Rp 1.5M / Thn</p>
                  <p className="text-xs text-slate-400 leading-relaxed font-normal">
                    Meliputi seluruh infrastruktur pariwisata rekreasi ruang terbuka, taman kota, pasar rakyat dan alun-alun di seluruh Provinsi Kepulauan Bangka Belitung (~50 lokasi teridentifikasi).
                  </p>
                </div>

                {/* SAM */}
                <div className="bg-slate-850/40 p-6 rounded-2xl border border-slate-850 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-mono uppercase bg-slate-800 text-blue-400 font-black px-2 py-0.5 rounded border border-blue-900/30">
                      FAKTOR KABUPATEN (SAM)
                    </span>
                    <BarChart3 className="text-blue-400 h-4.5 w-4.5" />
                  </div>
                  <h4 className="text-lg font-extrabold text-white">Serviceable Addressable Market</h4>
                  <p className="text-2xl font-black font-mono text-blue-400">Rp 480Jt / Thn</p>
                  <p className="text-xs text-slate-400 leading-relaxed font-normal">
                    Fokus pada kawasan pariwisata, rekreasi kuliner, dan pusat kumpul komersial publik yang terkelola resmi di bawah Kabupaten Bangka (Taman Kota, Hutan Kota, dan Alun-Alun Sungailiat).
                  </p>
                </div>

                {/* SOM */}
                <div className="bg-blue-950/15 border border-blue-900/60 p-6 rounded-2xl space-y-4 shadow-lg shadow-blue-950/30">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-mono uppercase bg-blue-600 text-white font-black px-2.5 py-0.5 rounded shadow-sm">
                      AMBANG PILOT (SOM)
                    </span>
                    <Sparkles className="text-amber-400 h-4.5 w-4.5 animate-pulse" />
                  </div>
                  <h4 className="text-lg font-extrabold text-white">Serviceable Obtainable Market</h4>
                  <p className="text-2xl font-black font-mono text-amber-400">Rp {somAnnualRevenue.toLocaleString("id-ID")} / Thn</p>
                  <p className="text-xs text-slate-350 leading-relaxed font-normal">
                    Proyeksi optimasi operasional primer di 4 Sektor Utama Taman Kota Sungailiat dengan asimilasi penuh 92 slot parkir pintar (berdasarkan konfigurasi kalkulatif di bawah ini).
                  </p>
                </div>

              </div>

              {/* HIGHLIGHT CRAFTSMANSHIP: INTERACTIVE SOM ESTIMATOR CALCULATOR */}
              <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-6 space-y-6">
                <div className="flex items-center gap-2.5 font-bold text-sm text-white border-b border-slate-800 pb-3">
                  <Calculator className="text-blue-500 h-5 w-5 animate-pulse" />
                  <span>Interactive SOM Yield Estimator (Simulasi Pendapatan Retribusi Instan)</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-left">
                  {/* Control 1: Rate */}
                  <div className="space-y-2.5">
                    <div className="flex justify-between font-mono font-bold">
                      <span className="text-slate-450 uppercase text-[10px]">1. Tarif Parkir Rata-Rata</span>
                      <span className="text-blue-400 font-extrabold text-xs">Rp {hourlyRate.toLocaleString("id-ID")} / Jam</span>
                    </div>
                    <input 
                      type="range"
                      min={1000}
                      max={8000}
                      step={500}
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(parseInt(e.target.value))}
                      className="w-full accent-blue-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                      <span>Rp 1.000</span>
                      <span>Rp 8.000</span>
                    </div>
                  </div>

                  {/* Control 2: Daily Hours occupied */}
                  <div className="space-y-2.5">
                    <div className="flex justify-between font-mono font-bold">
                      <span className="text-slate-450 uppercase text-[10px]">2. Waktu Okupansi Terisi</span>
                      <span className="text-indigo-400 font-extrabold text-xs">{dailyOccupancyHours} Jam / Hari</span>
                    </div>
                    <input 
                      type="range"
                      min={2}
                      max={12}
                      step={1}
                      value={dailyOccupancyHours}
                      onChange={(e) => setDailyOccupancyHours(parseInt(e.target.value))}
                      className="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                      <span>2 Jam/hari</span>
                      <span>12 Jam/hari</span>
                    </div>
                  </div>

                  {/* Control 3: Slot Coverage */}
                  <div className="space-y-2.5">
                    <div className="flex justify-between font-mono font-bold">
                      <span className="text-slate-450 uppercase text-[10px]">3. Total Slot Terpasang</span>
                      <span className="text-emerald-400 font-extrabold text-xs">{activeCoverageSlots} Slot IoT</span>
                    </div>
                    <input 
                      type="range"
                      min={10}
                      max={200}
                      step={10}
                      value={activeCoverageSlots}
                      onChange={(e) => setActiveCoverageSlots(parseInt(e.target.value))}
                      className="w-full accent-emerald-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                      <span>10 Slot</span>
                      <span>200 Slot</span>
                    </div>
                  </div>
                </div>

                {/* Calculation outcomes card box */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 bg-slate-850 p-4 rounded-xl border border-slate-800">
                  <div className="text-left font-mono">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold tracking-wide">ESTIMASI RETRIBUSI HARIAN (SOM)</span>
                    <span className="text-lg sm:text-xl font-black text-slate-200">Rp {somDailyRevenue.toLocaleString("id-ID")}</span>
                  </div>
                  <div className="text-left sm:text-right font-mono">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold tracking-wide">PROYEKSI AKUMULASI TAHUNAN</span>
                    <span className="text-xl sm:text-2xl font-black text-emerald-400">Rp {somAnnualRevenue.toLocaleString("id-ID")}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CHAPTER 5: TREN & VALIDASI EKSTERNAL */}
          {activeChapter === 5 && (
            <div className="space-y-10 animate-fadeIn">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800/60">
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/40 px-3 py-1 rounded inline-block border border-emerald-900/30 uppercase tracking-wide">
                    BAB 05 • VALIDASI EKSTERNAL
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white mt-3 font-sans">
                    Tren & Validasi Eksternal (Opsional)
                  </h3>
                </div>
                <div className="flex items-center gap-2 cursor-pointer text-slate-405 hover:text-white text-xs font-bold uppercase transition" onClick={() => setActiveChapter(1)}>
                  <span>Kembali ke Rumusan Masalah</span> <ArrowRight className="h-4 w-4 text-blue-500" />
                </div>
              </div>

              {/* Horizontal line with points showing external trends */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 text-left">
                {[
                  {
                    title: "Program Smart City Kabupaten Bangka",
                    desc: "Pemerintah Daerah Kabupaten Bangka memiliki target utama untuk melakukan interaksi layanan publik digital melalui Rencana Strategis TIK 2024-2029. Inisiatif parkir pintar ini sangat kompatibel dengan visi peningkatan indeks SPBE (Sistem Pemerintahan Berbasis Elektronik) lokal.",
                    badge: "Visi Pemerintah"
                  },
                  {
                    title: "Revitalisasi Fisik Taman Kota Sungailiat",
                    desc: "Renovasi terstruktur oleh Dinas Lingkungan Hidup yang mendirikan playground anyar, gerbang ikonik, dan area rekreasi keluarga menarik lonjakan pengunjung mingguan hingga 250% di sore hari. Kenaikan drastis ini memperbesar frekuensi arus parkir secara dramatis.",
                    badge: "Revitalisasi Lapangan"
                  },
                  {
                    title: "Gerakan Nasional Non Tunai (QRIS Bangka)",
                    desc: "Berdasarkan data Bank Indonesia Perwakilan Kepulauan Bangka Belitung, transaksi pengguna QRIS di area Bangka bertumbuh masif mencapai 120% yoy. Pola perilaku komuter yang sudah melek finansial digital memudahkan pengenalan sistem retribusi cashless parkir.",
                    badge: "Tren Transaksi Cashless"
                  }
                ].map((trend, i) => (
                  <div key={i} className="bg-slate-850/40 p-6 rounded-2xl border border-slate-850 flex flex-col justify-between hover:border-slate-750 hover:bg-slate-855 transition duration-300 space-y-4">
                    <div className="space-y-2">
                      <span className="text-[9px] font-mono font-bold bg-emerald-950/50 border border-emerald-900/40 text-emerald-300 px-2 py-0.5 rounded uppercase tracking-wide inline-block">
                        {trend.badge}
                      </span>
                      <h4 className="text-base font-extrabold text-white leading-tight">{trend.title}</h4>
                      <p className="text-xs sm:text-sm text-slate-400 font-normal leading-relaxed">{trend.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quote validity section */}
              <div className="p-6 bg-slate-850 rounded-2xl border border-slate-800 text-xs sm:text-sm text-slate-300 font-normal italic relative overflow-hidden flex items-star gap-3">
                <div className="text-4xl text-blue-600 font-serif leading-none shrink-0 font-black">“</div>
                <div>
                  <p className="text-slate-400 leading-relaxed">
                    Digitalisasi infrastruktur parkir ruang terbuka publik bukan hanya sekadar merapikan kendaraan; ini adalah langkah awal mengoleksi telemetri penting lalu lintas kota yang memungkinkan kami merancang keputusan tata ruang yang lebih visioner, ramah anak, dan menguntungkan usaha mikro Sungailiat.
                  </p>
                  <span className="text-[10px] text-blue-400 font-mono font-bold block uppercase tracking-wider not-italic mt-3 border-t border-slate-800 pt-2">
                    — Buku Pedoman Kota Pintar Indonesia, Kementerian PPN/Bappenas (Adaptasi Sektoral Sungailiat)
                  </span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Quick Call to action underneath */}
        <div className="mt-10 p-5 bg-slate-900/30 rounded-2xl border border-slate-850 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-xs sm:text-sm text-slate-400 font-medium">
            Ingin melihat implementasi nyata atau melakukan simulasi sensor retribusi?
          </p>
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById("auth-card");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="py-2 px-5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-md shadow-blue-950/30"
          >
            Masuk ke Platform Simulasi
          </a>
        </div>

      </div>
    </section>
  );
}
