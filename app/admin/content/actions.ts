'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function updateSiteContent(formData: FormData) {
  const supabase = createClient()
  
  const id = formData.get('id') as string
  const content_value = formData.get('content_value') as string

  const { error } = await supabase
    .from('site_content')
    .update({ content_value, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) {
    redirect(`/admin/content?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/admin/content')
  revalidatePath('/') // Revalidate the public homepage
  redirect('/admin/content?success=true')
}
