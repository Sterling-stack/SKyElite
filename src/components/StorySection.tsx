import React, { useState, useEffect, useRef } from "react";
import { Plane } from "lucide-react";
import { motion } from "motion/react";

interface StorySectionProps {
  onEstimateClick?: () => void;
}

export default function StorySection({ onEstimateClick }: StorySectionProps) {
  const [hasEntered, setHasEntered] = useState<boolean>(false);
  const [altitude, setAltitude] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!hasEntered) return;

    const altEnd = 41000;
    const speedEnd = 540;
    const duration = 2000; // animates over 2 seconds
    const startTime = performance.now();
    let frameId: number;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = progress * (2 - progress); // Standard quadratic ease-out

      setAltitude(Math.floor(easeProgress * altEnd));
      setSpeed(Math.floor(easeProgress * speedEnd));

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        setAltitude(altEnd);
        setSpeed(speedEnd);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [hasEntered]);

  return (
    <section id="story" className="bg-page-bg py-16 sm:py-20 md:py-28 text-text-primary relative">
      <style>{`
        @keyframes fly {
          0% { left: 0%; transform: translateY(-50%) rotate(90deg) scale(0.95); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: 100%; transform: translateY(-50%) rotate(90deg) scale(0.95); opacity: 0; }
        }
      `}</style>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Side Content - Untouched */}
        <div>
          <span className="text-xs font-semibold tracking-widest text-accent uppercase mb-4 block">
            OUR STORY
          </span>
          <h2 className="text-4xl md:text-5xl font-normal text-text-primary tracking-tighter mb-8 leading-tight">
            Built for those who move the world.
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed mb-6">
            SkyElite was born from a simple yet powerful realization: time is the ultimate luxury, and flying private should be seamless, transparent, and built entirely around your needs. We designed an on-demand ecosystem that matches you with the finest private jets in the world, with zero heavy up-front asset commitments.
          </p>
          <p className="text-text-secondary text-lg leading-relaxed mb-12">
            Whether crossing continents for a critical board meeting or scheduling a spontaneous family escape, our mission is to eliminate operational friction. By combining elite safety standards with deep operational precision, we deliver more than just travel—we give you back your day.
          </p>
          
          {/* Stats row with 3 numbers */}
          <div className="grid grid-cols-3 gap-2 sm:gap-6 pt-8 border-t border-card-border">
            <div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-semibold text-text-primary">12+</div>
              <div className="text-text-secondary text-[10px] sm:text-xs md:text-sm mt-1">Years Active</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-semibold text-text-primary">340+</div>
              <div className="text-text-secondary text-[10px] sm:text-xs md:text-sm mt-1">Global Routes</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-semibold text-text-primary">98%</div>
              <div className="text-text-secondary text-[10px] sm:text-xs md:text-sm mt-1">On-Time Rate</div>
            </div>
          </div>
        </div>
        
        {/* Sleek Interactive Flight Booking/Status Widget with scroll reveal */}
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="bg-card-bg rounded-3xl border border-card-border p-6 w-full h-auto lg:h-[480px] flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-accent/40 transition-all duration-500 shadow-accent/5"
        >
          {/* Bottom subtle ambient glow to match card hover glow */}
          <div className="absolute -inset-px rounded-3xl border border-accent/0 group-hover:border-accent/20 transition-all duration-500 pointer-events-none" />

          {/* Top Bar Info */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-mono font-semibold tracking-wider text-accent bg-accent/10 px-3 py-1 rounded-full border border-accent/15">
              AIRCRAFT DISPATCH LOG
            </span>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-utc-badge-text animate-pulse" />
              <span className="text-[10px] font-mono tracking-widest text-utc-badge-text">
                UTC ACTIVE
              </span>
            </div>
          </div>

          {/* Flight Route Visual (Middle Stage) */}
          <div className="relative w-full flex items-center justify-between py-6 px-1 my-2 bg-text-primary/[0.02] border border-card-border rounded-2xl">
            {/* Departure City Info */}
            <div className="relative pl-3 flex flex-col items-start z-10">
              <div className="flex items-center gap-1.5">
                <div className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
                </div>
                <span className="text-text-primary font-bold text-xl tracking-tight">JFK</span>
              </div>
              <span className="text-text-secondary text-xs mt-0.5">New York</span>
            </div>

            {/* Dashed Route Line Track & Sliding Airplane */}
            <div className="flex-1 mx-3 relative h-0.5">
              <div className="absolute inset-0 border-t-2 border-dashed border-card-border top-1/2 -translate-y-1/2" />
              <Plane 
                className="absolute top-1/2 -translate-y-1/2 w-5 h-5 text-accent animate-[fly_3s_ease-in-out_infinite]"
                style={{ position: 'absolute' }}
              />
            </div>

            {/* Arrival City Info */}
            <div className="relative pr-3 flex flex-col items-end z-10">
              <div className="flex items-center gap-1.5">
                <span className="text-text-primary font-bold text-xl tracking-tight">LHR</span>
                <div className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
                </div>
              </div>
              <span className="text-text-secondary text-xs mt-0.5">London</span>
            </div>
          </div>

          {/* Flight Data Rows in Dark Chamber */}
          <div className="bg-sec-bg/80 rounded-2xl p-4 flex flex-col justify-between">
            {/* Row 1 */}
            <div className="flex justify-between items-center pb-2.5 border-b border-card-border">
              <span className="text-text-secondary text-sm">Flight No.</span>
              <span className="text-text-primary text-sm font-mono font-semibold">SE-809</span>
            </div>
            
            {/* Row 2 */}
            <div className="flex justify-between items-center py-2.5 border-b border-card-border">
              <span className="text-text-secondary text-sm">Cruise Altitude</span>
              <span className="text-text-primary text-sm font-mono font-semibold">
                {altitude.toLocaleString()} FT
              </span>
            </div>
            
            {/* Row 3 */}
            <div className="flex justify-between items-center pt-2.5">
              <span className="text-text-secondary text-sm">Ground Speed</span>
              <span className="text-text-primary text-sm font-mono font-semibold">
                {speed.toLocaleString()} KT
              </span>
            </div>
          </div>

          {/* Bottom Dual Stat Boxes */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            {/* Box 1 */}
            <div className="bg-sec-bg/80 rounded-xl p-3 sm:p-4 flex flex-col justify-between">
              <div>
                <span className="text-text-secondary text-[10px] sm:text-xs block">Departure</span>
                <span className="text-text-primary font-semibold text-xs sm:text-sm mt-1 block">06:45 AM</span>
              </div>
              <div className="mt-2 text-left">
                <span className="bg-utc-badge-bg text-utc-badge-text text-[10px] rounded-full px-2.5 py-0.5 font-medium inline-block">
                  On Time
                </span>
              </div>
            </div>

            {/* Box 2 */}
            <div className="bg-sec-bg/80 rounded-xl p-3 sm:p-4 flex flex-col justify-between">
              <div>
                <span className="text-text-secondary text-[10px] sm:text-xs block">Arrival</span>
                <span className="text-text-primary font-semibold text-xs sm:text-sm mt-1 block">02:30 PM</span>
              </div>
              <div className="mt-2 text-left">
                <span className="bg-utc-badge-bg text-utc-badge-text text-[10px] rounded-full px-2.5 py-0.5 font-medium inline-block">
                  On Schedule
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
