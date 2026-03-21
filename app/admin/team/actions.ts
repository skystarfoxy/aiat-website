'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createTeamMember(formData: FormData) {
  const supabase = createClient()
  
  const name = formData.get('name') as string
  const role = formData.get('role') as string
  const bio = formData.get('bio') as string
  const image_url = formData.get('image_url') as string
  const linkedin_url = formData.get('linkedin_url') as string
  const order_index = parseInt(formData.get('order_index') as string) || 0

  const { error } = await supabase
    .from('team_members')
    .insert({ name, role, bio, image_url, linkedin_url, order_index })

  if (error) {
    redirect(`/admin/team/new?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/admin/team')
  revalidatePath('/')
  redirect('/admin/team')
}

export async function deleteTeamMember(formData: FormData) {
  const supabase = createClient()
  const id = formData.get('id') as string

  const { error } = await supabase.from('team_members').delete().eq('id', id)

  if (error) {
    redirect(`/admin/team?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/admin/team')
  revalidatePath('/')
  redirect('/admin/team')
}

export async function updateTeamMember(formData: FormData) {
  const supabase = createClient()
  
  const id = formData.get('id') as string
  const name = formData.get('name') as string
  const role = formData.get('role') as string
  const bio = formData.get('bio') as string
  const image_url = formData.get('image_url') as string
  const linkedin_url = formData.get('linkedin_url') as string
  const order_index = parseInt(formData.get('order_index') as string) || 0

  const { error } = await supabase
    .from('team_members')
    .update({ name, role, bio, image_url, linkedin_url, order_index })
    .eq('id', id)

  if (error) {
    redirect(`/admin/team/${id}?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/admin/team')
  revalidatePath('/')
  redirect('/admin/team')
}
