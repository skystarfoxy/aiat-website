'use client'

import { updateEvent } from '../actions'
import Link from 'next/link'
import { ArrowLeft, Save } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'

export default function EditEventPage({ params }: { params: { id: string } }) {
  const [event, setEvent] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchEvent() {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )
      const { data } = await supabase.from('events').select('*').eq('id', params.id).single()
      if (data) setEvent(data)
      setLoading(false)
    }
    fetchEvent()
  }, [params.id])

  if (loading) return <div>Se încarcă...</div>
  if (!event) return <div>Eveniment negăsit</div>

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/events"
          className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors font-medium mb-4"
        >
          <ArrowLeft size={16} />
          Înapoi la evenimente
        </Link>
        <h1 className="font-syne font-700 text-3xl text-text-primary">Editează Eveniment</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-border p-6 sm:p-8">
        <form action={updateEvent} className="space-y-6">
          <input type="hidden" name="id" value={event.id} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-medium text-text-primary">
                Titlu Eveniment <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                defaultValue={event.title}
                className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm font-grotesk"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="date_text" className="block text-sm font-medium text-text-primary">
                Dată Afișată (ex: Oct 2024) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="date_text"
                name="date_text"
                required
                defaultValue={event.date_text}
                className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm font-grotesk"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="date_value" className="block text-sm font-medium text-text-primary">
                Dată Sistem (ex: 2024-10-01) <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="date_value"
                name="date_value"
                required
                defaultValue={event.date_value ? new Date(event.date_value).toISOString().substring(0, 10) : ''}
                className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm font-grotesk"
              />
              <p className="text-xs text-text-secondary mt-1">Folosită pentru ordonare</p>
            </div>

            <div className="space-y-2">
              <label htmlFor="type" className="block text-sm font-medium text-text-primary">
                Tip Eveniment <span className="text-red-500">*</span>
              </label>
              <select
                id="type"
                name="type"
                defaultValue={event.type}
                className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white text-sm"
              >
                <option value="înființare">Înființare / Milestone</option>
                <option value="conferință">Conferință</option>
                <option value="workshop">Workshop</option>
                <option value="hackathon">Hackathon</option>
                <option value="parteneriat">Parteneriat</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="status" className="block text-sm font-medium text-text-primary">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                id="status"
                name="status"
                defaultValue={event.status}
                className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white text-sm"
              >
                <option value="past">Trecut</option>
                <option value="upcoming">Viitor (Upcoming)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="link_url" className="block text-sm font-medium text-text-primary">
                Link Detalii (opțional)
              </label>
              <input
                type="url"
                id="link_url"
                name="link_url"
                defaultValue={event.link_url}
                className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm font-grotesk"
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium text-text-primary">
              Descriere <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={4}
              defaultValue={event.description}
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm font-grotesk resize-y"
            />
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
