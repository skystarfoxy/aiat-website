'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

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

  // 1. Salvare în baza de date
  const { error: dbError } = await supabase.from('contact_messages').insert([
    {
      name: formData.name,
      email: formData.email,
      organization: formData.organization,
      reason: formData.reason,
      message: formData.message,
    },
  ])

  if (dbError) {
    console.error('Error inserting contact message:', dbError)
    return { error: 'A apărut o eroare la salvarea mesajului.' }
  }

  // 2. Trimitere e-mail via Resend
  try {
    await resend.emails.send({
      from: 'AI Transilvania <onboarding@resend.dev>', // Notă: Schimbă cu email-ul tău verificat în Resend
      to: 'asociatia@ia-transilvania.eu',
      subject: `Mesaj nou: ${formData.reason || 'Contact Site'}`,
      html: `
        <h2>Mesaj nou de pe site-ul AI Transilvania</h2>
        <p><strong>Nume:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Organizație:</strong> ${formData.organization || 'N/A'}</p>
        <p><strong>Motiv:</strong> ${formData.reason || 'N/A'}</p>
        <hr />
        <p><strong>Mesaj:</strong></p>
        <p>${formData.message}</p>
      `,
    })
  } catch (emailError) {
    console.error('Error sending email via Resend:', emailError)
    // Nu întrerupem procesul dacă e-mailul eșuează după salvarea în DB
  }
  
  revalidatePath('/admin/messages')
  return { success: true }
}
