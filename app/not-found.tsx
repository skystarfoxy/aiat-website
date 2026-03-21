import { Button } from '@/components/ui/Button';
import { ArrowRight, Home } from 'lucide-react';

/**
 * Custom 404 page — on-brand cu AI Transilvania
 */
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="absolute inset-0 hero-gradient" />

      <div className="relative z-10 text-center px-4 py-20">
        {/* 404 */}
        <div className="font-syne font-800 text-[120px] md:text-[180px] leading-none gradient-text opacity-20 select-none mb-4">
          404
        </div>

        {/* Message */}
        <h1 className="font-syne font-700 text-3xl md:text-4xl text-text-primary mb-4 -mt-6">
          Pagina nu a fost găsită
        </h1>
        <p className="text-text-secondary font-grotesk text-lg max-w-md mx-auto mb-8">
          Pagina pe care o cauți nu există sau a fost mutată.
          Întoarce-te acasă pentru a explora AI Transilvania.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            href="/"
            variant="primary"
            size="lg"
            className="font-syne"
            icon={<Home size={18} />}
            iconPosition="left"
          >
            Pagina Principală
          </Button>
          <Button
            href="/#contact"
            variant="secondary"
            size="lg"
            className="font-syne"
            icon={<ArrowRight size={18} />}
          >
            Contactează-ne
          </Button>
        </div>
      </div>
    </div>
  );
}
