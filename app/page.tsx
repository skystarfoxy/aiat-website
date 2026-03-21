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
  const content = await getSiteContent()
  const supabase = createClient()

  // Extragem textele
  const hero_title = content['hero_title'] || undefined
  const hero_subtitle = content['hero_subtitle'] || undefined
  const about_title = content['about_title'] || undefined
  const about_description = content['about_description'] || undefined

  // Extragem Echipă
  const { data: teamMembers } = await supabase
    .from('team_members')
    .select('*')
    .order('order_index', { ascending: true })

  // Extragem Evenimente
  const { data: eventsList } = await supabase
    .from('events')
    .select('*')
    .order('date_value', { ascending: false })

  // Extragem Proiecte
  const { data: projectsList } = await supabase
    .from('projects')
    .select('*')
    .order('order_index', { ascending: true })

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
