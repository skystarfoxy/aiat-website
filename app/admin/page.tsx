import { createClient } from '@/lib/supabase/server'
import { FileText, Type, Users, Calendar, Briefcase } from 'lucide-react'
import Link from 'next/link'

export default async function AdminDashboard() {
  const supabase = createClient()

  if (!supabase) {
    return (
      <div className="bg-white p-8 rounded-2xl border border-red-100 shadow-sm text-center">
        <h1 className="font-syne font-700 text-2xl text-text-primary mb-4">Eroare de configurare</h1>
        <p className="text-text-secondary font-grotesk">
          Serviciul Supabase nu este configurat corect. Vă rugăm să verificați variabilele de mediu.
        </p>
      </div>
    )
  }

  const { count: postsCount } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })

  const { count: contentCount } = await supabase
    .from('site_content')
    .select('*', { count: 'exact', head: true })

  const { count: teamCount } = await supabase
    .from('team_members')
    .select('*', { count: 'exact', head: true })

  const { count: eventsCount } = await supabase
    .from('events')
    .select('*', { count: 'exact', head: true })

  const { count: projectsCount } = await supabase
    .from('projects')
    .select('*', { count: 'exact', head: true })

  return (
    <div>
      <h1 className="font-syne font-700 text-3xl text-text-primary mb-8">Bun venit în administrare</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Posts Stat Card */}
        <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <FileText size={24} className="text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-syne font-700 text-lg text-text-primary mb-1">Articole Blog</h3>
            <p className="text-3xl font-bold font-syne text-text-primary mb-2">
              {postsCount ?? 0}
            </p>
            <Link href="/admin/posts" className="text-sm font-medium text-primary hover:underline">
              Gestionează articolele &rarr;
            </Link>
          </div>
        </div>

        {/* Content Stat Card */}
        <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
            <Type size={24} className="text-accent" />
          </div>
          <div className="flex-1">
            <h3 className="font-syne font-700 text-lg text-text-primary mb-1">Elemente de Text</h3>
            <p className="text-3xl font-bold font-syne text-text-primary mb-2">
              {contentCount ?? 0}
            </p>
            <Link href="/admin/content" className="text-sm font-medium text-accent hover:underline">
              Editează texte site &rarr;
            </Link>
          </div>
        </div>

        {/* Team Stat Card */}
        <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
            <Users size={24} className="text-orange-500" />
          </div>
          <div className="flex-1">
            <h3 className="font-syne font-700 text-lg text-text-primary mb-1">Membri Echipă</h3>
            <p className="text-3xl font-bold font-syne text-text-primary mb-2">
              {teamCount ?? 0}
            </p>
            <Link href="/admin/team" className="text-sm font-medium text-orange-500 hover:underline">
              Gestionează echipa &rarr;
            </Link>
          </div>
        </div>

        {/* Events Stat Card */}
        <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
            <Calendar size={24} className="text-blue-500" />
          </div>
          <div className="flex-1">
            <h3 className="font-syne font-700 text-lg text-text-primary mb-1">Evenimente</h3>
            <p className="text-3xl font-bold font-syne text-text-primary mb-2">
              {eventsCount ?? 0}
            </p>
            <Link href="/admin/events" className="text-sm font-medium text-blue-500 hover:underline">
              Gestionează calendar &rarr;
            </Link>
          </div>
        </div>

        {/* Projects Stat Card */}
        <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center shrink-0">
            <Briefcase size={24} className="text-purple-500" />
          </div>
          <div className="flex-1">
            <h3 className="font-syne font-700 text-lg text-text-primary mb-1">Proiecte Actu.</h3>
            <p className="text-3xl font-bold font-syne text-text-primary mb-2">
              {projectsCount ?? 0}
            </p>
            <Link href="/admin/projects" className="text-sm font-medium text-purple-500 hover:underline">
              Gestionează proiecte &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
