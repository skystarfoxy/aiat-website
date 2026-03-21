'use client';

import { useState } from 'react';
import { SectionReveal } from '@/components/ui/SectionReveal';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MapPin, ChevronDown, ChevronUp, ArrowRight, Calendar, Flag, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

const timeline = [
  {
    year: '2025',
    title: 'Fondarea AI Transilvania',
    description:
      'Asociația este înregistrată oficial în Dumbrăveni, Sibiu, la data de 18 noiembrie 2025, cu CUI 52944303.',
    icon: Flag,
    color: 'text-primary',
    dot: 'bg-primary',
  },
  {
    year: '2026',
    title: 'Primii pași',
    description:
      'Construim comunitatea, definim proiectele și parteneriatele inițiale. Suntem la început — fii printre primii membri!',
    icon: Globe,
    color: 'text-accent',
    dot: 'bg-accent',
  },
];

const faqs = [
  {
    q: 'Ce statut juridic are AI Transilvania?',
    a: 'AI Transilvania este o asociație nonprofit înregistrată în România conform OG 26/2000, cu sediul în Dumbrăveni, Jud. Sibiu. Funcționăm în baza unui statut și act constitutiv depuse la Judecătoria Mediaș.',
  },
  {
    q: 'Cum se finanțează AI Transilvania?',
    a: 'Prin cotizații ale membrilor, granturi de cercetare (Horizon Europe, PNCDI), sponsorizări de la companii tech, donații și proiecte europene cofinanțate din fonduri structurale.',
  },
  {
    q: 'Pot deveni membru din altă localitate?',
    a: 'Da, primim membri din întreaga România și din diaspora. Participarea poate fi fizică (la evenimentele din Sibiu și alte centre) sau online. Există o cotizație anuală simbolică.',
  },
  {
    q: 'Oferă AI Transilvania stagii sau burse?',
    a: 'Da. Anual oferim 3–5 stagii de cercetare plătite pentru studenți și masteranzi, în cadrul proiectelor active. De asemenea, co-organizăm tabere de vară și hackathoane cu premii.',
  },
];

/**
 * About — split layout with timeline, address card, and FAQ accordion
 */
