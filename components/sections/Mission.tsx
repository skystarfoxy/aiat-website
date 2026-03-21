import { SectionReveal } from '@/components/ui/SectionReveal';
import { FlaskConical, GraduationCap, Lightbulb, ArrowRight, Shield, Globe, Heart } from 'lucide-react';

const pillars = [
  {
    icon: FlaskConical,
    title: 'Cercetare',
    subtitle: 'Știință aplicată',
    description:
      'Desfășurăm cercetare aplicată în procesarea limbajului natural (NLP), computer vision, AI pentru sănătate și sisteme de decizie asistată. Colaborăm cu universități și institute de cercetare din România și Europa.',
    features: [
      'Publicații în conferințe internaționale',
      'Seturi de date pentru limba română',
      'Cercetare interdisciplinară',
      'Accesibilitate open-source',
    ],
    gradient: 'from-primary/20 to-primary/5',
    border: 'border-primary/20',
    iconBg: 'bg-primary/15',
    iconColor: 'text-primary',
    tag: 'NLP · Computer Vision · Healthcare AI',
    delay: 0,
  },
  {
    icon: GraduationCap,
    title: 'Educație',
    subtitle: 'Cunoaștere pentru toți',
    description:
      'Credem că educația în AI trebuie să fie accesibilă tuturor, de la elevi și studenți până la profesioniști și decidenți. Organizăm workshop-uri, cursuri gratuite, hackathoane și programe de mentorat.',
    features: [
      'Cursuri gratuite online și offline',
      'Program național pentru licee',
      'Mentorat pentru studenți și cercetători',
      'Materiale educaționale în română',
    ],
    gradient: 'from-accent/20 to-accent/5',
    border: 'border-accent/20',
    iconBg: 'bg-accent/15',
    iconColor: 'text-accent',
    tag: 'Cursuri · Workshop-uri · Mentorat',
    delay: 150,
  },
  {
    icon: Lightbulb,
    title: 'Inovație',
    subtitle: 'Impact real în societate',
    description:
      'Conectăm lumea academică cu industria și sectorul public pentru a transforma cercetarea în soluții cu impact real. Susținem startup-urile AI și accelerăm adopția tehnologiilor inteligente în România.',
    features: [
      'Incubare proiecte AI cu impact social',
      'Accelerator pentru startup-uri AI',
      'Consultanță pentru sectorul public',
      'Transfer tehnologic cercetare–industrie',
    ],
    gradient: 'from-violet-500/20 to-violet-500/5',
    border: 'border-violet-500/20',
    iconBg: 'bg-violet-500/15',
    iconColor: 'text-violet-400',
    tag: 'Startup-uri · Consultanță · Transfer',
    delay: 300,
  },
];

const values = [
  {
    icon: Shield,
    title: 'Responsabilitate',
    description: 'AI etică și transparentă, în beneficiul întregii societăți.',
  },
  {
    icon: Globe,
    title: 'Colaborare',
    description: 'Construim poduri între comunități, discipline și frontiere.',
  },
  {
    icon: Heart,
    title: 'Incluziune',
    description: 'Facem AI accesibil și benefic pentru toată lumea.',
  },
];

/**
 * Mission — three-column pillar cards + central quote + values row
 */
export function Mission() {
  return (
    <section
      id="misiune"
      className="section-padding bg-slate-50 relative overflow-hidden"
      aria-labelledby="misiune-heading"
    >
      {/* Decorative blobs */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/4 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <SectionReveal className="text-center mb-16">
          <span className="label-accent text-primary block mb-3">Ce facem</span>
          <h2
            id="misiune-heading"
            className="text-headline font-syne font-700 text-text-primary mb-4"
          >
            Misiune & <span className="gradient-text">Valori</span>
          </h2>
          <p className="text-text-secondary font-grotesk max-w-2xl mx-auto text-lg leading-relaxed">
            Trei piloni fundamentali care ghidează fiecare proiect, eveniment și parteneriat
            pe care îl construim.
          </p>
        </SectionReveal>

        {/* Three pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <SectionReveal key={pillar.title} delay={pillar.delay}>
                <div
                  className={[
                    'group h-full flex flex-col',
                    'bg-white rounded-2xl p-7 shadow-card',
                    'border', pillar.border,
                    'card-glow',
                  ].join(' ')}
                >
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-5">
                    <div className={`w-12 h-12 rounded-xl ${pillar.iconBg} flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110`}>
                      <Icon size={22} className={pillar.iconColor} />
                    </div>
                    <div>
                      <div className="font-syne font-800 text-lg text-text-primary leading-tight">
                        {pillar.title}
                      </div>
                      <div className="text-xs text-muted font-grotesk mt-0.5">
                        {pillar.subtitle}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-text-secondary font-grotesk text-sm leading-relaxed mb-6 flex-1">
                    {pillar.description}
                  </p>

                  {/* Features list */}
                  <ul className="flex flex-col gap-2 mb-5">
                    {pillar.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2.5 text-xs text-text-secondary font-grotesk">
                        <ArrowRight size={12} className={pillar.iconColor} />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Tag */}
                  <div className={`text-[10px] font-grotesk font-500 ${pillar.iconColor} opacity-70 tracking-wider uppercase`}>
                    {pillar.tag}
                  </div>
                </div>
              </SectionReveal>
            );
          })}
        </div>

        {/* Central inspirational quote */}
        <SectionReveal>
          <blockquote className="relative text-center py-12 px-6 md:px-16">
            {/* Decorative quote marks */}
            <div className="absolute top-0 left-8 text-[120px] leading-none text-primary/10 font-syne font-800 select-none">
              &ldquo;
            </div>
            <div className="absolute bottom-0 right-8 text-[120px] leading-none text-primary/10 font-syne font-800 select-none">
              &rdquo;
            </div>

            <p className="relative text-display font-syne font-700 gradient-text-indigo italic max-w-4xl mx-auto leading-tight">
              Inteligența artificială nu este viitorul. Este prezentul —
              și noi suntem cei care îl construim responsabil.
            </p>

            <footer className="mt-6">
              <div className="section-divider mx-auto mb-4" />
              <cite className="text-muted font-grotesk text-sm not-italic">
                — Principiile fondatoare, noiembrie 2025
              </cite>
            </footer>
          </blockquote>
        </SectionReveal>

        {/* Values row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
          {values.map((value, i) => {
            const Icon = value.icon;
            return (
              <SectionReveal key={value.title} delay={i * 100}>
                <div className="flex items-start gap-4 p-5 rounded-xl bg-white border border-border shadow-sm hover:border-primary/30 hover:shadow-md transition-all duration-300">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-syne font-700 text-text-primary text-sm mb-1">
                      {value.title}
                    </div>
                    <p className="text-xs text-text-secondary font-grotesk leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
