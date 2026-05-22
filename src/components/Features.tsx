import { 
  BarChart3, 
  MapPin, 
  Compass, 
  BookmarkCheck, 
  Radio, 
  Bell, 
  CreditCard, 
  Eye, 
  Zap 
} from "lucide-react";

export default function Features() {
  const parkFeatures = [
    {
      icon: Radio,
      title: "Dasbor Ketersediaan Real-Time",
      description: "Periksa kapasitas parkir secara instan yang diperbarui secara dinamis oleh sensor geomagnetik pintar dan kamera optik.",
      badge: "Sinkronisasi IoT",
      colorClass: "from-blue-500 to-cyan-500"
    },
    {
      icon: Compass,
      title: "Navigasi Slot Pintar",
      description: "Menghasilkan rute dalam ruangan digital yang optimal untuk memandu pengemudi langsung dari jalan luar ke tempat parkir yang dipesan.",
      badge: "Navigasi Belokan",
      colorClass: "from-indigo-500 to-purple-500"
    },
    {
      icon: MapPin,
      title: "Integrasi Peta Lokasi",
      description: "Menggabungkan area kota percontohan, pusat perbelanjaan swasta, dan terminal bandara dalam satu kanvas peta vektor interaktif.",
      badge: "Mesin OpenStreetMap",
      colorClass: "from-sky-500 to-blue-500"
    },
    {
      icon: BookmarkCheck,
      title: "Sistem Reservasi Instan",
      description: "Alokasikan dan klaim tempat parkir pribadi dengan sistem kunci pelat nomor khusus yang akan terbuka setelah pemindaian kode berhasil.",
      badge: "Batas waktu hingga 3 jam",
      colorClass: "from-emerald-500 to-teal-500"
    },
    {
      icon: Eye,
      title: "Pemantauan Masuk & Keluar Kendaraan",
      description: "Mencatat stempel waktu masuk dan keluar secara langsung, mendukung pemindaian pelat nomor presisi tinggi tanpa tiket kertas manual.",
      badge: "Bertenaga AI ANPR",
      colorClass: "from-purple-500 to-pink-500"
    },
    {
      icon: Bell,
      title: "Notifikasi Siaran Dalam Aplikasi",
      description: "Dapatkan peringatan saat slot kosong, hitung mundur masa berlaku pesanan, dan siaran perubahan tarif dinamis pada jam sibuk.",
      badge: "Push & Slack",
      colorClass: "from-amber-500 to-orange-500"
    },
    {
      icon: BarChart3,
      title: "Analisis Penggunaan Parkir",
      description: "Dapatkan wawasan berharga tentang puncak durasi parkir tiap jam, pola pendapatan, tren regional, dan faktor okupansi khusus.",
      badge: "Kecerdasan Operator",
      colorClass: "from-blue-600 to-indigo-600"
    },
    {
      icon: CreditCard,
      title: "Integrasi Pembayaran Digital",
      description: "Menyediakan pembayaran nontunai yang mulus melalui dompet virtual, QRIS multi-bank standar, atau profil bisnis yang tersimpan.",
      badge: "Pembayaran Tanpa Hambatan",
      colorClass: "from-teal-500 to-cyan-500"
    }
  ];

  return (
    <section className="bg-white py-20 px-4 border-t border-b border-slate-200 relative overflow-hidden">
      {/* Background flare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-blue-100 mb-4 font-sans">
            <Zap className="h-3.5 w-3.5 text-blue-600" /> Kemampuan Utama
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Mentransformasi Ekosistem Parkir Pintar
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            Solusi SaaS modular kami mengatasi hambatan kemacetan manual dengan memberikan kendali penuh kembali ke tangan operator dan pengemudi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {parkFeatures.map((f, i) => {
            const Icon = f.icon;
            return (
              <div 
                key={i} 
                className="group relative bg-slate-50 rounded-2xl p-6 border border-slate-200/90 hover:border-blue-400 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Icon with light blue rounded box */}
                  <div className="p-3 w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 shadow-sm border border-blue-100">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                    {f.title}
                  </h3>
                  
                  <p className="mt-2.5 text-sm text-slate-600 leading-relaxed font-normal">
                    {f.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-200/60">
                  <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">
                    MODUL 0{i + 1}
                  </span>
                  <span className="text-[11px] font-mono text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                    {f.badge}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
