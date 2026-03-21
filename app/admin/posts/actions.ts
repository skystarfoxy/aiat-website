'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createPost(formData: FormData) {
  const supabase = createClient()
  
  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const content = formData.get('content') as string
  const cover_image = formData.get('cover_image') as string

  const { error } = await supabase
    .from('posts')
    .insert({ title, slug, content, cover_image })

  if (error) {
    redirect(`/admin/posts/new?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/admin/posts')
  revalidatePath('/blog') // If we have a public blog page
  redirect('/admin/posts')
}

export async function deletePost(formData: FormData) {
  const supabase = createClient()
  const id = formData.get('id') as string

  const { error } = await supabase.from('posts').delete().eq('id', id)

  if (error) {
    redirect(`/admin/posts?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/admin/posts')
  revalidatePath('/blog')
  redirect('/admin/posts')
}
