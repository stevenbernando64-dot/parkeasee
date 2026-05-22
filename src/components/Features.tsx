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
      title: "Real-Time Availability Dashboard",
      description: "Instantly check parking capacity dynamically updated by smart geomagnetic sensors and optical cameras.",
      badge: "IoT Live Sync",
      colorClass: "from-blue-500 to-cyan-500"
    },
    {
      icon: Compass,
      title: "Smart Slot Navigation",
      description: "Generates optimal digital indoor paths leading drivers directly from street access directly to their reserved space.",
      badge: "Turn-by-Turn",
      colorClass: "from-indigo-500 to-purple-500"
    },
    {
      icon: MapPin,
      title: "Location Map Integration",
      description: "Aggregates federated municipal spaces, private malls, and airport terminals on an interactive vector map canvas.",
      badge: "OpenStreetMap Engine",
      colorClass: "from-sky-500 to-blue-500"
    },
    {
      icon: BookmarkCheck,
      title: "Instant Reservation System",
      description: "Allocate and pre-claim private parking with custom plate-locking buffers that release on successful code scans.",
      badge: "Up to 3 hours buffer",
      colorClass: "from-emerald-500 to-teal-500"
    },
    {
      icon: Eye,
      title: "Vehicle Entry & Exit Monitoring",
      description: "Keeps live timestamps of ingress and egress, supporting high-fidelity license plate scanning without manual ticket stubs.",
      badge: "AI ANPR Powered",
      colorClass: "from-purple-500 to-pink-500"
    },
    {
      icon: Bell,
      title: "In-App Broadcast Notifications",
      description: "Get alerts on slot clearance, expiration countdown timer alerts, and dynamic peak-hour rate change broadcasts.",
      badge: "Push & Slack",
      colorClass: "from-amber-500 to-orange-500"
    },
    {
      icon: BarChart3,
      title: "Parking Usage Analytics",
      description: "Unlock actionable insights on hourly dwell peaks, revenue patterns, regional trends, and custom occupancy factors.",
      badge: "Operator Intelligence",
      colorClass: "from-blue-600 to-indigo-600"
    },
    {
      icon: CreditCard,
      title: "Digital Payment Integrations",
      description: "Provides seamless cashless clearance through virtual wallets, standard multi-bank QRIS, or saved business profiles.",
      badge: "Frictionless Checkout",
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
            <Zap className="h-3.5 w-3.5 text-blue-600" /> Core Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Transforming Smart Parking Ecosystems
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            Our modular SaaS solution solves manual congestion blockages by putting complete control back into operators' and drivers' hands.
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
                    MODULE 0{i + 1}
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
