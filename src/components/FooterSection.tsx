import { Shield, Star, Twitter, Instagram, Linkedin } from "lucide-react";

interface FooterSectionProps {
  onScrollToSection: (id: string) => void;
  onTriggerToast: (msg: string) => void;
  navLinks: string[];
}

export default function FooterSection({ onScrollToSection, onTriggerToast, navLinks }: FooterSectionProps) {
  return (
    <footer className="bg-footer-bg pt-16 pb-12 text-footer-muted relative border-t border-card-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 font-sans">
          {/* Left Brand */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onScrollToSection("Start");
            }}
            className="text-xl font-semibold text-footer-text tracking-tight hover:text-accent transition-colors"
          >
            SkyElite
          </a>
          
          {/* Center Links */}
          <div className="flex flex-wrap justify-center gap-4 items-center">
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => onScrollToSection(link)}
                className="text-footer-muted text-sm hover:text-footer-text transition-colors cursor-pointer border-none bg-transparent outline-none"
              >
                {link}
              </button>
            ))}
          </div>
          
          {/* Right Social Icons */}
          <div className="flex justify-center gap-4 mt-4 lg:mt-0">
            <a href="#" onClick={(e) => { e.preventDefault(); onTriggerToast("Launching SkyElite Twitter status feed...") }} className="text-footer-muted hover:text-footer-text transition-colors" aria-label="SkyElite Twitter">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); onTriggerToast("Launching SkyElite Instagram journal...") }} className="text-footer-muted hover:text-footer-text transition-colors" aria-label="SkyElite Instagram">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); onTriggerToast("Launching SkyElite LinkedIn newsroom...") }} className="text-footer-muted hover:text-footer-text transition-colors" aria-label="SkyElite LinkedIn">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        <div className="border-t border-card-border mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 pb-2">
          {/* Left copyrights */}
          <div className="text-sm text-footer-muted/80 text-center md:text-left order-3 md:order-1">
            © 2026 SkyElite. All rights reserved.
          </div>
          
          {/* Two trust badges bottom center */}
          <div className="flex flex-col sm:flex-row items-center gap-2 text-xs text-footer-muted/80 text-center order-1 md:order-2">
            <span className="flex items-center gap-1.5 font-medium justify-center">
              <Shield className="w-4 h-4 text-accent" /> ARGUS Platinum Safety Rated
            </span>
            <span className="w-1.5 h-1.5 rounded-full hidden sm:inline-block bg-card-border" />
            <span className="flex items-center gap-1.5 font-medium justify-center">
              <Star className="w-4 h-4 text-accent fill-accent/20" /> Five-Star Concierge
            </span>
          </div>
          
          {/* Right legal */}
          <div className="text-sm text-footer-muted/80 flex gap-4 justify-center order-2 md:order-3">
            <a href="#" onClick={(e) => { e.preventDefault(); onTriggerToast("Opening Privacy policy files...") }} className="hover:text-footer-text transition-colors font-medium">Privacy Policy</a>
            <span>·</span>
            <a href="#" onClick={(e) => { e.preventDefault(); onTriggerToast("Opening Terms of flight service...") }} className="hover:text-footer-text transition-colors font-medium">Terms</a>
          </div>
        </div>
        
      </div>
    </footer>
  );
}
