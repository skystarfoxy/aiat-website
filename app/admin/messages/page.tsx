import { createClient } from '@/lib/supabase/server'
import { Mail, User, Building, MessageSquare, Trash2, Check, Clock } from 'lucide-react'
import { markAsRead, deleteMessage } from './actions'

export default async function MessagesPage() {
  const supabase = createClient()
  let messages: any[] = []

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

  const { data } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false })
  if (data) messages = data

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-syne font-700 text-text-primary">Mesaje Contact</h1>
          <p className="text-text-secondary font-grotesk mt-1">Gestionați mesajele primite prin formularul de contact.</p>
        </div>
        <div className="bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
          <span className="text-primary font-syne font-600 text-sm">
            {messages.length} Mesaje în total
          </span>
        </div>
      </div>

      <div className="grid gap-4">
        {messages.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl border border-dashed border-border text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="text-muted" size={24} />
            </div>
            <h3 className="font-syne font-600 text-text-primary">Niciun mesaj</h3>
            <p className="text-text-secondary font-grotesk mt-1">Nu s-a primit încă niciun mesaj prin formularul de contact.</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                msg.is_read ? 'border-border opacity-75' : 'border-primary/30 shadow-sm ring-1 ring-primary/5'
              }`}
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                      msg.is_read ? 'bg-slate-100 text-slate-400' : 'bg-primary/10 text-primary'
                    }`}>
                      <User size={20} />
                    </div>
                    <div>
                      <h3 className="font-syne font-700 text-text-primary text-lg flex items-center gap-2">
                        {msg.name}
                        {!msg.is_read && (
                          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        )}
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-text-secondary font-grotesk">
                        <a href={`mailto:${msg.email}`} className="flex items-center gap-1.5 hover:text-primary transition-colors">
                          <Mail size={14} />
                          {msg.email}
                        </a>
                        {msg.organization && (
                          <span className="flex items-center gap-1.5">
                            <Building size={14} />
                            {msg.organization}
                          </span>
                        )}
                        <span className="flex items-center gap-1.5 text-muted">
                          <Clock size={14} />
                          {new Date(msg.created_at).toLocaleString('ro-RO', { 
                            day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' 
                          })}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {!msg.is_read && (
                      <form action={markAsRead.bind(null, msg.id)}>
                        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors text-xs font-semibold font-syne uppercase tracking-wider">
                          <Check size={14} />
                          Citește
                        </button>
                      </form>
                    )}
                    <form action={deleteMessage.bind(null, msg.id)}>
                      <button className="p-2 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-500 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </form>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare size={14} className="text-primary" />
                    <span className="text-xs font-bold font-syne text-primary uppercase tracking-widest">
                      {msg.reason || 'General'}
                    </span>
                  </div>
                  <p className="text-text-primary font-grotesk whitespace-pre-wrap leading-relaxed">
                    {msg.message}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
