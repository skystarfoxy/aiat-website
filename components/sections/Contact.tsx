'use client';

import { useState } from 'react';
import { SectionReveal } from '@/components/ui/SectionReveal';
import { Button } from '@/components/ui/Button';
import { MapPin, Mail, Phone, Clock, Send, Linkedin, Github, Twitter, Youtube, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type FormState = 'idle' | 'sending' | 'sent' | 'error';

const contactReasons = [
  'Vreau să devin membru',
  'Propun un proiect de cercetare',
  'Parteneriat instituțional',
  'Sponsorizare / suport financiar',
  'Media / presă',
  'Altceva',
];

const socialLinks = [
  { icon: Linkedin, href: 'https://linkedin.com/company/aiat-ro', label: 'LinkedIn', color: 'hover:bg-blue-500/10 hover:border-blue-500/30 hover:text-blue-400' },
  { icon: Github, href: 'https://github.com/aiat-ro', label: 'GitHub', color: 'hover:bg-slate-100 hover:border-slate-300 hover:text-slate-700' },
  { icon: Twitter, href: 'https://twitter.com/aiat_ro', label: 'Twitter / X', color: 'hover:bg-sky-500/10 hover:border-sky-500/30 hover:text-sky-400' },
  { icon: Youtube, href: 'https://youtube.com/@aiat-ro', label: 'YouTube', color: 'hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400' },
];

/**
 * Contact — split layout: form (left) + info card + social links (right)
 */
export function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    organization: '',
    reason: '',
    message: '',
  });
  const [formState, setFormState] = useState<FormState>('idle');
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  const validate = (): boolean => {
    const newErrors: Partial<typeof form> = {};
    if (!form.name.trim()) newErrors.name = 'Numele este obligatoriu';
    if (!form.email.trim()) newErrors.email = 'Email-ul este obligatoriu';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Email invalid';
    if (!form.message.trim()) newErrors.message = 'Mesajul este obligatoriu';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setFormState('sending');

    try {
      const { sendContactMessage } = await import('@/app/contact/actions');
      const result = await sendContactMessage(form);

      if (result.success) {
        setFormState('sent');
        setForm({ name: '', email: '', organization: '', reason: '', message: '' });
      } else {
        setFormState('error');
        alert(result.error || 'A apărut o eroare.');
      }
    } catch (err) {
      console.error('Contact form error:', err);
      setFormState('error');
      alert('A apărut o eroare la trimiterea mesajului.');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <section
      id="contact"
      className="section-padding bg-slate-50 relative overflow-hidden"
      aria-labelledby="contact-heading"
    >
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-accent/4 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <SectionReveal className="text-center mb-14">
          <span className="label-accent text-primary block mb-3">Hai să vorbim</span>
          <h2
            id="contact-heading"
            className="text-headline font-syne font-700 text-text-primary mb-4"
          >
            <span className="gradient-text">Contact</span> & Colaborare
          </h2>
          <p className="text-text-secondary font-grotesk max-w-2xl mx-auto text-lg leading-relaxed">
            Vrei să devii membru, să propui o colaborare sau să afli mai multe despre asociația noastră?
            Scriem-ne — răspundem în max. 48 de ore.
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* Form (left, wider) */}
          <div className="lg:col-span-3">
            <SectionReveal direction="left">
              <div className="bg-white rounded-2xl p-8 border border-border shadow-card">
                {formState === 'sent' ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-accent/15 border border-accent/25 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={32} className="text-accent" />
                    </div>
                    <h3 className="font-syne font-700 text-text-primary text-xl mb-2">
                      Mesaj trimis!
                    </h3>
                    <p className="text-text-secondary font-grotesk">
                      Mulțumim pentru mesaj. Vă vom răspunde în cel mult 48 de ore.
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-6 font-grotesk"
                      onClick={() => setFormState('idle')}
                    >
                      Trimite alt mesaj
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    <h3 className="font-syne font-700 text-text-primary text-xl mb-6">
                      Trimite un mesaj
                    </h3>

                    {/* Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="contact-name" className="block text-xs font-medium text-text-secondary font-grotesk mb-1.5">
                          Nume complet *
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Ion Popescu"
                          className={cn('form-input', errors.name && 'border-red-500/60 focus:border-red-500')}
                          required
                          aria-describedby={errors.name ? 'name-error' : undefined}
                        />
                        {errors.name && (
                          <p id="name-error" className="text-xs text-red-400 font-grotesk mt-1">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="contact-email" className="block text-xs font-medium text-text-secondary font-grotesk mb-1.5">
                          Adresă email *
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="ion@example.ro"
                          className={cn('form-input', errors.email && 'border-red-500/60 focus:border-red-500')}
                          required
                          aria-describedby={errors.email ? 'email-error' : undefined}
                        />
                        {errors.email && (
                          <p id="email-error" className="text-xs text-red-400 font-grotesk mt-1">
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Organization + Reason */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="contact-org" className="block text-xs font-medium text-text-secondary font-grotesk mb-1.5">
                          Organizație / Instituție
                        </label>
                        <input
                          id="contact-org"
                          type="text"
                          name="organization"
                          value={form.organization}
                          onChange={handleChange}
                          placeholder="Compania ta"
                          className="form-input"
                        />
                      </div>

                      <div>
                        <label htmlFor="contact-reason" className="block text-xs font-medium text-text-secondary font-grotesk mb-1.5">
                          Motivul contactului
                        </label>
                        <select
                          id="contact-reason"
                          name="reason"
                          value={form.reason}
                          onChange={handleChange}
                          className="form-input"
                          aria-label="Selectează motivul contactului"
                        >
                          <option value="">Selectează...</option>
                          {contactReasons.map((r) => (
                            <option key={r} value={r}>{r}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="mb-6">
                      <label htmlFor="contact-message" className="block text-xs font-medium text-text-secondary font-grotesk mb-1.5">
                        Mesaj *
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Descrie pe scurt cum potem colabora sau ce informații cauți..."
                        rows={5}
                        className={cn('form-input resize-none', errors.message && 'border-red-500/60 focus:border-red-500')}
                        required
                        aria-describedby={errors.message ? 'message-error' : undefined}
                      />
                      {errors.message && (
                        <p id="message-error" className="text-xs text-red-400 font-grotesk mt-1">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {/* Privacy notice */}
                    <p className="text-xs text-muted font-grotesk mb-4">
                      Datele tale sunt procesate conform GDPR și{' '}
                      <a href="#" className="text-primary hover:underline">
                        Politicii noastre de Confidențialitate
                      </a>
                      . Nu vom trimite spam niciodată.
                    </p>

                    {/* Submit */}
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      loading={formState === 'sending'}
                      className="w-full justify-center font-syne"
                      icon={<Send size={16} />}
                    >
                      {formState === 'sending' ? 'Se trimite...' : 'Trimite mesajul'}
                    </Button>
                  </form>
                )}
              </div>
            </SectionReveal>
          </div>

          {/* Info column (right) */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <SectionReveal direction="right">
              {/* Contact info card */}
              <div className="bg-white rounded-2xl p-6 border border-border shadow-card">
                <h3 className="font-syne font-700 text-text-primary text-lg mb-5">
                  Informații de contact
                </h3>

                <div className="flex flex-col gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin size={15} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-muted font-grotesk mb-0.5 uppercase tracking-wider">Sediu</div>
                      <address className="not-italic text-sm text-text-secondary font-grotesk leading-relaxed">
                        Str. Erou Bumbea Nr. 10<br />
                        Dumbrăveni, Jud. Sibiu<br />
                        Cod 555100, România
                      </address>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                      <Mail size={15} className="text-accent" />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-muted font-grotesk mb-0.5 uppercase tracking-wider">Email</div>
                      <a
                        href="mailto:asociatia@ia-transilvania.eu"
                        className="text-sm text-text-secondary font-grotesk hover:text-primary transition-colors duration-200"
                      >
                        asociatia@ia-transilvania.eu
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Clock size={15} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-muted font-grotesk mb-0.5 uppercase tracking-wider">Program</div>
                      <div className="text-sm text-text-secondary font-grotesk">
                        Luni – Vineri: 09:00 – 17:00<br />
                        <span className="text-muted text-xs">Răspuns email: max 48h</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SectionReveal>

            <SectionReveal direction="right" delay={150}>
              {/* Social links card */}
              <div className="bg-white rounded-2xl p-6 border border-border shadow-card">
                <h3 className="font-syne font-700 text-text-primary text-base mb-4">
                  Urmărește-ne
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {socialLinks.map(({ icon: Icon, href, label, color }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        'flex items-center gap-2.5 p-3 rounded-xl',
                        'bg-slate-50 border border-border',
                        'text-muted text-sm font-grotesk',
                        'transition-all duration-200',
                        color
                      )}
                      aria-label={label}
                    >
                      <Icon size={16} />
                      <span>{label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </SectionReveal>

            <SectionReveal direction="right" delay={250}>
              {/* Legal info */}
              <div className="bg-white rounded-xl p-5 border border-border shadow-sm">
                <div className="text-xs text-muted font-grotesk space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Denumire:</span>
                    <span>Asoc. de IA Transilvania</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">CUI:</span>
                    <span>52944303</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Înființată:</span>
                    <span>18.11.2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Formă juridică:</span>
                    <span>Asociație nonprofit</span>
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
