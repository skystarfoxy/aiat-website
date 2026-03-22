'use server'

import { createClient } from '@/lib/supabase/server'

export async function subscribeToNewsletter(email: string) {
  if (!email || !email.includes('@')) {
    return { error: 'Adresă de email invalidă.' }
  }

  const supabase = createClient()

  if (!supabase) {
    return { error: 'Serviciul de newsletter este momentan indisponibil.' }
  }

  const { error } = await supabase
    .from('newsletter_subscribers')
    .insert([{ email }])

  if (error) {
    // Dacă e deja abonat (duplicate key)
    if (error.code === '23505') {
      return { success: true, message: 'Ești deja abonat la newsletter!' }
    }
    console.error('Newsletter subscription error:', error)
    return { error: 'A apărut o eroare la abonare.' }
  }

  return { success: true }
}
