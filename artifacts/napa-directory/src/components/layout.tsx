import { ReactNode, useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Search, Menu, X, Wine, PawPrint, Instagram, Mail } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Close menu on route change
  useEffect(() => { setMobileOpen(false); }, [location]);

  // Close menu when tapping/clicking anywhere outside the nav (works on iOS too)
  useEffect(() => {
    if (!mobileOpen) return;
    const close = (e: Event) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("touchstart", close, { passive: true });
    document.addEventListener("mousedown", close);
    return () => {
      document.removeEventListener("touchstart", close);
      document.removeEventListener("mousedown", close);
    };
  }, [mobileOpen]);

  const handleCTA = () => {
    window.location.href = "mailto:pupsandvines@gmail.com?subject=List%20My%20Winery";
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/directory", label: "Directory" },
    { href: "/map", label: "Map" },
    { href: "/shop", label: "Shop" },
    { href: "/about", label: "About" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans">
      {/* Top Banner */}
      <div className="bg-primary text-primary-foreground text-center py-2 font-medium">
        <span className="sm:hidden text-[11px] tracking-normal whitespace-nowrap">Every winery is verified dog-friendly — Napa Valley & Sonoma County</span>
        <span className="hidden sm:inline text-xs tracking-wide">Every winery listed here is verified dog-friendly — Napa Valley & Sonoma County</span>
      </div>

      {/* Main Navigation */}
      <header ref={headerRef} className="sticky top-0 z-[9999] glass-panel border-b-0 border-t-0 border-x-0 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative w-10 h-10 flex items-center justify-center bg-accent rounded-xl shadow-inner group-hover:bg-primary transition-colors duration-300">
                <Wine className="absolute w-5 h-5 text-white -translate-x-1 translate-y-1" />
                <PawPrint className="absolute w-4 h-4 text-white/90 translate-x-1.5 -translate-y-1" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl leading-none text-foreground tracking-tight group-hover:text-primary transition-colors">
                  Pups & Vines
                </span>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  Directory Guide
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold transition-colors hover:text-primary ${
                    location === link.href ? "text-primary border-b-2 border-primary pb-1" : "text-foreground/80"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="hidden md:flex items-center gap-4">
              <Link href="/directory" className="p-2 text-foreground/80 hover:text-primary transition-colors rounded-full hover:bg-secondary">
                <Search className="w-5 h-5" />
              </Link>
              <button 
                onClick={handleCTA}
                className="px-5 py-2.5 text-sm font-bold bg-primary text-primary-foreground rounded-xl shadow-md hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                List Your Winery
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-foreground/80 hover:text-primary transition-colors"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Floating Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div
                className="md:hidden fixed inset-0 z-[9998]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                onPointerDown={() => setMobileOpen(false)}
              />
              <motion.div
                className="md:hidden absolute right-4 top-[calc(100%+10px)] z-[9999] w-56 rounded-2xl border border-border/50 bg-white/96 backdrop-blur-2xl shadow-2xl shadow-black/20 overflow-hidden"
                initial={{ opacity: 0, scale: 0.94, y: -8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: -8 }}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                style={{ transformOrigin: "top right" }}
              >
                <div className="h-0.5 w-full bg-gradient-to-r from-primary/70 via-accent/50 to-transparent" />

                <nav className="p-2 flex flex-col gap-0.5">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 + i * 0.04, duration: 0.2 }}
                    >
                      <Link
                        href={link.href}
                        className={`flex items-center px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                          location === link.href
                            ? "bg-primary/10 text-primary"
                            : "text-foreground/75 hover:bg-stone-100 hover:text-foreground"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <motion.div
                  className="px-2 pb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.22, duration: 0.2 }}
                >
                  <button
                    onClick={() => { setMobileOpen(false); handleCTA(); }}
                    className="w-full px-3 py-2.5 text-sm font-bold bg-primary text-primary-foreground rounded-xl shadow-sm hover:bg-primary/90 transition-all"
                  >
                    List Your Winery
                  </button>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-foreground text-background pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 border-b border-white/10 pb-12">
            
            <div>
              <Link href="/" className="flex items-center gap-2 mb-6">
                <div className="relative w-8 h-8 flex items-center justify-center bg-accent rounded-lg">
                  <Wine className="absolute w-4 h-4 text-white -translate-x-1 translate-y-0.5" />
                  <PawPrint className="absolute w-3 h-3 text-white/90 translate-x-1 -translate-y-1" />
                </div>
                <span className="font-display font-bold text-xl tracking-tight text-white">
                  Pups & Vines
                </span>
              </Link>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                Your trusted guide to verified dog-friendly wineries across Napa Valley and Sonoma County. Every listing is pup-approved.
              </p>
              <div className="flex flex-col gap-4">
                <a
                  href="https://www.instagram.com/pupsandvines"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-fit"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center shadow-md flex-shrink-0">
                    <Instagram className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold leading-tight">Instagram</p>
                    <p className="text-white/50 text-xs">@pupsandvines</p>
                  </div>
                </a>
                <a
                  href="https://www.tiktok.com/@pupsandvines"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-fit"
                >
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shadow-md flex-shrink-0">
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1-.06Z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold leading-tight">TikTok</p>
                    <p className="text-white/50 text-xs">@pupsandvines</p>
                  </div>
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-display font-bold text-lg mb-6 text-white">Explore</h4>
              <ul className="space-y-4 text-sm text-white/60">
                <li><Link href="/directory" className="hover:text-white transition-colors">All Wineries</Link></li>
                <li><Link href="/directory?region=Napa+Valley" className="hover:text-white transition-colors">Napa Valley</Link></li>
                <li><Link href="/directory?region=Sonoma+County" className="hover:text-white transition-colors">Sonoma County</Link></li>
                <li><Link href="/directory?region=Calistoga" className="hover:text-white transition-colors">Calistoga</Link></li>
                <li><Link href="/directory?region=Yountville" className="hover:text-white transition-colors">Yountville</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-display font-bold text-lg mb-6 text-white">Contact</h4>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                Questions, winery submissions, or partnership inquiries? We'd love to hear from you.
              </p>
              <a
                href="mailto:pupsandvines@gmail.com"
                className="flex items-center gap-3 w-fit group"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center shadow-md flex-shrink-0 transition-colors">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold leading-tight">Email Us</p>
                  <p className="text-white/50 text-xs">pupsandvines@gmail.com</p>
                </div>
              </a>
            </div>

          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-white/40">
            <p>&copy; {new Date().getFullYear()} Pups & Vines. An independent directory.</p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
