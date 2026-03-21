'use client';

import { useState } from 'react';
import { SectionReveal } from '../ui/SectionReveal';
import { Button } from '../ui/Button';
import { Bell } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Events({ events }: { events?: any[] }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  if (!events || events.length === 0) return null;

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  return (
    <section id="evenimente" className="py-16 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left Column: Context & Newsletter */}
          <div className="lg:w-1/3 flex flex-col justify-start">
            <SectionReveal>
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-syne font-700 text-sm mb-4 border border-primary/20 shadow-sm">
                Activitate
              </span>
              <h2 className="font-syne font-800 text-4xl sm:text-5xl text-text-primary mb-6">
                Timeline
              </h2>
              <p className="font-grotesk text-lg text-text-secondary leading-relaxed mb-10">
                Urmărește parcursul asociației și descoperă activitățile prin care aducem inteligența artificială mai aproape de comunitate.
              </p>

              {/* Newsletter Box */}
              <div className="bg-bg-light rounded-3xl p-8 border border-border shadow-sm relative overflow-hidden group">
                <div className="absolute -right-12 -top-12 w-40 h-40 bg-primary/5 rounded-full blur-3xl pointer-events-none transition-all duration-500 group-hover:bg-primary/10" />
                
                <h3 className="font-syne font-700 text-xl text-text-primary mb-3 flex items-center gap-2">
                  <Bell size={20} className="text-primary" />
                  Rămâi la curent
                </h3>
                <p className="font-grotesk text-sm text-text-secondary mb-6">
                  Abonează-te la newsletter pentru a afla primul despre noile inițiative.
                </p>

                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Adresa ta de email..."
                    className="w-full px-4 py-3 rounded-xl border border-border bg-white text-text-primary placeholder:text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm font-grotesk"
                    required
                  />
                  <Button 
                    type="submit" 
                    variant="primary" 
                    className="w-full justify-center group"
                  >
                    {subscribed ? 'Abonat cu succes!' : 'Abonează-te'}
                  </Button>
                </form>
              </div>
            </SectionReveal>
          </div>

          {/* Right Column: Timeline Events */}
          <div className="lg:w-2/3">
            <div className="relative border-l-2 border-slate-200 ml-4 md:ml-6 space-y-12">
              {events.map((event, index) => (
                <SectionReveal key={event.id || index} delay={index * 150}>
                  <div className="relative pl-8 md:pl-12 group">
                    {/* Timeline Dot */}
                    <div
                      className={`absolute left-[-9px] top-1.5 w-4 h-4 rounded-full border-4 border-bg-light transition-colors duration-300 ${
                        event.status === 'upcoming'
                          ? 'bg-primary ring-4 ring-primary/20'
                          : 'bg-slate-300 group-hover:bg-slate-400'
                      }`}
                    />

                    {/* Content */}
                    <div className="bg-white p-6 md:p-8 rounded-2xl border border-border shadow-sm group-hover:shadow-md group-hover:border-primary/20 transition-all">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold font-syne mb-4 ${
                          event.status === 'upcoming'
                            ? 'bg-primary/10 text-primary'
                            : 'bg-slate-100 text-text-secondary'
                        }`}
                      >
                        {event.date_text}
                      </span>

                      <h3 className="font-syne font-700 text-xl text-text-primary mb-3">
                        {event.title}
                      </h3>
                      <p className="font-grotesk text-text-secondary leading-relaxed">
                        {event.description}
                      </p>
                      
                      {event.link_url && (
                        <a href={event.link_url} className="inline-block mt-4 text-sm font-medium text-accent hover:underline">
                          Află mai multe &rarr;
                        </a>
                      )}
                    </div>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
