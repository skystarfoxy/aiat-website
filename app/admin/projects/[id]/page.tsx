'use client'

import { updateProject } from '../actions'
import Link from 'next/link'
import { ArrowLeft, Save } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'

export default function EditProjectPage({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProject() {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )
      const { data } = await supabase.from('projects').select('*').eq('id', params.id).single()
      if (data) setProject(data)
      setLoading(false)
    }
    fetchProject()
  }, [params.id])

  if (loading) return <div className="p-8 text-center font-grotesk">Se încarcă...</div>
  if (!project) return <div className="p-8 text-center font-grotesk text-red-500">Proiect negăsit</div>

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link
          href="/admin/projects"
          className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors font-medium mb-4"
        >
          <ArrowLeft size={16} />
          Înapoi la proiecte
        </Link>
        <h1 className="font-syne font-700 text-3xl text-text-primary">Editează Proiect</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-border p-6 sm:p-8">
        <form action={updateProject} className="space-y-6">
          <input type="hidden" name="id" value={project.id} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-medium text-text-primary">
                Titlu <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                defaultValue={project.title}
                className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm font-grotesk"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="category" className="block text-sm font-medium text-text-primary">
                Categorie (Subtitlu) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="category"
                name="category"
                required
                defaultValue={project.category}
                className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm font-grotesk"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-2">
              <label htmlFor="status" className="block text-sm font-medium text-text-primary">
                Status <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="status"
                name="status"
                required
                defaultValue={project.status}
                className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm font-grotesk"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="link_url" className="block text-sm font-medium text-text-primary">
                Link Extern (opțional)
              </label>
              <input
                type="url"
                id="link_url"
                name="link_url"
                defaultValue={project.link_url || ''}
                className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm font-grotesk"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label htmlFor="icon_name" className="block text-sm font-medium text-text-primary">
                Iconiță
              </label>
              <select
                id="icon_name"
                name="icon_name"
                defaultValue={project.icon_name}
                className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white text-sm"
              >
                <option value="Database">Bază de date (Database)</option>
                <option value="GraduationCap">Educație (GraduationCap)</option>
                <option value="Stethoscope">Sănătate (Stethoscope)</option>
                <option value="Laptop">Tehnologie (Laptop)</option>
                <option value="Briefcase">Afaceri (Briefcase)</option>
                <option value="Library">Librărie (Library)</option>
              </select>
            </div>

             <div className="space-y-2">
              <label htmlFor="theme_color" className="block text-sm font-medium text-text-primary">
                Culoare Tematică
              </label>
              <select
                id="theme_color"
                name="theme_color"
                defaultValue={project.theme_color}
                className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white text-sm"
              >
                <option value="primary">Albastru (Primary)</option>
                <option value="accent">Verde (Accent)</option>
                <option value="violet">Violet (Innovation)</option>
                <option value="rose">Roșu (Rose)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="order_index" className="block text-sm font-medium text-text-primary">
                Ordine Afișare
              </label>
              <input
                type="number"
                id="order_index"
                name="order_index"
                defaultValue={project.order_index}
                className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm font-grotesk"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium text-text-primary">
              Descriere Proiect <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={4}
              defaultValue={project.description}
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
