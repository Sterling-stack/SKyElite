import React, { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const testimonials = [
    {
      id: 0,
      name: "Marcus Sterling",
      title: "CEO, Sterling Tech Holdings",
      quote: "SkyElite literally changed how our executive team travels. Booking takes minutes, and their ARGUS safety standards give us absolute peace of mind.",
      initials: "MS",
    },
    {
      id: 1,
      name: "Helena Laurent",
      title: "Director, Maison Luxe Group",
      quote: "The extreme level of privacy and absolute attention to detail is unmatched. When they say five-star service, they truly mean every aspect of it.",
      initials: "HL",
    },
    {
      id: 2,
      name: "Aron Donald",
      title: "Managing Partner, Valor Capital",
      quote: "Unbelievable service speed. Last-minute routing changes are handled seamlessly by my assigned concierge, often within an hour.",
      initials: "AD",
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
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [isPaused, testimonials.length]);

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
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    } else if (isRightSwipe) {
      setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }
    setIsPaused(false);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section id="testimonials" className="bg-sec-bg py-16 sm:py-20 md:py-28 text-text-primary relative select-none overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center md:text-left mb-16">
          <span className="text-xs font-semibold tracking-widest text-accent uppercase mb-4 block">
            CLIENT STORIES
          </span>
          <h2 className="text-4xl md:text-5xl font-normal text-text-primary tracking-tighter leading-tight">
            Trusted by those at the top.
          </h2>
        </div>

        {/* Carousel Container Stage */}
        <div 
          className="relative w-full h-[470px] overflow-hidden flex items-center justify-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Cards Frame */}
          <div className="relative w-full h-full flex items-center justify-center">
            
            {testimonials.map((testimonial, i) => {
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
                  transformString = "translateX(calc(-50% - 150px)) translateY(12px) scale(0.85) rotate(-6deg)";
                  opacityVal = 0.4;
                  zIndexVal = 20;
                } else if (isRight) {
                  transformString = "translateX(calc(-50% + 150px)) translateY(12px) scale(0.85) rotate(6deg)";
                  opacityVal = 0.4;
                  zIndexVal = 20;
                }
              } else {
                // Desktop
                if (isCenter) {
                  transformString = "translateX(-50%) translateY(0px) scale(1.1) rotate(0deg)";
                  opacityVal = 1;
                  zIndexVal = 30;
                } else if (isLeft) {
                  transformString = "translateX(calc(-50% - 200px)) translateY(12px) scale(0.9) rotate(-8deg)";
                  opacityVal = 0.5;
                  zIndexVal = 20;
                } else if (isRight) {
                  transformString = "translateX(calc(-50% + 200px)) translateY(12px) scale(0.9) rotate(8deg)";
                  opacityVal = 0.5;
                  zIndexVal = 20;
                }
              }

              return (
                <div
                  key={testimonial.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isCenter) {
                      setActiveIndex(testimonial.id);
                    }
                  }}
                  style={{
                    transform: transformString,
                    opacity: opacityVal,
                    zIndex: zIndexVal,
                  }}
                  className={`absolute left-1/2 top-4 w-[85vw] max-w-[300px] h-auto min-h-[420px] p-6 sm:p-8 rounded-3xl border transition-all duration-500 ease-in-out shadow-2xl flex flex-col justify-between group ${
                    isCenter 
                      ? "bg-card-bg border-accent shadow-accent/20 cursor-default animate-none" 
                      : "bg-card-bg/50 border-card-border hover:border-accent/30 cursor-pointer"
                  } ${!isCenter && isMobile ? "pointer-events-none" : ""}`}
                >
                  {/* Card Content Top to Bottom */}
                  <div className="flex flex-col h-full justify-between items-stretch">
                    {/* Stars + Quote */}
                    <div>
                      {/* 5 stars Star icon fill-accent text-accent size 16 — top */}
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, starIndex) => (
                          <Star key={starIndex} className="w-4 h-4 fill-accent text-accent" />
                        ))}
                      </div>

                      {/* Quote text: text-text-secondary text-base leading-relaxed italic mt-4 */}
                      <p className="text-text-secondary text-base leading-relaxed italic mt-4">
                        "{testimonial.quote}"
                      </p>
                    </div>

                    {/* Divider & Avatar */}
                    <div className="mt-6">
                      {/* Divider border-t border-card-border my-4 */}
                      <div className="border-t border-card-border my-4" />

                      {/* Avatar circle w-10 h-10 rounded-full bg-accent + name text-white font-semibold + title text-gray-400 text-sm — bottom */}
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center font-bold text-page-bg text-sm flex-shrink-0">
                          {testimonial.initials}
                        </div>
                        <div className="overflow-hidden min-w-0">
                          <h4 className="text-text-primary font-semibold text-sm truncate">{testimonial.name}</h4>
                          <span className="text-text-secondary text-xs truncate block">{testimonial.title}</span>
                        </div>
                      </div>
                    </div>
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
                  aria-label="Previous Testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={handleNext}
                  className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 w-11 h-11 bg-card-bg border border-card-border hover:border-accent/30 hover:bg-sec-bg rounded-full flex items-center justify-center text-accent hover:text-text-primary transition-all cursor-pointer z-40 outline-none hover:scale-105 shadow-xl"
                  aria-label="Next Testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

          </div>
        </div>

        {/* Carousel indicator dots (always visible) */}
        <div className="flex gap-2 justify-center mt-6">
          {testimonials.map((testimonial, i) => (
            <button
              key={testimonial.id}
              onClick={() => setActiveIndex(testimonial.id)}
              className={`h-2 rounded-full transition-all duration-350 cursor-pointer border-none outline-none ${
                activeIndex === i 
                  ? "bg-accent w-8" 
                  : "bg-dots-inactive hover:opacity-85 w-2"
              }`}
              aria-label={`Go to testimonial ${testimonial.id + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
