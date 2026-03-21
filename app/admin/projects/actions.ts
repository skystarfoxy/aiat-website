'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createProject(formData: FormData) {
  const supabase = createClient()

  const title = formData.get('title') as string
  const category = formData.get('category') as string
  const description = formData.get('description') as string
  const status = formData.get('status') as string
  const link_url = formData.get('link_url') as string
  const icon_name = formData.get('icon_name') as string
  const theme_color = formData.get('theme_color') as string
  const order_index = parseInt(formData.get('order_index') as string) || 0

  const { error } = await supabase
    .from('projects')
    .insert({ title, category, description, status, link_url, icon_name, theme_color, order_index })

  if (error) {
    redirect(`/admin/projects/new?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/admin/projects')
  revalidatePath('/')
  redirect('/admin/projects')
}

export async function deleteProject(formData: FormData) {
  const supabase = createClient()
  const id = formData.get('id') as string

  const { error } = await supabase.from('projects').delete().eq('id', id)

  if (error) {
    redirect(`/admin/projects?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/admin/projects')
  revalidatePath('/')
  redirect('/admin/projects')
}

export async function updateProject(formData: FormData) {
  const supabase = createClient()
  
  const id = formData.get('id') as string
  const title = formData.get('title') as string
  const category = formData.get('category') as string
  const description = formData.get('description') as string
  const status = formData.get('status') as string
  const link_url = formData.get('link_url') as string
  const icon_name = formData.get('icon_name') as string
  const theme_color = formData.get('theme_color') as string
  const order_index = parseInt(formData.get('order_index') as string) || 0

  const { error } = await supabase
    .from('projects')
    .update({ title, category, description, status, link_url, icon_name, theme_color, order_index })
    .eq('id', id)

  if (error) {
    redirect(`/admin/projects/${id}?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/admin/projects')
  revalidatePath('/')
  redirect('/admin/projects')
}
