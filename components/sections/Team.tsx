import { SectionReveal } from '../ui/SectionReveal';
import { User, Linkedin } from 'lucide-react';

export function Team({ members }: { members?: any[] }) {
  if (!members || members.length === 0) return null;

  return (
    <section id="echipa" className="py-16 bg-bg-light relative overflow-hidden">
      {/* Background Decorators */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full">
        <SectionReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-syne font-700 text-sm mb-4 border border-primary/20 shadow-sm">
              Echipă
            </span>
            <h2 className="font-syne font-800 text-4xl sm:text-5xl text-text-primary mb-6">
              Oamenii din spatele viziunii
            </h2>
            <p className="font-grotesk text-lg text-text-secondary leading-relaxed">
              Suntem un grup divers de cercetători, dezvoltatori și entuziaști reuniți de o pasiune comună: potențialul inteligenței artificiale.
            </p>
          </div>
        </SectionReveal>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {members.map((member, i) => (
            <SectionReveal key={member.id || i} delay={i * 150}>
              <div
                className="bg-white rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center group h-full"
              >
                {/* Profile Image (Placeholder if empty) */}
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-slate-100 mb-6 border-4 border-white shadow-sm ring-1 ring-border group-hover:ring-primary/30 transition-all shrink-0">
                  {member.image_url ? (
                    <img
                      src={member.image_url}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                      <User size={40} />
                    </div>
                  )}
                </div>

                {/* Info */}
                <h3 className="font-syne font-700 text-lg text-text-primary mb-1">
                  {member.name}
                </h3>
                <p className="text-sm font-grotesk text-accent font-medium mb-4">
                  {member.role}
                </p>
                
                {member.bio && (
                  <p className="text-xs text-text-secondary font-grotesk mb-4 line-clamp-3">
                    {member.bio}
                  </p>
                )}

                {/* Social */}
                {member.linkedin_url && (
                  <div className="mt-auto">
                    <a
                      href={member.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 text-text-secondary hover:bg-primary hover:text-white transition-colors border border-border hover:border-transparent"
                      aria-label={`LinkedIn ${member.name}`}
                    >
                      <Linkedin size={18} />
                    </a>
                  </div>
                )}
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
