import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { FileText, Plus, Trash2 } from 'lucide-react'
import { deletePost } from './actions'

export default async function PostsPage() {
  const supabase = createClient()

  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .order('published_at', { ascending: false })

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-syne font-700 text-3xl text-text-primary mb-2">Articole Blog</h1>
          <p className="text-text-secondary font-grotesk">Gestionează articolele și noutățile asociației.</p>
        </div>
        <Link
          href="/admin/posts/new"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
        >
          <Plus size={18} />
          Articol Nou
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
        {error && (
          <div className="p-6 text-red-500 bg-red-50 border-b border-border">Eroare: {error.message}</div>
        )}

        {!posts || posts.length === 0 ? (
          <div className="p-8 text-center bg-slate-50">
            <FileText size={48} className="mx-auto text-muted mb-4 opacity-50" />
            <h3 className="font-syne font-700 text-lg text-text-primary mb-2">Nu ai niciun articol</h3>
            <p className="text-sm text-text-secondary mb-6">Începe să publici primul tău articol de blog.</p>
            <Link
              href="/admin/posts/new"
              className="inline-flex items-center gap-2 bg-white border border-border hover:border-primary/50 text-text-primary px-4 py-2 rounded-lg font-medium transition-colors shadow-sm"
            >
              Scrie un articol
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {posts.map((post) => (
              <div key={post.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 gap-4 hover:bg-slate-50 transition-colors">
                <div>
                  <h3 className="font-syne font-700 text-lg text-text-primary mb-1">{post.title}</h3>
                  <div className="flex items-center gap-3 text-sm text-text-secondary font-grotesk">
                    <span>{new Date(post.published_at).toLocaleDateString('ro-RO')}</span>
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <span className="text-muted">/{post.slug}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <form action={deletePost}>
                    <input type="hidden" name="id" value={post.id} />
                    <button
                      type="submit"
                      className="p-2 text-muted hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-transparent"
                      title="Șterge"
                      onClick={(e) => {
                        if (!confirm('Ești sigur că vrei să ștergi acest articol?')) e.preventDefault()
                      }}
                    >
                      <Trash2 size={18} />
                    </button>
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
