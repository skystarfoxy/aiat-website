import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Calendar, Plus, Edit } from 'lucide-react'
import { deleteEvent } from './actions'
import { DeleteButton } from '@/components/admin/DeleteButton'

export default async function EventsPage() {
  const supabase = createClient()

  const { data: events, error } = await supabase
    .from('events')
    .select('*')
    .order('date_value', { ascending: false })

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-syne font-700 text-3xl text-text-primary mb-2">Evenimente</h1>
          <p className="text-text-secondary font-grotesk">Gestionează istoricul activităților asociației pentru Timeline-ul de pe prima pagină.</p>
        </div>
        <Link
          href="/admin/events/new"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
        >
          <Plus size={18} />
          Adaugă Eveniment
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
        {error && (
          <div className="p-6 text-red-500 bg-red-50 border-b border-border">Eroare: {error.message}</div>
        )}

        {!events || events.length === 0 ? (
          <div className="p-8 text-center bg-slate-50">
            <Calendar size={48} className="mx-auto text-muted mb-4 opacity-50" />
            <h3 className="font-syne font-700 text-lg text-text-primary mb-2">Nu există evenimente</h3>
            <p className="text-sm text-text-secondary mb-6">Secțiunea Timeline (Evenimente) va fi ascunsă până la prima adăugare.</p>
            <Link
              href="/admin/events/new"
              className="inline-flex items-center gap-2 bg-white border border-border hover:border-primary/50 text-text-primary px-4 py-2 rounded-lg font-medium transition-colors shadow-sm"
            >
              Creează primul eveniment
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {events.map((event) => (
              <div key={event.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 gap-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className={`mt-1 w-2.5 h-2.5 rounded-full shrink-0 ${
                    event.status === 'upcoming' ? 'bg-primary shadow-[0_0_8px_rgba(79,70,229,0.5)]' : 'bg-slate-300'
                  }`} />
                  <div>
                    <h3 className="font-syne font-700 text-lg text-text-primary mb-1">{event.title}</h3>
                    <div className="flex items-center gap-3 text-sm text-text-secondary font-grotesk">
                      <span className="font-medium text-text-primary">{event.date_text}</span>
                      <span className="w-1 h-1 rounded-full bg-border" />
                      <span className="text-muted capitalize">{event.type}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/events/${event.id}`}
                    className="p-2 text-muted hover:text-primary hover:bg-primary/5 rounded-lg transition-colors border border-transparent"
                    title="Editează"
                  >
                    <Edit size={18} />
                  </Link>
                  <form action={deleteEvent}>
                    <DeleteButton id={event.id} />
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
