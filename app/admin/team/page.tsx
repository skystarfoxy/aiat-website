import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Users, Plus, Edit } from 'lucide-react'
import { deleteTeamMember } from './actions'
import { DeleteButton } from '@/components/admin/DeleteButton'

export default async function TeamPage() {
  const supabase = createClient()

  const { data: members, error } = await supabase
    .from('team_members')
    .select('*')
    .order('order_index', { ascending: true })
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-syne font-700 text-3xl text-text-primary mb-2">Echipă</h1>
          <p className="text-text-secondary font-grotesk">Gestionează membrii asociației. Aceștia vor fi afișați public pe prima pagină.</p>
        </div>
        <Link
          href="/admin/team/new"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
        >
          <Plus size={18} />
          Adaugă Membru
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
        {error && (
          <div className="p-6 text-red-500 bg-red-50 border-b border-border">Eroare: {error.message}</div>
        )}

        {!members || members.length === 0 ? (
          <div className="p-8 text-center bg-slate-50">
            <Users size={48} className="mx-auto text-muted mb-4 opacity-50" />
            <h3 className="font-syne font-700 text-lg text-text-primary mb-2">Nu există niciun membru</h3>
            <p className="text-sm text-text-secondary mb-6">Până când nu adaugi membri, secțiunea "Echipă" va fi ascunsă pe site.</p>
            <Link
              href="/admin/team/new"
              className="inline-flex items-center gap-2 bg-white border border-border hover:border-primary/50 text-text-primary px-4 py-2 rounded-lg font-medium transition-colors shadow-sm"
            >
              Adaugă o persoană
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {members.map((member) => (
              <div key={member.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 gap-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-200 shrink-0 border border-border">
                    {member.image_url ? (
                      <img src={member.image_url} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted font-bold">
                        {member.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-syne font-700 text-lg text-text-primary mb-1">{member.name}</h3>
                    <div className="flex items-center gap-3 text-sm text-text-secondary font-grotesk">
                      <span>{member.role}</span>
                      <span className="w-1 h-1 rounded-full bg-border" />
                      <span className="text-muted">Ordine: {member.order_index}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/team/${member.id}`}
                    className="p-2 text-muted hover:text-primary hover:bg-primary/5 rounded-lg transition-colors border border-transparent"
                    title="Editează"
                  >
                    <Edit size={18} />
                  </Link>
                  <form action={deleteTeamMember}>
                    <DeleteButton id={member.id} />
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
