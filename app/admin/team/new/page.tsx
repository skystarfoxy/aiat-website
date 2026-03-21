'use client'

import { createTeamMember } from '../actions'
import Link from 'next/link'
import { ArrowLeft, Save } from 'lucide-react'

export default function NewTeamMemberPage() {
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
        <h1 className="font-syne font-700 text-3xl text-text-primary">Adaugă Membru</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-border p-6 sm:p-8">
        <form action={createTeamMember} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-text-primary">
                Nume și Prenume <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm font-grotesk"
                placeholder="Ex: Popescu Ion"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="role" className="block text-sm font-medium text-text-primary">
                Rol / Funcție <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="role"
                name="role"
                required
                className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm font-grotesk"
                placeholder="Ex: Voluntar Cercetare"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="image_url" className="block text-sm font-medium text-text-primary">
                URL Poză Profil (opțional)
              </label>
              <input
                type="url"
                id="image_url"
                name="image_url"
                className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm font-grotesk"
                placeholder="https://exemplu.com/poza.jpg"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="linkedin_url" className="block text-sm font-medium text-text-primary">
                URL LinkedIn (opțional)
              </label>
              <input
                type="url"
                id="linkedin_url"
                name="linkedin_url"
                className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm font-grotesk"
                placeholder="https://linkedin.com/in/..."
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="order_index" className="block text-sm font-medium text-text-primary">
              Ordinea afișării (opțional, ex: 1, 2, 3...)
            </label>
            <input
              type="number"
              id="order_index"
              name="order_index"
              defaultValue="0"
              className="w-full sm:w-1/4 px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm font-grotesk"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="bio" className="block text-sm font-medium text-text-primary">
              Despre persoană (Bio scurt, opțional)
            </label>
            <textarea
              id="bio"
              name="bio"
              rows={3}
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm font-grotesk resize-y"
              placeholder="Câteva cuvinte despre experiență..."
            />
          </div>

          <div className="pt-4 border-t border-border flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
            >
              <Save size={18} />
              Salvează Membru
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
