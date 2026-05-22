import { Compass, Mail, Globe, Github, Info, FileText, Landmark } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 py-12 px-4 border-t border-slate-900 text-xs sm:text-sm font-sans relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 p-1.5 rounded-lg text-white">
              <Compass className="h-5 w-5" />
            </div>
            <span className="text-base font-extrabold text-white tracking-tight">
              Park<span className="text-blue-500">Ease</span>
            </span>
          </div>
          <p className="text-xs text-slate-500 font-light leading-relaxed">
            Perangkat Lunak sebagai Layanan (SaaS) terkemuka yang menghubungkan infrastruktur geomagnetik dan jaringan computer vision untuk rute kota yang lebih pintar.
          </p>
          <div className="text-[10px] uppercase font-mono text-slate-600">
            Skor waktu aktif sistem: <span className="text-emerald-500 font-bold">99.98%</span>
          </div>
        </div>

        {/* Market Coverage */}
        <div className="space-y-3 col-span-1">
          <h5 className="font-bold text-slate-200 uppercase tracking-widest text-xs font-mono">Cakupan Pasar</h5>
          <ul className="space-y-2 text-xs font-light">
            <li className="hover:text-white transition-colors">Wilayah Metropolitan Jakarta</li>
            <li className="hover:text-white transition-colors">Subway Pintar Surabaya</li>
            <li className="hover:text-white transition-colors">Taman Digital Bandung</li>
            <li className="hover:text-white transition-colors">Terminal Soekarno-Hatta</li>
          </ul>
        </div>

        {/* Technical Specs */}
        <div className="space-y-3 col-span-1">
          <h5 className="font-bold text-slate-200 uppercase tracking-widest text-xs font-mono">Spesifikasi Arsitektur</h5>
          <ul className="space-y-2 text-xs font-light font-mono text-slate-500">
            <li>• UI Klien React 19</li>
            <li>• Gaya Desain Tailwind v4</li>
            <li>• Konteks Sinkronisasi LocalStorage</li>
            <li>• Simpul Analitik Recharts</li>
          </ul>
        </div>

        {/* Legal & Security */}
        <div className="space-y-4">
          <h5 className="font-bold text-slate-200 uppercase tracking-widest text-xs font-mono">Hukum & Keamanan</h5>
          <p className="text-xs text-slate-500 font-light leading-relaxed">
            Sistem ParkEase sepenuhnya mematuhi PCI-DSS dan mematuhi peraturan privasi data regional standar (UU PDP 2022).
          </p>
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-white transition-colors" title="Hubungi Arsitek Teknis">
              <Mail className="h-4.5 w-4.5" />
            </a>
            <a href="#" className="hover:text-white transition-colors" title="Peta Simpul Cakupan Global">
              <Globe className="h-4.5 w-4.5" />
            </a>
            <a href="#" className="hover:text-white transition-colors" title="Dokumen Standar Privasi">
              <FileText className="h-4.5 w-4.5" />
            </a>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-slate-900/60 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-600 gap-3 font-mono">
        <p>© {currentYear} ParkEase Inc. Hak cipta dilindungi undang-undang. Dibangun sebagai SaaS Kota Pintar.</p>
        <p>Epoch Server Saat Ini: 2026-05-22 UTC</p>
      </div>
    </footer>
  );
}
