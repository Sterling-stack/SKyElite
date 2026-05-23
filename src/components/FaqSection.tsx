import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function FaqSection() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const faqData = [
    {
      q: "How quickly can I book a flight?",
      a: "Flights can be fully prepared and dispatched in as little as 2 hours from confirmation. Our concierge works around the clock to secure landing slots, catering, and crew assignments on short notice."
    },
    {
      q: "What aircraft types are available?",
      a: "Our managed fleet includes everything from light cabin turboprops for quick regional hops to stand-up mid-size jets, luxury heavy airliners with full kitchens, and ultra-long-range global business jets."
    },
    {
      q: "Are there membership fees?",
      a: "No. SkyElite operates on a completely transparent, on-demand pricing model. You pay only for the hours you fly, with no heavy up-front lease capital commitments or hidden positioning fees."
    },
    {
      q: "How is my privacy protected?",
      a: "Absolute confidentiality is our standard. Flight manifests, passenger lists, and itineraries are kept under airtight security protocols. We offer complete off-radar ground handling and private FBO gates."
    },
    {
      q: "What destinations do you fly to?",
      a: "We operate globally, flying to over 5,000 corporate jets and private airports. We can land at smaller, regional airports closer to your destination that commercial airlines simply cannot reach."
    },
    {
      q: "Is catering included in the rate?",
      a: "Yes, standard executive catering, luxury beverages, and custom crew services are included in all of our Super Mid-size and Heavy cabin rates, tailored to your dietary guidelines."
    }
  ];

  return (
    <section id="faq" className="bg-page-bg py-16 sm:py-20 md:py-28 text-text-primary relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-widest text-accent uppercase mb-4 block">
            FAQ
          </span>
          <h2 className="text-4xl md:text-5xl font-normal text-text-primary tracking-tighter leading-tight">
            Questions, answered.
          </h2>
        </div>
        
        <div className="divide-y divide-card-border border-t border-b border-card-border">
          {faqData.map((item, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div key={index} className="py-5">
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="flex justify-between items-center w-full text-left focus:outline-none group cursor-pointer border-none bg-transparent"
                >
                  <span className="text-text-primary font-medium text-base sm:text-lg group-hover:text-accent transition-colors">
                    {item.q}
                  </span>
                  <div className="text-accent ml-4 flex-shrink-0 transition-transform duration-300">
                    {isOpen ? <ChevronUp className="w-5 h-5 animate-pulse" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, marginTop: 0 }}
                      animate={{ height: "auto", opacity: 1, marginTop: 12 }}
                      exit={{ height: 0, opacity: 0, marginTop: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-text-secondary text-base leading-relaxed pb-2">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
