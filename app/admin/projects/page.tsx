import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Briefcase, Plus, Edit } from 'lucide-react'
import { deleteProject } from './actions'
import { DeleteButton } from '@/components/admin/DeleteButton'

export default async function ProjectsPage() {
  const supabase = createClient()

  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .order('order_index', { ascending: true })
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-syne font-700 text-3xl text-text-primary mb-2">Proiecte</h1>
          <p className="text-text-secondary font-grotesk">Controlează inițiativele asociației afișate public.</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
        >
          <Plus size={18} />
          Adaugă Proiect
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
        {error && (
          <div className="p-6 text-red-500 bg-red-50 border-b border-border">Eroare: {error.message}</div>
        )}

        {!projects || projects.length === 0 ? (
          <div className="p-8 text-center bg-slate-50">
            <Briefcase size={48} className="mx-auto text-muted mb-4 opacity-50" />
            <h3 className="font-syne font-700 text-lg text-text-primary mb-2">Nu există niciun proiect</h3>
            <p className="text-sm text-text-secondary mb-6">Secțiunea Proiecte este ascunsă momentan pe site.</p>
            <Link
              href="/admin/projects/new"
              className="inline-flex items-center gap-2 bg-white border border-border hover:border-primary/50 text-text-primary px-4 py-2 rounded-lg font-medium transition-colors shadow-sm"
            >
              Creează un proiect
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {projects.map((project: any) => (
              <div key={project.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 gap-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 shrink-0 border border-border flex items-center justify-center">
                    {/* Placeholder Icon */}
                    <Briefcase size={20} className="text-slate-400" />
                  </div>
                  <div>
                    <h3 className="font-syne font-700 text-lg text-text-primary mb-1">{project.title}</h3>
                    <div className="flex items-center gap-3 text-sm text-text-secondary font-grotesk">
                      <span className="bg-slate-100 px-2 py-0.5 rounded text-xs uppercase">{project.category}</span>
                      <span className="w-1 h-1 rounded-full bg-border" />
                      <span className={project.status === 'În desfășurare' ? 'text-green-600' : 'text-amber-600'}>
                        {project.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/projects/${project.id}`}
                    className="p-2 text-muted hover:text-primary hover:bg-primary/5 rounded-lg transition-colors border border-transparent"
                    title="Editează"
                  >
                    <Edit size={18} />
                  </Link>
                  <form action={deleteProject}>
                    <DeleteButton id={project.id} />
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
