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
  let teamMembers: any[] = []
  let eventsList: any[] = []
  let projectsList: any[] = []
  let content: Record<string, string> = {}

  try {
    const supabase = createClient()
    
    // Încercăm să luăm conținutul paginii
    content = await getSiteContent()
    
    // Încercăm să luăm ceilalți membri (opțional)
    const { data: team } = await supabase.from('team_members').select('*').order('order_index', { ascending: true })
    if (team) teamMembers = team

    const { data: events } = await supabase.from('events').select('*').order('date_value', { ascending: false })
    if (events) eventsList = events

    const { data: projects } = await supabase.from('projects').select('*').order('order_index', { ascending: true })
    if (projects) projectsList = projects
  } catch (err) {
    console.error('Data fetching skipped (expected if no DB connection):', err)
  }

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
