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
            Leading Software as a Service (SaaS) connecting geomagnetic infrastructure and computer vision networks for smarter municipal routing.
          </p>
          <div className="text-[10px] uppercase font-mono text-slate-600">
            System uptime Score: <span className="text-emerald-500 font-bold">99.98%</span>
          </div>
        </div>

        {/* Market Coverage */}
        <div className="space-y-3 col-span-1">
          <h5 className="font-bold text-slate-200 uppercase tracking-widest text-xs font-mono">Market Coverage</h5>
          <ul className="space-y-2 text-xs font-light">
            <li className="hover:text-white transition-colors">Jakarta Metropolitant Area</li>
            <li className="hover:text-white transition-colors">Surabaya Smart Subways</li>
            <li className="hover:text-white transition-colors">Bandung Digital Parks</li>
            <li className="hover:text-white transition-colors">Soekarno-Hatta Terminals</li>
          </ul>
        </div>

        {/* Technical Specs */}
        <div className="space-y-3 col-span-1">
          <h5 className="font-bold text-slate-200 uppercase tracking-widest text-xs font-mono">Specification Architecture</h5>
          <ul className="space-y-2 text-xs font-light font-mono text-slate-500">
            <li>• React 19 Client UI</li>
            <li>• Tailwind v4 Styling</li>
            <li>• LocalStorage Synced Context</li>
            <li>• Recharts Analytical Nodes</li>
          </ul>
        </div>

        {/* Legal & Security */}
        <div className="space-y-4">
          <h5 className="font-bold text-slate-200 uppercase tracking-widest text-xs font-mono">Legal & Security</h5>
          <p className="text-xs text-slate-500 font-light leading-relaxed">
            ParkEase systems are fully PCI-DSS compliant and conform to standard regional data privacy regulations (UU PDP 2022).
          </p>
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-white transition-colors" title="Contact Technical Architechts">
              <Mail className="h-4.5 w-4.5" />
            </a>
            <a href="#" className="hover:text-white transition-colors" title="Global Coverage Node Map">
              <Globe className="h-4.5 w-4.5" />
            </a>
            <a href="#" className="hover:text-white transition-colors" title="Privacy Standard Document">
              <FileText className="h-4.5 w-4.5" />
            </a>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-slate-900/60 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-600 gap-3 font-mono">
        <p>© {currentYear} ParkEase Inc. All rights reserved. Built as a Smart City SaaS.</p>
        <p>Current Server Epoch: 2026-05-22 UTC</p>
      </div>
    </footer>
  );
}
