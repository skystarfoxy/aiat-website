'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function markAsRead(id: string) {
  const supabase = createClient()
  if (!supabase) return { error: 'Client unavailable' }

  const { error } = await supabase
    .from('contact_messages')
    .update({ is_read: true })
    .eq('id', id)

  if (error) return { error: error.message }
  
  revalidatePath('/admin/messages')
  return { success: true }
}

export async function deleteMessage(id: string) {
  const supabase = createClient()
  if (!supabase) return { error: 'Client unavailable' }

  const { error } = await supabase
    .from('contact_messages')
    .delete()
    .eq('id', id)

  if (error) return { error: error.message }
  
  revalidatePath('/admin/messages')
  return { success: true }
}