export function About({ title, description }: { title?: string, description?: string }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section
      id="despre"
      className="section-padding bg-background relative overflow-hidden"
      aria-labelledby="despre-heading"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/4 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <SectionReveal className="text-center mb-16">
          <span className="label-accent text-primary block mb-3">Cine suntem</span>
          <h2
            id="despre-heading"
            className="text-headline font-syne font-700 text-text-primary mb-4"
          >
            {title || "Despre AI Transilvania"}
          </h2>
          <p className="text-text-secondary font-grotesk max-w-2xl mx-auto text-lg leading-relaxed">
            {description || "O organizație fondată de oameni care cred că inteligența artificială poate transforma societatea — în mod responsabil, inclusiv și durabil."}
          </p>
        </SectionReveal>

        {/* Split layout: text + visual */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">

          {/* Left: Text + Timeline */}
          <SectionReveal direction="left">
            <Badge variant="primary" dot className="mb-5">
              Asociație Nonprofit
            </Badge>

            <h3 className="font-syne font-700 text-2xl text-text-primary mb-4 leading-tight">
              Din inima Transilvaniei,<br />
              spre horizont European
            </h3>

            <p className="text-text-secondary font-grotesk leading-relaxed mb-6">
              AI Transilvania a luat naștere din convingerea că România are potențialul de a deveni
              un actor relevant în ecosistemul global de AI. Reunim cercetători, ingineri,
              studenți și organizații care doresc să contribuie la această transformare.
            </p>

            <p className="text-text-secondary font-grotesk leading-relaxed mb-8">
              Ne axăm pe trei piloni: cercetare aplicată în NLP și computer vision,
              programe educaționale pentru toate nivelurile, și construirea unui ecosistem
              de inovație cu impact social real.
            </p>

            {/* Timeline */}
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-4 top-4 bottom-4 w-px timeline-line opacity-30" />

              <div className="flex flex-col gap-6">
                {timeline.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="relative pl-12 group">
                      {/* Dot */}
                      <div className={cn(
                        'absolute left-0 top-1 w-8 h-8 rounded-full',
                        'flex items-center justify-center',
                        'bg-white border border-border shadow-sm',
                        'transition-all duration-300 group-hover:border-primary/40'
                      )}>
                        <div className={cn('w-2.5 h-2.5 rounded-full', item.dot)} />
                      </div>

                      <div className="bg-white border border-border rounded-xl p-4 shadow-sm transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-md">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={cn('font-syne font-700 text-sm', item.color)}>
                            {item.year}
                          </span>
                          <span className="text-muted text-xs">·</span>
                          <span className="font-syne font-600 text-text-primary text-sm">
                            {item.title}
                          </span>
                        </div>
                        <p className="text-xs text-text-secondary font-grotesk leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </SectionReveal>

          {/* Right: Map visual + Address card + FAQ */}
          <SectionReveal direction="right">
            {/* Romania Map Visual */}
            <div className="rounded-2xl border border-border shadow-card mb-6 overflow-hidden">
              <div className="relative bg-slate-50 rounded-xl overflow-hidden h-[280px]">
                {/* Stylized Romania map SVG */}
                <div className="absolute inset-0 bg-grid opacity-40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    {/* Romania outline simplified */}
                    <svg
                      viewBox="0 0 400 300"
                      className="w-80 h-60 opacity-30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M80 140 L60 110 L70 80 L110 60 L150 50 L190 45 L230 50 L260 40 L290 55 L320 65 L340 90 L350 120 L360 150 L350 180 L330 200 L310 220 L280 235 L250 245 L220 250 L190 248 L160 240 L130 225 L100 210 L75 190 L70 165 Z"
                        stroke="#6366F1"
                        strokeWidth="2"
                        fill="rgba(99, 102, 241, 0.08)"
                      />
                    </svg>

                    {/* Sibiu pin */}
                    <div className="absolute top-[55%] left-[42%]">
                      <div className="relative">
                        {/* Pulse ring */}
                        <div className="absolute -inset-3 rounded-full border border-primary/40 animate-ping" />
                        <div className="absolute -inset-5 rounded-full border border-primary/20 animate-ping [animation-delay:0.3s]" />

                        {/* Pin */}
                        <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center shadow-glow z-10 relative">
                          <div className="w-2 h-2 rounded-full bg-white" />
                        </div>
                      </div>
                    </div>

                    {/* Label */}
                    <div className="absolute top-[43%] left-[52%] font-grotesk text-xs text-primary font-600 whitespace-nowrap">
                      Sibiu
                    </div>
                  </div>
                </div>

                {/* Overlay text */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm border border-border rounded-xl px-4 py-2.5 text-center">
                    <span className="text-xs text-text-secondary font-grotesk">
                      Sediu central: <span className="text-primary font-medium">Dumbrăveni, Jud. Sibiu</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Address Card */}
            <div className="bg-white rounded-2xl p-6 mb-6 border border-primary/15 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-primary" />
                </div>
                <div>
                  <div className="font-syne font-700 text-text-primary mb-1">Sediul Social</div>
                  <address className="not-italic text-text-secondary font-grotesk text-sm leading-relaxed">
                    Str. Erou Bumbea Nr. 10<br />
                    Dumbrăveni, Jud. Sibiu<br />
                    Cod Poștal: 555100, România
                  </address>
                  <div className="flex items-center gap-2 mt-3 text-xs text-muted">
                    <Calendar size={12} />
                    <span>Program secretariat: Lun–Vin, 09:00–17:00</span>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Accordion */}
            <div>
              <h3 className="font-syne font-700 text-text-primary mb-4">
                Întrebări frecvente
              </h3>
              <div className="flex flex-col gap-2">
                {faqs.map((faq, i) => (
                  <div
                    key={i}
                    className={cn(
                      'bg-white rounded-xl border overflow-hidden shadow-sm',
                      'transition-all duration-300',
                      openFaq === i ? 'border-primary/30' : 'border-border/50'
                    )}
                  >
                    <button
                      type="button"
                      className="w-full flex items-center justify-between p-4 text-left"
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      aria-expanded={openFaq === i ? 'true' : 'false'}
                      aria-controls={`faq-answer-${i}`}
                    >
                      <span className="font-grotesk font-medium text-sm text-text-primary pr-4">
                        {faq.q}
                      </span>
                      <span className="text-muted shrink-0 transition-transform duration-200">
                        {openFaq === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </span>
                    </button>

                    <div
                      id={`faq-answer-${i}`}
                      className={cn(
                        'accordion-content',
                        openFaq === i ? 'accordion-open' : 'accordion-closed'
                      )}
                    >
                      <p className="px-4 pb-4 text-sm text-text-secondary font-grotesk leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <Button
              href="#contact"
              variant="outline"
              size="md"
              className="mt-6 w-full justify-center font-syne"
              icon={<ArrowRight size={16} />}
            >
              Alătură-te asociației
            </Button>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
