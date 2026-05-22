import { useState } from "react";
import { GALLERY_ITEMS } from "../data/mockData";
import { Camera, ShieldCheck, Heart, ArrowUpRight, Cpu, Eye, Radio, CreditCard, Sparkles } from "lucide-react";

export default function GallerySection() {
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [activeSandboxNode, setActiveSandboxNode] = useState<number>(0);

  const tags = ["All", "Sensor Feedback", "Computer Vision", "Predictive AI", "Mobile Routing"];

  const filteredItems = selectedTag === "All" 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.tag === selectedTag);

  // Dynamic schematic hardware diagrams
  const sandboxNodes = [
    {
      type: "Geomagnetic Ground Node (GE-110)",
      purpose: "Battery-powered surface magnetometers that register exact car presence above each slot and transmit state in sub-gigahertz bands.",
      lifespan: "10 Years Battery Life",
      frequency: "868 / 915 MHz RF",
      status: "Active (Telemetry Loop)",
      accuracy: "> 99.8%"
    },
    {
      type: "ANPR Dual-Spectrum CCTV Lens",
      purpose: "Deep-learning on-edge camera that digitizes registration plate digits under low-luminescence and coordinates gateway relays.",
      lifespan: "PoE Connected 24V",
      frequency: "Focal Length 4.7-103mm",
      status: "Analyzing Gate Stream",
      accuracy: "99.2% Night Accuracy"
    },
    {
      type: "LED Portal Matrix Signage",
      purpose: "High-contrast structural indicator that lights up in neon green/red arrows immediately past the lane divider gates.",
      lifespan: "RS485 Bus Interface",
      frequency: "5000 nits Outdoors",
      status: "Syncing Slot Matrix",
      accuracy: "12 Channels Direct Mapping"
    }
  ];

  return (
    <section className="bg-slate-50 py-20 px-4 relative overflow-hidden" id="gallery">
      {/* Background radial dots and subtle blue glow */}
      <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "radial-gradient(#1e40af 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto z-10 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 bg-blue-5 text-blue-700 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-blue-100 mb-4 font-sans">
            <Camera className="h-3.5 w-3.5 text-blue-600" /> High-Resolution Showcase
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            ParkEase System Feature Gallery
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            A visual overview of the smart cities hardware and cloud interface layers powering our SaaS environment.
          </p>

          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {tags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
                  selectedTag === tag
                    ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-100"
                    : "bg-white border-slate-200 text-slate-500 hover:text-slate-800 hover:border-slate-300"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden group hover:border-blue-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between shadow-sm"
            >
              <div className="relative overflow-hidden h-64 sm:h-72 bg-slate-100">
                <img 
                  src={item.imageSrc} 
                  alt={item.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-slate-900/95 text-white text-xs font-mono font-bold px-3 py-1 rounded-full shadow-sm">
                  {item.tag}
                </span>
                {/* Visual lens glare */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent pointer-events-none" />
              </div>
              
              <div className="p-6 sm:p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-2.5 flex items-center justify-between group-hover:text-blue-600 transition-colors">
                  <span>{item.title}</span>
                  <ArrowUpRight className="h-5 w-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                </h3>
                <p className="text-slate-650 text-sm leading-relaxed font-normal">
                  {item.description}
                </p>
                <div className="mt-6 flex items-center gap-4 text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1.5 font-bold text-blue-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
                    Operational Trace
                  </span>
                  <span>•</span>
                  <span>Updated Recently</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Sandbox Technical Hardware Explainer */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-12 border border-slate-200 shadow-md relative">
          <div className="absolute top-0 right-0 p-4 sm:p-8 font-mono text-[10px] text-slate-400 hidden md:block">
            HARDWARE SPECIFICATION SCHEMA // v0.98B
          </div>
          
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-[10px] font-sans font-bold tracking-wide px-3 py-1.5 rounded-lg border border-blue-100 mb-4 uppercase">
              <Cpu className="h-3.5 w-3.5 text-blue-600" /> Hardware Integration Sandbox
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Physical IoT Devices & Sensors
            </h3>
            <p className="mt-3 text-slate-600 text-sm sm:text-base">
              Explore how ParkEase integrates with physical edge devices to feed real-time analytics to the cloud database.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-10">
            {/* Left Nav Nodes */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              {sandboxNodes.map((node, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSandboxNode(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                    activeSandboxNode === idx
                      ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-100"
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-350 hover:bg-slate-100/60"
                  }`}
                >
                  <p className={`text-[10px] font-mono uppercase tracking-wider mb-1 ${activeSandboxNode === idx ? "text-blue-100" : "text-slate-400"}`}>
                    IoT Terminal Node #0{idx + 1}
                  </p>
                  <p className="font-bold text-sm sm:text-base text-current">
                    {node.type}
                  </p>
                </button>
              ))}
            </div>

            {/* Right Detailed Node Spec */}
            <div className="lg:col-span-7 bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
                  <span className="text-xs font-mono text-slate-400">Node Status & Capacity</span>
                  <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    {sandboxNodes[activeSandboxNode].status}
                  </span>
                </div>
                
                <h4 className="text-lg font-bold text-slate-800">
                  {sandboxNodes[activeSandboxNode].type}
                </h4>
                <p className="mt-3 text-slate-600 text-sm leading-relaxed font-normal">
                  {sandboxNodes[activeSandboxNode].purpose}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-8 mt-8 border-t border-slate-200">
                <div>
                  <span className="block text-[10px] font-mono text-slate-400 uppercase font-semibold">Edge Accuracy</span>
                  <span className="text-sm font-bold text-slate-800 font-mono">
                    {sandboxNodes[activeSandboxNode].accuracy}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] font-mono text-slate-400 uppercase font-semibold">Power profile</span>
                  <span className="text-sm font-bold text-slate-800 font-mono">
                    {sandboxNodes[activeSandboxNode].lifespan}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] font-mono text-slate-400 uppercase font-semibold">Radio Protocol</span>
                  <span className="text-sm font-bold text-slate-800 font-mono">
                    {sandboxNodes[activeSandboxNode].frequency}
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
