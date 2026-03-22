'use client';

import { NeuralCanvas } from '@/components/ui/NeuralCanvas';
import { Button } from '@/components/ui/Button';
import { ChevronDown, ArrowRight, Sparkles } from 'lucide-react';

const badges = ['România', 'Europa', 'Global'];

/**
 * Hero — Full viewport landing section.
 * Animațiile staggered sunt CSS-only (hero-anim-1..7) cu will-change: transform, opacity.
 * Conținutul este vizibil SSR — nu depinde de useState/mounted.
 */
export function Hero({ title, subtitle }: { title?: string, subtitle?: string }) {
  return (
    <section
      id="hero"
      className="relative min-h-[95vh] flex flex-col items-center justify-center overflow-hidden"
      aria-label="Secțiune principală AI Transilvania"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 bg-grid opacity-70" />
      <div className="absolute inset-0 hero-gradient" />

      {/* Neural network canvas */}
      <div className="neural-canvas-wrapper">
        <NeuralCanvas />
      </div>

      {/* Gradient vignette la bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-12 flex flex-col items-center justify-center">

        {/* Badges — delay 1 */}
        <div className="hero-anim-1 flex flex-wrap items-center justify-center gap-2 mb-6">
          {badges.map((badge) => (
            <span
              key={badge}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary-dark text-[11px] font-bold font-syne tracking-widest uppercase shadow-sm"
            >
              <Sparkles size={12} className="opacity-80" />
              {badge}
            </span>
          ))}
        </div>

        {/* Label — delay 2 */}
        <div className="hero-anim-2 label-accent text-primary-dark mb-3 opacity-80 tracking-widest text-sm font-semibold">
          AI Transilvania
        </div>

        {/* Main headline — delay 3 */}
        <h1 className="hero-anim-3 text-5xl sm:text-6xl md:text-7xl lg:text-[80px] leading-[1.05] font-syne font-800 text-text-primary max-w-4xl mx-auto mb-6 drop-shadow-sm tracking-tight">
          {title || "Inteligența artificială în slujba Transilvaniei"}
        </h1>

        {/* Sub-headline — delay 4 */}
        <p className="hero-anim-4 text-base md:text-lg text-text-secondary font-grotesk max-w-2xl mx-auto mb-8 leading-relaxed">
          {subtitle || "Cercetare, educație și inovație în AI — fondată în Dumbrăveni, Jud. Sibiu, cu impact regional și european."}
        </p>

        {/* CTA Buttons — delay 5 */}
        <div className="hero-anim-5 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            href="#contact"
            variant="primary"
            size="lg"
            className="font-syne w-full sm:w-auto px-8 py-3.5 text-base shadow-lg shadow-primary/25"
            icon={<ArrowRight size={18} />}
          >
            Află mai multe
          </Button>
        </div>

        {/* Trust indicators — delay 6 */}
        <div className="hero-anim-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mt-12 text-xs text-slate-500 font-medium font-grotesk bg-white/50 backdrop-blur-sm px-6 py-2.5 rounded-full border border-slate-200/60 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span>Fondată 2025</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span>Dumbrăveni, Sibiu</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
            <span>CUI 52944303</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator — delay 7 */}
      <div
        className="hero-anim-7 absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5"
        aria-hidden="true"
      >
        <div className="relative w-5 h-8 rounded-full border border-slate-300 flex items-start justify-center p-1 bg-white/50 backdrop-blur-sm shadow-sm hover:border-primary transition-colors cursor-pointer">
          <div className="hero-scroll-dot w-1 h-2 rounded-full bg-primary" />
        </div>
      </div>
    </section>
  );
}
