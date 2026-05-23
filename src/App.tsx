import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Import modular sub-sections
import StorySection from "./components/StorySection";
import BenefitsSection from "./components/BenefitsSection";
import RatesSection from "./components/RatesSection";
import TestimonialsSection from "./components/TestimonialsSection";
import FaqSection from "./components/FaqSection";
import ContactSection from "./components/ContactSection";
import FooterSection from "./components/FooterSection";

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(false); // Default to Daylight mode

  const navLinks = ["Start", "Story", "Rates", "Benefits", "FAQ"];

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Keep HTML document class aligned with state for Tailwind/global styling
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const scrollToSection = (link: string) => {
    if (link === "Start") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(link.toLowerCase());
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      triggerToast(`Service segment: ${link}`);
    }
  };

  return (
    <div 
      id="skyelite-root" 
      className="min-h-screen font-sans relative overflow-x-hidden transition-colors duration-750 bg-page-bg text-text-primary"
    >
      
      {/* 1. HERO VIEWPORT AREA - takes exactly h-screen with absolute overlay video and backdrop */}
      <div id="start" className="h-screen w-full relative overflow-hidden">
        {/* Background MP4 Video stream */}
        <video
          id="background-jet-video"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_091828_e240eb17-6edc-4129-ad9d-98678e3fd238.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Backdrop alpha gradient */}
        <div 
          id="video-overlay" 
          className={`absolute inset-0 transition-all duration-750 z-0 backdrop-blur-[1px] ${
            isDark 
              ? "bg-[#000814]/20" 
              : "bg-[#000814]/60"
          }`} 
        />

        {/* Outer wrapper filling the screen height with layout */}
        <div className="relative h-full flex flex-col z-10 w-full">
          {/* Navbar sits above everything and does not interfere with hero content positioning */}
          <header className={`w-full relative z-20 transition-all duration-500 border-b ${
            isDark 
              ? "bg-white/90 backdrop-blur border-card-border" 
              : "bg-black/80 backdrop-blur border-white/5"
          }`}>
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-5 flex items-center justify-between">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  triggerToast(isDark ? "Welcome to the Flight Cabin" : "Welcome into the Sunbeams");
                }}
                className={`text-xl md:text-xl lg:text-2xl font-semibold tracking-tight transition-colors duration-500 ${isDark ? "text-[#000814]" : "text-white"}`}
              >
                SkyElite
              </a>

              {/* Desktop Nav Links centered in the middle of the screen */}
              <nav className="hidden lg:flex gap-4 md:gap-5 lg:gap-8 absolute left-1/2 -translate-x-1/2">
                {navLinks.map((link) => (
                  <button
                    key={link}
                    onClick={() => scrollToSection(link)}
                    className={`transition-colors duration-500 font-medium text-sm md:text-sm lg:text-base tracking-wide cursor-pointer border-none bg-transparent outline-none ${
                      isDark 
                        ? "text-[#000814]/80 hover:text-[#000814]" 
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    {link}
                  </button>
                ))}
              </nav>

             {/* Right Controls: Mode Switcher, Quick Shuttle & Mobile Menu toggle */}
             <div className="flex items-center gap-3 md:gap-4 lg:gap-8">
               {/* Dark/Light Mode Theme Toggle Switch Pill */}
               <div className="hidden lg:flex items-center gap-2.5">
                 <span className={`text-xs font-semibold tracking-widest hidden lg:block transition-colors duration-500 ${isDark ? "text-[#3a5a8a]" : "text-[#7a9cc4]"}`}>
                   {isDark ? "LIGHT" : "DARK"}
                 </span>
                 
                 <button
                   id="dark-light-mode-toggle"
                   onClick={() => {
                     const nextDark = !isDark;
                     setIsDark(nextDark);
                     triggerToast(nextDark ? "Light mode activated" : "Dark mode activated");
                   }}
                   style={{ backgroundColor: isDark ? "#e6eeff" : "#001233" }}
                   className={`relative w-12 h-6 lg:w-16 lg:h-8 rounded-full p-0.5 lg:p-1 cursor-pointer transition-all duration-500 shadow-inner flex items-center outline-none border ${
                     isDark 
                       ? "border-[#0066CC]/20 shadow-[0_0_12px_rgba(0,102,204,0.35)]" 
                       : "border-[#0066CC]/20 shadow-[0_0_12px_rgba(0,102,204,0.35)]"
                   }`}
                   aria-label="Toggle dark mode theme"
                 >
                   {/* Sliding knob with transitions */}
                   <div
                     style={{
                       backgroundColor: isDark ? "#000814" : "#ffffff",
                       boxShadow: "0 0 10px 2px rgba(0, 102, 204, 0.7)"
                     }}
                     className={`absolute left-0.5 lg:left-1 w-5 h-5 lg:w-6 lg:h-6 rounded-full flex items-center justify-center transition-all duration-500 ease-in-out ${
                       isDark 
                         ? "translate-x-[24px] lg:translate-x-[32px]" 
                         : "translate-x-0"
                     }`}
                   >
                     <AnimatePresence mode="wait">
                       {isDark ? (
                         <motion.div
                           key="sun"
                           initial={{ opacity: 0, rotate: -40 }}
                           animate={{ opacity: 1, rotate: 0 }}
                           exit={{ opacity: 0, rotate: 40 }}
                           transition={{ duration: 0.25 }}
                           className="flex items-center justify-center"
                         >
                           <Sun className="w-3.5 h-3.5 text-accent fill-accent/20" />
                         </motion.div>
                       ) : (
                         <motion.div
                           key="moon"
                           initial={{ opacity: 0, rotate: 40 }}
                           animate={{ opacity: 1, rotate: 0 }}
                           exit={{ opacity: 0, rotate: -40 }}
                           transition={{ duration: 0.25 }}
                           className="flex items-center justify-center"
                         >
                           <Moon className="w-3.5 h-3.5 text-accent fill-accent/20" />
                         </motion.div>
                       )}
                     </AnimatePresence>
                   </div>
                 </button>
               </div>
 
               {/* Quick Shuttle Button */}
               <button
                 onClick={() => triggerToast("Initializing Quick Shuttle scheduling...")}
                 className={`hidden lg:inline-block px-3 py-1.5 text-xs lg:px-5 lg:py-2 lg:text-sm font-semibold rounded-full transition-all duration-300 cursor-pointer border-none outline-none whitespace-nowrap ${
                   isDark 
                     ? "bg-[#000814] text-white hover:bg-[#001233]" 
                     : "bg-[#0066CC] text-white hover:bg-[#0052a3]"
                 }`}
               >
                 QUICK SHUTTLE →
               </button>
 
               {/* Mobile menu trigger button */}
               <button
                 onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                 className={`lg:hidden p-2 transition-all duration-300 focus:outline-none cursor-pointer ${isDark ? "text-[#000814]" : "text-white"}`}
                 aria-label="Toggle Navigation Menu"
               >
                 {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
               </button>
             </div>
           </div>
         </header>

          {/* Mobile Dropdown Menu Drawer */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-20 left-4 right-4 lg:hidden backdrop-blur-md rounded-xl shadow-xl border p-6 z-50 flex flex-col gap-4 bg-page-bg/95 border-card-border text-text-primary shadow-accent-light/10"
              >
                {navLinks.map((link) => (
                  <button
                    key={link}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      scrollToSection(link);
                    }}
                    className="text-left font-medium text-lg cursor-pointer py-1 border-none bg-transparent outline-none text-text-primary/90 hover:text-text-primary"
                  >
                    {link}
                  </button>
                ))}

                {/* Mobile Menu Theme Toggle */}
                <div className="flex items-center justify-between border-t border-card-border pt-4 mt-2">
                  <span className={`text-xs font-semibold tracking-widest transition-colors duration-500 ${isDark ? "text-[#3a5a8a]" : "text-[#7a9cc4]"}`}>
                    {isDark ? "LIGHT" : "DARK"}
                  </span>
                  
                  <button
                    id="mobile-dark-light-mode-toggle"
                    onClick={() => {
                      const nextDark = !isDark;
                      setIsDark(nextDark);
                      triggerToast(nextDark ? "Light mode activated" : "Dark mode activated");
                    }}
                    style={{ backgroundColor: isDark ? "#e6eeff" : "#001233" }}
                    className={`relative w-12 h-6 rounded-full p-0.5 cursor-pointer transition-all duration-500 shadow-inner flex items-center outline-none border ${
                      isDark 
                        ? "border-[#0066CC]/20 shadow-[0_0_12px_rgba(0,102,204,0.35)]" 
                        : "border-[#0066CC]/20 shadow-[0_0_12px_rgba(0,102,204,0.35)]"
                    }`}
                    aria-label="Toggle dark mode theme"
                  >
                    <div
                      style={{
                        backgroundColor: isDark ? "#000814" : "#ffffff",
                        boxShadow: "0 0 8px 1px rgba(0, 102, 204, 0.7)"
                      }}
                      className={`absolute left-0.5 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-500 ease-in-out ${
                        isDark ? "translate-x-[24px]" : "translate-x-0"
                      }`}
                    >
                      {isDark ? (
                        <Sun className="w-3 h-3 text-accent fill-accent/20" />
                      ) : (
                        <Moon className="w-3 h-3 text-accent fill-accent/20" />
                      )}
                    </div>
                  </button>
                </div>

                {/* Mobile Quick Shuttle Button */}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    triggerToast("Initializing Quick Shuttle scheduling...");
                  }}
                  className={`w-full text-center py-2.5 text-sm font-semibold rounded-full mt-2 transition-all duration-300 cursor-pointer outline-none border-none ${
                    isDark 
                      ? "bg-[#000814] text-white hover:bg-[#001233]" 
                      : "bg-[#0066CC] text-white hover:bg-[#0052a3]"
                  }`}
                >
                  QUICK SHUTTLE →
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hero content grouped beautifully and perfectly vertically centered in the viewport */}
          <main className="flex-1 flex flex-col items-center justify-center text-center px-4 relative z-10">
            <div className="flex flex-col items-center text-center gap-2 px-4 w-full">
              
              {/* Grouped Private Jets label */}
              <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase mb-2 transition-colors duration-500 text-[#0066CC]">
                PRIVATE JETS
              </span>

              {/* Premium Header Line */}
              <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-normal leading-none tracking-tighter transition-colors duration-500 ${isDark ? "text-[#3a5a8a]" : "text-[#7a9cc4]"}`}>
                Premium.
              </h1>

              {/* Accessible Header Line */}
              <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-normal leading-none tracking-tighter -mt-1 sm:-mt-2 md:-mt-3 transition-colors duration-500 ${isDark ? "text-[#000814]" : "text-white"}`}>
                Accessible.
              </h1>

              {/* Hero Subtitle */}
              <p className={`text-base sm:text-lg mt-4 max-w-xl transition-colors duration-500 ${isDark ? "text-[#3a5a8a]" : "text-[#7a9cc4]"}`}>
                Your dedication deserves recognition.
              </p>

              {/* Primary Action Button Row */}
              <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center w-full max-w-xs sm:max-w-none px-4">
                <button
                  onClick={() => scrollToSection("Story")}
                  className={`w-full sm:w-auto px-6 py-2.5 rounded-full font-medium transition-all duration-300 cursor-pointer outline-none border ${
                    isDark 
                      ? "bg-transparent text-[#000814] border-[#000814]/30 hover:bg-[#000814]/10" 
                      : "bg-transparent text-white border-white/40 hover:bg-white/10"
                  }`}
                >
                  Discover
                </button>
                
                <button
                  onClick={() => scrollToSection("Rates")}
                  className={`w-full sm:w-auto px-6 py-2.5 rounded-full transition-all duration-300 cursor-pointer outline-none border-none hover:scale-[1.01] ${
                    isDark 
                      ? "bg-[#000814] text-white hover:bg-[#001233]" 
                      : "bg-[#0066CC] text-white hover:bg-[#0052a3]"
                  }`}
                >
                  Book Now
                </button>
              </div>

            </div>
          </main>
        </div>
      </div>

      {/* 2. OUR STORY SECTION */}
      <StorySection />

      {/* 3. BENEFITS SECTION */}
      <BenefitsSection />

      {/* 4. RATES SECTION */}
      <RatesSection onTriggerToast={triggerToast} />

      {/* 5. TESTIMONIALS SECTION */}
      <TestimonialsSection />

      {/* 6. FAQ SECTION */}
      <FaqSection />

      {/* 7. CONTACT CTA SECTION */}
      <ContactSection 
        onTriggerToast={triggerToast} 
        onScrollToRates={() => scrollToSection("Rates")} 
      />

      {/* 8. FOOTER */}
      <FooterSection 
        onScrollToSection={scrollToSection} 
        onTriggerToast={triggerToast} 
        navLinks={navLinks} 
      />

      {/* Elegant minimalist toast notifications */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 25, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 15, x: "-50%" }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-text-primary text-page-bg px-6 py-3.5 rounded-xl shadow-xl z-50 text-sm font-medium tracking-wide flex items-center gap-2 border border-card-border"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-utc-badge-text animate-pulse" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
