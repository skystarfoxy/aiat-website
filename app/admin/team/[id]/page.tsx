'use client'

import { updateTeamMember } from '../actions'
import Link from 'next/link'
import { ArrowLeft, Save } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'

export default function EditTeamMemberPage({ params }: { params: { id: string } }) {
  const [member, setMember] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchMember() {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )
      const { data } = await supabase.from('team_members').select('*').eq('id', params.id).single()
      if (data) setMember(data)
      setLoading(false)
    }
    fetchMember()
  }, [params.id])

  if (loading) return <div>Se încarcă...</div>
  if (!member) return <div>Membru negăsit</div>

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/team"
          className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors font-medium mb-4"
        >
          <ArrowLeft size={16} />
          Înapoi la echipă
        </Link>
        <h1 className="font-syne font-700 text-3xl text-text-primary">Editează Membru</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-border p-6 sm:p-8">
        <form action={updateTeamMember} className="space-y-6">
          <input type="hidden" name="id" value={member.id} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-text-primary">
                Nume <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                defaultValue={member.name}
                className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm font-grotesk"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="role" className="block text-sm font-medium text-text-primary">
                Rol / Titlu <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="role"
                name="role"
                required
                defaultValue={member.role}
                className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm font-grotesk"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="bio" className="block text-sm font-medium text-text-primary">
              Bio pe scurt
            </label>
            <textarea
              id="bio"
              name="bio"
              rows={3}
              defaultValue={member.bio}
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm font-grotesk resize-y"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="image_url" className="block text-sm font-medium text-text-primary">
                URL Poză de profil
              </label>
              <input
                type="url"
                id="image_url"
                name="image_url"
                defaultValue={member.image_url}
                className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm font-grotesk"
                placeholder="https://..."
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="linkedin_url" className="block text-sm font-medium text-text-primary">
                URL Profil LinkedIn
              </label>
              <input
                type="url"
                id="linkedin_url"
                name="linkedin_url"
                defaultValue={member.linkedin_url}
                className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm font-grotesk"
                placeholder="https://linkedin.com/..."
              />
            </div>
          </div>

          <div className="space-y-2 md:w-1/3">
            <label htmlFor="order_index" className="block text-sm font-medium text-text-primary">
              Ordine de afișare
            </label>
            <input
              type="number"
              id="order_index"
              name="order_index"
              defaultValue={member.order_index}
              className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm font-grotesk"
            />
            <p className="text-xs text-text-secondary mt-1">Număr mai mic = apare mai sus</p>
          </div>

          <div className="pt-4 border-t border-border flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
            >
              <Save size={18} />
              Salvează Modificările
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
