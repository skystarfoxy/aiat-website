'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function markAsRead(id: string) {
  const supabase = createClient()
  if (!supabase) return

  const { error } = await supabase
    .from('contact_messages')
    .update({ is_read: true })
    .eq('id', id)

  if (error) {
    console.error('Mark as read error:', error.message)
    return
  }
  
  revalidatePath('/admin/messages')
}

export async function deleteMessage(id: string) {
  const supabase = createClient()
  if (!supabase) return

  const { error } = await supabase
    .from('contact_messages')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Delete message error:', error.message)
    return
  }
  
  revalidatePath('/admin/messages')
}
