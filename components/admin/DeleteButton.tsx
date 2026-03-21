'use client'

import { Trash2 } from 'lucide-react'

export function DeleteButton({ id }: { id: string }) {
  return (
    <>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="p-2 text-muted hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-transparent"
        title="Șterge"
        onClick={(e) => {
          if (!window.confirm('Ești sigur că vrei să ștergi acest element? Acțiunea este ireversibilă.')) {
            e.preventDefault()
          }
        }}
      >
        <Trash2 size={18} />
      </button>
    </>
  )
}
