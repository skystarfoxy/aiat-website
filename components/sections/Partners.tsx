import { SectionReveal } from '@/components/ui/SectionReveal';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Handshake } from 'lucide-react';

const partnershipTypes = [
  {
    title: 'Partener Academic',
    description: 'Colaborare în cercetare, acces la studenți și doctoranzi, co-publicații și schimb de expertiză.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
  },
  {
    title: 'Partener Corporate',
    description: 'Sponsorizare, mentorat, acces la talent AI și networking cu comunitatea noastră în creștere.',
    color: 'text-accent',
    bg: 'bg-accent/10',
    border: 'border-accent/20',
  },

  {
    title: 'Partener Instituțional',
    description: 'Colaborare pentru politici publice, proiecte europene și programe educative în AI.',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
  },
];

/**
 * Partners — asociație nou-înființată, fără parteneri inventați
 */
export function Partners() {
  return (
    <section
      id="parteneri"
      className="section-padding bg-background relative overflow-hidden"
      aria-labelledby="parteneri-heading"
    >
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-accent/4 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <SectionReveal className="text-center mb-14">
          <span className="label-accent text-primary block mb-3">Ecosistemul nostru</span>
          <h2
            id="parteneri-heading"
            className="text-headline font-syne font-700 text-text-primary mb-4"
          >
            <span className="gradient-text">Parteneri</span> & Colaboratori
          </h2>
          <p className="text-text-secondary font-grotesk max-w-2xl mx-auto text-lg leading-relaxed">
            Suntem deschiși colaborărilor cu universități, companii și instituții
            care împărtășesc viziunea noastră despre AI responsabil.
          </p>
        </SectionReveal>

        {/* Mock Partners Grid */}
        <SectionReveal className="mb-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { name: 'Universitatea "Lucian Blaga" din Sibiu', type: 'Partener Academic' },
              { name: 'TechHub Transilvania', type: 'Partener Strategic' },
              { name: 'Consiliul Județean Sibiu', type: 'Partener Instituțional' },
              { name: 'Romanian AI Community', type: 'Partener Comunitar' },
            ].map((partner, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-xl p-6 md:p-8 flex flex-col items-center justify-center text-center border border-border shadow-sm hover:border-primary/30 hover:shadow-md transition-all duration-300 card-glow group h-full cursor-default"
              >
                <div className="w-12 h-12 rounded-full bg-slate-100 border border-border flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="font-syne font-700 text-lg text-text-primary opacity-60">
                    {partner.name.charAt(0)}
                  </span>
                </div>
                <h4 className="font-syne font-600 text-text-primary text-sm md:text-base mb-2 group-hover:text-primary transition-colors">
                  {partner.name}
                </h4>
                <p className="text-[10px] md:text-xs font-grotesk text-muted uppercase tracking-wider">
                  {partner.type}
                </p>
              </div>
            ))}
          </div>
        </SectionReveal>

        {/* Partnership tiers */}
        <SectionReveal>
          <div className="flex items-center gap-3 mb-8">
            <Handshake size={18} className="text-primary" />
            <h3 className="font-syne font-700 text-text-primary text-lg">
              Tipuri de parteneriat
            </h3>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {partnershipTypes.map((type, index) => (
            <SectionReveal key={type.title} delay={index * 100}>
              <div
                className={[
                  'bg-white rounded-2xl p-6 shadow-sm',
                  'border', type.border,
                  'hover:scale-[1.02] hover:shadow-md transition-all duration-300',
                ].join(' ')}
              >
                <div className={`w-10 h-10 rounded-xl ${type.bg} ${type.border} border flex items-center justify-center mb-4`}>
                  <Handshake size={18} className={type.color} />
                </div>
                <h4 className={`font-syne font-700 text-base mb-2 ${type.color}`}>
                  {type.title}
                </h4>
                <p className="text-sm text-text-secondary font-grotesk leading-relaxed">
                  {type.description}
                </p>
              </div>
            </SectionReveal>
          ))}
        </div>

        {/* CTA banner */}
        <SectionReveal>
          <div className="bg-white rounded-2xl p-8 md:p-12 border border-primary/20 shadow-card text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/3 to-transparent" />
            <div className="relative">
              <h3 className="font-syne font-700 text-text-primary text-2xl mb-3">
                Devino partener
              </h3>
              <p className="text-text-secondary font-grotesk mb-6 max-w-lg mx-auto">
                Construiți alături de noi ecosistemul AI din Transilvania și din România.
                Suntem deschiși oricărei forme de colaborare.
              </p>
              <Button
                href="#contact"
                variant="primary"
                size="lg"
                className="font-syne"
                icon={<ArrowRight size={18} />}
              >
                Contactează-ne
              </Button>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
