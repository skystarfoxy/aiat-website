'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function sendContactMessage(formData: {
  name: string
  email: string
  organization?: string
  reason?: string
  message: string
}) {
  const supabase = createClient()

  if (!supabase) {
    return { error: 'Serviciul de contact este momentan indisponibil. Vă rugăm să încercați mai târziu.' }
  }

  const { error } = await supabase.from('contact_messages').insert([
    {
      name: formData.name,
      email: formData.email,
      organization: formData.organization,
      reason: formData.reason,
      message: formData.message,
    },
  ])

  if (error) {
    console.error('Error inserting contact message:', error)
    return { error: 'A apărut o eroare la trimiterea mesajului. Vă rugăm să încercați din nou.' }
  }

  // Notă: Aici se poate adăuga integrarea cu Resend pentru e-mailuri reale.
  
  revalidatePath('/admin/content') // Pentru vizibilitate în panoul de admin dacă e cazul
  return { success: true }
}
