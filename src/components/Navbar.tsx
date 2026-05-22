import { useState } from "react";
import { Compass, Menu, X, MonitorPlay, ShieldCheck } from "lucide-react";

interface NavbarProps {
  currentTab: string;
  onChangeTab: (tab: "Home" | "Gallery" | "About"| "Platform") => void;
}

export default function Navbar({ currentTab, onChangeTab }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: "Home", tab: "Home" as const },
    { label: "Gallery", tab: "Gallery" as const },
    { label: "About Space & SaaS", tab: "About" as const },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => onChangeTab("Home")}>
            <div className="bg-blue-600 p-2.5 rounded-xl text-white shadow-md shadow-blue-200">
              <Compass className="h-5 w-5 animate-pulse" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-800 font-sans">
              Park<span className="text-blue-600">Ease</span>
            </span>
            <span className="hidden sm:inline-block bg-slate-100 text-slate-500 text-[10px] uppercase font-mono px-2 py-0.5 rounded border border-slate-200">
              SaaS v2.4
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-2">
              {menuItems.map((item) => (
                <button
                  key={item.tab}
                  onClick={() => onChangeTab(item.tab)}
                  className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    currentTab === item.tab
                      ? "text-blue-600 bg-blue-50 border border-blue-100"
                      : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => onChangeTab("Platform")}
              className="flex items-center space-x-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-800 shadow-md shadow-slate-200 hover:scale-[1.01] active:scale-[0.99] transition-all"
            >
              <MonitorPlay className="h-4 w-4" />
              <span>Launch Platform</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => onChangeTab("Platform")}
              className="mr-2 flex items-center space-x-1 bg-blue-600 text-white px-3.5 py-2 rounded-lg text-xs font-semibold hover:bg-blue-700 shadow shadow-blue-100"
            >
              <MonitorPlay className="h-3.5 w-3.5" />
              <span>Launch</span>
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-150 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-5 space-y-2 animate-fadeIn shadow-lg">
          {menuItems.map((item) => (
            <button
              key={item.tab}
              onClick={() => {
                onChangeTab(item.tab);
                setIsOpen(false);
              }}
              className={`block w-full text-left px-4 py-3 rounded-lg text-base font-semibold transition-all ${
                currentTab === item.tab
                  ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                  : "text-slate-600 hover:text-slate-800 hover:bg-slate-50"
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => {
              onChangeTab("Platform");
              setIsOpen(false);
            }}
            className="w-full flex items-center justify-center space-x-2 bg-slate-900 text-white py-3.5 rounded-xl text-base font-semibold shadow-lg shadow-slate-200"
          >
            <MonitorPlay className="h-5 w-5" />
            <span>Launch Smart Platform</span>
          </button>
        </div>
      )}
    </nav>
  );
}
