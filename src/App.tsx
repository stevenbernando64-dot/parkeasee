import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import GallerySection from "./components/GallerySection";
import AboutSection from "./components/AboutSection";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";

export default function App() {
  const [currentTab, setCurrentTab] = useState<"Home" | "Gallery" | "About" | "Platform">("Home");

  // Transitions tab selections
  const handleChangeTab = (tab: "Home" | "Gallery" | "About" | "Platform") => {
    setCurrentTab(tab);
    // Smooth scroll back to top of screen
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none selection:bg-blue-600 selection:text-white">
      {/* Universal Floating Navigation Header */}
      <Navbar currentTab={currentTab} onChangeTab={handleChangeTab} />

      {/* Main Content Router */}
      <main className="flex-grow">
        {currentTab === "Home" && (
          <div className="animate-fadeIn">
            {/* Fullscreen Hero Header Section */}
            <Hero 
              onLaunchDemo={() => handleChangeTab("Platform")} 
              onExploreGallery={() => handleChangeTab("Gallery")} 
            />
            {/* Core Application Design requested Features block */}
            <Features />
          </div>
        )}

        {currentTab === "Gallery" && (
          <div className="animate-fadeIn">
            {/* Visual interactive Gallery section */}
            <GallerySection />
          </div>
        )}

        {currentTab === "About" && (
          <div className="animate-fadeIn">
            {/* Full Strategic pitch containing market analysis, system flow charts, & SaaS metrics */}
            <AboutSection />
          </div>
        )}

        {currentTab === "Platform" && (
          <div className="animate-fadeIn">
            {/* The primary real-time smart simulation dashboards */}
            <Dashboard />
          </div>
        )}
      </main>

      {/* Standard brand footer element */}
      {currentTab !== "Platform" && <Footer />}
    </div>
  );
}
