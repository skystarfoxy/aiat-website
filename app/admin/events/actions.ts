'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createEvent(formData: FormData) {
  const supabase = createClient()
  
  const date_text = formData.get('date_text') as string
  const date_value = formData.get('date_value') as string || new Date().toISOString()
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const type_category = formData.get('type') as string
  const link_url = formData.get('link_url') as string
  const status = formData.get('status') as string

  const { error } = await supabase
    .from('events')
    .insert({ date_text, date_value, title, description, type: type_category, link_url, status })

  if (error) {
    redirect(`/admin/events/new?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/admin/events')
  revalidatePath('/')
  redirect('/admin/events')
}

export async function deleteEvent(formData: FormData) {
  const supabase = createClient()
  const id = formData.get('id') as string

  const { error } = await supabase.from('events').delete().eq('id', id)

  if (error) {
    redirect(`/admin/events?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/admin/events')
  revalidatePath('/')
  redirect('/admin/events')
}

export async function updateEvent(formData: FormData) {
  const supabase = createClient()
  
  const id = formData.get('id') as string
  const title = formData.get('title') as string
  const date_text = formData.get('date_text') as string
  const date_value = formData.get('date_value') as string
  const description = formData.get('description') as string
  const type = formData.get('type') as string
  const status = formData.get('status') as string
  const link_url = formData.get('link_url') as string

  const { error } = await supabase
    .from('events')
    .update({ title, date_text, date_value, description, type, status, link_url })
    .eq('id', id)

  if (error) {
    redirect(`/admin/events/${id}?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/admin/events')
  revalidatePath('/')
  redirect('/admin/events')
}
