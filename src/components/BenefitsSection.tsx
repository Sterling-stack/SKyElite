import React, { useState, useEffect } from "react";
import { Plane, Shield, Clock, Star, Globe, Lock, ChevronLeft, ChevronRight } from "lucide-react";

export default function BenefitsSection() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const benefits = [
    {
      id: 0,
      title: "On-Demand Flights",
      desc: "Depart on your schedule, not ours. Access pristine global routes without upfront capital investment.",
      icon: Plane,
    },
    {
      id: 1,
      title: "ARGUS Platinum Safety",
      desc: "The highest safety rating in private aviation. Handpicked elite aircrews only.",
      icon: Shield,
    },
    {
      id: 2,
      title: "2-Hour Ready Window",
      desc: "From booking to boarding in under two hours. Fast-track dispatch teams positioned globally.",
      icon: Clock,
    },
    {
      id: 3,
      title: "Five-Star Concierge",
      desc: "White-glove service from takeoff to landing. Customized luxury menus, ground transport, and secure access.",
      icon: Star,
    },
    {
      id: 4,
      title: "500+ Destinations",
      desc: "Reach private and smaller regional airports commercial airlines simply can't touch.",
      icon: Globe,
    },
    {
      id: 5,
      title: "Total Privacy",
      desc: "Your flights, your details. Everything kept confidential under secure, end-to-end encrypted protocol.",
      icon: Lock,
    },
  ];

  // Monitor screen size for perfect responsive calculation
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-rotates every 3 seconds, unless paused on hover or touch
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % benefits.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isPaused, benefits.length]);

  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;
  const isDesktop = windowWidth >= 1024;

  // Touch handlers for swipe support on mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setActiveIndex((prev) => (prev + 1) % benefits.length);
    } else if (isRightSwipe) {
      setActiveIndex((prev) => (prev - 1 + benefits.length) % benefits.length);
    }
    setIsPaused(false);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev - 1 + benefits.length) % benefits.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % benefits.length);
  };

  return (
    <section id="benefits" className="bg-sec-bg py-16 sm:py-20 md:py-28 text-text-primary relative select-none overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Section Header */}
        <div className="text-center md:text-left mb-16">
          <span className="text-xs font-semibold tracking-widest text-accent uppercase mb-4 block">
            WHY SKYELITE
          </span>
          <h2 className="text-4xl md:text-5xl font-normal text-text-primary tracking-tighter leading-tight">
            Everything you need, nothing you don't.
          </h2>
        </div>

        {/* Carousel Container Stage */}
        <div 
          className="relative w-full h-[360px] md:h-[390px] overflow-hidden flex items-center justify-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Cards Frame */}
          <div className="relative w-full h-full flex items-center justify-center">
            
            {benefits.map((benefit, i) => {
              // Symmetric offset calculation
              let diff = i - activeIndex;
              while (diff < -3) diff += 6;
              while (diff > 2) diff -= 6;

              const isCenter = diff === 0;
              const isLeft = diff === -1;
              const isRight = diff === 1;
              const isFarLeft = diff === -2;
              const isFarRight = diff === 2;

              let transformString = "";
              let opacityVal = 0;
              let zIndexVal = 0;

              if (isMobile) {
                if (isCenter) {
                  transformString = "translateX(-50%) translateY(0px) scale(1) rotate(0deg)";
                  opacityVal = 1;
                  zIndexVal = 30;
                } else {
                  transformString = "translateX(-50%) translateY(0px) scale(0.8) rotate(0deg)";
                  opacityVal = 0;
                  zIndexVal = 0;
                }
              } else if (isTablet) {
                if (isCenter) {
                  transformString = "translateX(-50%) translateY(0px) scale(1) rotate(0deg)";
                  opacityVal = 1;
                  zIndexVal = 30;
                } else if (isLeft) {
                  transformString = "translateX(calc(-50% - 170px)) translateY(12px) scale(0.85) rotate(-6deg)";
                  opacityVal = 0.4;
                  zIndexVal = 20;
                } else if (isRight) {
                  transformString = "translateX(calc(-50% + 170px)) translateY(12px) scale(0.85) rotate(6deg)";
                  opacityVal = 0.4;
                  zIndexVal = 20;
                } else {
                  transformString = "translateX(-50%) translateY(24px) scale(0.7) rotate(0deg)";
                  opacityVal = 0;
                  zIndexVal = 0;
                }
              } else {
                // Desktop
                if (isCenter) {
                  transformString = "translateX(-50%) translateY(0px) scale(1.1) rotate(0deg)";
                  opacityVal = 1;
                  zIndexVal = 30;
                } else if (isLeft) {
                  transformString = "translateX(calc(-50% - 220px)) translateY(12px) scale(0.9) rotate(-8deg)";
                  opacityVal = 0.5;
                  zIndexVal = 20;
                } else if (isRight) {
                  transformString = "translateX(calc(-50% + 220px)) translateY(12px) scale(0.9) rotate(8deg)";
                  opacityVal = 0.5;
                  zIndexVal = 20;
                } else if (isFarLeft) {
                  transformString = "translateX(calc(-50% - 400px)) translateY(24px) scale(0.75) rotate(-14deg)";
                  opacityVal = 0.25;
                  zIndexVal = 10;
                } else if (isFarRight) {
                  transformString = "translateX(calc(-50% + 400px)) translateY(24px) scale(0.75) rotate(14deg)";
                  opacityVal = 0.25;
                  zIndexVal = 10;
                } else {
                  transformString = "translateX(-50%) translateY(36px) scale(0.6) rotate(0deg)";
                  opacityVal = 0;
                  zIndexVal = 0;
                }
              }

              // Dynamic width classes to match explicit spec
              let cardWidthClass = "w-[85vw] max-w-sm";
              if (isTablet) {
                cardWidthClass = isCenter ? "w-64" : "w-56";
              } else if (isDesktop) {
                cardWidthClass = isCenter ? "w-64" : "w-52";
              }

              return (
                <div
                  key={benefit.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isCenter) {
                      setActiveIndex(benefit.id);
                    }
                  }}
                  style={{
                    transform: transformString,
                    opacity: opacityVal,
                    zIndex: zIndexVal,
                  }}
                  className={`absolute left-1/2 top-4 h-[256px] p-6 rounded-2xl border transition-all duration-500 ease-in-out shadow-2xl flex flex-col justify-between group ${cardWidthClass} ${
                    isCenter 
                      ? "bg-card-bg border-accent shadow-accent/20 cursor-default" 
                      : "bg-card-bg/50 border-card-border hover:border-accent/30 cursor-pointer"
                  } ${!isCenter && isMobile ? "pointer-events-none" : ""}`}
                >
                  <div>
                    <div className={`transition-transform duration-350 ${
                      isCenter ? "text-accent scale-115" : "text-text-secondary group-hover:scale-105"
                    }`}>
                      <benefit.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-text-primary font-semibold text-base md:text-lg mb-2 mt-5">
                      {benefit.title}
                    </h3>
                    <p className="text-text-secondary text-xs md:text-sm leading-relaxed line-clamp-3">
                      {benefit.desc}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Left and Right navigation arrows (visible on tablet and desktop only) */}
            {!isMobile && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 w-11 h-11 bg-card-bg border border-card-border hover:border-accent/30 hover:bg-sec-bg rounded-full flex items-center justify-center text-accent hover:text-text-primary transition-all cursor-pointer z-40 outline-none hover:scale-105 shadow-xl"
                  aria-label="Previous Benefit"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={handleNext}
                  className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 w-11 h-11 bg-card-bg border border-card-border hover:border-accent/30 hover:bg-sec-bg rounded-full flex items-center justify-center text-accent hover:text-text-primary transition-all cursor-pointer z-40 outline-none hover:scale-105 shadow-xl"
                  aria-label="Next Benefit"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

          </div>
        </div>

        {/* Carousel indicator dots (always visible) */}
        <div className="flex gap-2 justify-center mt-6">
          {benefits.map((benefit, i) => (
            <button
              key={benefit.id}
              onClick={() => setActiveIndex(benefit.id)}
              className={`h-2 rounded-full transition-all duration-350 cursor-pointer border-none outline-none ${
                activeIndex === i 
                  ? "bg-accent w-8" 
                  : "bg-dots-inactive hover:opacity-85 w-2"
              }`}
              aria-label={`Go to benefit ${benefit.id + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
