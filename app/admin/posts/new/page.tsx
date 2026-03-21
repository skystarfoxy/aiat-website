'use client'

import { createPost } from '../actions'
import Link from 'next/link'
import { ArrowLeft, Save } from 'lucide-react'

export default function NewPostPage() {
  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/posts"
          className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors font-medium mb-4"
        >
          <ArrowLeft size={16} />
          Înapoi la articole
        </Link>
        <h1 className="font-syne font-700 text-3xl text-text-primary">Articol Nou</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-border p-6 sm:p-8">
        <form action={createPost} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-medium text-text-primary">
                Titlu articol <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm font-grotesk"
                placeholder="Ex: Lansarea AI Transilvania..."
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="slug" className="block text-sm font-medium text-text-primary">
                URL Slug <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="slug"
                name="slug"
                required
                pattern="^[a-z0-9]+(?:-[a-z0-9]+)*$"
                className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm font-grotesk"
                placeholder="lansarea-ai-transilvania"
              />
              <p className="text-xs text-muted">Doar litere mici, cifre și cratime (fără spații).</p>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="cover_image" className="block text-sm font-medium text-text-primary">
              URL Imagine Cover (opțional)
            </label>
            <input
              type="url"
              id="cover_image"
              name="cover_image"
              className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm font-grotesk"
              placeholder="https://exemplu.com/imagine.jpg"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="content" className="block text-sm font-medium text-text-primary">
              Conținut (Markdown/HTML) <span className="text-red-500">*</span>
            </label>
            <textarea
              id="content"
              name="content"
              required
              rows={15}
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm font-grotesk resize-y"
              placeholder="Scrie aici conținutul articolului..."
            />
          </div>

          <div className="pt-4 border-t border-border flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
            >
              <Save size={18} />
              Publică Articolul
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
