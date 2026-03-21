import { SectionReveal } from '@/components/ui/SectionReveal';
import { Button } from '@/components/ui/Button';
import { ArrowRight, BookOpen, Clock, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const recentArticles = [
  {
    title: 'De ce are nevoie România de AI Suveran?',
    category: 'Perspectivă',
    date: '10 Nov 2025',
    readTime: '5 min',
    excerpt: 'O privire asupra necesității de a antrena modele fundamentale pe limba și cultura română, pentru a evita bias-urile culturale și pentru a proteja datele noastre.',
    author: 'Radu Popescu',
    imageBg: 'bg-gradient-to-br from-primary/20 to-primary/5',
    link: '#'
  },
  {
    title: 'Cele mai importante tendințe AI în tehnologiile europene',
    category: 'Ecosistem',
    date: '02 Nov 2025',
    readTime: '8 min',
    excerpt: 'Analizăm impactul regulamentului AI Act asupra cercetătorilor și cum se poziționează Europa în fața giganților tehnologici globali în următorul an.',
    author: 'Echipa AI Transilvania',
    imageBg: 'bg-gradient-to-br from-accent/20 to-accent/5',
    link: '#'
  }
];

/**
 * Blog — afișează articole recente și publicații
 */
export function Blog() {
  return (
    <section
      id="blog"
      className="section-padding bg-slate-50 relative overflow-hidden"
      aria-labelledby="blog-heading"
    >
      <div className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-accent/4 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <SectionReveal className="text-center mb-14">
          <span className="label-accent text-primary block mb-3">Idei & Resurse</span>
          <h2
            id="blog-heading"
            className="text-headline font-syne font-700 text-text-primary mb-4"
          >
            Blog & <span className="gradient-text">Resurse</span>
          </h2>
          <p className="text-text-secondary font-grotesk max-w-2xl mx-auto text-lg leading-relaxed">
            Articole, perspective și analize tehnice scrise de membrii comunității noastre.
          </p>
        </SectionReveal>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {recentArticles.map((article, idx) => (
            <SectionReveal key={article.title} delay={idx * 150} className="h-full">
              <a href={article.link} className="block group h-full">
                <div className="bg-white rounded-2xl overflow-hidden border border-border shadow-card hover:border-primary/40 transition-all duration-300 card-glow h-full flex flex-col">
                  {/* Article "Image" */}
                  <div className={cn("h-48 w-full border-b border-border/50 relative overflow-hidden", article.imageBg)}>
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-grotesk font-600 tracking-wider uppercase bg-white/80 backdrop-blur-md border border-white/60 text-text-primary">
                        {article.category}
                      </span>
                    </div>
                    {/* Decorative pattern for the image area */}
                    <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8cGF0aCBkPSJNMCAwTDggOFpNOCAwTDAgOFoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+Cjwvc3ZnPg==')] pointer-events-none" />
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-4 text-xs font-grotesk text-muted mb-4">
                      <span>{article.date}</span>
                      <span className="w-1 h-1 rounded-full bg-border" />
                      <span className="flex items-center gap-1.5">
                        <Clock size={12} />
                        {article.readTime}
                      </span>
                    </div>
                    
                    <h3 className="font-syne font-700 text-text-primary text-xl mb-3 group-hover:text-primary transition-colors duration-200">
                      {article.title}
                    </h3>
                    
                    <p className="text-text-secondary font-grotesk text-sm leading-relaxed mb-6 flex-1">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                      <span className="text-xs font-grotesk font-medium text-text-secondary">
                        De {article.author}
                      </span>
                      <span className="flex items-center gap-1 text-sm font-syne font-600 text-primary group-hover:gap-2 transition-all duration-200">
                        Citește <ChevronRight size={16} />
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            </SectionReveal>
          ))}
        </div>

        {/* View all articles */}
        <SectionReveal delay={300}>
          <div className="flex justify-center">
            <Button
              href="#toate-articolele"
              variant="outline"
              size="md"
              className="font-syne"
              icon={<ArrowRight size={16} />}
            >
              Vezi toate articolele
            </Button>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
