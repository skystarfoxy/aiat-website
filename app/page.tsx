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
  let teamMembers = []
  let eventsList = []
  let projectsList = []
  let content: Record<string, string> = {}

  try {
    content = await getSiteContent()
    
    // Extragem Echipă
    const { data: team } = await supabase
      .from('team_members')
      .select('*')
      .order('order_index', { ascending: true })
    if (team) teamMembers = team

    // Extragem Evenimente
    const { data: events } = await supabase
      .from('events')
      .select('*')
      .order('date_value', { ascending: false })
    if (events) eventsList = events

    // Extragem Proiecte
    const { data: projects } = await supabase
      .from('projects')
      .select('*')
      .order('order_index', { ascending: true })
    if (projects) projectsList = projects
  } catch (err) {
    console.error('HomePage data fetching error:', err)
  }

  return (
    <main className="min-h-screen">
      <Hero 
        title={hero_title}
        subtitle={hero_subtitle}
      />
      <StatsBar />
      <About 
        title={about_title}
        description={about_description}
      />
      <Mission />
      <Projects projects={projectsList || []} />
      <Events events={eventsList || []} />
      <Team members={teamMembers || []} />
      <Contact />
    </main>
  );
}
