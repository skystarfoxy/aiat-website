'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
  const supabase = createClient()

  if (!supabase) {
    redirect('/admin/login?error=Supabase not configured')
  }

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/admin/login?error=Email sau parolă incorectă')
  }

  revalidatePath('/admin', 'layout')
  redirect('/admin')
}

export async function logout() {
  const supabase = createClient()
  if (supabase) {
    await supabase.auth.signOut()
  }
  redirect('/admin/login')
}
