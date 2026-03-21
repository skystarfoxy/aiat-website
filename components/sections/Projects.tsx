import { SectionReveal } from '../ui/SectionReveal';
import { Button } from '../ui/Button';
import { 
  ArrowRight, 
  ExternalLink,
  Database,
  GraduationCap,
  Stethoscope,
  Laptop,
  Briefcase,
  Library
} from 'lucide-react';

const iconsMap: Record<string, any> = {
  Database,
  GraduationCap,
  Stethoscope,
  Laptop,
  Briefcase,
  Library
};

const colorsMap: Record<string, { color: string, bg: string, border: string }> = {
  primary: { color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20' },
  accent: { color: 'text-accent', bg: 'bg-accent/10', border: 'border-accent/20' },
  violet: { color: 'text-violet-500', bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
  rose: { color: 'text-rose-500', bg: 'bg-rose-500/10', border: 'border-rose-500/20' }
};

export function Projects({ projects }: { projects?: any[] }) {
  if (!projects || projects.length === 0) return null;

  return (
    <section
      id="proiecte"
      className="section-padding bg-background relative overflow-hidden"
      aria-labelledby="proiecte-heading"
    >
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/4 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/3 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <SectionReveal className="text-center mb-16">
          <span className="label-accent text-primary block mb-3">Ce construim</span>
          <h2
            id="proiecte-heading"
            className="text-headline font-syne font-700 text-text-primary mb-4"
          >
            Proiectele <span className="gradient-text">Noastre</span>
          </h2>
          <p className="text-text-secondary font-grotesk max-w-2xl mx-auto text-lg leading-relaxed">
            Inițiativele noastre sunt centrate pe rezolvarea problemelor reale folosind potențialul inteligenței artificiale.
          </p>
        </SectionReveal>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {projects.map((project, idx) => {
            const IconComponent = iconsMap[project.icon_name] || Briefcase;
            const theme = colorsMap[project.theme_color] || colorsMap['primary'];

            return (
              <SectionReveal key={project.id || idx} delay={idx * 150} className="h-full">
                <div className="bg-white rounded-2xl p-8 border border-border shadow-card hover:border-primary/30 transition-all duration-300 card-glow h-full flex flex-col group">
                  
                  <div className="flex justify-between items-start mb-6">
                    <div className={`w-14 h-14 rounded-2xl ${theme.bg} ${theme.border} border flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110`}>
                      <IconComponent size={24} className={theme.color} />
                    </div>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-grotesk font-600 tracking-wider uppercase bg-slate-100 border border-border text-muted">
                      {project.status}
                    </span>
                  </div>

                  <div className={`text-xs font-grotesk font-600 mb-2 ${theme.color} tracking-wider uppercase`}>
                    {project.category}
                  </div>
                  
                  <h3 className="font-syne font-700 text-text-primary text-xl mb-3">
                    {project.title}
                  </h3>
                  
                  <p className="text-text-secondary font-grotesk leading-relaxed mb-6 flex-1 text-sm">
                    {project.description}
                  </p>

                  {project.link_url && (
                    <a 
                      href={project.link_url} 
                      className="inline-flex items-center gap-2 text-sm font-syne font-600 text-text-primary hover:text-primary transition-colors duration-200 mt-auto w-fit"
                    >
                      Detalii proiect
                      <ExternalLink size={14} className="opacity-70 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" />
                    </a>
                  )}
                </div>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
