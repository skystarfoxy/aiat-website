import { Cpu, Mail, MapPin, Github, Linkedin, Twitter, Youtube, ExternalLink } from 'lucide-react';

const footerLinks = {
  organizatie: [
    { label: 'Despre Noi', href: '#despre' },
    { label: 'Misiune & Valori', href: '#misiune' },
  ],
  activitate: [
    { label: 'Evenimente', href: '#evenimente' },
  ],
  comunitate: [
    { label: 'Devino Membru', href: '#contact' },
    { label: 'Newsletter', href: '#evenimente' },
    { label: 'Contact', href: '#contact' },
  ],
};

const socialLinks = [
  { icon: Linkedin, href: 'https://linkedin.com/company/aiat-ro', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/aiat-ro', label: 'GitHub' },
  { icon: Twitter, href: 'https://twitter.com/aiat_ro', label: 'Twitter/X' },
  { icon: Youtube, href: 'https://youtube.com/@aiat-ro', label: 'YouTube' },
];

/**
 * Footer — dark, minimal, elegant with organization info, links, and legal
 */
export function Footer() {
  return (
    <footer
      className="bg-slate-50 border-t border-border pt-20 pb-8"
      role="contentinfo"
      aria-label="Footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand column */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0 shadow-sm">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
                  <path d="M12 3 L21 20 H3 Z" fill="none" stroke="white" strokeWidth="2" strokeLinejoin="round" />
                  <line x1="7.5" y1="14" x2="16.5" y2="14" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-syne font-700 text-sm text-text-primary tracking-tight">AI</span>
                <span className="font-syne font-800 text-[10px] text-primary tracking-[0.12em] uppercase">Transilvania</span>
              </div>
            </div>

            <p className="text-text-secondary text-sm leading-relaxed max-w-sm mb-6">
              Asociație nonprofit dedicată promovării inteligenței artificiale responsabile
              în România și Europa. Cercetare, educație, inovație — din inima Transilvaniei.
            </p>

            {/* Address */}
            <div className="flex items-start gap-2.5 text-sm text-muted mb-3">
              <MapPin size={14} className="shrink-0 mt-0.5 text-primary" />
              <span>Str. Erou Bumbea Nr. 10, Dumbrăveni<br />Jud. Sibiu, România</span>
            </div>

            <div className="flex items-center gap-2.5 text-sm text-muted">
              <Mail size={14} className="shrink-0 text-primary" />
              <a
                href="mailto:asociatia@ia-transilvania.eu"
                className="hover:text-primary transition-colors duration-200 animated-underline"
              >
                asociatia@ia-transilvania.eu
              </a>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={[
                    'w-9 h-9 rounded-lg flex items-center justify-center',
                    'bg-white border border-border',
                    'text-muted hover:text-primary hover:border-primary/40 hover:shadow-sm',
                    'transition-all duration-200 hover:-translate-y-0.5',
                  ].join(' ')}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-syne font-600 text-text-primary text-sm uppercase tracking-widest mb-4 opacity-80">
                {title === 'organizatie' ? 'Organizație' : title === 'activitate' ? 'Activitate' : 'Comunitate'}
              </h3>
              <ul className="flex flex-col gap-2.5" role="list">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-text-secondary hover:text-primary transition-colors duration-200 animated-underline font-grotesk"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Legal info */}
            <div className="flex flex-col sm:flex-row items-center gap-4 text-xs text-muted font-grotesk">
              <span>© 2025 Asociația de Inteligență Artificială Transilvania</span>
              <span className="hidden sm:block opacity-40">·</span>
              <span>CUI: 52944303</span>
              <span className="hidden sm:block opacity-40">·</span>
              <span>Înf. 18.11.2025</span>
            </div>

            {/* Legal links */}
            <div className="flex items-center gap-4 text-xs text-muted font-grotesk">
              <a href="#" className="hover:text-primary transition-colors duration-200">
                Politică de Confidențialitate
              </a>
              <a href="#" className="hover:text-primary transition-colors duration-200">
                Termeni de Utilizare
              </a>
              <a
                href="#"
                className="flex items-center gap-1 hover:text-primary transition-colors duration-200"
              >
                ANAF
                <ExternalLink size={10} />
              </a>
            </div>
          </div>

          {/* Legal notice */}
          <p className="text-center text-xs text-muted/50 font-grotesk mt-4 italic">
            Asociație nonprofit înregistrată în România · Toate drepturile rezervate
          </p>
        </div>
      </div>
    </footer>
  );
}
