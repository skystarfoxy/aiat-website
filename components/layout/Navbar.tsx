'use client';

import { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Menu, X, Cpu } from 'lucide-react';

const navLinks = [
  { href: '#despre', label: 'Despre' },
  { href: '#misiune', label: 'Misiune' },
  { href: '#echipa', label: 'Echipa' },
  { href: '#evenimente', label: 'Evenimente' },
  { href: '#contact', label: 'Contact' },
];

/**
 * Navbar — sticky transparent header that transitions to frosted glass on scroll
 * Features: glassmorphism, mobile hamburger, animated links
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sections = navLinks.map((link) =>
      document.querySelector(link.href)
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection('#' + entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );

    sections.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleMobileLinkClick = () => setMobileOpen(false);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50',
          'transition-all duration-300 ease-out',
          scrolled
            ? 'bg-white/90 backdrop-blur-xl border-b border-border shadow-sm py-3'
            : 'bg-transparent py-5'
        )}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            className="flex items-center justify-between"
            aria-label="Navigare principală"
          >
            {/* Logo */}
            <a
              href="/"
              className="flex items-center gap-2.5 group"
              aria-label="AI Transilvania — Pagina principală"
            >
              {/* Mark */}
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0 shadow-sm group-hover:bg-primary-dark transition-colors duration-200">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
                  <path d="M12 3 L21 20 H3 Z" fill="none" stroke="white" strokeWidth="2" strokeLinejoin="round" />
                  <line x1="7.5" y1="14" x2="16.5" y2="14" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-syne font-700 text-sm text-text-primary tracking-tight group-hover:text-primary transition-colors duration-200">
                  AI
                </span>
                <span className="font-syne font-800 text-[10px] text-primary tracking-[0.12em] uppercase">
                  Transilvania
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center gap-1" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={cn(
                      'px-3 py-2 rounded-lg text-sm font-medium font-grotesk',
                      'transition-all duration-200',
                      'animated-underline',
                      activeSection === link.href
                        ? 'text-primary'
                        : 'text-text-secondary hover:text-text-primary'
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <div className="hidden md:flex items-center gap-3">
              <Button
                href="#contact"
                variant="primary"
                size="sm"
                className="font-syne"
              >
                Devino Membru
              </Button>
            </div>

            {/* Mobile hamburger */}
            <button
              className={cn(
                'md:hidden relative z-10 p-2 rounded-lg',
                'text-text-primary hover:text-primary',
                'transition-colors duration-200',
                'focus-visible:ring-2 focus-visible:ring-primary'
              )}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? 'Închide meniu' : 'Deschide meniu'}
            >
              <div className="relative w-6 h-6">
                <span
                  className={cn(
                    'absolute inset-0 transition-all duration-300',
                    mobileOpen ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'
                  )}
                >
                  <X size={24} />
                </span>
                <span
                  className={cn(
                    'absolute inset-0 transition-all duration-300',
                    mobileOpen ? 'opacity-0 -rotate-90' : 'opacity-100 rotate-0'
                  )}
                >
                  <Menu size={24} />
                </span>
              </div>
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        id="mobile-menu"
        className={cn(
          'fixed inset-0 z-40 md:hidden',
          'bg-white/95 backdrop-blur-xl border-b border-border',
          'transition-all duration-300 ease-out',
          mobileOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        )}
        aria-hidden={!mobileOpen}
      >
        <div className="flex flex-col h-full pt-24 pb-8 px-6">
          {/* Nav links */}
          <nav aria-label="Navigare mobilă">
            <ul className="flex flex-col gap-1" role="list">
              {navLinks.map((link, index) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={handleMobileLinkClick}
                    className={cn(
                      'flex items-center py-4 px-4 rounded-xl',
                      'font-syne font-600 text-xl',
                      'transition-all duration-200',
                      'border border-transparent',
                      activeSection === link.href
                        ? 'text-primary border-primary/20 bg-primary/5'
                        : 'text-text-secondary hover:text-text-primary hover:bg-slate-100',
                      mobileOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                    )}
                    style={{
                      transitionDelay: mobileOpen ? `${index * 60}ms` : '0ms',
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Bottom CTA */}
          <div className="mt-auto pt-6 border-t border-border">
            <Button
              href="#contact"
              variant="primary"
              size="lg"
              className="w-full justify-center font-syne"
              onClick={handleMobileLinkClick}
            >
              Devino Membru
            </Button>

            <div className="flex items-center gap-2 mt-4 justify-center text-muted text-sm">
              <Cpu size={14} />
              <span className="font-grotesk">Dumbrăveni, Sibiu</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
