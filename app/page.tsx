import { Hero } from '@/components/sections/Hero';
import { StatsBar } from '@/components/sections/StatsBar';
import { About } from '@/components/sections/About';
import { Mission } from '@/components/sections/Mission';
import { Projects } from '@/components/sections/Projects';
import { Events } from '@/components/sections/Events';
import { Team } from '@/components/sections/Team';
import { Contact } from '@/components/sections/Contact';
import { getSiteContent } from '@/lib/getContent'
import { createClient } from '@/lib/supabase/server'

/**
 * Homepage — AI Transilvania main landing page
 * Fetching dynamic content from Supabase.
 */
export default async function HomePage() {
  // SAFE MODE: Dezactivăm Supabase pentru a diagnostica 503
  // Folosim doar conținutul static (fallback-uri)
  const teamMembers: any[] = []
  const eventsList: any[] = []
  const projectsList: any[] = []
  const content: Record<string, string> = {}

  // Fallbacks pentru texte (dacă baza de date e inaccesibilă)
  const hero_title = content['hero_title'] || 'Inteligență Artificială pentru Transilvania'
  const hero_subtitle = content['hero_subtitle'] || 'Cercetare, educație și inovație din inima României spre orizontul european.'
  const about_title = content['about_title'] || 'Despre AI Transilvania'
  const about_description = content['about_description'] || 'O organizație dedicată promovării AI în mod responsabil și durabil.'

  return (
    <main className="min-h-screen">
      <Hero title={hero_title} subtitle={hero_subtitle} />
      <StatsBar />
      <About title={about_title} description={about_description} />
      <Mission />
      <Projects projects={projectsList} />
      <Events events={eventsList} />
      <Team members={teamMembers} />
      <Contact />
    </main>
  );
}
