'use client'

import { createEvent } from '../actions'
import Link from 'next/link'
import { ArrowLeft, Save } from 'lucide-react'

export default function NewEventPage() {
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
        <h1 className="font-syne font-700 text-3xl text-text-primary">Eveniment Nou</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-border p-6 sm:p-8">
        <form action={createEvent} className="space-y-6">
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
                className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm font-grotesk"
                placeholder="Ex: Primul Hackathon AI"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="date_text" className="block text-sm font-medium text-text-primary">
                Dată afișată (Label) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="date_text"
                name="date_text"
                required
                className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm font-grotesk"
                placeholder="Ex: Noiembrie 2024"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label htmlFor="date_value" className="block text-sm font-medium text-text-primary">
                Dată Sistem (pentru ordonare)
              </label>
              <input
                type="datetime-local"
                id="date_value"
                name="date_value"
                className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm font-grotesk"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="type" className="block text-sm font-medium text-text-primary">
                Tip Eveniment <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="type"
                name="type"
                required
                defaultValue="lansare"
                className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm font-grotesk lowercase"
                placeholder="lansare, workshop, etc."
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="status" className="block text-sm font-medium text-text-primary">
                Status
              </label>
              <select
                id="status"
                name="status"
                defaultValue="past"
                className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm font-grotesk bg-white"
              >
                <option value="past">Trecut (Past)</option>
                <option value="upcoming">Viitor (Upcoming)</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="link_url" className="block text-sm font-medium text-text-primary">
              Link detalii (opțional)
            </label>
            <input
              type="url"
              id="link_url"
              name="link_url"
              className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm font-grotesk"
              placeholder="https://..."
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium text-text-primary">
              Descriere scurtă <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={3}
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm font-grotesk resize-y"
              placeholder="Scurt rezumat al activității..."
            />
          </div>

          <div className="pt-4 border-t border-border flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
            >
              <Save size={18} />
              Salvează Eveniment
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
