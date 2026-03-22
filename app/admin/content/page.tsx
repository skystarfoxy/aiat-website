import { createClient } from '@/lib/supabase/server'
import { updateSiteContent } from './actions'
import { Save } from 'lucide-react'

export default async function ContentEditorPage() {
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

  // Fetch all site content ordered by section key
  const { data: contentItems, error } = await supabase
    .from('site_content')
    .select('*')
    .order('section_key', { ascending: true })

  if (error) {
    return <div className="p-4 bg-red-50 text-red-600 rounded-lg">Eroare la încărcarea datelor: {error.message}</div>
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-syne font-700 text-3xl text-text-primary mb-2">Texte Site</h1>
        <p className="text-text-secondary font-grotesk">Modifică textele vizibile pe site (titluri, descrieri).</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-border p-6 sm:p-8">
        {!contentItems || contentItems.length === 0 ? (
          <p className="text-muted text-sm">Nu există texte configurate momentan.</p>
        ) : (
          <div className="space-y-8">
            {contentItems.map((item: any) => (
              <div key={item.id} className="pb-8 border-b border-border last:border-0 last:pb-0">
                <form action={updateSiteContent} className="flex flex-col gap-3">
                  <input type="hidden" name="id" value={item.id} />
                  
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-syne font-600 text-text-primary text-base">
                        {item.description || item.section_key}
                      </span>
                      <span className="text-xs font-mono bg-slate-100 px-2 py-0.5 rounded text-muted">
                        {item.section_key}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <textarea
                      name="content_value"
                      defaultValue={item.content_value}
                      rows={3}
                      className="flex-1 px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm font-grotesk text-text-primary resize-y"
                    />
                    <button
                      type="submit"
                      className="flex items-center gap-2 bg-slate-100 hover:bg-primary hover:text-white text-text-primary px-4 py-3 rounded-lg font-medium transition-colors border border-border shrink-0"
                    >
                      <Save size={18} />
                      <span className="hidden sm:inline">Salvează</span>
                    </button>
                  </div>
                </form>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
