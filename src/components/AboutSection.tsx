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
    { title: "Wasted Searching Time", desc: "Drivers spend an average of 15-20 minutes circling blocks to find spaces, increasing city congestion." },
    { title: "No Real-Time Visibility", desc: "Static entrance signs reflect historical occupancy rates, not actual vacancy at individual slots." },
    { title: "Manual Gate Procedures", desc: "Operators rely on legacy paper stubs or cards, resulting in lengthy terminal queue delays." },
    { title: "Zero Analytical Feedback", desc: "Municipal and private operators cannot view hourly peak patterns or set pricing based on parking density." }
  ];

  const targetMarkets = [
    { name: "Malls & Shopping Plazas", icon: Building2, desc: "Increase visitor satisfaction and reduce structural entrance blockages." },
    { name: "Premium Commercial Towers", icon: Globe2, desc: "Pre-allocate regular VIP executive spots and visitor clusters seamlessly." },
    { name: "Transit Hubs (Airports & Trains)", icon: Map, desc: "High-volume monitoring with direct flight schedule synchronization." },
    { name: "Educational Campuses", icon: Layers, desc: "Provide students during high-traffic class rotations clear, vacant lot options." }
  ];

  const techStack = [
    { component: "Frontend Portal", tech: "React.js / Tailwind CSS", desc: "Fully responsive, sub-second loaded driver navigation paths." },
    { component: "Backend Microservices", tech: "Node.js / Express.js", desc: "Event-based telemetry server processing sensor payloads." },
    { component: "SaaS Cloud DB", tech: "PostgreSQL Engine", desc: "Relational slot tracking with transaction safety for reservations." },
    { component: "Hosting Infrastructure", tech: "Google Cloud Run / AWS", desc: "High-availability geo-distributed container virtualization with cold-start optimization." },
    { component: "Sensor Integrations", tech: "MQTT / REST Protocols", desc: "Direct hardware gateway links transmitting geomagnetic status updates." }
  ];

  return (
    <section className="bg-white py-20 px-4 border-t border-slate-250" id="about">
      <div className="max-w-7xl mx-auto">
        
        {/* Navigation Section Sub-Header Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-slate-200">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-sans">
              Park<span className="text-blue-600">Ease</span> Enterprise Pitch
            </h2>
            <p className="mt-2 text-slate-500 font-normal text-sm sm:text-base max-w-xl">
              Understand our business framework, target demographics, software architecture design, and customizable subscription modules.
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
                {tab === "Market" ? "Market & Problems" : tab === "TechStack" ? "Architecture Flow" : "SaaS Pricing"}
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
                  <BadgeAlert className="h-4 w-4 text-[#e53e3e]" /> Market Core Problem
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 leading-snug">
                  The Friction of Traditional Municipal Parking
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Millions of hours and tons of carbon emissions are wasted everyday by commuters searching for empty parking spaces in urban environments. The absence of interconnected digital mapping prevents efficient slot management.
                </p>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3">
                  <TrendingUp className="text-blue-600 h-6 w-6 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-655">
                    <span className="font-bold text-slate-800">Smart City Growth:</span> Systems integrating real-time availability can reduce traffic bottlenecks by up to 30%, speeding up economic activity in downtown areas.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {problems.map((prob, i) => (
                  <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-slate-300 hover:bg-white hover:shadow-md transition-all">
                    <div>
                      <div className="h-8 w-8 rounded-lg bg-red-50 text-red-651 border border-red-200 flex items-center justify-center font-bold mb-4 font-mono text-lg">
                        !
                      </div>
                      <h4 className="text-base font-bold text-slate-800">{prob.title}</h4>
                      <p className="text-xs text-slate-550 mt-2 font-normal leading-relaxed">{prob.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Target Markets */}
            <div className="pt-8 border-t border-slate-200">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <h4 className="text-xl font-bold text-slate-900">Our Core Business Targets</h4>
                <p className="text-sm text-slate-500 mt-2">ParkEase scales effortlessly to serve commercial real estate and public sectors alike.</p>
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
                  SYSTEM TELEMETRY DATAPATH
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-3">From Asphalt to Screen</h3>
              </div>

              {/* Vector flow chart */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-2 items-center text-center">
                
                {/* Node 1 */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-sm animate-fadeIn">
                  <div className="bg-blue-50 text-blue-700 border border-blue-100 h-10 w-10 mx-auto rounded-full flex items-center justify-center font-bold text-xs mb-3">
                    01
                  </div>
                  <h5 className="text-sm font-bold text-slate-800 uppercase tracking-wide">IoT Sensors</h5>
                  <p className="text-[11px] text-slate-550 mt-1.5 font-normal">Geomagnetic pavement nodes register vehicle arrival.</p>
                </div>

                <div className="hidden md:block text-slate-300 text-lg">➔</div>

                {/* Node 2 */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="bg-blue-50 text-blue-700 border border-blue-100 h-10 w-10 mx-auto rounded-full flex items-center justify-center font-bold text-xs mb-3">
                    02
                  </div>
                  <h5 className="text-sm font-bold text-slate-800 uppercase tracking-wide">REST/MQTT Api</h5>
                  <p className="text-[11px] text-slate-555 mt-1.5 font-normal">Gateway aggregates and signs device identifiers.</p>
                </div>

                <div className="hidden md:block text-slate-600 text-lg">➔</div>

                {/* Node 3 */}
                <div className="bg-blue-50 border-2 border-blue-400 p-5 rounded-2xl shadow-md shadow-blue-50 flex flex-col justify-center">
                  <div className="bg-blue-600 p-2.5 h-10 w-10 mx-auto rounded-full flex items-center justify-center text-white font-bold text-sm mb-3 shadow-md shadow-blue-100">
                    ✔
                  </div>
                  <h5 className="text-sm font-bold text-blue-700 uppercase tracking-wide">ParkEase Cloud</h5>
                  <p className="text-[11px] text-slate-705 mt-1.5 font-semibold">Node.js server saves slot state to secure database index.</p>
                </div>

                <div className="hidden md:block text-slate-300 text-lg">➔</div>

                {/* Node 4 */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-sm animate-fadeIn">
                  <div className="bg-blue-50 text-blue-700 border border-blue-100 h-10 w-10 mx-auto rounded-full flex items-center justify-center font-bold text-xs mb-3">
                    03
                  </div>
                  <h5 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Frontend Web</h5>
                  <p className="text-[11px] text-slate-500 mt-1.5 font-normal">React clients decode available slots map layers instantly.</p>
                </div>

                <div className="hidden md:block text-slate-300 text-lg">➔</div>

                {/* Node 5 */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-sm animate-fadeIn">
                  <div className="bg-blue-50 text-blue-700 border border-blue-100 h-10 w-10 mx-auto rounded-full flex items-center justify-center font-bold text-xs mb-3">
                    04
                  </div>
                  <h5 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Driver / host</h5>
                  <p className="text-[11px] text-slate-500 mt-1.5 font-normal">Commit reservation details and navigate directly.</p>
                </div>

              </div>
            </div>

            {/* Structured Tech grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch pt-4">
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <Layers className="text-blue-600 h-5 w-5" /> Architectural Tech Stack Details
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  A modern, reliable ecosystem utilizing industry standard elements to promise extremely high uptime, data persistence, and secure client endpoints.
                </p>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-850 text-[11px] font-mono leading-relaxed text-slate-300">
                  <span className="text-blue-400 font-bold">// API ENDPOINT PAYLOAD:</span><br/>
                  <span className="text-slate-400">POST /api/v2/telemetry/puck-status</span><br/>
                  <span className="text-emerald-400">{"{ \"nodeId\": \"P-03\", \"areaId\": \"scbd\", \"occupied\": true, \"plate\": \"B 888 TS\" }"}</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-600">
                    <thead className="bg-slate-50 text-slate-500 font-bold text-[10px] uppercase border-b border-slate-250">
                      <tr>
                        <th className="px-5 py-4">SaaS Tier Layer</th>
                        <th className="px-5 py-4">Technology Selection</th>
                        <th className="px-5 py-4 text-right">Function</th>
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
                      POPULAR IT SOLUTIONS
                    </span>
                  )}
                  
                  <div>
                    <h4 className="text-xl font-bold text-slate-900">{tier.name}</h4>
                    <p className="text-xs text-slate-500 mt-2 font-normal leading-relaxed">{tier.description}</p>
                    
                    <div className="mt-6 pb-6 border-b border-slate-200">
                      <span className="text-3xl font-extrabold text-slate-900">{tier.priceMonthly}</span>
                      {tier.priceMonthly !== "Custom Pricing" && <span className="text-xs text-slate-400"> / month</span>}
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
                        : "bg-white hover:bg-slate-100 text-slate-850 hover:text-slate-950 border border-slate-250 shadow-sm"
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
