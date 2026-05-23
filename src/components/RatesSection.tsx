import React, { useState, useEffect } from "react";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";

interface RatesSectionProps {
  onTriggerToast: (msg: string) => void;
}

export default function RatesSection({ onTriggerToast }: RatesSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number>(1); // Default to Elite (index 1) in the center
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const cards = [
    {
      id: "rates-card-essential",
      label: "LIGHT JET",
      tier: "Essential",
      price: "From $4,500/hr",
      desc: "Ideal for quick, regional business hops and localized flights.",
      features: [
        "Up to 6 Passengers",
        "Light-cabin turboprops & jets",
        "2-hour callout window",
        "Wifi & executive snack bar",
      ],
      toastMsg: "Initializing Essential package briefing...",
      cta: "Discover",
      bgImage: "https://images.unsplash.com/photo-1473830394358-91588751b241?auto=format&fit=crop&w=600&q=80",
      isElite: false,
    },
    {
      id: "rates-card-elite",
      label: "SUPER MID-SIZE",
      tier: "Elite",
      price: "From $8,200/hr",
      desc: "Cross-country luxury flying with premium comfort and capacity.",
      features: [
        "Up to 10 Passengers",
        "Stand-up super-mid cabin",
        "Grounded flight attendant",
        "Premium catering included",
      ],
      toastMsg: "Initializing Elite cabin layout builder...",
      cta: "Book Now",
      bgImage: "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?auto=format&fit=crop&w=600&q=80",
      isElite: true,
    },
    {
      id: "rates-card-ultra",
      label: "ULTRA LONG RANGE",
      tier: "Ultra",
      price: "From $14,000/hr",
      desc: "Mastering global routes with ultimate privacy and complete FBO protocol.",
      features: [
        "Up to 16 Passengers",
        "Global range heavy airliner",
        "Full kitchen & state-room",
        "Ultimate security protocol",
      ],
      toastMsg: "Initializing Ultra premium global service plan...",
      cta: "Discover",
      bgImage: "https://images.unsplash.com/photo-1464039387115-57a532453704?auto=format&fit=crop&w=600&q=80",
      isElite: false,
    },
  ];

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % cards.length);
    }, 4000); // Auto-rotates every 4 seconds
    return () => clearInterval(timer);
  }, [isPaused, cards.length]);

  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;
  const isDesktop = windowWidth >= 1024;

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
      setActiveIndex((prev) => (prev + 1) % cards.length);
    } else if (isRightSwipe) {
      setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length);
    }
    setIsPaused(false);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % cards.length);
  };

  return (
    <section id="rates" className="bg-page-bg py-16 sm:py-20 md:py-28 text-text-primary relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        
        {/* Section Title Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-widest text-accent uppercase mb-4 block">
            RATES
          </span>
          <h2 className="text-4xl md:text-5xl font-normal text-text-primary tracking-tighter mb-4 leading-tight">
            Transparent pricing. No surprises.
          </h2>
          <p className="text-text-secondary text-base">
            All rates include crew, fuel, and standard catering.
          </p>
        </div>

        {/* Carousel Container Stage */}
        <div 
          className="relative w-full h-[560px] overflow-hidden flex items-center justify-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Cards Frame */}
          <div className="relative w-full h-full flex items-center justify-center">
            
            {cards.map((card, i) => {
              // Symmetric offset calculation
              let diff = i - activeIndex;
              while (diff < -1) diff += 3;
              while (diff > 1) diff -= 3;

              const isCenter = diff === 0;
              const isLeft = diff === -1;
              const isRight = diff === 1;

              let transformString = "";
              let opacityVal = 0;
              let zIndexVal = 0;

              if (isMobile) {
                if (isCenter) {
                  transformString = "translateX(-50%) translateY(0px) scale(1.1) rotate(0deg)";
                  opacityVal = 1;
                  zIndexVal = 30;
                } else {
                  transformString = isLeft 
                    ? "translateX(calc(-50% - 220px)) translateY(0px) scale(0.9) rotate(-8deg)"
                    : "translateX(calc(-50% + 220px)) translateY(0px) scale(0.9) rotate(8deg)";
                  opacityVal = 0;
                  zIndexVal = 0;
                }
              } else if (isTablet) {
                if (isCenter) {
                  transformString = "translateX(-50%) translateY(0px) scale(1.1) rotate(0deg)";
                  opacityVal = 1;
                  zIndexVal = 30;
                } else if (isLeft) {
                  transformString = "translateX(calc(-50% - 160px)) translateY(12px) scale(0.9) rotate(-8deg)";
                  opacityVal = 0.5;
                  zIndexVal = 20;
                } else if (isRight) {
                  transformString = "translateX(calc(-50% + 160px)) translateY(12px) scale(0.9) rotate(8deg)";
                  opacityVal = 0.5;
                  zIndexVal = 20;
                }
              } else {
                // Desktop
                if (isCenter) {
                  transformString = "translateX(-50%) translateY(0px) scale(1.1) rotate(0deg)";
                  opacityVal = 1;
                  zIndexVal = 30;
                } else if (isLeft) {
                  transformString = "translateX(calc(-50% - 240px)) translateY(12px) scale(0.9) rotate(-8deg)";
                  opacityVal = 0.5;
                  zIndexVal = 20;
                } else if (isRight) {
                  transformString = "translateX(calc(-50% + 240px)) translateY(12px) scale(0.9) rotate(8deg)";
                  opacityVal = 0.5;
                  zIndexVal = 20;
                }
              }

              return (
                <div
                  key={card.id}
                  id={card.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isCenter) {
                      setActiveIndex(i);
                    }
                  }}
                  style={{
                    transform: transformString,
                    opacity: opacityVal,
                    zIndex: zIndexVal,
                  }}
                  className={`absolute left-1/2 top-4 w-[85vw] max-w-sm h-[480px] rounded-3xl overflow-hidden transition-all duration-500 ease-in-out group p-6 flex flex-col justify-between cursor-pointer ${
                    isCenter 
                      ? "cursor-default animate-none" 
                      : !isCenter && isMobile ? "pointer-events-none" : ""
                  } ${
                    card.isElite
                      ? "bg-elite-card-bg border border-elite-card-border/40 text-elite-card-text hover:shadow-2xl hover:shadow-accent/30"
                      : "bg-card-bg border border-card-border text-text-primary hover:shadow-2xl hover:shadow-black/5"
                  }`}
                >
                  {/* Background Image Area */}
                  <div className="absolute inset-0 z-0">
                    <img
                      src={card.bgImage}
                      alt={`${card.tier} Background Backdrop`}
                      className={`object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-110 ${
                        card.isElite ? "opacity-15" : "opacity-25"
                      }`}
                      referrerPolicy="no-referrer"
                    />
                    {/* Subtle Dark Gradient Overlay */}
                    <div className={`absolute inset-0 z-0 bg-gradient-to-b ${
                      card.isElite
                        ? "from-transparent via-elite-card-bg/40 to-elite-card-bg/95"
                        : "from-transparent via-card-bg/50 to-card-bg/95"
                    }`} />
                  </div>

                  {/* Top Corner "Most Popular" Badge for Elite */}
                  {card.isElite && (
                    <span className="absolute top-6 right-6 bg-elite-badge-bg text-elite-badge-text text-[10px] font-bold tracking-widest rounded-full px-3 py-1 uppercase z-20 shadow-lg">
                      Most Popular
                    </span>
                  )}

                  {/* Top Section Content */}
                  <div className="relative z-10 flex-1 flex flex-col text-left">
                    {/* Small label top-left */}
                    <span className="text-xs font-semibold tracking-widest text-accent uppercase block">
                      {card.label}
                    </span>

                    {/* Tier Name */}
                    <h3 className={`text-2xl font-semibold mt-1 ${card.isElite ? 'text-elite-card-text' : 'text-text-primary'}`}>
                      {card.tier}
                    </h3>

                    {/* Price */}
                    <div className={`text-3xl font-bold mt-2 ${card.isElite ? 'text-white' : 'text-text-primary'}`}>
                      {card.price}
                    </div>

                    {/* Short Description */}
                    <p className={`text-sm mt-2 font-normal line-clamp-1 ${card.isElite ? 'text-elite-card-text/70' : 'text-text-secondary'}`}>
                      {card.desc}
                    </p>

                    {/* Divider line */}
                    <hr className={`my-4 ${card.isElite ? 'border-white/10' : 'border-card-border'}`} />

                    {/* Bullet features */}
                    <ul className="space-y-2.5">
                      {card.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2.5 text-sm">
                          <Check className="w-4 h-4 flex-shrink-0 text-accent" />
                          <span className={`font-normal ${card.isElite ? 'text-elite-card-text/80' : 'text-text-secondary'}`}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom Section - CTA Button */}
                  <div className="relative z-10 pt-4">
                    <button
                      id={`${card.id}-btn`}
                      onClick={(e) => {
                        if (isCenter) {
                          e.stopPropagation();
                          onTriggerToast(card.toastMsg);
                        }
                      }}
                      className={`w-full font-semibold rounded-full py-2.5 text-sm tracking-wide transition-all hover:bg-opacity-95 cursor-pointer outline-none border-none ${
                        card.isElite
                          ? "bg-elite-badge-bg text-elite-badge-text animate-pulse duration-[3s]"
                          : "bg-btn-discover-bg text-btn-discover-text"
                      }`}
                    >
                      {card.cta}
                    </button>
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
                  aria-label="Previous Rate"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={handleNext}
                  className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 w-11 h-11 bg-card-bg border border-card-border hover:border-accent/30 hover:bg-sec-bg rounded-full flex items-center justify-center text-accent hover:text-text-primary transition-all cursor-pointer z-40 outline-none hover:scale-105 shadow-xl"
                  aria-label="Next Rate"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

          </div>
        </div>

        {/* Carousel indicator dots (always visible) */}
        <div className="flex gap-2 justify-center mt-6">
          {cards.map((card, i) => (
            <button
              key={card.id}
              onClick={() => setActiveIndex(i)}
              className={`h-2 rounded-full transition-all duration-350 cursor-pointer border-none outline-none ${
                activeIndex === i 
                  ? "bg-accent w-8" 
                  : "bg-dots-inactive hover:opacity-85 w-2"
              }`}
              aria-label={`Go to rate ${i + 1}`}
            />
          ))}
        </div>

      </div>

      {/* Decorative Radial Background Light */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(139,111,62,0.06)_0%,transparent_60%)] pointer-events-none" />
    </section>
  );
}
