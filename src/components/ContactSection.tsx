interface ContactSectionProps {
  onTriggerToast: (msg: string) => void;
  onScrollToRates: () => void;
}

export default function ContactSection({ onTriggerToast, onScrollToRates }: ContactSectionProps) {
  return (
    <section id="contact" className="bg-sec-bg py-16 sm:py-20 md:py-28 text-center text-text-primary relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-text-primary tracking-tighter leading-tight">
          Ready to fly?
        </h2>
        <p className="text-text-secondary text-lg mt-4 mb-10 max-w-xl mx-auto leading-relaxed">
          Your next journey starts with one message. Partner with the world's most accessible privatized fleet today.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-sm sm:max-w-none mx-auto px-4">
          <button 
            onClick={() => onTriggerToast("Direct secure line concierge communication opened.")}
            className="w-full sm:w-auto bg-btn-book-bg text-btn-book-text rounded-full px-8 py-3.5 font-semibold hover:bg-opacity-90 hover:scale-102 transition-all cursor-pointer border-none outline-none inline-block shadow-lg shadow-accent/5"
          >
            Get In Touch
          </button>
          <button 
            onClick={onScrollToRates}
            className="w-full sm:w-auto bg-btn-discover-bg text-btn-discover-text rounded-full px-8 py-3.5 font-semibold hover:bg-opacity-95 hover:scale-102 transition-all cursor-pointer border-none outline-none inline-block"
          >
            View Rates
          </button>
        </div>
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,111,62,0.04)_0%,transparent_70%)] pointer-events-none" />
    </section>
  );
}
