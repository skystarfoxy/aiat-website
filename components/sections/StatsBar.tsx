import { SectionReveal } from '@/components/ui/SectionReveal';
import { Calendar, MapPin, Flag, Users } from 'lucide-react';

const stats = [
  {
    icon: Flag,
    value: '18 Nov',
    label: 'Data înființării',
    description: 'Fondată oficial în noiembrie 2025',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    borderColor: 'border-primary/20',
  },
  {
    icon: MapPin,
    value: 'Sibiu',
    label: 'Sediu',
    description: 'Dumbrăveni, Județul Sibiu, România',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
    borderColor: 'border-accent/20',
  },
  {
    icon: Calendar,
    value: '2025',
    label: 'An de referință',
    description: 'CUI 52944303 · Asociație nonprofit',
    color: 'text-primary-light',
    bgColor: 'bg-primary-light/10',
    borderColor: 'border-primary-light/20',
  },
  {
    icon: Users,
    value: 'Open',
    label: 'Înscrieri deschise',
    description: 'Primim membri fondatori acum',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-400/10',
    borderColor: 'border-emerald-400/20',
  },
];

/**
 * StatsBar — informații reale despre asociație
 */
export function StatsBar() {
  return (
    <section
      aria-label="Informații AI Transilvania"
      className="relative py-16 border-y border-border overflow-hidden bg-white"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/3 via-transparent to-accent/3" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <SectionReveal
                key={stat.label}
                delay={index * 100}
                className="group"
              >
                <div
                  className={[
                    'flex flex-col items-center text-center p-6 rounded-2xl',
                    'bg-white border shadow-sm',
                    stat.borderColor,
                    'transition-all duration-300',
                    'hover:scale-105 hover:shadow-card',
                  ].join(' ')}
                >
                  <div className={`w-11 h-11 rounded-xl ${stat.bgColor} ${stat.borderColor} border flex items-center justify-center mb-4`}>
                    <Icon size={20} className={stat.color} />
                  </div>

                  <div className={`font-syne font-800 text-2xl mb-1 ${stat.color}`}>
                    {stat.value}
                  </div>

                  <div className="font-syne font-700 text-text-primary text-sm mb-1.5">
                    {stat.label}
                  </div>

                  <p className="text-xs text-muted font-grotesk leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
